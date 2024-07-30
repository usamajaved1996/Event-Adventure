import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, Text, Image, TextInput, ActivityIndicator, TouchableOpacity, ScrollView } from 'react-native';
import Emoji from '../../../assets/icons/emoji.png';
import StarRating from 'react-native-star-rating';
import Fill from '../../../assets/icons/fillStar.png';
import Empty from '../../../assets/icons/emptyStar.png';
import Button from '../../modules/Button';
import FeedBackModal from '../../modules/Modal/feedbackModal'
import { useDispatch, useSelector } from 'react-redux';
import { feedBack } from '../../../slices/eventSlice';
import { toastMsg } from '../../modules/Toast';
import CustomHeader from '../../modules/header/customHeader';
import { useNavigation } from '@react-navigation/native';

const FeedbackScreen = ({ route }) => {
    const { event } = route.params;
    const user = useSelector(state => state.auth.user);
    const dispatch = useDispatch();
    const scrollViewRef = useRef(null); // Add a ref to the ScrollView

    const [rating, setRating] = useState(0);
    const [loading, setIsLoading] = useState(false);
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const [isModal, setIsModal] = useState(false);
    const [titleError, setTitleError] = useState('');
    const [messageError, setMessageError] = useState('');
    const [selectedChip, setSelectedChip] = useState(6);
    const navigation = useNavigation();

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
        navigation.navigate('DetailScreen', { event });
    };
    function handleRegisterClick() {
        navigation.navigate('Register', { event });
    };
    function handleCarPoolClick() {
        navigation.navigate('CarPool', { event });
        scrollToBottom(); // Scroll to the end of ScrollView

    };
    function handleDirectionClick() {
        navigation.navigate('Map', { event });
        scrollToBottom(); // Scroll to the end of ScrollView

    };
    function handleFeedbackClick() {
        navigation.navigate('Feedback', { event });
        scrollToBottom(); // Scroll to the end of ScrollView

    };
    function handlePhotosClick() {
        setSelectedChip(4);
        navigation.navigate('Photos', { event });
        scrollToBottom(); // Scroll to the end of ScrollView

    };
    const scrollToBottom = () => {
        // scrollViewRef.current.scrollToEnd({ animated: true });
    };
    const validateFields = () => {
        let isValid = true;
        if (!title.trim()) {
            setTitleError('Please enter title.');
            isValid = false;
        } else {
            setTitleError('');
        }
        if (!message.trim()) {
            setMessageError('Please enter feedback message.');
            isValid = false;
        } else {
            setMessageError('');
        }
        return isValid;
    };
    const onSubmitFeedback = async () => {
        if (validateFields()) {
            setIsLoading(true);
            try {
                const response = await dispatch(feedBack({ memberId: user.object.id, eventId: event.eventId, title: title, message: message, rating: rating }));
                console.warn('res', response.payload)
                if (response.payload.statusCode == 200) {
                    setIsModal(true)
                    setTitle('');
                    setMessage('');
                    setRating(0);
                    toastMsg(response.payload.message);
                }
                else {
                    toastMsg(response.error.message);
                }
            } catch (error) {
                console.error('err', error)
            }
        }
        setIsLoading(false);
    };

    return (
        <View style={styles.container}>
            <CustomHeader title={'Event Feedback'} />
            <ScrollView horizontal showsHorizontalScrollIndicator={false} ref={scrollViewRef}>
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
            <View style={{ width: '100%' }}>
                <Text style={{ textAlign: 'center', color: '#353535', fontSize: 18, fontWeight: '600', paddingTop: 15, paddingLeft: 40, paddingRight: 40, lineHeight: 28 }}>
                    HOW WAS YOUR EXPERIENCE WITH THE EVENT?
                </Text>
                <Image source={Emoji} style={{ alignSelf: 'center', marginTop: 20 }} />
            </View>
            <View style={{ width: '85%', alignSelf: 'center', marginTop: 20, marginBottom: 20 }}>
                <StarRating
                    disabled={false}
                    maxStars={5}
                    rating={rating}
                    selectedStar={(rating) => setRating(rating)}
                    starSize={60}
                    fullStarColor="#FF8A00"
                    emptyStarColor="#BBB"
                    fullStar={Fill} // Use the image path directly
                    emptyStar={Empty} // Use the image path directly
                />
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Title"
                    placeholderTextColor="#000"
                    style={{ color: '#000', paddingLeft: 5 }}
                    value={title}
                    onChangeText={(text) => setTitle(text)}
                />
            </View>
            {titleError ? <Text style={styles.errorText}>{titleError}</Text> : null}


            <View style={styles.inputContainer2}>
                <TextInput
                    placeholder="Message"
                    placeholderTextColor="#000"
                    style={{ color: '#000', paddingLeft: 5, textAlignVertical: 'top', paddingTop: 17 }}
                    value={message}
                    onChangeText={(text) => setMessage(text)}
                    multiline={true}
                    numberOfLines={8} // You can adjust the number of lines as needed

                />
            </View>
            {messageError ? <Text style={styles.errorText}>{messageError}</Text> : null}

            {loading == true ? (
                <Button title={<ActivityIndicator size="small" color="#ffff" />} />
            ) : (
                <Button title={'Submit'} onPress={onSubmitFeedback} />
            )}
            {/* {loading == true ? (
                <Button title={<ActivityIndicator size="small" color="#ffff" />} />
            ) : (
                <TouchableOpacity onPress={() => setIsModal(true)}
                    style={styles.button}>
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
            )} */}
            {isModal && (
                <FeedBackModal
                    isVisible={true}
                    onCancel={() => setIsModal(false)}
                    onDelete={() => setIsModal(false)}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: 'white',
    },
    separator: {
        width: '90%',
        alignSelf: 'center',
        borderWidth: 0.9,
        borderColor: '#F6F6F6',
        marginTop: 0,
        marginBottom: 3,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 20,
        paddingLeft: 20,
        zIndex: 0,
        borderColor: '#fff',
        height: 64,
        marginTop: 15,
        width: '90%',
        backgroundColor: '#E4E4E4',
        alignSelf: 'center',
    },
    inputContainer2: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 20,
        paddingLeft: 20,
        zIndex: 0,
        borderColor: '#fff',
        height: 150,
        marginTop: 15,
        width: '90%',
        backgroundColor: '#E4E4E4',
        alignSelf: 'center',
    },
    button: {
        width: '80%',
        height: 64,
        borderRadius: 20,
        backgroundColor: '#EC5D78',
        color: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
        alignSelf: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    errorText: {
        paddingTop: 8, paddingLeft: 25, color: "#f75959"
    },
      chipContainer: {
        flexDirection: 'row'
    }
});

export default FeedbackScreen;
