import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Platform } from 'react-native';

const Button = ({ onPress, isDisabled, title, isDelete }) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        isDisabled && styles.disabledButton,
        isDelete && styles.isDelete,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
      disabled={isDisabled}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '90%',
    height: 64,
    borderRadius: 20,
    backgroundColor: '#EC5D78',
    color: '#fff',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.16,
        shadowRadius: 24,
      },
      android: {
        elevation: 8,
      },
    }),
    display: 'flex',
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
  disabledButton: {
    opacity: 0.7,
  },
  isDelete: {
    backgroundColor: 'red',
  },
});

export default Button;
