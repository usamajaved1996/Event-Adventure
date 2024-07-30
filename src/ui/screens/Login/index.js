import React, { useEffect, useState } from 'react';
import { StyleSheet, TextInput, View, Text, TouchableOpacity, Image, ScrollView, ActivityIndicator } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Eye from '../../../assets/icons/eye.png';
import Lock from '../../../assets/icons/lock.png'
import Sms from '../../../assets/icons/sms.png'
import facebook from '../../../assets/icons/facebook.png'
import google from '../../../assets/icons/google.png'
import apple from '../../../assets/icons/apple.png'
import { login, socialLogin } from '../../../slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { appleAuth } from '@invertase/react-native-apple-authentication';
import Button from '../../modules/Button';
import SplashImage from "../../../assets/splash/Splash2.png"
import { toastMsg } from '../../modules/Toast/index';
import Icon from "react-native-vector-icons/FontAwesome";
import AsyncStorage from '@react-native-async-storage/async-storage';

let isMounted = false;

const Login = ({ navigation }) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [userNameError, setUserNameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false); // State for loading indicator
  const dispatch = useDispatch();

  const toggleRememberMe = () => {
    setRememberMe(!rememberMe);
  };

  useEffect(() => {
    async function loadRememberedCredentials() {
      const storedCredentials = await AsyncStorage.getItem('loginCredentials');
      if (storedCredentials) {
        const { userName, password, rememberMe } = JSON.parse(storedCredentials);
        setUserName(userName);
        setPassword(password);
        setRememberMe(rememberMe);
      }
    }
    loadRememberedCredentials();
  }, []);
  const validateFields = () => {
    let isValid = true;

    if (!userName.trim()) {
      setUserNameError('Please enter your email.');
      isValid = false;
    } else {
      setUserNameError('');
    }

    if (!password.trim()) {
      setPasswordError('Please enter your password.');
      isValid = false;
    } else {
      setPasswordError('');
    }

    return isValid;
  };
  const onLogin = async () => {
    if (validateFields()) {
      setLoading(true); // Start loading indicator
      try {
        const response = await dispatch(login({ userName, password }));
        if (rememberMe) {
          await AsyncStorage.setItem('loginCredentials', JSON.stringify({ userName, password, rememberMe }));
        } else {
          await AsyncStorage.removeItem('loginCredentials');
        }
        // console.warn('rs', response)
        if (response.payload) {
          toastMsg(response.payload.message);
        } else if (response.error.message == 404) {
          toastMsg('Member account is deleted please use different account to access.');
        }
        else if (response.error.message == 401) {
          toastMsg('Invalid credentials');
        }
        else {
          toastMsg('Internal Server Error');
        }
      } catch (error) {
        console.error('err', error)
      }
      setLoading(false); // Stop loading indicator
    }
  };
  const handleEmailChange = (text) => {
    if (!rememberMe) {
      setUserName(text);
    }
  };

  const handlePasswordChange = (text) => {
    if (!rememberMe) {
      setPassword(text);
    }
  };
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '529091195874-k4cldf5tabthbdkplnk9hof3ffj5r2nf.apps.googleusercontent.com', // Your Web Client ID from Google Cloud Console
    });
  })
  const googleSignIn = async () => {
    setLoading(true); // Start loading indicator
    console.warn('googleSignIn')
    try {
      await GoogleSignin.hasPlayServices();
      let { idToken } = await GoogleSignin.signIn();
      console.log("idToken==>", idToken)

      // Create a GoogleAuthProvider credential using the Google Sign-In ID token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign in to Firebase with the Google credential
      console.log("googleCredential==>", googleCredential)

      await auth().signInWithCredential(googleCredential);

      // Get the user's Firebase authentication token
      const user = auth().currentUser;
      console.log("user ==> on fb", user)

      if (user) {
        const token = await user.getIdToken();
        // console.log("token==> for social api", token)

        const checkForProfile = await dispatch(socialLogin({ idToken: token }));
        // console.warn('checkForProfile', checkForProfile)
        setLoading(false); // Stop loading indicator
        // isMounted = true;

        return; // Add this return statement to exit the function here
      } else {
        console.log('No user found');
      }
    } catch (error) {
      console.error('Google Sign-In Error:', error);
    }
  };
  async function onFacebookButtonPress() {
    try {
      // Attempt login with permissions
      const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

      if (result.isCancelled) {
        throw 'User cancelled the login process';
      }

      // Once signed in, get the user's AccessToken
      const data = await AccessToken.getCurrentAccessToken();
      if (!data) {
        throw 'Something went wrong obtaining access token';
      }

      // const tokenFb = data.accessToken;

      // // Update the URL construction for fetching user data
      // const response = await fetch('https://graph.facebook.com/me?fields=id,first_name,last_name,email&access_token=${tokenFb}');
      // const userData = await response.json();
      // console.log("userData", userData);

      const tokenFb = data?.accessToken;
      const response = await fetch(`https://graph.facebook.com/me?fields=id,first_name,last_name,email&access_token=${tokenFb}`);
      const userData = await response.json();
      console.log("userData", userData.email)

      // Create a Firebase credential with the AccessToken
      const facebookCredential = auth.FacebookAuthProvider.credential(tokenFb);
      console.log("facebookCredential", facebookCredential);

      // Sign in with Firebase credential
      await auth().signInWithCredential(facebookCredential);

      const user = auth().currentUser;
      console.log("user ==> on fb", user);

      if (user) {
        // Check if the user's email is available in provider data
        const email = user.providerData[0]?.email || null;

        const token = await user.getIdToken();
        console.log('Firebase Auth Token on Facebook:', token);

        // Dispatch the socialLogin action with token and email
        dispatch(socialLogin({ token: token, email: userData.email }));
        return; // Add this return statement to exit the function here
      } else {
        console.log('No user found');
      }
    } catch (error) {
      console.error('Error during Facebook login:', error);
    }
  };
  async function onAppleButtonPress() {
    console.warn('onAppleButtonPress')
    // Start the sign-in request
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      // As per the FAQ of react-native-apple-authentication, the name should come first in the following array.
      // See: https://github.com/invertase/react-native-apple-authentication#faqs
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });

    // Ensure Apple returned a user identityToken
    if (!appleAuthRequestResponse.identityToken) {
      throw new Error('Apple Sign-In failed - no identify token returned');
    }

    // Create a Firebase credential from the response
    const { identityToken, nonce } = appleAuthRequestResponse;
    console.warn('identityToken', identityToken)

    const appleCredential = auth.AppleAuthProvider.credential(identityToken, nonce);
    console.warn('appleCredential', appleCredential)
    await auth().signInWithCredential(appleCredential);
    const user = auth().currentUser;

    if (user) {
      await auth().currentUser.updateProfile({
        displayName: appleAuthRequestResponse?.fullName?.givenName + " " + appleAuthRequestResponse?.fullName?.familyName,
        email: appleAuthRequestResponse?.email
      });

      const updatedUser = auth().currentUser;
      const token = await updatedUser.getIdToken();
      console.warn('token', token)

      // dispatch(socialLogin({ token: token, name: appleAuthRequestResponse?.fullName?.givenName + " " + appleAuthRequestResponse?.fullName?.familyName }));
      isMounted = true;


      return; // Add this return statement to exit the function here
    } else {
      console.log('No user found');
    }
    // Sign the user in with the credential
    // return auth().signInWithCredential(appleCredential);
  }
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={SplashImage} style={styles.image} resizeMode="cover" />
      <View style={styles.overlay}></View>

      <View style={styles.top}>
        <Text style={{ color: 'white', fontSize: 24, fontWeight: '600' }}>
          Welcome Back!
        </Text>
        <Text style={{ color: 'white', fontSize: 16, fontWeight: '500', paddingTop: 10 }}>
          Please sign in to your account
        </Text>
      </View>
      <View style={styles.inputContainer}>
        <Image source={Sms} />
        <TextInput
          placeholder="Email"
          placeholderTextColor="#353535"
          onChangeText={handleEmailChange}
          type="email"
          value={userName}
          style={[styles.textInput, { width: '80%' }]} // Adjust the width as needed
        />
      </View>
      {userNameError ? <Text style={styles.errorText}>{userNameError}</Text> : null}

      <View style={styles.inputContainer}>
        <Image source={Lock} />

        <TextInput
          placeholder="Password"
          placeholderTextColor="#353535"
          style={[styles.textInput, { width: '80%' }]} // Adjust the width as needed
          secureTextEntry={!passwordVisible}
          onChangeText={handlePasswordChange}
          type="password"
          value={password}
        />
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={() => setPasswordVisible(!passwordVisible)}
        >
          <Image source={Eye} />
        </TouchableOpacity>
      </View>
      {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}


      <View style={styles.forgot}>
        <TouchableOpacity style={styles.rememberMeContainer} onPress={toggleRememberMe}>
          <View style={[styles.radio, rememberMe && styles.radioSelected]}>
            {rememberMe && (
              <Icon color={"black"} name={"check"} size={19} />
            )}
          </View>
          <Text style={styles.rememberMeText}>Remember Me</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.forgotContainer} onPress={() => navigation.navigate('Forgot')}>
          <Text style={styles.rememberMeText}> Forgot Password?</Text>
        </TouchableOpacity>
      </View>
      {loading ? (
        <ActivityIndicator size="small" color="#fff" />
      ) : (
        <Button title={'Sign In'} onPress={onLogin} />
      )}

      <View style={styles.socialButtonContainer}>

        <TouchableOpacity style={styles.google} onPress={googleSignIn}>
          <Image source={google} style={styles.socialImage} />
          <Text style={styles.socialText}>Sign In with Google</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.facebook} onPress={onFacebookButtonPress}>
          <Image source={facebook} style={styles.socialImage} />
          <Text style={styles.socialText3}>Sign In with Facebook</Text>
        </TouchableOpacity>
        {
          Platform.OS !== "android" &&
          <TouchableOpacity style={styles.google} onPress={onAppleButtonPress}>
            <Image source={apple} style={styles.socialImage} />
            <Text style={styles.socialText2}>Sign In with Apple</Text>
          </TouchableOpacity>
        }
      </View>
      <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: 30 }}>
        <Text style={{ fontSize: 16, fontWeight: '500', color: 'white' }}>Don’t have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={{ fontSize: 16, fontWeight: '600', color: 'white' }}>  Register</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: -1,
    // Apply overlay with dull tone
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.6)' // Adjust opacity as needed
  },
  errorText: {
    paddingTop: 8, paddingLeft: 25, color: "#f75959"
  },
  top: {
    marginTop: '14%',
    alignItems: 'center',
    marginBottom: 20,
  },
  textInput: {
    color: '#353535',
    paddingLeft: 15,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 20,
    paddingLeft: 20,
    zIndex: 0,
    borderColor: '#fff',
    height: 64,
    marginTop: 25,
    width: '90%',
    backgroundColor: '#fff',
    alignSelf: 'center',
  },
  eyeIcon: {
    position: 'absolute',
    right: 20,
  },

  rememberMeContainer: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20
  },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#B3B3B3',
    marginRight: 10,
    backgroundColor: '#B3B3B3',
    marginTop: 2

  },
  radioSelected: {
    backgroundColor: 'black',
  },
  rememberMeText: {
    fontSize: 16,
    color: '#fff'
  },
  radioSelected: {
    backgroundColor: '#fff',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 20,
    gap: 8,
    marginLeft: 20
  },
  checkboxLabel: {
    fontSize: 16,
    color: 'white',
  },
  TextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  checkmarkIcon: {
    width: 16,
    height: 16,
    tintColor: '#fff', // Customize the color of the checkmark icon
  },
  forgotContainer: {
    marginTop: 22,
    position: 'absolute',
    right: 10
  },
  forgot: {
    flexDirection: 'row',
    width: '95%',
    alignSelf: 'center',
  },
  backgroundLayer: {
    position: 'absolute',
    bottom: 0,
    width: 400,
    height: 400,
    resizeMode: 'contain'
    // zIndex: -1,
  },
  google: {
    width: '90%',
    height: 64,
    borderRadius: 20,
    backgroundColor: '#fff',
    marginTop: 40,
    alignSelf: 'center',
    flexDirection: 'row',
    padding: 17,
    alignItems: 'center'
  },
  facebook: {
    width: '90%',
    height: 64,
    borderRadius: 20,
    backgroundColor: '#354588',
    marginTop: 15,
    alignSelf: 'center',
    flexDirection: 'row',
    padding: 17,
    alignItems: 'center'
  },
  socialImage: {
    marginLeft: 40
  },
  socialText: { color: 'black', marginLeft: 20, fontSize: 16, fontWeight: '600' },
  socialText2: { color: 'black', marginLeft: 25, fontSize: 16, fontWeight: '600' },
  socialText3: { color: 'white', marginLeft: 25, fontSize: 16, fontWeight: '600' },
  vectorImageContainer: {
    // position: 'absolute',
    // bottom: 0,
    // alignSelf: 'stretch',
    // zIndex: -1,
    height: 200, // Adjust the height according to your preference
  },
  vectorImage: {
    flex: 1,
    width: '100%',
    height: 1000,
  },


});
export default Login;
