import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput, View, Text, TouchableOpacity, Image, ScrollView, ActivityIndicator } from 'react-native';
import { signUp } from '../../../slices/authSlice';
import Eye from '../../../assets/icons/eye.png';
import Lock from '../../../assets/icons/lock.png'
import Sms from '../../../assets/icons/sms.png'
import user from '../../../assets/icons/user.png'
import call from '../../../assets/icons/call.png'
import arrow from '../../../assets/icons/arrowL.png'
import Button from '../../modules/Button';
import { useDispatch, useSelector } from 'react-redux';
import SplashImage from "../../../assets/splash/Splash2.png"
import { toastMsg } from '../../modules/Toast/index';
import DropDownPicker from 'react-native-dropdown-picker';
import { getEventLocation } from '../../../slices/eventSlice';
import { OtpSentSignUp } from '../../../slices/authSlice';
import Icon from "react-native-vector-icons/FontAwesome";

const Signup = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [id, setId] = useState(0);
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState(email);
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [numberError, setNumberError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [repeatPasswordError, setRepeatPasswordError] = useState('');

  const eventLocations = useSelector(state => state.event.eventLocation);
  const [selectedValue, setSelectedValue] = useState(null);
  const [openLocation, setOpenLocation] = useState(false);
  const [locationName, setLocationName] = useState([]);
  const [dropdownError, setDropdownError] = useState('');

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getEventLocation());
  }, []);
  const handleSignup = async () => {
    const isValid = validateFields();
    if (isValid) {
      setLoading(true);
      try {
        const response = await dispatch(OtpSentSignUp(email))
        console.warn('response', response.payload)
        let otpCode = response.payload.object.otp
        if (response.payload.isSuccess == true) {
          toastMsg(response.payload.message);
          navigation.navigate('OTPSignUp', { firstName, lastName, email, password, mobile, id, userName: email, siteId: selectedValue, otpCode });
        }
        else if (response.payload.message == 2) {
          toastMsg('This email is already exists')
        }
        else {
          toastMsg('This email is already exists')
        }
      } catch (error) {
        setError('Signup failed. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };
  const validateFields = () => {
    let isValid = true;

    if (!firstName.trim()) {
      setFirstNameError('Please enter your first name.');
      isValid = false;
    } else {
      setFirstNameError('');
    }

    if (!lastName.trim()) {
      setLastNameError('Please enter your last name.');
      isValid = false;
    } else {
      setLastNameError('');
    }
    if (!email.trim()) {
      setEmailError('Please enter your email.');
      isValid = false;
    } else if (!isValidEmail(email)) {
      setEmailError('Please enter a valid email address.');
      isValid = false;
    } else {
      setEmailError('');
    }
    if (!mobile.trim()) {
      setNumberError('Please enter your mobile number.');
      isValid = false;
    }
    else if (!isValidMobile(mobile)) {
      setNumberError('Please enter a valid mobile number.');
      isValid = false;
    }
    else {
      setNumberError('');
    }
    if (!password.trim()) {
      setPasswordError('Please enter your password.');
      isValid = false;
    } else if (password.length < 8) { // Minimum 8 characters
      setPasswordError('Password must be at least 8 characters long.');
      isValid = false;
    } else {
      setPasswordError('');
    }
    if (!confirmPassword.trim()) {
      setRepeatPasswordError('Please enter your confirm password.');
      isValid = false;
    } else if (password !== confirmPassword) {
      setRepeatPasswordError('Passwords do not match.');
      isValid = false;
    } else {
      setRepeatPasswordError('');
    }
    if (!selectedValue) {
      setDropdownError('Please select value from dropdown.');
      isValid = false;
    } else {
      setDropdownError('');
    }
    return isValid;
  };
  const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };
  const toggleRememberMe = () => {
    setRememberMe(!rememberMe);
  };
  const isValidMobile = (mobile) => {
    const mobileRegex = /^\d{10}$/; // 10 digits for US number
    return mobileRegex.test(mobile);
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={SplashImage} style={styles.image} resizeMode="cover" />
      <View style={styles.overlay}></View>
      <TouchableOpacity style={styles.arrow} onPress={() => navigation.goBack()}>
        <Image source={arrow} style={{ margin: 3 }} />
      </TouchableOpacity>
      <View style={styles.top}>
        <Text style={{ color: 'white', fontSize: 24, fontWeight: '600' }}>
          Register Now
        </Text>
        <Text style={{ color: 'white', fontSize: 16, fontWeight: '500', paddingTop: 10 }}>
          Create your new account.
        </Text>
      </View>

      <View style={styles.inputContainer}>
        <Image source={user} />
        <TextInput
          placeholder="First Name"
          placeholderTextColor="#353535"
          style={[styles.textInput, { width: '80%' }]} // Adjust the width as needed
          onChangeText={(text) => setFirstName(text)}
          value={firstName}
        />
      </View>
      {firstNameError ? <Text style={styles.errorText}>{firstNameError}</Text> : null}
      <View style={styles.inputContainer}>
        <Image source={user} />
        <TextInput
          placeholder="Last Name"
          placeholderTextColor="#353535"
          style={[styles.textInput, { width: '80%' }]} // Adjust the width as needed
          onChangeText={(text) => setLastName(text)}
          value={lastName}
        />
      </View>
      {lastNameError ? <Text style={styles.errorText}>{lastNameError}</Text> : null}

      <View style={styles.inputContainer}>
        <Image source={Sms} />
        <TextInput
          placeholder="Email"
          placeholderTextColor="#353535"
          style={[styles.textInput, { width: '80%' }]} // Adjust the width as needed
          onChangeText={(text) => setEmail(text)}
          value={email}
        />
      </View>
      {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

      <View style={styles.inputContainer}>
        <Image source={call} />
        <TextInput
          placeholder="Phone Number"
          placeholderTextColor="#353535"
          style={[styles.textInput, { width: '80%' }]} // Adjust the width as needed
          onChangeText={(text) => setMobile(text)}
          value={mobile}
          maxLength={10}
          keyboardType="numeric"

        />
      </View>
      {numberError ? <Text style={styles.errorText}>{numberError}</Text> : null}

      <View style={styles.inputContainer}>
        <Image source={Lock} />
        <TextInput
          placeholder="Password"
          placeholderTextColor="#353535"
          style={[styles.textInput, { width: '80%' }]} // Adjust the width as needed
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={!passwordVisible}
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

      <View style={styles.inputContainer}>
        <Image source={Lock} />
        <TextInput
          placeholder="Confirm Password"
          placeholderTextColor="#353535"
          style={[styles.textInput, { width: '80%' }]} // Adjust the width as needed
          onChangeText={(text) => setConfirmPassword(text)}
          secureTextEntry={!confirmPasswordVisible}
          value={confirmPassword}
        />
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
        >
          <Image source={Eye} />
        </TouchableOpacity>
      </View>
      {repeatPasswordError ? <Text style={styles.errorText}>{repeatPasswordError}</Text> : null}

      <View style={styles.dateView}>
        {eventLocations && (
          <DropDownPicker
            style={{ backgroundColor: '#FFF', borderColor: '#FFF', width: '95%' }}
            containerStyle={{ marginTop: 5 }}
            placeholderStyle={{ color: '#353535', fontSize: 16, fontWeight: '500' }}
            labelStyle={{ fontSize: 16, fontWeight: '500', color: '#353535', marginLeft: 5 }}
            textStyle={{ fontSize: 16, color: '#353535', marginLeft: 5 }}
            dropDownContainerStyle={{
              backgroundColor: '#FFF',
              borderColor: '#E4E4E4',
              width: 300,
              zIndex: 1
            }}
            arrowColor={'#353535'}
            open={openLocation}
            value={selectedValue}
            items={eventLocations.map(location => ({
              label: location.SiteName,
              value: location.SiteID
            }))}
            setOpen={setOpenLocation}
            setValue={setSelectedValue}
            setItems={setLocationName}
            placeholder={'Home Club'}
            dropDownDirection="TOP" // Set the dropdown direction to TOP

          />
        )}
      </View>
      {dropdownError ? <Text style={styles.errorText}>{dropdownError}</Text> : null}

      <TouchableOpacity style={styles.rememberMeContainer} onPress={toggleRememberMe}>
        <View style={[styles.radio, rememberMe && styles.radioSelected]}>
          {rememberMe && (
            <Icon color={"black"} name={"check"} size={19} />
          )}
        </View>
        <View style={styles.TextContainer}>
          <Text style={styles.checkboxLabel}>I agree to </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Term")}>
            <Text style={{ color: '#fff', textDecorationLine: 'underline' }}>
              Terms of Service
            </Text>
          </TouchableOpacity>
          <Text style={styles.checkboxLabel}> & </Text>
          <TouchableOpacity onPress={() => navigation.navigate('PrivacyPolicy')}>
            <Text style={{ color: '#fff', textDecorationLine: 'underline' }}>
              Privacy Policy
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>

      {loading ? (
        <Button title={<ActivityIndicator size="small" color="#ffff" />} />
      ) : (
        <Button style={{ zIndex: 0 }} title={'Sign Up'} onPress={handleSignup} />
      )}
      <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: 30, paddingBottom: 20 }}>
        <Text style={{ fontSize: 16, fontWeight: '500', color: 'white' }}>Already have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={{ fontSize: 16, fontWeight: '600', color: 'white' }}>  Sign In</Text>
        </TouchableOpacity>
      </View>
    </ScrollView >
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
  errorContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  arrow: {
    position: 'absolute', top: 35, left: 20, backgroundColor: '#fff', width: 32, height: 32, borderColor: 'white', borderWidth: 1, borderRadius: 10
  },
  dateView: {
    borderWidth: 1,
    borderRadius: 20,
    paddingLeft: 20,
    height: 64,
    marginTop: 15,
    width: '90%',
    backgroundColor: '#FFF',
    alignSelf: 'center',
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
    color: '#353535'
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
});

export default Signup;
