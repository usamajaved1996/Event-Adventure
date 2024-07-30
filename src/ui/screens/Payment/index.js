import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';
import { RadioButton } from 'react-native-paper';
import Button from '../../modules/Button';

const PaymentScreen = () => {
    const [cardType, setCardType] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCVV] = useState('');
    const [cardHolderName, setCardHolderName] = useState('');

    const handlePayment = () => {
        // Handle payment logic here
        console.log('Payment submitted');
    };

    const CardTypeRadio = ({ cardName }) => (
        <View style={styles.radioContainer}>
            <Text style={styles.radioText}>{cardName}</Text>
            <RadioButton
                value={cardName}
                status={cardType === cardName ? 'checked' : 'unchecked'}
                onPress={() => setCardType(cardName)}
                color="#0069c0"
            />
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Payment Information</Text>
            
            <View style={styles.cardTypeContainer}>
                <View style={styles.row}>
                    <CardTypeRadio cardName="Visa" />
                    <CardTypeRadio cardName="MasterCard" />
                </View>
                <View style={styles.row}>
                    <CardTypeRadio cardName="American Express" />
                    <CardTypeRadio cardName="Discover" />
                </View>
                <View style={styles.row}>
                    <CardTypeRadio cardName="PayPal" />
                </View>
            </View>

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Card Number"
                    keyboardType="numeric"
                    value={cardNumber}
                    onChangeText={text => setCardNumber(text)}
                />
            </View>

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Expiry Date (MM/YY)"
                    keyboardType="numeric"
                    value={expiryDate}
                    onChangeText={text => setExpiryDate(text)}
                />
            </View>

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="CVV"
                    keyboardType="numeric"
                    value={cvv}
                    onChangeText={text => setCVV(text)}
                />
            </View>

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Card Holder Name"
                    value={cardHolderName}
                    onChangeText={text => setCardHolderName(text)}
                />
            </View>

            <View style={styles.buttonContainer}>
                <Button title="Pay Now" onPress={handlePayment} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        paddingHorizontal: 20,
        backgroundColor: 'white'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        marginTop: 44
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
        marginTop: 25,
        width: '90%',
        backgroundColor: '#E4E4E4',
        alignSelf: 'center',
    },
    input: {
        color: '#353535', paddingLeft: 15
    },
    cardTypeContainer: {
        marginBottom: 20,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    radioContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 20,
    },
    radioText: {
        marginRight: 10,
    },
    buttonContainer: {
        marginTop: 20,
    },
});

export default PaymentScreen;
