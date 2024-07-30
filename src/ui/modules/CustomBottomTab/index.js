import React from 'react';
import { View, TouchableOpacity, StyleSheet, Image, Text,Dimensions } from 'react-native';
import UserIcon from '../../../assets/icons/user.png';
import CheckIcon from '../../../assets/icons/check.png';
import SearchIcon from '../../../assets/icons/search.png';
import CouponsIcon from '../../../assets/icons/coupons.png';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

const CustomTabBar = () => {
    const navigation = useNavigation();
    const stats = useSelector((state) => state.coupon.couponStats);

    const data = stats?.data
    return (
        <View style={styles.tabBarContainer}>
            {/* Profile Tab */}
            <TouchableOpacity
                style={styles.tabItem}
                onPress={() => navigation.navigate("MyCoupons")}
            >
                <Image source={CouponsIcon} />

                <Text style={styles.names}>My Coupons</Text>
            </TouchableOpacity>

            {/* Search Icon (centered) */}
            <View style={styles.centerTabItem}>
                <TouchableOpacity
                    style={styles.centerTabButton}
                    onPress={() => navigation.navigate('AroundMe')}
                >
                    <Image source={SearchIcon} />
                </TouchableOpacity>
            </View>

            {/* My Coupons Tab */}
            <TouchableOpacity
                style={styles.tabItem}
                onPress={() => navigation.navigate('Profile')}
            >
                <Image source={UserIcon} />

                <Text  style={styles.names}>Profile</Text>

            </TouchableOpacity>
        </View>
    );
};
const screenHeight = Dimensions.get('window').height;
const smallScreenThreshold = 759; // Adjust this value as needed

const containerStyle = screenHeight <= smallScreenThreshold;
const styles = StyleSheet.create({
    tabBarContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#125E62',
        paddingHorizontal: 16,
        paddingVertical: containerStyle? 10:27,
        position:'absolute',
        bottom:0
    },
    tabItem: {
        flex: 1,
        alignItems: 'center',
    },
    centerTabItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        marginTop: -60, // Adjust this value for the desired overlap
    },
    centerTabButton: {
        backgroundColor: '#125E62',
        width: containerStyle? 70:80,
        height:containerStyle? 70:80,
        borderRadius: 100,
        borderWidth:8,
        borderColor:'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    names :{
        fontSize: 12,
        fontWeight:'400',
        color:'white',
        marginTop:5
    }
});

export default CustomTabBar;
