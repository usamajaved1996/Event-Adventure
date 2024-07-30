import React, { useEffect, useState } from 'react';
import { StyleSheet, TextInput, View, Text, TouchableOpacity, Image, ActivityIndicator, Keyboard } from 'react-native'; // Import Keyboard
import Sms from '../../../assets/icons/sms.png'
import arrow from '../../../assets/icons/arrowL.png'
import Button from '../../modules/Button';
import SplashImage from "../../../assets/splash/Splash2.png"
import { toastMsg } from '../../modules/Toast';
import { forgotPassword } from '../../../slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';

const Forgot = ({ navigation }) => {
    const [loading, setIsLoading] = useState(false);
    const [userName, setUserName] = useState('');
    const [userNameError, setUserNameError] = useState('');
    const dispatch = useDispatch();

    const handleBackPress = () => {
        navigation.goBack();
    };
    const handleEmailChange = (text) => {
        setUserName(text);
    };
    const validateFields = () => {
        let isValid = true;
        if (!userName.trim()) {
            setUserNameError('Please enter your email.');
            isValid = false;
        } else {
            setUserNameError('');
        }
        return isValid;
    };
    const onSubmit = async () => {
        if (validateFields()) {
            setIsLoading(true);
            try {
                const response = await dispatch(forgotPassword({ userName }));
                if (response.payload.statusCode == 200) {
                    toastMsg(response.payload.message);
                    navigation.navigate('OTP', { userName });
                } else if (response.payload.statusCode == 2) {
                    toastMsg(response.payload.message);
                }
                else {
                    toastMsg(response.error.message);
                }
            } catch (error) {
                console.error('err', error)
            }
            setIsLoading(false);
            Keyboard.dismiss(); // Close keyboard after submitting
        }
    };
    return (
        <View style={styles.container}>
            <Image source={SplashImage} style={styles.image} resizeMode="cover" />
            <View style={styles.overlay}></View>
            <TouchableOpacity style={styles.arrow} onPress={handleBackPress}>
                <Image source={arrow} style={{ margin: 3 }} />
            </TouchableOpacity>
            <View style={styles.top}>
                <Text style={{ color: 'white', fontSize: 24, fontWeight: '600' }}>
                    Forgot Password
                </Text>
                <Text style={{ color: 'white', fontSize: 16, fontWeight: '500', paddingTop: 10 }}>
                    Please enter your email.
                </Text>
            </View>
            <View style={styles.inputContainer}>
                <Image source={Sms} />
                <TextInput
                    placeholder="Email"
                    placeholderTextColor="#353535"
                    style={[styles.textInput, { width: '80%' }]} // Adjust the width as needed
                    onChangeText={handleEmailChange}
                    type="email"
                    value={userName}
                />
            </View>
            {userNameError ? <Text style={styles.errorText}>{userNameError}</Text> : null}

            {loading == true ? (
                <Button title={<ActivityIndicator size="small" color="#ffff" />} />
            ) : (
                <Button title={'Confirm'} onPress={onSubmit} />
            )}
        </View>
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
    top: {
        marginTop: '16%',
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
    arrow: {
        position: 'absolute', top: 35, left: 20, backgroundColor: '#fff', width: 32, height: 32, borderColor: 'white', borderWidth: 1, borderRadius: 10

    },
    errorText: {
        paddingTop: 8, paddingLeft: 25, color: "#f75959"
    },
});
export default Forgot;
