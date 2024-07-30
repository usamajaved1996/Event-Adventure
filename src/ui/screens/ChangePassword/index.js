import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Text, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Lock from '../../../assets/icons/unlock.png'
import Button from '../../modules/Button';
import Eye from '../../../assets/icons/eyeBlack.png';
import Header from "../../modules/header/header";
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword, clearUser } from '../../../slices/authSlice';
import { toastMsg } from '../../modules/Toast/index';


const ChangePassword = ({ navigation }) => {
    const [loading, setIsLoading] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [currentPasswordVisible, setCurrentPasswordVisible] = useState(false);
    const [confrimPasswordVisible, setConfirmPasswordVisible] = useState(false);

    const [oldPassword, setOldPassword] = useState('');
    const [oldPasswordError, setOldPasswordError] = useState('');

    const [newPassword, setNewPassword] = useState('');
    const [newPasswordError, setNewPasswordError] = useState('');

    const [confirmPassword, setConfirmPassword] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

    const dispatch = useDispatch();

    const user = useSelector(state => state.auth.user);

    const validateFields = () => {
        let isValid = true;

        if (!oldPassword.trim()) {
            setOldPasswordError('Please enter your old password.');
            isValid = false;
        }
        else if (oldPassword.length < 8) { // Change '>' to '<'
            setOldPasswordError('Password must be at least 8 characters long.');
            isValid = false;
        } else {
            setOldPasswordError('');
        }
        if (!newPassword.trim()) {
            setNewPasswordError('Please enter your new password.');
            isValid = false;
        } else if (newPassword.length < 8) { // Change '>' to '<'
            setNewPasswordError('Password must be at least 8 characters long.');
            isValid = false;
        } else {
            setNewPasswordError('');
        }
        if (!confirmPassword.trim()) {
            setConfirmPasswordError('Please enter your confirm password.');
            isValid = false;
        } else if (confirmPassword.length < 8) { // Change '>' to '<'
            setConfirmPasswordError('Password must be at least 8 characters long.');
            isValid = false;
        } else if (newPassword !== confirmPassword) {
            setConfirmPasswordError('Passwords do not match.');
            isValid = false;
        } else {
            setConfirmPasswordError('');
        }

        return isValid;
    };

    const clearUserDataFromStorage = async () => {
        try {
            await AsyncStorage.removeItem('userData');
            // await auth().signOut().then((res) => console.log("test", res)).catch((e) => {
            //   console.log("error signout", e)
            // })
            await dispatch(clearUser());
        } catch (error) {
            console.error('Error clearing user data from AsyncStorage:', error);
        }
    };
    const onResetPassword = async () => {
        if (validateFields()) {
            setIsLoading(true);
            try {
                const response = await dispatch(resetPassword({ email: user.object.email, currentPassword: oldPassword, newPassword: newPassword }));
                console.warn('response.payload', response.payload)

                if (response.payload.statusCode == 200) {
                    toastMsg(response.payload.message);
                    clearUserDataFromStorage();
                } else if (response.payload.statusCode == 401) {
                    toastMsg(response.payload.message);
                }
                else {
                    toastMsg(response.payload.message);
                }
            } catch (error) {
                console.error('err', error)
            }
            setIsLoading(false);
        }
        else{
            setIsLoading(false);
        }
    };
    return (
        <View style={styles.container}>
            <Header title={'Change Password'} />
            <View style={styles.inputContainer}>
                <Image source={Lock} />
                <TextInput
                    placeholder="Current Password"
                    placeholderTextColor="#000"
                    style={[styles.textInput, { width: '80%' }]} // Adjust the width as needed
                    secureTextEntry={!passwordVisible}
                    value={oldPassword}
                    onChangeText={(text) => setOldPassword(text)}
                />
                <TouchableOpacity
                    style={styles.eyeIcon}
                    onPress={() => setPasswordVisible(!passwordVisible)}
                >
                    <Image source={Eye} />
                </TouchableOpacity>
            </View>
            {oldPasswordError ? <Text style={styles.errorText}>{oldPasswordError}</Text> : null}

            <View style={styles.inputContainer}>
                <Image source={Lock} />
                <TextInput
                    placeholder="New Password"
                    placeholderTextColor="#000"
                    style={[styles.textInput, { width: '80%' }]} // Adjust the width as needed
                    secureTextEntry={!currentPasswordVisible}
                    value={newPassword}
                    onChangeText={(text) => setNewPassword(text)}
                />
                <TouchableOpacity
                    style={styles.eyeIcon}
                    onPress={() => setCurrentPasswordVisible(!currentPasswordVisible)}
                >
                    <Image source={Eye} />
                </TouchableOpacity>
            </View>
            {newPasswordError ? <Text style={styles.errorText}>{newPasswordError}</Text> : null}

            <View style={styles.inputContainer}>
                <Image source={Lock} />
                <TextInput
                    placeholder="Confirm Password"
                    placeholderTextColor="#000"
                    style={[styles.textInput, { width: '80%' }]} // Adjust the width as needed
                    secureTextEntry={!confrimPasswordVisible}
                    value={confirmPassword}
                    onChangeText={(text) => setConfirmPassword(text)}
                />
                <TouchableOpacity
                    style={styles.eyeIcon}
                    onPress={() => setConfirmPasswordVisible(!confrimPasswordVisible)}
                >
                    <Image source={Eye} />
                </TouchableOpacity>
            </View>
            {confirmPasswordError ? <Text style={styles.errorText}>{confirmPasswordError}</Text> : null}

            {loading == true ? (
                    <Button title={<ActivityIndicator size="small" color="#ffff" />} />
                ) : (
                    <TouchableOpacity
                    style={styles.button}
                    onPress={onResetPassword}
                >
                    <Text style={styles.buttonText}>Change Password</Text>
                </TouchableOpacity>
                )}
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: 'white'
    },
    top: {
        marginTop: '14%',
        alignItems: 'center',
        marginBottom: 20,
    },
    textInput: {
        color: '#000',
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
        backgroundColor: '#E4E4E4',
        alignSelf: 'center',
    },
    eyeIcon: {
        position: 'absolute',
        right: 20,
    },
    button: {
        width: '85%',
        height: 64,
        borderRadius: 20,
        backgroundColor: '#EC5D78',
        color: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
        alignSelf: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    errorText: {
        paddingTop: 8, paddingLeft: 25, color: "#f75959"
    },
});
export default ChangePassword;
