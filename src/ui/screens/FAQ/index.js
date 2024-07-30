import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import Header from "../../modules/header/header";
import Down from '../../../assets/icons/arrowDown.png';
import Up from '../../../assets/icons/arrowUp.png';
import WebView from 'react-native-webview';

const FAQ = ({ navigation }) => {
    const [isTextCollapsed1, setIsTextCollapsed1] = useState(true);
    const [isTextCollapsed2, setIsTextCollapsed2] = useState(true);
    const [isTextCollapsed3, setIsTextCollapsed3] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsLoading(false);
        }, 3000); // Adjust the timeout duration as needed

        return () => clearTimeout(timeout);
    }, []);
    const toggleTextCollapse = (viewNumber) => {
        switch (viewNumber) {
            case 1:
                setIsTextCollapsed1(!isTextCollapsed1);
                break;
            case 2:
                setIsTextCollapsed2(!isTextCollapsed2);
                break;
            case 3:
                setIsTextCollapsed3(!isTextCollapsed3);
                break;
            default:
                break;
        }
    };

    return (
        <View style={styles.container}>
            <Header title={'FAQs'} />
            <View style={{ width: '90%', alignContent: 'center', alignSelf: 'center', borderWidth: 0.8, borderColor: '#F6F6F6', marginTop: 10 }} />

            {isLoading && (
                <ActivityIndicator size="large" color="#EC5D78" style={{ marginTop: 100 }} />
            )}
            <WebView
                style={styles.map}
                source={{ uri: 'https://singles.eventsandadventures.com/website/message.aspx?msg=FAQ' }}
                onLoadStart={() => setIsLoading(true)}
                onLoad={() => setIsLoading(false)}
            />

            {/* <TouchableOpacity onPress={() => toggleTextCollapse(1)} style={[styles.headingContainer, { height: isTextCollapsed1 ? 75 : 'auto' }]}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={styles.headingText}>Event Cancellations</Text>
                    <Image source={isTextCollapsed1 ? Down : Up} style={styles.icon} />
                </View>
                {!isTextCollapsed1 && (
                    <Text style={styles.contentText}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris consectetur nisl sapien, in consectetur turpis posuere in. Vestibulum arcu metus, vestibulum in egestas quis, facilisis vel nisl. Curabitur aliquam felis et ullamcorper ultrices. Mauris iaculis sapien fermentum eros finibus,
                    </Text>
                )}
            </TouchableOpacity>

            <TouchableOpacity onPress={() => toggleTextCollapse(2)} style={[styles.headingContainer, { height: isTextCollapsed2 ? 75 : 'auto' }]}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={styles.headingText}>A quick note about politics</Text>
                    <Image source={isTextCollapsed2 ? Down : Up} style={styles.icon} />
                </View>
                {!isTextCollapsed2 && (
                    <Text style={styles.contentText}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris consectetur nisl sapien, in consectetur turpis posuere in. Vestibulum arcu metus, vestibulum in egestas quis, facilisis vel nisl. Curabitur aliquam felis et ullamcorper ultrices. Mauris iaculis sapien fermentum eros finibus,
                    </Text>
                )}
            </TouchableOpacity>

            <TouchableOpacity onPress={() => toggleTextCollapse(3)} style={[styles.headingContainer, { height: isTextCollapsed3 ? 75 : 'auto' }]}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={styles.headingText}>Contacting the Phoenix Club</Text>
                    <Image source={isTextCollapsed3 ? Down : Up} style={styles.icon} />
                </View>
                {!isTextCollapsed3 && (
                    <Text style={styles.contentText}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris consectetur nisl sapien, in consectetur turpis posuere in. Vestibulum arcu metus, vestibulum in egestas quis, facilisis vel nisl. Curabitur aliquam felis et ullamcorper ultrices. Mauris iaculis sapien fermentum eros finibus,
                    </Text>
                )}
            </TouchableOpacity>  */}

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    map: {
        flex: 1,
    },
    headingContainer: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderWidth: 0.8,
        borderColor: '#D8D8D8',
        marginTop: 20,
        width: '92%',
        alignSelf: 'center',
        borderRadius: 20,
        marginBottom: 10,
    },
    headingText: {
        flex: 1,
        fontSize: 14,
        fontWeight: '500',
        color: '#353535',
        paddingTop: 15
    },
    icon: {
        width: 24,
        height: 24,
        marginLeft: 10,
        marginTop: 15

    },
    contentText: {
        marginTop: 10,
        fontSize: 12,
        fontWeight: '500',
        color: '#5B5B5B',
        paddingTop: 15
    },
});

export default FAQ;
