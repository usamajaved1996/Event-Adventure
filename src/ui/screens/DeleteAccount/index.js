import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import Header from '../../modules/header/header';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { clearUser, deleteAccount } from '../../../slices/authSlice';
import { useDispatch,useSelector } from 'react-redux';
import { toastMsg } from '../../modules/Toast';

const DeleteAccount = ({ navigation }) => {
    const user = useSelector(state => state.auth.user);

    const [reason, setReason] = useState('');
    const [loading, setIsLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const dispatch = useDispatch();
    // const handleDeleteAccount = () => {
    //     // Add logic to handle account deletion based on the provided reason
    //     console.log('Account deleted with reason:', reason);
    //     setIsLoading(true);

    //     // Simulate an asynchronous operation (e.g., API call) for demonstration purposes
    //     setTimeout(() => {
    //         setIsLoading(false);
    //         setModalVisible(true);
    //     }, 2000);
    // };
    const handleDeleteAccount = async () => {
        setIsLoading(true)
        const deleteData = await dispatch(deleteAccount(user.object.id));
        console.warn('res', deleteData.payload)
        if (deleteData?.payload) {
            toastMsg(deleteData.payload.message)
            clearUserDataFromStorage();
        }
        setIsLoading(false)

    };
    const closeModal = () => {
        setModalVisible(false);
        // Optionally, navigate to another screen or perform additional actions after closing the modal
    };
    const clearUserDataFromStorage = async () => {
        try {
            await AsyncStorage.removeItem('userData');
            // await auth().signOut().then((res) => console.log("test", res)).catch((e) => {
            //   console.log("error signout", e)
            // })
            await dispatch(clearUser());
        } catch (error) {
            console.error('Error clearing user data from AsyncStorage:', error);
        }
    };
    return (
        <View style={styles.container}>
            <Header title={'Delete Account'} />
            <View style={styles.separator} />
            <Text style={styles.heading}>Reason</Text>
            <TextInput
                style={styles.input}
                placeholder="Description"
                multiline
                numberOfLines={8}
                value={reason}
                onChangeText={setReason}
                textAlignVertical="top"
            />
            {loading === true ? (
                <ActivityIndicator size="large" color="#EC5D78" />
            ) : (
                <TouchableOpacity style={styles.button} onPress={handleDeleteAccount}>
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
            )}
            <Modal
                animationIn="slideInUp"
                animationOut="slideOutDown"
                backdropOpacity={0.85}
                backdropColor="black"
                visible={modalVisible}
                onRequestClose={closeModal}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Request Submit</Text>
                        <Text style={styles.modalText2}>The request have been Submitted </Text>
                        <Text style={styles.modalText2}>to the admin for deleting your account. </Text>
                        <Text style={styles.modalText2}>Our Representative will contact you shortly. </Text>
                        <TouchableOpacity
                            style={styles.logoutButtonContainer}
                            onPress={clearUserDataFromStorage}
                        >
                            <Text style={styles.buttonText}>Continue</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
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
        borderWidth: 0.8,
        borderColor: '#F6F6F6',
        marginTop: 20,
        marginBottom: 10,
    },
    heading: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 16,
        color: '#353535',
        marginLeft: 20
    },
    input: {
        borderWidth: 1,
        borderColor: '#BBB',
        borderRadius: 20,
        width: '85%',
        alignSelf: 'center',
        backgroundColor: '#E4E4E4',
        padding: 20
    },
    button: {
        width: '85%',
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
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    modalText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    modalButton: {
        backgroundColor: '#EC5D78',
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    modalButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
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
        marginTop: 8
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

export default DeleteAccount;
