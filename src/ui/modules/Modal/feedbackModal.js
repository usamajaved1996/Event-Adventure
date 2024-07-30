import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Modal from 'react-native-modal';
import FeedbackImg from '../../../assets/icons/feedback.png';

const FeedBackModal = ({ isVisible, onDelete, onCancel }) => {
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
                    <Image source={FeedbackImg} />
                    <Text style={styles.modalText2}>Feedback Has been Send </Text>
                    <TouchableOpacity
                        style={styles.logoutButtonContainer}
                        onPress={onDelete}
                    >
                        <Text style={styles.buttonText}>Done</Text>
                    </TouchableOpacity>
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
        // padding: 50,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '100%', // or use a specific width value if needed
        paddingTop: 25,
        paddingBottom: 25

    },
    modalText2: {
        textAlign: 'center',
        fontSize: 24,
        fontWeight: '600',
        color: '#353535',
        paddingTop:20,
        paddingBottom:10
    },
    logoutButtonContainer: {
        backgroundColor: '#EC5D78',
        borderRadius: 20,
        padding: 15,
        width: '80%', // set button width to 100%
        marginTop: 20
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '500',
    },
});

export default FeedBackModal;