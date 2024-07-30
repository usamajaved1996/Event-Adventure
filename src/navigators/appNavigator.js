import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet, Image, StatusBar } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../ui/screens/Home/home';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import Profile from '../ui/screens/Profile';
import Menu from '../assets/icons/menu.png';
import Edit from '../assets/icons/edit.png';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { DrawerActions } from '@react-navigation/native';
import NotificationIcon from '../assets/icons/notification.png';
import LinearGradient from 'react-native-linear-gradient';
import HomeIcon from '../assets/icons/home.png';
import Logout from '../assets/icons/logout.png';
import ProfileIcon from '../assets/icons/profile.png';
import TripIcon from '../assets/icons/airplane.png';
import Event from '../assets/icons/menu2.png';
import arrow from '../assets/icons/arrowL.png'
import UserProfileImage from '../assets/icons/userProfile.png'
import Calender from '../ui/screens/Calender';
import Trip from '../ui/screens/Trip';
import Events from '../ui/screens/Events';
import Setting from '../ui/screens/Setting';
import SettingIcon from '../assets/icons/setting.png';
import CalenderIcon from '../assets/icons/calen.png'
import Notification from '../ui/screens/Notification';
import ChangePassword from '../ui/screens/ChangePassword';
import PrivacyPolicy from '../ui/screens/PrivacyPolicy';
import Faq from '../ui/screens/FAQ';
import TermandCondition from '../ui/screens/TermandCondition';
import Member from '../ui/screens/MemberHandbook';
import MemberDetail from '../ui/screens/MemberHandbook/members';
import EventDetail from '../ui/screens/MemberHandbook/eventsDetail';
import SportDetail from '../ui/screens/MemberHandbook/sportsDetail';
import Guideline from '../ui/screens/MemberHandbook/guideline';
import Browser from '../ui/screens/MemberHandbook/browser';
import DeleteAccount from '../ui/screens/DeleteAccount';
import LogoutModal from '../ui/modules/Modal';
import UpdateProfile from '../ui/screens/UpdateProfile';
import Detail from '../ui/screens/InnerScreens/index';
import DetailScreen from '../ui/screens/InnerScreens/detail';
import Register from '../ui/screens/InnerScreens/register';
import CarPool from '../ui/screens/InnerScreens/carPool';
import Photos from '../ui/screens/InnerScreens/photos';
import Map from '../ui/screens/InnerScreens/direction';
import Feedback from '../ui/screens/InnerScreens/feedback';
import Discussion from '../ui/screens/Discussion';
import PaymentScreen from '../ui/screens/Payment';
import Login from '../ui/screens/Login';
import UpdateProfileUser from '../ui/screens/UpdateProfileUser';
import { getProfile } from '../slices/profileSlice';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const drawerItemStyles = {
  drawerLabelStyle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  drawerActiveTintColor: 'white',
  drawerInactiveTintColor: 'white',
  drawerActiveBackgroundColor: 'transparent',
  drawerInactiveBackgroundColor: 'transparent',
  drawerItemStyle: {
    marginVertical: 13,
    marginLeft: 30
  },
};
const CustomDrawerContent = ({ props, onLogout }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const user = useSelector(state => state.auth.user);
  const profile = useSelector(state => state.profile.profileData);
  const showLogoutModal = () => {
    setLogoutModalVisible(true);
  };
  useEffect(() => {
    dispatch(getProfile(user.object.id)).then(() => setLoading(false));
  }, []);
  return (
    // <StatusBar backgroundColor="white" barStyle="dark-content" />
    <ImageBackground source={require('../assets/splash/Splash2.png')} style={styles.drawerBackground}>
      <View style={styles.overlay}></View>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <View style={styles.contentContainer}>
        <View style={{ flexDirection: 'row', width: '100%' }}>
          <TouchableOpacity
            style={styles.closeDrawerButton}
            onPress={() => navigation.dispatch(DrawerActions.closeDrawer())}
          >
            <Image source={arrow} style={{ margin: 3 }} />
          </TouchableOpacity>

          <View style={styles.header}>
            <View style={styles.info}>
              <Text style={styles.userName}>{profile ? `${profile.firstName}` : 'Loading...'}</Text>
              <Text style={styles.userNumber}>{profile ? profile.address : 'Loading...'}</Text>
              {/* <Text style={styles.userNumber}>867 Snowbird Lane</Text> */}
            </View>
            <Image source={profile && profile.photo ? { uri: profile.photo } : UserProfileImage} style={styles.avatar} />

            {/* <Image source={UserProfileImage} style={styles.avatar} /> */}
          </View>
        </View>

        <View style={{ borderWidth: 0.4, borderColor: 'rgba(255, 255, 255, 0.30)', width: '90%', alignSelf: 'center', marginTop: 20 }} />
        <DrawerContentScrollView {...props} contentContainerStyle={{ width: '100%' }}>
          <DrawerItemList {...props} {...drawerItemStyles} />
        </DrawerContentScrollView>
        <TouchableOpacity style={{ flexDirection: 'row', marginLeft: 30 }} onPress={showLogoutModal}>
          <Image source={Logout} />
          <Text style={{ color: 'white', padding: 2 }}> Log Out</Text>
        </TouchableOpacity>
        {logoutModalVisible && (
          <LogoutModal
            isVisible={true}
            onCancel={() => setLogoutModalVisible(false)}
            onLogout={onLogout}
          />
        )}
      </View>
    </ImageBackground>
  );
};

