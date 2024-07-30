import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import HeaderEvent from '../../modules/header/headerEvent';
import Header from '../../modules/header/header';

import { useNavigation } from '@react-navigation/native';
import Home from '../Home/home';
import DetailScreen from '../InnerScreens/detail';
import Register from './register';
import Chat from './carPool';
import Photos from './photos';
import Map from './direction';
import Feedback from './feedback';

const NavigationChips = ({ route }) => {
    const { event } = route.params;
    const [selectedChip, setSelectedChip] = useState(1);
    const navigation = useNavigation();
    const [headerTitle, setHeaderTitle] = useState('Event Details');
    const chipsData = [
        { label: 'Calendar', onPress: handleCalendarClick },
        { label: 'Details', onPress: handleDetailClick },
        { label: 'Register', onPress: handleRegisterClick },
        { label: 'Car Pool', onPress: handleCarPoolClick },
        { label: 'Photos', onPress: handlePhotosClick },
        { label: 'Direction', onPress: handleDirectionClick },
        { label: 'Feedback', onPress: handleFeedbackClick },
    ];

    function handleCalendarClick() {
        console.log('Calendar chip clicked');
        setSelectedChip(0);
        navigation.navigate('Dashboard');
    };

    function handleDetailClick() {
        console.log('Detail chip clicked');
        setSelectedChip(1);
        setHeaderTitle('Event Details');
    };

    function handleRegisterClick() {
        console.log('Register chip clicked');
        setSelectedChip(2);
        setHeaderTitle('Suitch App Team');
    };

    function handleCarPoolClick() {
        console.log('Car Pool chip clicked');
        setSelectedChip(3);
        setHeaderTitle('Suitch App Team');
    };

    function handlePhotosClick() {
        console.log('Photos chip clicked');
        setSelectedChip(4);
        setHeaderTitle('Suitch App Team');
    };

    function handleDirectionClick() {
        console.log('Direction chip clicked');
        setSelectedChip(5);
        setHeaderTitle('Suitch App Team');
    };

    function handleFeedbackClick() {
        console.log('Feedback chip clicked');
        setSelectedChip(6);
        setHeaderTitle('Suitch App Team');
    };

    const renderSelectedScreen = () => {
        switch (selectedChip) {
            case 0:
                return <Home />;
            case 1:
                return <DetailScreen event={event} />;
            case 2:
                return <Register />;
            case 3:
                return <Chat />;
            case 4:
                return <Photos event={event} />;
            case 5:
                return <Map />;
            case 6:
                return <Feedback event={event}/>;
            default:
                return null;
        }
    };

    const getChipStyle = (index) => ({
        backgroundColor: selectedChip === index ? '#EC5D78' : '#fff',
        color: selectedChip === index ? 'white' : '#353535',
    });

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {headerTitle == 'Event Details' ?
                <HeaderEvent title={'Event Details'} />
                :
                <Header title={headerTitle} />
            }
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.chipContainer}>
                    {chipsData.map((chip, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[{
                                padding: 10,
                                margin: 5,
                                borderRadius: 16,
                                height: 42,
                                marginTop: 16,
                                borderWidth: 1,
                                borderColor: selectedChip === index ? '#fff' : '#bbb',
                                width: 86
                            }, getChipStyle(index)]}
                            onPress={chip.onPress}
                        >
                            <Text style={{ textAlign: 'center', fontWeight: '900', fontSize: 12, lineHeight: 20, color: getChipStyle(index).color }}>
                                {chip.label}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
            <View style={{ flex: 1 }}>
                {renderSelectedScreen()}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: 'white'
    },
    chipContainer: {
        flexDirection: 'row'
    }
});

export default NavigationChips;
