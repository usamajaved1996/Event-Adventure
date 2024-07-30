import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput } from 'react-native';
import Modal from 'react-native-modal';
import CrossIcon from '../../../assets/icons/cross.png';
import FacebookIcon from '../../../assets/icons/Facebook2.png';
import GmailIcon from '../../../assets/icons/gmail.png';
import WhatsAppIcon from '../../../assets/icons/whatsapp.png';
import CopyIcon from '../../../assets/icons/copy.png';
import Clipboard from '@react-native-clipboard/clipboard';
import Share from 'react-native-share';
import dynamicLinks from '@react-native-firebase/dynamic-links';

const ShareModal = ({ isVisible, onCancel, eventId }) => {
    console.log("eventId:", eventId);
    const [link, setLink] = useState(); // State to hold the link

    // Function to copy the link to the clipboard
    const copyLinkToClipboard = () => {
        Clipboard.setString(link);
    };

    // Function to share via Facebook
    const shareViaFacebook = () => {
        Share.open({ title: 'Share via', message: link })
            .then((res) => console.log(res))
            .catch((err) => err && console.log(err));
    };

    // Function to share via Gmail
    const shareViaGmail = () => {
        Share.open({ title: 'Share via', message: link })
            .then((res) => console.log(res))
            .catch((err) => err && console.log(err));
    };

    // Function to share via WhatsApp
    const shareViaWhatsApp = () => {
        Share.open({ title: 'Share via', message: link })
            .then((res) => console.log(res))
            .catch((err) => err && console.log(err));
    };
    useEffect(() => {
        const fetchData = async () => {
            let id = 123;
            try {
                const link = await dynamicLinks().buildShortLink({
                    link: `https://eventadventure.page.link/app?eventID=${eventId}`,
                    domainUriPrefix: 'https://eventadventure.page.link',
                    // android: {
                    //     packageName: 'com.events'
                    // }
                }, dynamicLinks.ShortLinkType.DEFAULT);
                console.log("link", link);
                setLink(link)
                return link;
            } catch (error) {
                console.error("Error generating link:", error);
            }
        };

        fetchData(); // Call the async function immediately

    }, []);


    return (
        <Modal
            isVisible={isVisible}
            animationIn="slideInUp"
            animationOut="slideOutDown"
            onBackdropPress={onCancel}
            backdropOpacity={0.8}
            backdropColor="black"
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <TouchableOpacity style={{ position: 'absolute', right: 15, top: 15 }} onPress={onCancel}>
                        <Image source={CrossIcon} />
                    </TouchableOpacity>
                    <Text style={styles.modalText}>Share</Text>

                    <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
                        <TouchableOpacity style={styles.socialIconContainer} onPress={shareViaFacebook}>
                            <Image source={FacebookIcon} style={styles.socialIcon} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.socialIconContainer} onPress={shareViaGmail}>
                            <Image source={GmailIcon} style={styles.socialIcon} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.socialIconContainer} onPress={shareViaWhatsApp}>
                            <Image source={WhatsAppIcon} style={styles.socialIcon} />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.copyButton} onPress={copyLinkToClipboard}>
                        <Text style={styles.copyButtonText}>Copy Link</Text>
                    </TouchableOpacity>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={{ color: '#5196FF', paddingLeft: 0 }}
                            value={link}
                            onChangeText={setLink}
                            placeholder="https://abced123/"
                        />

                        <TouchableOpacity style={styles.eyeIcon} onPress={copyLinkToClipboard}>
                            <Image source={CopyIcon} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        backgroundColor: 'white',
        borderRadius: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '100%',
        paddingTop: 25,
        paddingBottom: 25
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontSize: 24,
        fontWeight: '700',
        color: '#000B0D',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 20,
        paddingLeft: 20,
        zIndex: 0,
        borderColor: '#BBB',
        height: 64,
        marginTop: 25,
        width: '90%',
        backgroundColor: '#fff',
        alignSelf: 'center',
    },
    copyButton: {
        marginTop: 30,
    },
    copyButtonText: {
        color: '#000',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '500',
    },
    socialIconContainer: {
        backgroundColor: '#fff',
        width: 80,
        height: 80,
        borderRadius: 60,
        shadowColor: '#000',
        marginRight: 30,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    socialIcon: {
        width: 65,
        height: 65,
    },
    eyeIcon: {
        position: 'absolute',
        right: 20,
    },
});

export default ShareModal;
