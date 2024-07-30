import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import Img1 from '../../../assets/icons/noti1.png';
import Img2 from '../../../assets/icons/noti2.png'
import Img3 from '../../../assets/icons/noti3.png'
import Img4 from '../../../assets/icons/noti4.png'
import Img5 from '../../../assets/icons/noti5.png'
import Img6 from '../../../assets/icons/noti6.png'
import Img7 from '../../../assets/icons/noti7.png'
import Header from "../../modules/header/header";

const Term = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Header title={'Terms & Conditions'} />

            <View style={{ width: '90%', alignContent: 'center', alignSelf: 'center', borderWidth: 0.8, borderColor: '#F6F6F6', marginTop: 10 }} />
            <View style={{ padding: 24 }}>
                <Text style={{ fontSize: 18, fontWeight: '500', color: 'black' }}>
                    Nullam Porta Diam Id Dolor
                </Text>
                <View style={{ marginTop: 20 }}>
                    <Text style={{ fontSize: 14, fontWeight: '500', color: '#5B5B5B' }}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris consectetur
                        nisl sapien, in consectetur turpis posuere in. Vestibulum arcu metus, vestibulum in egestas quis, facilisis vel nisl. Curabitur aliquam felis et ullamcorper ultrices. Mauris iaculis sapien fermentum eros finibus, id interdum nulla scelerisque. Nulla lacinia volutpat consectetur. Nunc hendrerit odio at felis porttitor, vel ornare erat elementum. Aliquam nec massa neque. Donec dignissim libero ac metus maximus, a accumsan diam bibendum. Nullam vitae urna ultricies, commodo tellus eu, tempor leo. Pellentesque lorem augue, viverra et eleifend eget, volutpat vitae mi.
                    </Text>
                </View>
            </View>
            <View style={{ padding: 24 }}>
                <Text style={{ fontSize: 18, fontWeight: '500', color: 'black' }}>
                    Nullam Porta Diam Id Dolor
                </Text>
                <View style={{ marginTop: 20 }}>
                    <Text style={{ fontSize: 14, fontWeight: '500', color: '#5B5B5B' }}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris consectetur nisl sapien, in consectetur turpis posuere in. Vestibulum arcu metus, vestibulum in egestas quis, facilisis vel nisl. Curabitur aliquam felis et ullamcorper ultrices. Mauris iaculis sapien fermentum eros finibus, id interdum nulla scelerisque. Nulla lacinia volutpat consectetur. Nunc hendrerit odio at felis porttitor, vel ornare erat elementum. Aliquam nec massa neque. Donec dignissim. id interdum nulla scelerisque. Nulla lacinia volutpat consectetur. Nunc hendrerit odio at felis porttitor, vel ornare erat elementum. Aliquam nec massa neque. Donec dignissim.
                    </Text>
                </View>
            </View>

        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#fff'
    },
});
export default Term;
