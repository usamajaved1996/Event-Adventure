import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, Image, TextInput, FlatList, TouchableOpacity, KeyboardAvoidingView, ScrollView } from 'react-native';
import moment from 'moment';
import User from '../../../assets/icons/userPic.png';
import Sent from '../../../assets/icons/sent.png';
import CustomHeader from '../../modules/header/customHeader';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation from React Navigation

const Chat = ({ route }) => {
    const { event } = route.params;
    const [newMessage, setNewMessage] = useState('');
    const navigation = useNavigation(); // Get navigation object from React Navigation
    const scrollViewRef = useRef(null); // Add a ref to the ScrollView

    const [selectedChip, setSelectedChip] = useState(3);
    const [messages, setMessages] = useState([
        {
            id: 1,
            sent: true,
            msg: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor exercitation.',
            image: 'https://www.bootdey.com/img/Content/avatar/avatar1.png',
        },
        {
            id: 3,
            sent: false,
            msg: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor exercitation.',
            image: 'https://www.bootdey.com/img/Content/avatar/avatar6.png',
            name: 'Willian Roy'
        },
        {
            id: 4,
            sent: true,
            msg: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor exercitation.',
            image: 'https://www.bootdey.com/img/Content/avatar/avatar1.png',
        },
    ]);

    const handleSend = () => {
        if (newMessage.trim() !== '') {
            setMessages((prevMessages) => [
                ...prevMessages,
                {
                    id: prevMessages.length + 1,
                    sent: true,
                    msg: newMessage,
                    image: 'https://www.bootdey.com/img/Content/avatar/avatar1.png',
                    timestamp: new Date().toISOString(),
                },
            ]);
            setNewMessage('');
        }
    };
    const renderItem = ({ item }) => {
        const timeAgo = '9:34 pm';

        if (item.sent === false) {
            return (
                <View>
                    <View style={styles.eachMsg}>
                        <Image source={User} style={styles.userPic} />
                        <View style={styles.msgBlock}>
                            <Text style={{ color: '#EC5D78', paddingBottom: 12, fontWeight: '600', fontSize: 16 }}>{item.name}</Text>
                            <Text style={styles.msgTxt}>{item.msg}</Text>
                        </View>
                    </View>
                    <View style={{ alignItems: 'flex-end', marginRight: 30, marginTop: 5, marginBottom: 10 }}>
                        <Text style={{ color: '#EC5D78', fontSize: 14, fontWeight: '500' }}>{timeAgo}</Text>
                    </View>
                </View>
            );
        } else {
            return (
                <View>
                    <View style={styles.rightMsg}>
                        <View style={styles.rightBlock}>
                            <Text style={styles.rightTxt}>{item.msg}</Text>
                        </View>
                    </View>
                    <View style={{ marginLeft: 70, marginTop: 5 }}>
                        <Text style={{ color: '#8B868A', fontSize: 14, fontWeight: '500' }}>{timeAgo}</Text>
                    </View>
                </View>
            );
        }
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
        setSelectedChip(3);
        navigation.navigate('CarPool', { event });
        scrollToBottom(); // Scroll to the end of ScrollView

    };
    function handlePhotosClick() {
        navigation.navigate('Photos', { event });
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
    const scrollToBottom = () => {
        // scrollViewRef.current.scrollToEnd({ animated: true });
    };
    return (
        <KeyboardAvoidingView style={styles.container} behavior={'padding'} keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}>
            <CustomHeader title={'Car Pool'} />
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
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <FlatList
                    style={styles.list}
                    extraData={messages}
                    data={messages}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderItem}
                />
            </ScrollView>
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Type your Message here..."
                    placeholderTextColor="#353535"
                    style={styles.input}
                    value={newMessage}
                    onChangeText={(text) => setNewMessage(text)}
                />
                <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
                    <Image source={Sent} />
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: 'white'
    },
    list: {
        flex: 1,
    },
    eachMsg: {
        flexDirection: 'row',
        margin: 5,
        width: '90%',
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 20,
        backgroundColor: '#fff',
        padding: 15,
        marginLeft: 20,
        borderWidth: 1,
        borderColor: '#F6F6F6',
    },
    rightMsg: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        margin: 5,
        alignSelf: 'flex-end',
    },
    userPic: {
        height: 40,
        width: 40,
        margin: 5,
        borderRadius: 20,
        backgroundColor: '#f8f8f8',
        marginTop: 10,
    },
    msgBlock: {
        width: '92%',
        padding: 10,
    },
    rightBlock: {
        width: '80%',
        borderRadius: 20,
        backgroundColor: '#EC5D78',
        padding: 15,
        shadowColor: '#3d3d3d',
        shadowRadius: 2,
        shadowOpacity: 0.5,
        shadowOffset: {
            height: 1,
        },
        marginRight: 14,
    },
    msgTxt: {
        fontSize: 12,
        color: '#707070',
        fontWeight: '500',
    },
    rightTxt: {
        fontSize: 12,
        color: '#fff',
        fontWeight: '500',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 20,
        borderColor: '#BBB',
        backgroundColor: '#E4E4E4',
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginHorizontal: 10,
        marginBottom: 10,
    },
    input: {
        flex: 1,
        color: 'black',
        fontSize: 16,
    },
    sendButton: {
        marginLeft: 10,
    },
    chipContainer: {
        flexDirection: 'row',
        marginBottom:24
    }
});

export default Chat;
