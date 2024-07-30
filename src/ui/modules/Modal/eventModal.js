import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Modal from 'react-native-modal';
import Calendar from '../../../assets/icons/eventCalendar.png';

const EventModal = ({ isVisible, onEvent, onCancel }) => {
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
                    <Image source={Calendar} />

                    <Text style={styles.modalText}>There is a Event Nearby Wanna Join?</Text>
                    <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'center' }}>

                        <TouchableOpacity
                            style={styles.cancelBtn}
                            onPress={onCancel}
                        >
                            <Text style={styles.cancelText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.logoutButtonContainer}
                            onPress={onEvent}
                        >
                            <Text style={styles.buttonText}>Go to Event</Text>
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
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontSize: 24,
        fontWeight: '600',
        color: '#353535',
        marginTop: 8,
        paddingLeft: 10,
        paddingRight: 10
    },
    modalText2: {
        textAlign: 'center',
        fontSize: 14,
        fontWeight: '500',
        color: '#707070'
    },
    logoutButtonContainer: {
        backgroundColor: '#EC5D78',
        borderRadius: 20,
        padding: 20,
        width: '40%', // set button width to 100%
        marginTop: 20,
        height: 64
    },
    cancelBtn: {
        borderRadius: 20,
        padding: 20,
        width: '40%', // set button width to 100%
        marginTop: 20,
        height: 64,
        borderWidth: 1,
        borderColor: '#BBB',
        marginRight: 20
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '600',
    },
    cancelText: {
        color: '#353535',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '600',
    }
});

export default EventModal;