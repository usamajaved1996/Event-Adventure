import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, ActivityIndicator, ScrollView } from 'react-native';
import { Card } from 'react-native-paper';
import MainImg from '../../../assets/images/trip1.png'
import MainImg2 from '../../../assets/images/trip2.png'
import Calendar from '../../../assets/icons/event.png'
import Contact from '../../../assets/icons/user-square.png'
import Clock from '../../../assets/icons/clock.png'
import People from '../../../assets/icons/people.png'
import Dollar from '../../../assets/icons/dollar.png'
import Attire from '../../../assets/icons/attire.png'
import ShareModal from '../../modules/Modal/shareModal'
import { useNavigation } from '@react-navigation/native'; // Import useNavigation from React Navigation
import { useDispatch, useSelector } from 'react-redux';
import { getEventDetail } from '../../../slices/eventSlice';
import Moment from 'moment';
import HTMLView from 'react-native-htmlview'; // Assuming you're using react-native-htmlview library
import HeaderEvent from '../../modules/header/headerEvent';
import PlaceholderImage from '../../../assets/images/placeholder.jpg';

const DetailScreen = ({ route }) => {
    const { event } = route.params;
    const id = event.eventId
    const [selectedChip, setSelectedChip] = useState(1);
    const [loading, setLoading] = useState(true);
    const [showEventDetails, setShowEventDetails] = useState(true);
    const [showLocation, setShowLocation] = useState(true);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getEventDetail({ memberId: 0, eventId: id })).then(() => setLoading(false));
    }, []);
    const eventDetail = useSelector(state => state.event.eventDetail);
    const eventData = eventDetail;
    console.warn('eventDetail', eventDetail)
    const [isModal, setIsModal] = useState(false);
    const navigation = useNavigation();


    const getChipStyle = (index) => ({
        backgroundColor: selectedChip === index ? '#EC5D78' : '#fff',
        color: selectedChip === index ? 'white' : '#353535',
    });

    const onDiscussion = async () => {
        navigation.navigate('Discussion')
    };
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
        navigation.navigate('Calendar');
    };
    function handleDetailClick() {
        setSelectedChip(1);
    };
    function handleRegisterClick() {
        navigation.navigate('Register', { event });
    };
    function handleCarPoolClick() {
        navigation.navigate('CarPool', { event });
    };
    function handlePhotosClick() {
        console.log('Photos chip clicked');
        navigation.navigate('Photos', { event });

    };
    function handleDirectionClick() {
        navigation.navigate('Map', { event });
    };
    function handleFeedbackClick() {
        navigation.navigate('Feedback', { event });
    };
    return (
        <View style={styles.container}>
            {isModal && (
                <ShareModal
                    isVisible={true}
                    onCancel={() => setIsModal(false)}
                    onDelete={() => setIsModal(false)}
                    isSetting={true}
                />
            )}
            <HeaderEvent title={'Event Details'} eventDataProps={event.eventId} />
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

            <View style={styles.separator} />
            {loading == true ?
                <ActivityIndicator size="large" color="#EC5D78" style={{ marginTop: '90%', marginBottom: '90%' }} />
                :
                <ScrollView style={{ marginBottom: 160 }}>
                    <Card style={styles.CardStyle}>
                        <View style={styles.CardTopPart}>
                            <Image
                                source={
                                    eventData.clipart && eventData.clipart.startsWith('http://3.221.235.57/images')
                                        ? PlaceholderImage
                                        : { uri: eventData.clipart }
                                }
                                style={{ width: '95%', alignSelf: 'center', borderRadius: 16, marginTop: 8, height: 200  }}
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
                                {eventData.eventText != null ?
                                    <View>
                                        <Text style={styles.textHeadingRed}>Host: {eventData.host}</Text>
                                        <HTMLView style={styles.text} value={eventData.eventText} />
                                    </View>
                                    :
                                    null}
                            </View>
                        </View>
                    </Card>
                    <View style={{ marginLeft: 22, marginRight: 22, marginTop: 20 }}>
                        <Text style={styles.textHeading}>CONTEMPORARY AND CLASSICAL!</Text>
                        <Text style={styles.text}>Join E&A friends underneath the stars for an outdoor Ballet show at Fountain Park.</Text>
                    </View>
                    <Card style={styles.CardStyle}>
                        <View style={styles.CardTopPart}>
                            <Image source={MainImg2} style={{ width: '95%', alignSelf: 'center', borderRadius: 16, marginTop: 8 }} />
                            <View style={{ paddingLeft: 15, paddingTop: 15, paddingRight: 10 }}>
                                <Text style={styles.text}>Ballet Under the Stars allows Arizona communities to enjoy dance in a unique outdoor setting complete with a stage, lighting, costumes, and beautiful Arizona weather.</Text>
                            </View>
                        </View>
                    </Card>
                    <View style={{ marginLeft: 22, marginRight: 22, marginTop: 20 }}>
                        <Text style={styles.textHeading}>MEETING LOCATION:</Text>
                        <Text style={styles.text}>Host will arrive earlier than event time and send a text out on exact location.</Text>
                    </View>
                    <View style={{ marginLeft: 22, marginRight: 22, marginTop: 20 }}>
                        <Text style={styles.textHeading}>SHOW INFORMAITON:</Text>
                        <Text style={styles.text}>Show is free - yay! Ballet performance will begin at 5PM.</Text>
                    </View>
                    <View style={{ marginLeft: 22, marginRight: 22, marginTop: 20 }}>
                        <Text style={styles.textHeading}>WHAT TO BRING:</Text>
                        <Text style={styles.text}>Blanket and/or lawn chair, snacks ready to serve and share (optional), and BYOB with your own mini cooler. *Should you happen to bring alcohol, please be discreet about it as it is not allowed at public parks.</Text>
                    </View>
                    <View style={{ marginLeft: 22, marginRight: 22, marginTop: 20 }}>
                        <Text style={styles.textHeading}>LIQUOR LAWS IN AZ:</Text>
                        <Text style={styles.text}>Public consumption of alcohol is a criminal offense that is considered a Class 2 Misdemeanor. As a class 2 misdemeanor, penalties for public consumption of alcohol can be severe, with a maximum of 4 months jail, fines of $750 plus surcharges and up to 2 years probation. You must be a permit holder that is responsible for ensuring that all members of the party are of legal age to consume alcoholic beverages according to Arizona State Law.</Text>
                        <Text style={styles.textHeadingRed2}>*If you are caught, this is solely on you, not the host and not the staff of E&A.</Text>
                    </View>
                    <View style={{ marginLeft: 22, marginRight: 22, marginTop: 20, borderWidth: 1, borderColor: '#EC5D78', padding: 16, borderRadius: 20 }}>
                        <Text style={styles.text}>It is wonderful when sharing in making an event as much fun for yourself as it is for others. Any interaction with the general public poses an elevated risk of being exposed to COVID-19 and we cannot guarantee that you will not be exposed while in attendance at the event. E&A is not responsible for the health and safety of this event, we abide by all venues, cities, and county policies and local laws/restrictions. Our activities often may include taxes, gratuities, service charges, plus any applicable fees owed to the venue. If not, it will be noted in the description for your convenience. If you place yourself on the waitlist, you are agreeing that should space or a spot become available, you can attend and agree to pay the payment by pressing the confirmation upon signing up. Cancellation refunds are subject to the date and time listed on the details. You are responsible for your spot upon signup. Should you desire to attend an After Event, it is then your responsibility to settle your portion of the bill and not rely on other E&A members to pay for your food and beverages at these gatherings. Please do not assume others will cover your bill should you need to leave early. Events & Adventures is not responsible for any tows or tickets and will give no refunds for parking issues. If you have any questions, please email Meggie@eventsandadventures.com.</Text>
                    </View>

                    <Card style={styles.CardStyle}>
                        <TouchableOpacity onPress={() => setShowEventDetails(!showEventDetails)}>
                            <View style={{ backgroundColor: '#EC5D78', borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
                                <Text style={{ textAlign: 'center', color: 'white', fontSize: 20, fontWeight: '600', padding: 14 }}>Event Details</Text>
                            </View>
                        </TouchableOpacity>
                        {showEventDetails && (
                            <View>
                                <View style={{ flexDirection: 'row', width: '100%', marginTop: 10 }}>
                                    <View style={{ width: '45%', flexDirection: 'row', alignItems: 'center', marginTop: 10, marginLeft: 20 }}>
                                        <Image source={Calendar} />
                                        <Text style={{ paddingLeft: 7, fontSize: 10, fontWeight: '500', color: '#707070' }}>Event Status</Text>
                                    </View>
                                    <View style={{ width: '45%', flexDirection: 'row', alignItems: 'center', marginTop: 10, marginLeft: 20 }}>
                                        <Image source={Contact} />
                                        <Text style={{ paddingLeft: 7, fontSize: 10, fontWeight: '500', color: '#707070', paddingTop: 6 }}>Member Status</Text>
                                    </View>
                                </View>
                                <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                                    <Text style={{ color: '#353535', fontSize: 14, fontWeight: '500', paddingLeft: 20 }}>
                                        Event is available
                                    </Text>
                                    <Text style={{ color: '#353535', fontSize: 14, fontWeight: '500', paddingLeft: 65 }}>
                                        Not Signed Up
                                    </Text>
                                </View>
                                <View style={styles.separator2} />
                                <Text style={{ paddingLeft: 20, color: '#EC5D78', fontSize: 16, fontWeight: '600' }}>Member Guest</Text>

                                <View style={{ flexDirection: 'row', width: '100%', marginTop: 10 }}>
                                    <View style={{ width: '45%', flexDirection: 'row', alignItems: 'center', marginTop: 10, marginLeft: 20 }}>
                                        <Image source={Clock} />
                                        <Text style={{ paddingLeft: 7, fontSize: 10, fontWeight: '500', color: '#707070' }}>Sign Up Before:</Text>
                                    </View>
                                    <View style={{ width: '45%', flexDirection: 'row', alignItems: 'center', marginTop: 10, marginLeft: 20 }}>
                                        <Image source={Clock} />
                                        <Text style={{ paddingLeft: 7, fontSize: 10, fontWeight: '500', color: '#707070' }}>Cancel Before:</Text>
                                    </View>
                                </View>
                                <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                                    <Text style={{ color: '#353535', fontSize: 12, fontWeight: '500', paddingLeft: 14 }}>
                                        {Moment(eventData.signupBefore).format('ddd, MMM D, YYYY, hh:mm A')}
                                    </Text>
                                    <Text style={{ color: '#353535', fontSize: 12, fontWeight: '500', paddingLeft: 20 }}>
                                        {Moment(eventData.cancelBefore).format('ddd, MMM D, YYYY, hh:mm A')}
                                    </Text>
                                </View>

                                <View style={{ flexDirection: 'row', width: '100%', marginTop: 10 }}>
                                    <View style={{ width: '45%', flexDirection: 'row', alignItems: 'center', marginTop: 10, marginLeft: 20 }}>
                                        <Image source={People} />
                                        <Text style={{ paddingLeft: 7, fontSize: 10, fontWeight: '500', color: '#707070' }}>Host(s):</Text>
                                    </View>
                                    <View style={{ width: '45%', flexDirection: 'row', alignItems: 'center', marginTop: 10, marginLeft: 20 }}>
                                        <Text style={{ paddingLeft: 7, fontSize: 14, fontWeight: '500', color: '#353535' }}>{eventData.host}</Text>
                                    </View>
                                </View>
                                <View style={styles.separator2} />

                                <Text style={{ paddingLeft: 20, color: '#EC5D78', fontSize: 16, fontWeight: '600' }}>Event Type</Text>

                                <View style={{ flexDirection: 'row', width: '100%', marginTop: 10 }}>
                                    <View style={{ width: '65%', flexDirection: 'row', alignItems: 'center', marginTop: 10, marginLeft: 20 }}>
                                        <Image source={Clock} />
                                        <Text style={{ paddingLeft: 7, fontSize: 10, fontWeight: '500', color: '#707070' }}>Duration:</Text>
                                    </View>
                                    <View style={{ width: '35%', flexDirection: 'row', alignItems: 'center', marginTop: 10, marginLeft: 20 }}>
                                        <Image source={Attire} />
                                        <Text style={{ paddingLeft: 7, fontSize: 10, fontWeight: '500', color: '#707070' }}>Attire:</Text>
                                    </View>
                                </View>
                                <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                                    <View style={{ width: '40%' }}>
                                        <Text style={{ color: '#353535', fontSize: 12, fontWeight: '500', paddingLeft: 20 }}>
                                            {eventData.duration}
                                        </Text>
                                    </View>
                                    <View style={{ width: '100%' }}>
                                        <Text style={{ color: '#353535', fontSize: 11, fontWeight: '500', paddingLeft: 24, width: '55%', textAlign: 'center' }}>
                                            {eventData.attire}
                                        </Text>
                                    </View>
                                </View>

                                <View style={{ flexDirection: 'row', width: '100%', marginTop: 10 }}>
                                    <View style={{ width: '45%', flexDirection: 'row', alignItems: 'center', marginTop: 10, marginLeft: 20 }}>
                                        <Image source={People} />
                                        <Text style={{ paddingLeft: 7, fontSize: 10, fontWeight: '500', color: '#707070' }}>Attendees:</Text>
                                    </View>
                                </View>
                                <Text style={{ paddingLeft: 20, fontSize: 14, fontWeight: '500', color: '#353535', paddingTop: 10 }}>{eventData.memberLimit}</Text>

                                <View style={styles.separator2} />

                                <View style={{ flexDirection: 'row', width: '100%', marginTop: 3 }}>
                                    <View style={{ width: '45%', flexDirection: 'row', alignItems: 'center', marginTop: 10, marginLeft: 20 }}>
                                        <Image source={Dollar} />
                                        <Text style={{ paddingLeft: 7, fontSize: 10, fontWeight: '500', color: '#707070' }}>Event Cost:</Text>
                                    </View>
                                    <View style={{ width: '45%', flexDirection: 'row', alignItems: 'center', marginTop: 10, marginLeft: 20 }}>
                                        <Text style={{ paddingLeft: 27, fontSize: 14, fontWeight: '500', color: '#353535' }}>${eventData.eventCostCAD} USD</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', width: '100%', marginTop: 3, marginBottom: 13 }}>
                                    <View style={{ width: '45%', flexDirection: 'row', alignItems: 'center', marginTop: 10, marginLeft: 20 }}>
                                        <Image source={Dollar} />
                                        <Text style={{ paddingLeft: 7, fontSize: 10, fontWeight: '500', color: '#707070' }}>Event Tax:</Text>
                                    </View>
                                    <View style={{ width: '45%', flexDirection: 'row', alignItems: 'center', marginTop: 10, marginLeft: 20 }}>
                                        <Text style={{ paddingLeft: 27, fontSize: 14, fontWeight: '500', color: '#353535' }}>${eventData.eventTaxCAD} USD</Text>
                                    </View>
                                </View>

                            </View>

                        )}
                    </Card>

                    <Card style={styles.CardStyle}>
                        <TouchableOpacity onPress={() => setShowLocation(!showLocation)}>
                            <View style={{ backgroundColor: '#EC5D78', borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
                                <Text style={{ textAlign: 'center', color: 'white', fontSize: 20, fontWeight: '600', padding: 14 }}>Location</Text>
                            </View>
                        </TouchableOpacity>
                        {showLocation && (
                            <View>
                                <View style={{ flexDirection: 'row', width: '100%', marginTop: 10 }}>
                                    <View style={{ width: '65%', flexDirection: 'row', alignItems: 'center', marginTop: 10, marginLeft: 18 }}>
                                        <Text style={{ fontSize: 16, fontWeight: '500', color: '#353535' }}>Host City:</Text>
                                    </View>
                                    <View style={{ width: '35%', flexDirection: 'row', alignItems: 'center', marginTop: 10, marginLeft: 20 }}>
                                        <Text style={{ paddingLeft: 7, fontSize: 14, fontWeight: '500', color: '#707070', paddingTop: 6 }}>{eventData.city}</Text>
                                    </View>
                                </View>

                                <View style={{ flexDirection: 'row', width: '100%', marginTop: 10 }}>
                                    <View style={{ width: '45%', flexDirection: 'row', alignItems: 'center', marginTop: 10, marginLeft: 18 }}>
                                        <Text style={{ fontSize: 16, fontWeight: '500', color: '#353535' }}>Address:</Text>
                                    </View>
                                    <View style={{ width: '55%', flexDirection: 'row', alignItems: 'center', marginTop: 10, marginLeft: 20 }}>
                                        <Text style={{ paddingLeft: 7, fontSize: 14, fontWeight: '500', color: '#707070', paddingTop: 6, textAlign: 'right', width: 130 }}>{eventData.address}</Text>
                                    </View>

                                </View>
                                <View style={{ marginLeft: 20, marginRight: 20, marginTop: 10, marginBottom: 15 }}>
                                    <Text style={{
                                        fontSize: 16,
                                        fontWeight: '600',
                                        color: '#EC5D78',
                                    }}>Where to Meet:</Text>
                                    <Text style={{ paddingTop: 5, color: '#707070', fontSize: 14, fontWeight: '500' }}>{eventData.meetAt}</Text>
                                </View>
                            </View>
                        )}
                    </Card>
                    <TouchableOpacity style={{ backgroundColor: '#EC5D78', borderRadius: 20, width: '85%', alignSelf: 'center', marginTop: 20, marginBottom: 8 }} onPress={onDiscussion}>
                        <Text style={{ padding: 25, textAlign: 'center', color: 'white', fontWeight: '600', fontSize: 16 }}>General Discussion</Text>
                    </TouchableOpacity>
                </ScrollView>
            }

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
        // paddingBottom: 13
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
    chipContainer: {
        flexDirection: 'row',
        marginBottom: 8
    }
});
export default DetailScreen;