const AppDrawer = ({ onLogout }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.drawerContainer}>
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent props={props} onLogout={onLogout} />}
        drawerPosition="right"
        drawerType="front"
        overlayColor="transparent"
        // screenOptions={{ swipeEnabled: false }}
        screenOptions={{
          drawerStyle: {
            width: '100%'
          }
        }}
      >
        <Drawer.Screen
          name="Calendar"
          component={Home}
          options={{
            ...drawerItemStyles,
            headerStyle: { backgroundColor: '#fff' },
            headerTintColor: '#EC5D78',
            headerTitleAlign: 'center',
            drawerLabel: ({ focused, color }) => (
              <View style={styles.drawerItemContainer}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image source={HomeIcon} style={{ width: 20, height: 20 }} />
                  <Text style={{ marginLeft: 30, fontSize: 18, color: color, fontWeight: '600' }}>
                    Home
                  </Text>
                </View>
              </View>
            ),
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
                <Image source={Menu} style={{ marginLeft: 18, width: 20, height: 20 }} />
              </TouchableOpacity>
            ),
            headerRight: () => (
              <View style={styles.IconsMainContainer}>
                <TouchableOpacity style={styles.IconsContainer} onPress={() => navigation.navigate('Notification')}>
                  <Image source={NotificationIcon} style={styles.icon} />
                </TouchableOpacity>
              </View>
            )
          }}
        />
        <Drawer.Screen
          name="My Profile"
          component={Profile}
          options={{
            ...drawerItemStyles,
            headerStyle: { backgroundColor: '#fff' },
            headerTintColor: '#EC5D78',
            headerTitleAlign: 'center',
            drawerLabel: ({ focused, color }) => (
              <View style={styles.drawerItemContainer}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image source={ProfileIcon} style={{ width: 24, height: 24 }} />
                  <Text style={{ marginLeft: 30, fontSize: 18, color: color, fontWeight: '600' }}>
                    Profile
                  </Text>
                </View>
              </View>
            ),
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
                <Image source={Menu} style={{ marginLeft: 18, width: 20, height: 20 }} />
              </TouchableOpacity>
            ),
            headerRight: () => (
              <View style={styles.IconsMainContainer}>

                <TouchableOpacity style={styles.IconsContainer} onPress={() => navigation.navigate('UpdateProfile')}>
                  <Image source={Edit} style={styles.icon} />
                </TouchableOpacity>
              </View>
            )
          }}
        />
        <Drawer.Screen
          name="Event Calendar"
          component={Home}
          options={{
            ...drawerItemStyles,
            headerStyle: { backgroundColor: '#fff' },
            headerTintColor: '#EC5D78',
            headerTitleAlign: 'center',
            drawerLabel: ({ focused, color }) => (
              <View style={styles.drawerItemContainer}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image source={CalenderIcon} style={{ width: 24, height: 24 }} />
                  <Text style={{ marginLeft: 30, fontSize: 18, color: color, fontWeight: '600' }}>
                    Event Calender
                  </Text>
                </View>
              </View>
            ),
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
                <Image source={Menu} style={{ marginLeft: 18, width: 20, height: 20 }} />
              </TouchableOpacity>
            ),
            headerRight: () => (
              <View style={styles.IconsMainContainer}>
                <TouchableOpacity style={styles.IconsContainer} onPress={() => navigation.navigate('Notification')}>
                  <Image source={NotificationIcon} style={styles.icon} />
                </TouchableOpacity>
              </View>
            )
          }}
        />
        <Drawer.Screen
          name="Trips"
          component={Trip}
          options={{
            ...drawerItemStyles,
            headerStyle: { backgroundColor: '#fff' },
            headerTintColor: '#EC5D78',
            headerTitleAlign: 'center',
            drawerLabel: ({ focused, color }) => (
              <View style={styles.drawerItemContainer}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image source={TripIcon} style={{ width: 24, height: 24 }} />
                  <Text style={{ marginLeft: 30, fontSize: 18, color: color, fontWeight: '600' }}>
                    Trips
                  </Text>
                </View>
              </View>
            ),
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
                <Image source={Menu} style={{ marginLeft: 18, width: 20, height: 20 }} />
              </TouchableOpacity>
            ),
            headerRight: () => (
              <View style={styles.IconsMainContainer}>
                <TouchableOpacity style={styles.IconsContainer} onPress={() => navigation.navigate('Notification')}>
                  <Image source={NotificationIcon} style={styles.icon} />
                </TouchableOpacity>
              </View>
            )
          }}
        />
        <Drawer.Screen
          name="Joined Events"
          component={Events}
          options={{
            ...drawerItemStyles,
            headerStyle: { backgroundColor: '#fff' },
            headerTintColor: '#EC5D78',
            headerTitleAlign: 'center',
            drawerLabel: ({ focused, color }) => (
              <View style={styles.drawerItemContainer}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image source={Event} style={{ width: 24, height: 24 }} />
                  <Text style={{ marginLeft: 30, fontSize: 18, color: color, fontWeight: '600' }}>
                    Joined Events
                  </Text>
                </View>
              </View>
            ),
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
                <Image source={Menu} style={{ marginLeft: 18, width: 20, height: 20 }} />
              </TouchableOpacity>
            ),
            headerRight: () => (
              <View style={styles.IconsMainContainer}>
                <TouchableOpacity style={styles.IconsContainer} onPress={() => navigation.navigate('Notification')}>
                  <Image source={NotificationIcon} style={styles.icon} />
                </TouchableOpacity>
              </View>
            )
          }}
        />
        <Drawer.Screen
          name="Settings"
          component={Setting}
          options={{
            ...drawerItemStyles,
            headerStyle: { backgroundColor: '#fff' },
            headerTintColor: '#EC5D78',
            headerTitleAlign: 'center',
            drawerLabel: ({ focused, color }) => (
              <View style={styles.drawerItemContainer}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image source={SettingIcon} style={{ width: 24, height: 24 }} />
                  <Text style={{ marginLeft: 30, fontSize: 18, color: color, fontWeight: '600' }}>
                    Settings
                  </Text>
                </View>
              </View>
            ),
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
                <Image source={Menu} style={{ marginLeft: 18, width: 20, height: 20 }} />
              </TouchableOpacity>
            )
          }}
        />
      </Drawer.Navigator>
    </View>
  );
};
const AppNavigator = ({ onLogout }) => {

  return (
    <Stack.Navigator>
      {
        <Stack.Screen name="Dashboard" options={{ headerShown: false }}>
          {() => <AppDrawer onLogout={onLogout} />}
        </Stack.Screen>
      }
      <Stack.Screen name="Detail" component={Detail} options={{ headerShown: false }} />
      <Stack.Screen name="DetailScreen" component={DetailScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
      <Stack.Screen name="CarPool" component={CarPool} options={{ headerShown: false }} />
      <Stack.Screen name="Photos" component={Photos} options={{ headerShown: false }} />
      <Stack.Screen name="Map" component={Map} options={{ headerShown: false }} />
      <Stack.Screen name="Feedback" component={Feedback} options={{ headerShown: false }} />
      <Stack.Screen name="Discussion" component={Discussion} options={{ headerShown: false }} />

      <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} options={{ headerShown: false }} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} options={{ headerShown: false }} />
      <Stack.Screen name="Term" component={TermandCondition} options={{ headerShown: false }} />
      <Stack.Screen name="FAQ" component={Faq} options={{ headerShown: false }} />
      <Stack.Screen name="Member" component={Member} options={{ headerShown: false }} />
      <Stack.Screen name="MemberDetail" component={MemberDetail} options={{ headerShown: false }} />
      <Stack.Screen name="EventDetail" component={EventDetail} options={{ headerShown: false }} />
      <Stack.Screen name="Sport" component={SportDetail} options={{ headerShown: false }} />
      <Stack.Screen name="Guide" component={Guideline} options={{ headerShown: false }} />
      <Stack.Screen name="Browser" component={Browser} options={{ headerShown: false }} />
      <Stack.Screen name="DeleteAccount" component={DeleteAccount} options={{ headerShown: false }} />
      <Stack.Screen name="UpdateProfile" component={UpdateProfile} options={{ headerShown: false }} />
      <Stack.Screen name="UpdateProfileUser" component={UpdateProfileUser} options={{ headerShown: false }} />

      <Stack.Screen name="PaymentScreen" component={PaymentScreen} options={{ headerShown: false }} />

      <Stack.Screen name="Notification" component={Notification} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerContainer: {
    flex: 1,
    width: '100%', // Ensure the entire screen width
  },
  contentContainer: {
    paddingVertical: 40,
    paddingRight: 10,
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.6)' // Adjust opacity as needed
  },
  drawerBackground: {
    flex: 1,
    resizeMode: 'cover',
  },
  closeDrawerButton: {
    margin: 30,
    backgroundColor: '#fff',
    width: 35, height: 35,
    borderWidth: 1, borderColor: 'white', borderRadius: 12,
  },
  userContainer: {
    flexDirection: 'row',
    padding: 16,
    width: '100%'
  },
  userImageContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: 'hidden',
  },
  userProfileImageContainer: {
    width: 35,
    height: 35,
    borderRadius: 30,
    backgroundColor: 'lightgray',
    borderWidth: 2,
    borderColor: 'white',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10
  },
  userImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  userDetailsContainer: {
    paddingLeft: 10,
    flexDirection: 'row',
    width: '100%',
  },
  userName: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight:25
  },
  userNumber: {
    color: 'white',
    fontSize: 14,
  },
  logoutButton: {
    padding: 16,
    borderTopWidth: 1,
    borderColor: 'white',
    backgroundColor: 'white',
    borderBottomRightRadius: 30,
    borderTopRightRadius: 30,
    marginTop: 10,
    width: '80%',
    marginBottom: 10,
    // justifyContent: "center",
    gap: 5,
    alignItems: 'center',
    flexDirection: 'row'
  },
  logoutButtonText: {
    color: '#458F87',
    fontSize: 16,
    fontWeight: 'bold',
  },
  drawerStyles: {
    width: '100%',
    // backgroundColor: 'transparent',
  },
  IconsMainContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    marginRight: 20
  },
  IconsContainer: {
    backgroundColor: 'white', width: 40, height: 40, borderWidth: 1, borderRadius: 10, borderColor: '#BBB'
  },
  icon: {
    width: 24, height: 24, margin: 7
  },
  header: {
    marginTop: 0,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    position: 'absolute', right: 0
  },
  avatar: {
    width: 75,
    height: 75,
    borderRadius: 37,
  },
  info: {
    // alignContent: 'center'
  },
});

export default AppNavigator;
