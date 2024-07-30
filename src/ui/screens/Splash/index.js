import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import Logo from "../../../assets/splash/logo.png";
import SplashImage from "../../../assets/splash/Splash2.png";

const Splash = () => {
  return (
    <View style={styles.container}>
      {/* Splash Image */}
      <Image source={SplashImage} style={styles.image} resizeMode="cover" />

      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image source={Logo} style={styles.logo} resizeMode="contain" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  logoContainer: {
    position: 'absolute',
    // justifyContent: 'center',
    // alignItems: 'center',
    marginTop:0
  },
  logo: {
    width: 240,  // Adjust width and height as per your logo size
    height: 240,
  },
});

export default Splash;
