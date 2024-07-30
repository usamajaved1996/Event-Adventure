import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, FlatList, Image, Text, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getEventPhoto } from '../../../slices/eventSlice';
import CustomHeader from '../../modules/header/customHeader';
import { useNavigation } from '@react-navigation/native';

const ImageScreen = ({ route }) => {
    const { event } = route.params;
    const [loading, setLoading] = useState(true);
    const eventPhoto = useSelector(state => state.event.eventPhoto);
    const navigation = useNavigation();
    const scrollViewRef = useRef(null);

    const [selectedChip, setSelectedChip] = useState(4);
    const dispatch = useDispatch();

    useEffect(() => {
        console.warn('eventPhoto', eventPhoto);
        dispatch(getEventPhoto(event.eventId)).then(() => setLoading(false));
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
        navigation.navigate('Calendar');
    }
    function handleDetailClick() {
        navigation.navigate('DetailScreen', { event });
    }
    function handleRegisterClick() {
        navigation.navigate('Register', { event });
    }
    function handleCarPoolClick() {
        navigation.navigate('CarPool', { event });
    }
    function handlePhotosClick() {
        setSelectedChip(4);
        navigation.navigate('Photos', { event });
        scrollToBottom();
    }
    function handleDirectionClick() {
        navigation.navigate('Map', { event });
        scrollToBottom();
    }
    function handleFeedbackClick() {
        console.log('Feedback chip clicked');
        navigation.navigate('Feedback', { event });
        scrollToBottom();
    }
    const scrollToBottom = () => {
        // scrollViewRef.current.scrollToEnd({ animated: true });
    };

    return (
        <View style={styles.container}>
            <CustomHeader title={'Event Gallery'} />
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                ref={scrollViewRef}
                style={styles.chipsScrollView}
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
            {/* <View style={styles.separator} /> */}
            <View style={styles.spacing} /> 
            {loading ? (
                <ActivityIndicator size="large" color="#EC5D78" />
            ) : eventPhoto.length > 0 ? (
                <FlatList
                    data={eventPhoto}
                    keyExtractor={(item) => item.id}
                    numColumns={2}
                    contentContainerStyle={styles.imageList}
                    renderItem={({ item }) => (
                        <View style={styles.imageContainer}>
                            <Image source={{ uri: item.PhotoFilename }} style={styles.image} />
                        </View>
                    )}
                />
            ) : (
                <View style={styles.noPhotosContainer}>
                    <Text style={styles.noPhotosText}>No photos found</Text>
                </View>
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
        maxHeight: 70,
    },
    separator: {
        width: '90%',
        alignSelf: 'center',
        borderWidth: 0.8,
        borderColor: '#F6F6F6',
        marginTop: 25,
        marginBottom: 20,
    },
    spacing: {
        height: 20, // Adjust the height as needed for spacing
    },
    imageList: {
        paddingBottom: 16,
    },
    imageContainer: {
        marginVertical: 6,
        borderWidth: 3,
        borderColor: '#FFF',
        borderRadius: 20,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        marginHorizontal: 8,
    },
    image: {
        width: 168,
        height: 107,
        borderRadius: 16,
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
});

export default ImageScreen;
