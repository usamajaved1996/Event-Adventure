import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, SafeAreaView, Image, Switch } from 'react-native';
import Arrow from '../../../assets/icons/settingArrow.png';
import Header from '../../modules/header/header';

export default Member = ({ navigation }) => {

    return (
        <View style={styles.mainContainer}>

            <Header title={'Member Handbook'} />

            <View style={{ width: '90%', alignContent: 'center', alignSelf: 'center', borderWidth: 0.8, borderColor: '#F6F6F6', marginTop: 20, marginBottom: 10 }} />

            <TouchableOpacity style={styles.SettingView} onPress={() => navigation.navigate('MemberDetail')}>
                <View style={styles.midView}>
                    <Text style={{ fontSize: 16, fontWeight: '500', color: '#353535' }}>25 Tips For New Members</Text>
                </View>
                <Image source={Arrow} style={styles.arrowImg} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.SettingView} onPress={() => navigation.navigate('EventDetail')}>
                <View style={styles.midView}>
                    <Text style={{ fontSize: 16, fontWeight: '500', color: '#353535' }}>Events</Text>
                </View>
                <Image source={Arrow} style={styles.arrowImg} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.SettingView} onPress={() => navigation.navigate('Sport')}>
                <View style={styles.midView}>
                    <Text style={{ fontSize: 16, fontWeight: '500', color: '#353535' }}>Sports</Text>
                </View>
                <Image source={Arrow} style={styles.arrowImg} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.SettingView} onPress={() => navigation.navigate('Guide')}>
                <View style={styles.midView}>
                    <Text style={{ fontSize: 16, fontWeight: '500', color: '#353535' }}>Guidelines and Policies</Text>
                </View>
                <Image source={Arrow} style={styles.arrowImg} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.SettingView} onPress={() => navigation.navigate('Browser')}>
                <View style={styles.midView}>
                    <Text style={{ fontSize: 16, fontWeight: '500', color: 'black' }}>Browser Best Practices</Text>
                </View>
                <Image source={Arrow} style={styles.arrowImg} />
            </TouchableOpacity>
        </View>
    );
};
const styles = StyleSheet.create({
    mainContainer: {
        flexGrow: 1,
        backgroundColor: 'white', // Add this line to set the background color

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
        marginTop: 19
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