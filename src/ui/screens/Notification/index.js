import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import Img1 from '../../../assets/icons/noti1.png';
import Img2 from '../../../assets/icons/noti2.png'
import Img3 from '../../../assets/icons/noti3.png'
import Img4 from '../../../assets/icons/noti4.png'
import Img5 from '../../../assets/icons/noti5.png'
import Img6 from '../../../assets/icons/noti6.png'
import Img7 from '../../../assets/icons/noti7.png'
import Header from "../../modules/header/header";

const Notification = ({ navigation }) => {
    const data = [
        {
            id: 3,
            image: Img1,
            name: '08 Hours Remaining',
            text: '08 Hours remaining before the event starts.',
            time: '05 min ago',
            badge: 1
        },
        {
            id: 2,
            image: Img1,
            name: 'Arlene McCoy',
            text: 'Lorem ipsum dolor sit amet, consectetuer.',
            time: '05 min ago',
            badge: 2
        },
        {
            id: 4,
            image: Img1,
            name: 'Jenny Wilson',
            text: 'Lorem ipsum dolor sit amet, consectetuer.',
            time: '05 min ago',
            badge: 2
        },
        {
            id: 5,
            image: Img1,
            name: 'Cameron Williamson',
            text: 'Lorem ipsum dolor sit amet, consectetuer.',
            time: '05 min ago',
            badge: 2
        },
        {
            id: 1,
            image: Img5,
            name: 'Theresa Webb',
            text: 'Lorem ipsum dolor sit amet, consectetuer.',
            time: '05 min ago',
            badge: 2
        },
        {
            id: 6,
            image: Img6,
            name: 'Savannah Nguyen',
            text: 'Lorem ipsum dolor sit amet, consectetuer.',
            time: '05 min ago',
            badge: 2
        },
        {
            id: 7,
            image: Img7,
            name: 'Devon Lane',
            text: 'Lorem ipsum dolor sit amet, consectetuer.',
            time: '05 min ago',
            badge: 2
        },
        {
            id: 7,
            image: Img7,
            name: 'Devon Lane',
            text: 'Lorem ipsum dolor sit amet, consectetuer.',
            time: '05 min ago',
            badge: 2
        },
    ]
    const renderItem = (item, index) => {
        return (
            <View style={styles.mainView}>
                <View style={styles.image}>
                    <Image source={item.image} />
                </View>
                <View style={styles.midText}>
                    <Text style={{ fontSize: 18, fontWeight: '500', color: 'black' }}>{item.name}</Text>
                    <Text style={{ fontSize: 14, fontWeight: '400', color: '#707070' }}>{item.text}</Text>
                </View>
                <View style={styles.lastText}>
                    <Text style={styles.badge}>{item.badge}</Text>
                    <Text style={{ fontSize: 14, fontWeight: '400', color: '#707070' }}>{item.time}</Text>
                </View>
            </View>
        );
    };
    return (
        <View style={styles.container}>
            <Header title={'Notifications'} />
            <FlatList
                data={data}
                renderItem={({ item, index }) => renderItem(item, index)}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#fff'
    },
    mainView: {
        width: '90%',
        borderWidth: 1,
        borderColor: '#D8D8D8',
        alignSelf: 'center',
        flexDirection: 'row',
        borderRadius: 20,
        padding: 10,
        paddingTop: 10,
        marginBottom: 18, // Add this line to create space between items
    },
    image: {
        width: '25%'
    },
    midText: {
        width: '55%'
    },
    lastText: {
        width: '25%',
        position: 'absolute',
        right: 0,
        bottom: 9
    },
    badge: { fontSize: 13, fontWeight: '400', color: 'white', position: 'absolute', bottom: 35, right: 25, backgroundColor: '#EC5D78', borderRadius: 20, width: 20, height: 20, textAlign: 'center' }
});
export default Notification;
