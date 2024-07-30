import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, TextInput, View, Text, TouchableOpacity, Image, ScrollView, ActivityIndicator } from 'react-native';
import arrow from '../../../assets/icons/arrowL.png'
import Button from '../../modules/Button';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import SplashImage from "../../../assets/splash/Splash2.png"
import { signUp, OtpSentSignUp } from '../../../slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toastMsg } from '../../modules/Toast';

const OTP = ({ route, navigation }) => {
    const { firstName, lastName, email, password, mobile, id, userName, siteId, otpCode } = route.params;
    // console.warn('route data', firstName, lastName, email, password, mobile, id, userName, siteId)
    const [otpCheck, setOtpCheck] = useState(otpCode);
    const [loading, setIsLoading] = useState(false);
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [timerKey, setTimerKey] = useState(0);
    const [otpError, setOtpError] = useState(['', '', '', '', '', '']);
    const dispatch = useDispatch();
    const [focusIndex, setFocusIndex] = useState(0);
    const [isTimerActive, setIsTimerActive] = useState(true); // State to track timer activation
    const otpInputRefs = [
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null)
    ];
    useEffect(() => {
        if (otpInputRefs[focusIndex] && otpInputRefs[focusIndex].current) {
            otpInputRefs[focusIndex].current.focus();
        }
    }, [focusIndex]);

    const handleOtpChange = (index, value) => {
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value !== '') {
            if (index < otp.length - 1) {
                setFocusIndex(index + 1);
            }
        } else {
            if (index !== 0) {
                setFocusIndex(index - 1);
            }
        }
    };

    const validateFields = () => {
        let isValid = true;
        if (!userName.trim()) {
            setOtpError('Please enter your OTP code.');
            isValid = false;
        } else {
            setOtpError('');
        }
        return isValid;
    };

    const onSubmitOtp = async () => {
        if (validateFields()) {
            setIsLoading(true);
            try {
                const otpCodeParse = otp.join('');
                console.warn('otpCodeParse == otpCode', otpCodeParse, otpCheck)
                if (otpCodeParse == otpCheck) {
                    const response = await dispatch(signUp({ firstName, lastName, email, password, mobile, id, userName, siteId }));
                    let userId = response.payload.object.id;
                    console.warn('userId', userId)
                    if (response.payload) {
                        toastMsg(response.payload.message);
                        navigation.navigate('CreateProfile', { firstName, lastName, email, password, mobile, userName, userId });
                    } else if (response.error.message == 'AxiosError: Request failed with status code 409') {
                        toastMsg('Email is already exist')
                    }
                    else {
                        toastMsg(response.error.message);
                    }
                }
                else {
                    toastMsg('Code is incorrect');
                }

            } catch (error) {
                console.error('err', error)
            }
            setIsLoading(false);
        }
    };

    const resentOtp = async () => {
        if (validateFields()) {
            setIsLoading(true);
            try {
                setOtp(['', '', '', '', '', '']); // Clear OTP fields
                setFocusIndex(0); // Reset focus to the first OTP input
                setIsTimerActive(true); // Activate the timer
                const response = await dispatch(OtpSentSignUp(email));
                let newOtp = response.payload.object.otp
                if (response.payload.statusCode == 200) {
                    setOtpCheck(newOtp)
                    toastMsg("OTP resent successfully");
                } else if (response.payload.statusCode == 2) {
                    toastMsg(response.payload.message);
                }
                else {
                    toastMsg(response.error.message);
                }
                setTimerKey(prevKey => prevKey + 1);
            } catch (error) {
                console.error('err', error)
            }
            setIsLoading(false);
        }
    };

    const handleBackPress = () => {
        navigation.goBack();
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
                    One Time Password
                </Text>
                <Text style={{ color: 'white', fontSize: 16, fontWeight: '500', paddingTop: 10, width: '80%', textAlign: 'center' }}>
                    We have sent you an email containing.
                </Text>
                <Text style={{ color: 'white', fontSize: 16, fontWeight: '500', width: '80%' }}>
                    6 digits verification code. Please enter the
                </Text>
                <Text style={{ color: 'white', fontSize: 16, fontWeight: '500', width: '80%', textAlign: 'center' }}>
                    code to verify your identity.
                </Text>
            </View>
            <View style={styles.otpContainer}>
                {otp.map((digit, index) => (
                    <TextInput
                        key={`otp_${index}`}
                        ref={otpInputRefs[index]}
                        style={styles.otpInput}
                        value={digit}
                        maxLength={1}
                        keyboardType="numeric"
                        onChangeText={(value) => handleOtpChange(index, value)}
                    />
                ))}
            </View>
            {otpError ? <Text style={styles.errorText}>{otpError}</Text> : null}

            <View style={styles.counter}>
                <View style={{ overflow: 'hidden', borderRadius: 100, backgroundColor: 'white', padding: 0 }}>
                    <CountdownCircleTimer
                        key={timerKey}
                        isPlaying={isTimerActive} // Pass isTimerActive state to the isPlaying prop
                        duration={60}
                        colorsTime={[7, 5, 2, 0]}
                        trailColor="#fff"
                        rotation="counterclockwise"
                        colors={['#EC5D78', '#EC5D78', '#EC5D78', '#EC5D78']}
                        onComplete={() => setIsTimerActive(false)} // Set isTimerActive to false when timer completes
                    >
                        {({ remainingTime }) => <Text style={{ color: '#EC5D78', fontSize: 32 }}>00:{remainingTime}</Text>}
                    </CountdownCircleTimer>
                </View>
            </View>

            {loading == true ? (
                <Button title={<ActivityIndicator size="small" color="#ffff" />} />
            ) : (
                <Button title={'Verify'} onPress={onSubmitOtp} />
            )}
            <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: 30 }}>
                <Text style={{ fontSize: 16, fontWeight: '500', color: 'white' }}>Code didn’t receive?</Text>
                <TouchableOpacity onPress={resentOtp} disabled={isTimerActive}>
                    <Text style={{ fontSize: 16, fontWeight: '600', color: 'white', opacity: isTimerActive ? 0.5 : 1 }}>  Resend</Text>
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
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.6)'
    },
    top: {
        marginTop: '16%',
        alignItems: 'center',
        marginBottom: 20,
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
        backgroundColor: '#E9978D',
        alignSelf: 'center',
    },
    arrow: {
        position: 'absolute', top: 35, left: 20, backgroundColor: '#fff', width: 32, height: 32, borderColor: 'white', borderWidth: 1, borderRadius: 10
    },
    counter: {
        alignSelf: 'center',
        marginTop: '30%',
        marginBottom: '10%'
    },
    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 40,
    },
    otpInput: {
        width: 45,
        height: 45,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#fff',
        marginHorizontal: 9,
        textAlign: 'center',
        fontSize: 20,
        backgroundColor: '#fff',
        color: 'red'
    },
    errorText: {
        paddingTop: 8, paddingLeft: 25, color: "#f75959"
    },
});

export default OTP;
