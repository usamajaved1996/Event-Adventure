import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useNavigation } from '@react-navigation/native';
import Arrow from '../../../assets/icons/arrowL.png'

const Header = ({ title }) => {
  const navigation = useNavigation();
  const titleLengthThreshold = 20;

  return (
    <View style={{ backgroundColor: 'white', paddingLeft: 20, paddingTop: 15, flexDirection: 'row' , paddingBottom:10}}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={{ backgroundColor: 'white', width: 32, height: 32, borderWidth: 1, borderRadius: 10, borderColor: '#BBB', }}>
        <Image source={Arrow} style={{ width: 24, height: 24, margin: 3 }} />
      </TouchableOpacity>
      <Text style={{ color: '#EC5D78', fontSize: 20, marginLeft: title.length > titleLengthThreshold ? 30 : 80, textAlign: 'center', fontWeight: '600' }}>{title}</Text>
    </View>
  );
};
export default Header;
