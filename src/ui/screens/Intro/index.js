import React from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
} from 'react-native';

const windowWidth = Dimensions.get('window').width;

const Intro = ({navigation}) => {
  const onPress = () => {
    navigation.navigate('Login');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.description}>
          Check in to your favorite places, share your post on your social media
          and receive instant coupons!
        </Text>
        <Pressable style={styles.button} onPress={onPress}>
          <Text style={styles.buttonText}>Get Started</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  description: {
    width: windowWidth - 40,
    marginBottom: 15,
    textAlign: 'center',
    color: '#000000',
    fontSize: 11,
  },
  button: {
    width: windowWidth - 40,
    height: 48,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: '#D7D7D7',
    backgroundColor: '#02676C',
    color: '#fff',
    shadowColor: '#00000012',
    shadowOpacity: 0.27,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default Intro;
