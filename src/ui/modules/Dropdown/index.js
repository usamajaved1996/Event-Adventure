// Dropdown.js

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Dropdown = ({ options, onSelect }) => {
  return (
    <View style={styles.container}>
      {options.map(option => (
        <TouchableOpacity key={option.siteID} onPress={() => onSelect(option)}>
          <Text style={styles.optionText}>{option.SiteName}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  optionText: {
    fontSize: 16,
    paddingVertical: 5,
  },
});

export default Dropdown;
