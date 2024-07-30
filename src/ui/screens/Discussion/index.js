import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    FlatList,
    Dimensions,
    KeyboardAvoidingView,
    TouchableOpacity,
} from 'react-native';
import moment from 'moment'; // Import moment library
import User from '../../../assets/icons/userPic.png';
import Sent from '../../../assets/icons/sent.png';
import Header from '../../modules/header/header';

const { width, height } = Dimensions.get('window');

const Discussion = () => {
    const [newMessage, setNewMessage] = useState('');
    const [messages, setMessages] = useState([
        {
            id: 1,
            sent: true,
            msg:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor exercitation.  sed do eiusmod tempor exercitation.',
            image: 'https://www.bootdey.com/img/Content/avatar/avatar1.png',
        },
        {
            id: 3,
            sent: false,
            msg: 'Lorem ipsum dolor sit amet, consectetur adipisng elit, sed do eiusmod tempor exercitation.  sed do eiusmod tempor exercitation.',
            image: 'https://www.bootdey.com/img/Content/avatar/avatar6.png',
            name: 'Willian Roy'
        },
        {
            id: 4,
            sent: true,
            msg:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor exercitation.  sed do eiusmod tempor exercitation.',
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
                    timestamp: new Date().toISOString(), // Add timestamp here

                },
            ]);
            setNewMessage('');
        }
    };

    const renderItem = ({ item }) => {
        const timeAgo = '9:34 pm' // Calculate time ago

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
                    <View style={{ marginLeft: 0, marginTop: 5 ,alignItems:'flex-end', marginRight:30, marginTop:5, marginBottom:10}}>
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

    return (
        <View style={{ flex: 1, backgroundColor:'#fff' }}>
            <KeyboardAvoidingView behavior="padding" style={styles.keyboard}>
            <Header title={'General Discussion'} />
                <View style={styles.separator} />
                <Text style={{ textAlign: 'center', paddingTop: 20, paddingBottom: 50 }}>
                    Tuesday, 25 July 2023 - 9:34 pm
                </Text>
                <FlatList
                    style={styles.list}
                    extraData={messages}
                    data={messages}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderItem}
                />
                <View style={{ flexDirection: 'row' }}>
                    <View style={styles.inputContainer2}>
                        <TextInput
                            placeholder="Type your Message here..."
                            placeholderTextColor="#353535"
                            style={{ color: '#353535', paddingLeft: 15, fontSize: 16 }}
                            value={newMessage}
                            onChangeText={(text) => setNewMessage(text)}
                        />
                        <TouchableOpacity style={styles.eyeIcon} onPress={handleSend}>
                            <Image source={Sent} />
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </View>
    );
};
const styles = StyleSheet.create({
    keyboard: {
        flex: 1,
        justifyContent: 'center',
    },
    separator: {
        width: '90%',
        alignSelf: 'center',
        borderWidth: 0.8,
        borderColor: '#F6F6F6',
        marginTop: 20,
        marginBottom: 10,

    },
    image: {
        width,
        height,
    },
    header: {
        height: 65,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#075e54',
    },
    left: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    right: {
        flexDirection: 'row',
    },
    chatTitle: {
        color: '#fff',
        fontWeight: '600',
        margin: 10,
        fontSize: 15,
    },
    chatImage: {
        width: 30,
        height: 30,
        borderRadius: 15,
        margin: 5,
    },
    input: {
        flexDirection: 'row',
        alignSelf: 'flex-end',
        padding: 10,
        height: 40,
        width: width - 20,
        backgroundColor: '#fff',
        margin: 10,
        shadowColor: '#3d3d3d',
        shadowRadius: 2,
        shadowOpacity: 0.5,
        shadowOffset: {
            height: 1,
        },
        borderColor: '#696969',
        borderWidth: 1,
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
        borderColor: '#F6F6F6'

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
        marginTop: 10
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
        marginRight: 14
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
    inputContainer2: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 20,
        zIndex: 0,
        borderColor: '#BBB',
        height: 64,
        marginTop: 25,
        width: '90%',
        backgroundColor: '#E4E4E4',
        marginLeft: 18,
        marginBottom:10
    },
    input: {
        flex: 1,
        padding: 8,
        marginRight: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
    },

    eyeIcon: {
        position: 'absolute',
        right: 20,
    },
})
export default Discussion;
