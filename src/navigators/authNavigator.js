import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../ui/screens/Login';
import Signup from '../ui/screens/Signup';
import OTPForgot from '../ui/screens/ForgotOTPScreen';
import OTPSignUp from '../ui/screens/SignUpOTPScreen';
import Forgot from '../ui/screens/ForgotPassword';
import Reset from '../ui/screens/ResetPassword';
import Privacy from '../ui/screens/PrivacyPolicy';
import Term from '../ui/screens/TermandCondition';
import CreateProfile from '../ui/screens/CreateProfile';

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {

  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
      <Stack.Screen name="CreateProfile" component={CreateProfile} options={{ headerShown: false }} />
      <Stack.Screen name="Forgot" component={Forgot} options={{ headerShown: false }} />
      <Stack.Screen name="Reset" component={Reset} options={{ headerShown: false }} />
      <Stack.Screen name="OTP" component={OTPForgot} options={{ headerShown: false }} />
      <Stack.Screen name="OTPSignUp" component={OTPSignUp} options={{ headerShown: false }} />
      <Stack.Screen name="PrivacyPolicy" component={Privacy} options={{ headerShown: false }} />
      <Stack.Screen name="Term" component={Term} options={{ headerShown: false }} />

    </Stack.Navigator>
  );
};
export default AuthNavigator;
