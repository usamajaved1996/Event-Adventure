import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, Text, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import WebView from 'react-native-webview';
import CustomHeader from '../../modules/header/customHeader';
import { useNavigation } from '@react-navigation/native';

const MapScreen = ({ route }) => {
    const { event } = route.params;
    const dispatch = useDispatch();
    const eventDetail = useSelector(state => state.event.eventDetail);
    const eventDirection = eventDetail && eventDetail.length > 0 ? eventDetail[0].MapURL : null;
    const [isLoading, setIsLoading] = useState(true);
    const [selectedChip, setSelectedChip] = useState(5);
    const navigation = useNavigation();
    const scrollViewRef = useRef(null);

    console.warn('eventDirection', eventDirection);
    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsLoading(false);
        }, 3000);

        return () => clearTimeout(timeout);
    }, []);

    const chipsData = [
        { label: 'Calendar', onPress: handleCalendarClick },
        { label: 'Details', onPress: handleDetailClick },
        { label: 'Register', onPress: handleRegisterClick },
        { label: 'Car Pool', onPress: handleCarPoolClick },
        { label: 'Photos', onPress: handlePhotosClick },
        { label: 'Direction', onPress: handleDirectionClick },
        { label: 'Feedback', onPress: handleFeedbackClick },
    ];

    const getChipStyle = (index) => ({
        backgroundColor: selectedChip === index ? '#EC5D78' : '#fff',
        color: selectedChip === index ? 'white' : '#353535',
    });

    function handleCalendarClick() {
        setSelectedChip(0);
        navigation.navigate('Calendar');
    }

    function handleDetailClick() {
        setSelectedChip(1);
        navigation.navigate('DetailScreen', { event });
    }

    function handleRegisterClick() {
        navigation.navigate('Register', { event });
    }

    function handleCarPoolClick() {
        setSelectedChip(3);
        navigation.navigate('CarPool', { event });
    }

    function handlePhotosClick() {
        console.log('Photos chip clicked');
        navigation.navigate('Photos', { event });
    }

    function handleDirectionClick() {
        setSelectedChip(5);
        navigation.navigate('Map', { event });
        scrollToSelectedChip(5);
    }

    function handleFeedbackClick() {
        navigation.navigate('Feedback', { event });
    }

    const scrollToSelectedChip = (index) => {
        // Implement scroll logic if needed
    };

    return (
        <View style={styles.container}>
            <CustomHeader title={'Event Location'} />
            <ScrollView
                ref={scrollViewRef}
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.chipsScrollView} // Added styles for scroll view
            >
                <View style={styles.chipContainer}>
                    {chipsData.map((chip, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[styles.chip, getChipStyle(index)]}
                            onPress={chip.onPress}
                        >
                            <Text style={[styles.chipText, { color: getChipStyle(index).color }]}>
                                {chip.label}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
            <View style={styles.separator} />

            {isLoading && (
                <ActivityIndicator size="large" color="#EC5D78" />
            )}
            {eventDirection === null ? (
                <View style={styles.noPhotosContainer}>
                    <Text style={styles.noPhotosText}>No location found</Text>
                </View>
            ) : (
                <WebView
                    style={styles.map}
                    source={{ uri: eventDirection }}
                    onLoadStart={() => setIsLoading(true)}
                    onLoad={() => setIsLoading(false)}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    chipsScrollView: {
        maxHeight: 70, // Adjust based on your chip container height
    },
    map: {
        flex: 1,
    },
    chipContainer: {
        flexDirection: 'row',
    },
    chip: {
        padding: 10,
        margin: 5,
        borderRadius: 16,
        height: 42,
        marginTop: 16,
        borderWidth: 1,
        borderColor: '#bbb',
        width: 86,
    },
    chipText: {
        textAlign: 'center',
        fontWeight: '900',
        fontSize: 12,
        lineHeight: 20,
    },
    noPhotosContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
    },
    noPhotosText: {
        fontSize: 18,
        color: 'gray',
    },
    separator: {
        width: '90%',
        alignSelf: 'center',
        borderWidth: 0.8,
        borderColor: '#F6F6F6',
        marginTop: 25,
        marginBottom: 20,
    },
});

export default MapScreen;
