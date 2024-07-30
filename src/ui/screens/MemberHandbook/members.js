import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native';
import { Card } from 'react-native-paper';
import Header from '../../modules/header/header';
import MainImg from '../../../assets/images/adventure.png';
import WebView from 'react-native-webview';

const MemberDetail = ({ navigation }) => {
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsLoading(false);
        }, 3000); // Adjust the timeout duration as needed

        return () => clearTimeout(timeout);
    }, []);
    return (
        <View style={styles.mainContainer}>
            <Header title={'25 Tips For New Adventure'} />
            <View style={styles.separator} />
            {isLoading && (
                <ActivityIndicator size="large" color="#EC5D78" style={{ marginTop: 100 }} />
            )}
            <WebView
                style={styles.map}
                source={{ uri: 'https://singles.eventsandadventures.com/website/message.aspx?Handbook-25tips' }}
                onLoadStart={() => setIsLoading(true)}
                onLoad={() => setIsLoading(false)}
            />
            {/* <ScrollView>
                <Card style={styles.CardStyle}>
                    <View style={styles.CardTopPart}>
                        <Image source={MainImg} style={{ width: '95%', alignSelf: 'center', borderRadius: 16, marginTop: 8 }} />
                        <View style={{ paddingLeft: 15, paddingTop: 15, paddingRight: 10 }}>
                            <Text style={styles.text}>Ballet Under the Stars allows Arizona communities to enjoy dance in a unique outdoor setting complete with a stage, lighting, costumes, and beautiful Arizona weather.</Text>
                            <Text style={styles.text}>Public consumption of alcohol is a criminal offense that is considered a Class 2 Misdemeanor. As a class 2 misdemeanor, penalties for public consumption of alcohol can be severe, with a maximum of 4 months jail, fines of $750 plus surcharges and up to 2 years probation. You must be a permit holder that is responsible for ensuring that all members of the party are of legal age to consume alcoholic beverages according to Arizona State Law.</Text>
                            <Text style={styles.text}>Public consumption of alcohol is a criminal offense that is considered a Class 2 Misdemeanor. As a class 2 misdemeanor, penalties for public consumption of alcohol can be severe, with a maximum of 4 months jail, fines of $750 plus surcharges and up to 2 years probation. You must be a permit holder that is responsible for ensuring that all members of the party are of legal age to consume alcoholic beverages according to Arizona State Law.</Text>
                        </View>
                    </View>
                </Card>
            </ScrollView> */}

        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
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
    CardStyle: {
        width: '90%',
        alignSelf: 'center',
        marginTop: 15,
        borderRadius: 20,
        elevation: 5, // Add this line for box shadow
        height: 'auto',
        marginBottom: 20
    },
    CardTopPart: {
        // padding: 16,
    },
    TopTextStyle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    text: {
        fontSize: 14, fontWeight: '500', color: '#707070', paddingBottom: 15
    }
});

export default MemberDetail;
