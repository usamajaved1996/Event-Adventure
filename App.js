/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './src/navigators/authNavigator';
import AppNavigator from './src/navigators/appNavigator';
import SplashNavigator from './src/navigators/splashNavigator';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { clearUser, saveUser } from './src/slices/authSlice';

const App = () => {
  const [showSplash, setShowSplash] = useState(true);
  const user = useSelector(state => state.auth.user);
  useEffect(() => {
    setTimeout(() => {
      setShowSplash(false);
    }, 1500);
  });
  const dispatch = useDispatch();

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
  const saveUserDataToStorage = async (userData) => {
    try {
      const jsonUserData = JSON.stringify(userData);
      await AsyncStorage.setItem('userData', jsonUserData);
    } catch (error) {
      console.error('Error saving user data to AsyncStorage:', error);
    }
  };
  useEffect(() => {
    if (user) {
      saveUserDataToStorage(user);
    }
  }, [user]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const jsonUserData = await AsyncStorage.getItem('userData');
        if (jsonUserData) {
          const userData = JSON.parse(jsonUserData);
          dispatch(saveUser(userData));
        }
      } catch (error) {
        console.error('Error loading user data from AsyncStorage:', error);
      }
    };
    fetchData();
  }, []);
  return (
    <NavigationContainer>
      {
        showSplash
          ? (
            <SplashNavigator />
          ) : (user) ? (
            <AppNavigator onLogout={clearUserDataFromStorage} />
          ) : (
            <AuthNavigator />
          )}
    </NavigationContainer>
  );
};

export default App;
