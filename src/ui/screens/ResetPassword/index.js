import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Text, TouchableOpacity, Image, ScrollView, ActivityIndicator } from 'react-native';
import Lock from '../../../assets/icons/lock.png'
import arrow from '../../../assets/icons/arrowL.png'
import Button from '../../modules/Button';
import Eye from '../../../assets/icons/eye.png';
import SplashImage from "../../../assets/splash/Splash2.png"
import { changePassword } from '../../../slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toastMsg } from '../../modules/Toast';

const Reset = ({ navigation, route }) => {
    const { userName, otpCodeParse } = route.params; // Accessing userName directly from route.params
    const [loading, setIsLoading] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const dispatch = useDispatch();

    const handleBackPress = () => {
        navigation.goBack();
    };
    const validateFields = () => {
        let isValid = true;

        if (!password.trim()) {
            setPasswordError('Please enter your password.');
            isValid = false;
        } else if (password.length < 8) {
            setPasswordError('Password must be at least 8 characters long.');
            isValid = false;
        } else {
            setPasswordError('');
        }

        if (!confirmPassword.trim()) {
            setConfirmPasswordError('Please enter your confirm password.');
            isValid = false;
        } else if (password !== confirmPassword) {
            setConfirmPasswordError('Passwords do not match.');
            isValid = false;
        } else {
            setConfirmPasswordError('');
        }

        return isValid;
    };

    const onSubmit = async () => {
        if (validateFields()) {
            setIsLoading(true);
            try {
                const response = await dispatch(changePassword({ userName, otpCodeParse, password }));
                if (response.payload.statusCode == 200) {
                    toastMsg(response.payload.message);
                    navigation.navigate('Login')
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
        }
    };
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Image source={SplashImage} style={styles.image} resizeMode="cover" />
            <View style={styles.overlay}></View>
            <TouchableOpacity style={styles.arrow} onPress={handleBackPress}>
                <Image source={arrow} style={{ margin: 3 }} />
            </TouchableOpacity>
            <View style={styles.top}>
                <Text style={{ color: 'white', fontSize: 24, fontWeight: '600' }}>
                    Reset Password
                </Text>
                <Text style={{ color: 'white', fontSize: 16, fontWeight: '500', paddingTop: 10 }}>
                    Please enter your new password.
                </Text>
            </View>
            <View style={styles.inputContainer}>
                <Image source={Lock} />
                <TextInput
                    placeholder="New Password"
                    placeholderTextColor="#353535"
                    style={[styles.textInput, { width: '80%' }]} // Adjust the width as needed
                    secureTextEntry={!passwordVisible}
                    value={password}
                    onChangeText={(text) => setPassword(text)}
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
                    secureTextEntry={!confirmPasswordVisible}
                    value={confirmPassword}
                    onChangeText={(text) => setConfirmPassword(text)}
                />
                <TouchableOpacity
                    style={styles.eyeIcon}
                    onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                >
                    <Image source={Eye} />
                </TouchableOpacity>
            </View>
            {confirmPasswordError ? <Text style={styles.errorText}>{confirmPasswordError}</Text> : null}

            {loading == true ? (
                <Button title={<ActivityIndicator size="small" color="#ffff" />} />
            ) : (
                <Button title={'Confirm'} onPress={onSubmit} />
            )}
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
    arrow: {
        position: 'absolute', top: 35, left: 20, backgroundColor: '#fff', width: 32, height: 32, borderColor: 'white', borderWidth: 1, borderRadius: 10
    },
    errorText: {
        paddingTop: 8, paddingLeft: 25, color: "#f75959"
    },
});
export default Reset;
