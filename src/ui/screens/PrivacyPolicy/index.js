import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import Header from "../../modules/header/header";
import WebView from 'react-native-webview';

const Privacy = ({ navigation }) => {
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsLoading(false);
        }, 3000); // Adjust the timeout duration as needed

        return () => clearTimeout(timeout);
    }, []);
    return (
        <View style={styles.container}>
            <Header title={'Privacy Policy'} />
            <View style={{ width: '90%', alignContent: 'center', alignSelf: 'center', borderWidth: 0.8, borderColor: '#F6F6F6', marginTop: 10 }} />

            {isLoading && (
                <ActivityIndicator size="large" color="#EC5D78" style={{ marginTop: 100 }} />
            )}
            <WebView
                style={styles.map}
                source={{ uri: 'https://eventsandadventures.com/privacypolicy/' }}
                onLoadStart={() => setIsLoading(true)}
                onLoad={() => setIsLoading(false)}
            />
            {/* <View style={{ padding: 24 }}>
                <Text style={{ fontSize: 18, fontWeight: '500', color:'black'}}>
                    Nullam Porta Diam Id Dolor
                </Text>
                <View style={{ marginTop: 20 }}>
                    <Text style={{ fontSize: 14, fontWeight: '500', color:'#5B5B5B' }}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris consectetur
                        nisl sapien, in consectetur turpis posuere in. Vestibulum arcu metus, vestibulum in egestas quis, facilisis vel nisl. Curabitur aliquam felis et ullamcorper ultrices. Mauris iaculis sapien fermentum eros finibus, id interdum nulla scelerisque. Nulla lacinia volutpat consectetur. Nunc hendrerit odio at felis porttitor, vel ornare erat elementum. Aliquam nec massa neque. Donec dignissim libero ac metus maximus, a accumsan diam bibendum. Nullam vitae urna ultricies, commodo tellus eu, tempor leo. Pellentesque lorem augue, viverra et eleifend eget, volutpat vitae mi.
                    </Text>
                </View>
            </View>
            <View style={{ padding: 24 }}>
                <Text style={{ fontSize: 18, fontWeight: '500', color:'black' }}>
                    Nullam Porta Diam Id Dolor
                </Text>
                <View style={{ marginTop: 20 }}>
                    <Text style={{ fontSize: 14, fontWeight: '500', color:'#5B5B5B' }}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris consectetur nisl sapien, in consectetur turpis posuere in. Vestibulum arcu metus, vestibulum in egestas quis, facilisis vel nisl. Curabitur aliquam felis et ullamcorper ultrices. Mauris iaculis sapien fermentum eros finibus, id interdum nulla scelerisque. Nulla lacinia volutpat consectetur. Nunc hendrerit odio at felis porttitor, vel ornare erat elementum. Aliquam nec massa neque. Donec dignissim. id interdum nulla scelerisque. Nulla lacinia volutpat consectetur. Nunc hendrerit odio at felis porttitor, vel ornare erat elementum. Aliquam nec massa neque. Donec dignissim.
                    </Text>
                </View>
            </View> */}

        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#fff'
    },
    map: {
        flex: 1,
    },
});
export default Privacy;
