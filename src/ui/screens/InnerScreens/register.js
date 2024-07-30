import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native';
import { Card } from 'react-native-paper';
import MainImg from '../../../assets/images/trip3.png';
import User from '../../../assets/icons/userPic.png'
import { useDispatch, useSelector } from 'react-redux';
import Moment from 'moment';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation from React Navigation
import Icon from "react-native-vector-icons/FontAwesome";
import CustomHeader from '../../modules/header/customHeader';
import PlaceholderImage from '../../../assets/images/placeholder.jpg';

const Register = ({ route }) => {
    const { event } = route.params;
    const id = event.eventId
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const eventDetail = useSelector(state => state.event.eventDetail);
    const eventData = eventDetail;
    const navigation = useNavigation(); // Get navigation object from React Navigation
    const [selectedChip, setSelectedChip] = useState(2);

    const toggleRememberMe = () => {
        setRememberMe(!rememberMe);
    };

    const paymentMethod = () => {
        navigation.navigate('PaymentScreen')
    }

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
    };
    function handleDetailClick() {
        setSelectedChip(1);
        navigation.navigate('DetailScreen', { event });
    };
    function handleRegisterClick() {
        setSelectedChip(2);
        console.log('Register chip clicked');
    };
    function handleCarPoolClick() {
        navigation.navigate('CarPool', { event });
    };

    function handlePhotosClick() {
        console.log('Photos chip clicked');
        navigation.navigate('Photos', { event });

    };

    function handleDirectionClick() {
        console.log('Direction chip clicked');
        navigation.navigate('Map', { event });

    };
    function handleFeedbackClick() {
        console.log('Feedback chip clicked');
        navigation.navigate('Feedback', { event });
    };
    return (
        <View style={styles.container}>
            <CustomHeader title={'Register Event'} />
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
            <ScrollView style={{ marginBottom: 125 }}>
                <View style={styles.separator} />
                <Card style={styles.CardStyle}>
                    <View style={styles.CardTopPart}>
                        <Image
                            source={
                                eventData.clipart && eventData.clipart.startsWith('http://3.221.235.57/images')
                                    ? PlaceholderImage
                                    : { uri: eventData.clipart }
                            }
                            style={{ width: '95%', alignSelf: 'center', borderRadius: 16, marginTop: 8, height: 200 }}
                        />
                        {/* <Image source={{ uri: eventData.clipart }} style={{ width: '95%', alignSelf: 'center', borderRadius: 16, marginTop: 8, height: 200 }} /> */}
                        <View style={{ backgroundColor: 'white', borderColor: '#EC5D78', borderWidth: 1, width: 75, height: 75, position: 'absolute', right: 25, top: 25, borderRadius: 10, alignContent: 'center' }}>
                            {eventData && (
                                <>
                                    <Text style={{ color: '#EC5D78', fontSize: 24, fontWeight: '600', textAlign: 'center', paddingTop: 4 }}>
                                        {Moment(eventData.eventDateTime).format('DD')}
                                    </Text>
                                    <Text style={{ color: '#353535', fontSize: 12, fontWeight: '400', textAlign: 'center' }}>
                                        {Moment(eventData.eventDateTime).format('MMMM')}
                                    </Text>
                                    <Text style={{ color: '#353535', fontSize: 12, fontWeight: '500', textAlign: 'center' }}>
                                        {Moment(eventData.eventDateTime).format('h:mm A')}
                                    </Text>
                                </>
                            )}
                        </View>
                        <View style={{ paddingLeft: 15, paddingTop: 15, paddingRight: 10 }}>
                            <Text style={styles.textHeading}>{eventData.eventName}</Text>

                        </View>
                    </View>
                </Card>
                <View style={{ marginLeft: 22, marginRight: 22, marginTop: 27, }}>
                    <View style={{ borderWidth: 1, borderColor: '#EC5D78', borderRadius: 20 }}>
                        <View style={{ backgroundColor: '#EC5D78', borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
                            <Text style={{ textAlign: 'center', color: 'white', fontSize: 20, fontWeight: '600', padding: 14 }}>Event Info</Text>
                        </View>
                        <View style={{ flexDirection: 'row', width: '100%', marginTop: 10 }}>
                            <View style={{ width: '50%', flexDirection: 'column', marginTop: 10, marginLeft: 18 }}>
                                <Text style={{ fontSize: 16, fontWeight: '500', color: '#353535' }}>Event Status</Text>
                                <Text style={{ fontSize: 16, fontWeight: '500', color: '#353535', paddingTop: 8 }}>Member Status</Text>
                            </View>
                            <View style={{ width: '50%', flexDirection: 'column', marginTop: 10, marginLeft: 20 }}>
                                <Text style={{ paddingLeft: 7, fontSize: 14, fontWeight: '500', color: '#707070', paddingTop: 3 }}>Event is available</Text>
                                <Text style={{ paddingLeft: 7, fontSize: 14, fontWeight: '500', color: '#707070', paddingTop: 8 }}>Not Signed Up</Text>
                            </View>
                        </View>
                        <Text style={{ paddingLeft: 20, color: '#EC5D78', fontSize: 16, fontWeight: '600', paddingTop: 10 }}>Member Guest</Text>
                        <View style={{ flexDirection: 'row', width: '100%', marginTop: 4 }}>
                            <View style={{ width: '50%', flexDirection: 'column', marginTop: 10, marginLeft: 18 }}>
                                <Text style={{ fontSize: 16, fontWeight: '500', color: '#353535' }}>Sign Up Status</Text>
                                <Text style={{ fontSize: 16, fontWeight: '500', color: '#353535', paddingTop: 8 }}>Event Status</Text>
                            </View>
                            <View style={{ width: '50%', flexDirection: 'column', marginTop: 10, marginLeft: 20 }}>
                                <Text style={{ paddingLeft: 7, fontSize: 14, fontWeight: '500', color: '#707070', paddingTop: 3 }}>You are Signed Up</Text>
                                <Text style={{ paddingLeft: 7, fontSize: 14, fontWeight: '500', color: '#707070', paddingTop: 8 }}>Event is available</Text>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row', width: '100%' }}>
                            <View style={{ width: '40%', flexDirection: 'column', marginTop: 4, marginLeft: 18 }}>
                                <Text style={{ fontSize: 16, fontWeight: '500', color: '#353535', paddingTop: 8 }}>Host(s)</Text>
                            </View>
                            <View style={{ width: '60%', flexDirection: 'row', marginTop: 4, marginLeft: 20 }}>
                                <Image source={User} />
                                <Text style={{ paddingLeft: 7, fontSize: 14, fontWeight: '500', color: '#707070', paddingTop: 8 }}>{eventData.host}</Text>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row', width: '100%', marginTop: 4, marginBottom: 10 }}>
                            <View style={{ width: '65%', flexDirection: 'column', marginTop: 10, marginLeft: 18 }}>
                                <Text style={{ paddingLeft: 3, color: '#EC5D78', fontSize: 16, fontWeight: '600', paddingBottom: 4 }}>Event Type</Text>
                                <Text style={{ fontSize: 16, fontWeight: '500', color: '#353535' }}>Duration</Text>
                                <Text style={{ fontSize: 16, fontWeight: '500', color: '#353535', paddingTop: 8 }}>Attendees</Text>
                            </View>
                            <View style={{ width: '35%', flexDirection: 'column', marginTop: 10, marginLeft: 20 }}>
                                <Text style={{ paddingLeft: 7, fontSize: 14, fontWeight: '500', color: '#707070', paddingTop: 3, paddingBottom: 4 }}>{eventData.eventType}</Text>
                                <Text style={{ paddingLeft: 7, fontSize: 14, fontWeight: '500', color: '#707070', paddingTop: 3 }}>{eventData.duration}</Text>
                                <Text style={{ paddingLeft: 7, fontSize: 14, fontWeight: '500', color: '#707070', paddingTop: 8 }}>{eventData.memberLimit}</Text>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={{ marginLeft: 22, marginRight: 22, marginTop: 27, }}>
                    <View style={{ borderWidth: 1, borderColor: '#EC5D78', borderRadius: 20, }}>
                        <View style={{ backgroundColor: '#EC5D78', borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
                            <Text style={{ textAlign: 'center', color: 'white', fontSize: 20, fontWeight: '600', padding: 14 }}>Suitch App Team</Text>
                        </View>
                        <View style={{ flexDirection: 'row', width: '100%', marginTop: 10 }}>
                            <View style={{ width: '60%', flexDirection: 'column', marginTop: 10, marginLeft: 18 }}>
                                <Text style={{ fontSize: 16, fontWeight: '500', color: '#353535' }}>Event Cost</Text>
                                <Text style={{ fontSize: 16, fontWeight: '500', color: '#353535', paddingTop: 8 }}>Event Tax</Text>
                            </View>
                            <View style={{ width: '40%', flexDirection: 'column', marginTop: 10, marginLeft: 20 }}>
                                <Text style={{ paddingLeft: 7, fontSize: 14, fontWeight: '500', color: '#707070', paddingTop: 3 }}>${eventData.eventCostCAD} USD</Text>
                                <Text style={{ paddingLeft: 7, fontSize: 14, fontWeight: '500', color: '#707070', paddingTop: 8 }}>${eventData.eventTaxCAD} USD</Text>
                            </View>
                        </View>
                        <View style={styles.inputContainer}>
                            <TextInput
                                placeholder="Guest"
                                placeholderTextColor="#353535"
                                style={{ color: '#353535', paddingLeft: 15, fontSize: 16 }}
                                value={password}
                                onChangeText={(text) => setPassword(text)}
                            />
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={styles.inputContainer2}>
                                <TextInput
                                    placeholder="Car Pool"
                                    placeholderTextColor="#353535"
                                    style={{ color: '#353535', paddingLeft: 15, fontSize: 16 }}
                                    value={password}
                                    onChangeText={(text) => setPassword(text)}
                                />
                            </View>
                            <TouchableOpacity style={{ backgroundColor: '#EC5D78', height: 64, borderRadius: 20, width: '25%', alignItems: 'center', marginTop: 10, marginLeft: 8 }}>
                                <Text style={{ color: 'white', fontSize: 16, fontWeight: '600', paddingTop: 20 }}>Auto Fill</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.inputContainer3}>
                            <TextInput
                                placeholder="Comment"
                                placeholderTextColor="#353535"
                                style={{ color: '#353535', paddingLeft: 15, fontSize: 16 }}
                                value={password}
                                onChangeText={(text) => setPassword(text)}
                            />
                        </View>
                        <Text style={{ paddingLeft: 20, color: '#EC5D78', fontWeight: '600', fontSize: 16 }}>Actions</Text>

                        <View style={styles.forgot}>
                            <TouchableOpacity style={styles.rememberMeContainer} onPress={toggleRememberMe}>
                                <View style={[styles.radio, rememberMe && styles.radioSelected]}>
                                    {rememberMe && (
                                        <Icon color={"black"} name={"check"} size={19} />
                                    )}
                                </View>
                                <Text style={styles.rememberMeText}>I want to register for the event and I agree to pay
                                    the cost specified for the Event.</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <TouchableOpacity style={{ backgroundColor: '#EC5D78', borderRadius: 20, width: '85%', alignSelf: 'center', marginTop: 20, marginBottom: 10 }} onPress={paymentMethod}>
                    <Text style={{ padding: 25, textAlign: 'center', color: 'white', fontWeight: '600', fontSize: 16 }}>Send</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: 'white'
    },
    separator: {
        width: '90%',
        alignSelf: 'center',
        borderWidth: 0.8,
        borderColor: '#F6F6F6',
        marginTop: 20,
        marginBottom: 10,

    },
    separator2: {
        width: '90%',
        alignSelf: 'center',
        borderWidth: 0.8,
        borderColor: '#E4E4E4',
        marginTop: 15,
        marginBottom: 10,

    },
    CardStyle: {
        width: '90%',
        alignSelf: 'center',
        marginTop: 10,
        borderRadius: 20,
        elevation: 5, // Add this line for box shadow
        height: 'auto',
        paddingBottom: 13
    },
    CardTopPart: {
        // padding: 16,
    },
    TopTextStyle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    textHeading: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#353535'
    },
    textHeadingRed: {
        fontSize: 16,
        fontWeight: '500',
        color: '#EC5D78',
        paddingTop: 10
    },
    textHeadingRed2: {
        fontSize: 14,
        fontWeight: '500',
        color: '#EC5D78',
        paddingTop: 10
    },
    text: {
        fontSize: 14,
        fontWeight: '500',
        color: '#707070',
        paddingTop: 8,
        lineHeight: 20,
        letterSpacing: 0.44
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 25,
        borderColor: '#BBB',
        height: 64,
        marginTop: 12,
        width: '90%',
        backgroundColor: '#E4E4E4',
        alignSelf: 'center',
    },
    inputContainer2: {
        flexDirection: 'row',
        borderWidth: 1,
        borderRadius: 25,
        borderColor: '#BBB',
        height: 64,
        marginTop: 12,
        width: '65%',
        backgroundColor: '#E4E4E4',
        marginLeft: 16
    },
    inputContainer3: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 25,
        borderColor: '#BBB',
        height: 64,
        marginTop: 12,
        width: '90%',
        backgroundColor: '#E4E4E4',
        alignSelf: 'center',
        marginBottom: 20
    },
    forgot: {
        flexDirection: 'row',
        width: '95%',
        alignSelf: 'center',
        marginBottom: 20
    },
    rememberMeContainer: {
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 14
    },
    radio: {
        width: 22,
        height: 22,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#B3B3B3',
        marginRight: 10,
        backgroundColor: '#fff',
        marginTop: 2
    },
    radioSelected: {
        backgroundColor: 'black',
    },
    rememberMeText: {
        fontSize: 15,
        color: '#353535',
        width: '90%'
    },
    radioSelected: {
        backgroundColor: '#fff',
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        marginTop: 20,
        gap: 8,
        marginLeft: 20
    },
    chipContainer: {
        flexDirection: 'row',
        marginBottom: 8
    }
});
export default Register;
