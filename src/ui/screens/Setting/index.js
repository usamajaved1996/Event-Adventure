import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Modal, Image, Switch, Button } from 'react-native';
import Arrow from '../../../assets/icons/settingArrow.png';
import DeleteModal from '../../modules/Modal/deleteModal'

export default Setting = ({ navigation }) => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const handleDelete = () => {
    // Perform any deletion logic here
    // For example, you can navigate to a new screen
    navigation.navigate('DeleteAccount');
  };
  return (
    <View style={styles.mainContainer}>
      <ScrollView>
        <TouchableOpacity style={styles.topView}>
          <View style={styles.notificationToggle}>
            <Text style={{ fontSize: 16, fontWeight: '500', color: '#353535' }}>Notifications</Text>
            <Switch
              trackColor={{ false: "#767577", true: "#9F9F9F" }}
              thumbColor={notificationsEnabled ? "#89ED99" : "grey"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() => setNotificationsEnabled(!notificationsEnabled)}
              value={notificationsEnabled}
            />
          </View>
        </TouchableOpacity>

        <View style={{ width: '90%', alignContent: 'center', alignSelf: 'center', borderWidth: 0.8, borderColor: '#F6F6F6', marginTop: 20 }} />

        <View style={styles.notificationHeading}>
          <Text style={{ fontSize: 20, fontWeight: '400', color: '#353535' }}>General Settings</Text>
        </View>
        <TouchableOpacity style={styles.SettingView} onPress={() => navigation.navigate('ChangePassword')}>
          <View style={styles.midView}>
            <Text style={{ fontSize: 16, fontWeight: '500', color: '#353535' }}>Change Password</Text>
          </View>
          <TouchableOpacity style={{ paddingTop: 19 }}>
            <Image source={Arrow} style={styles.arrowImg} />
          </TouchableOpacity>
        </TouchableOpacity>

        <TouchableOpacity style={styles.SettingView} onPress={() => navigation.navigate('Member')}>
          <View style={styles.midView}>
            <Text style={{ fontSize: 16, fontWeight: '500', color: '#353535' }}>Member Handbook</Text>
          </View>
          <TouchableOpacity style={{ paddingTop: 19 }}>
            <Image source={Arrow} style={styles.arrowImg} />
          </TouchableOpacity>
        </TouchableOpacity>

        <TouchableOpacity style={styles.SettingView} onPress={() => navigation.navigate('Term')}>
          <View style={styles.midView}>
            <Text style={{ fontSize: 16, fontWeight: '500', color: '#353535' }}>Terms & Conditions</Text>
          </View>
          <TouchableOpacity style={{ paddingTop: 19 }}>
            <Image source={Arrow} style={styles.arrowImg} />
          </TouchableOpacity>
        </TouchableOpacity>

        <TouchableOpacity style={styles.SettingView} onPress={() => navigation.navigate('PrivacyPolicy')}>
          <View style={styles.midView}>
            <Text style={{ fontSize: 16, fontWeight: '500', color: '#353535' }}>Privacy Policy</Text>
          </View>
          <TouchableOpacity style={{ paddingTop: 19 }}>
            <Image source={Arrow} style={styles.arrowImg} />
          </TouchableOpacity>
        </TouchableOpacity>

        <TouchableOpacity style={styles.SettingView} onPress={() => navigation.navigate('FAQ')}>
          <View style={styles.midView}>
            <Text style={{ fontSize: 16, fontWeight: '500', color: '#353535' }}>Frequently Asked Question (FAQs)</Text>
          </View>
          <TouchableOpacity style={{ paddingTop: 19 }}>
            <Image source={Arrow} style={styles.arrowImg} />
          </TouchableOpacity>
        </TouchableOpacity>

        <TouchableOpacity style={styles.SettingView2} onPress={() => setDeleteModalVisible(true)}>
          <View style={styles.midView}>
            <Text style={{ fontSize: 16, fontWeight: '600', color: '#353535', textAlign: 'center' }}>Delete Account</Text>
          </View>
        </TouchableOpacity>
        {isDeleteModalVisible && (
          <DeleteModal
            isVisible={true}
            onCancel={() => setDeleteModalVisible(false)}
            onDelete={handleDelete}
          />
        )}
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    flexGrow: 1,
    backgroundColor: 'white', // Add this line to set the background color
    paddingTop: 20

  },
  backBtn: {
    flexDirection: 'row',
    paddingLeft: 25
  },
  imgBack: {
    marginTop: 5,
    marginRight: 5,
  },
  backText: {
    paddingTop: 2, color: 'black'
  },
  notificationHeading: {
    marginTop: 40,
    paddingLeft: 28
  },
  SettingView: {
    backgroundColor: '#FFF',
    width: '87%',
    height: 60,
    borderColor: '#BBB',
    borderWidth: 1,
    borderRadius: 20,
    alignSelf: 'center',
    marginTop: 20,
    flexDirection: 'row'
  },
  SettingView2: {
    backgroundColor: '#FFF',
    width: '80%',
    height: 60,
    borderColor: '#BBB',
    borderWidth: 1,
    borderRadius: 20,
    alignSelf: 'center',
    marginTop: 45,
    flexDirection: 'row'
  },
  Icon: {
    padding: 9,
    // width: '24%'
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 25,
  },
  midView: {
    paddingTop: 19,
    width: '90%',
    paddingLeft: 30
  },
  arrowImg: {
    width: 20,
    height: 20,
  },
  topView: {
    backgroundColor: '#E4E4E4', width: '87%', alignSelf: 'center', height: 60, borderColor: '#BBB',
    borderWidth: 1,
    borderRadius: 20,
  },
  notificationToggle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 15,
  },
});