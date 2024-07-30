import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, FlatList, ActivityIndicator, TouchableWithoutFeedback } from 'react-native';
import Img1 from '../../../assets/images/trip1.png'
import Img2 from '../../../assets/images/trip2.png'
import Img3 from '../../../assets/images/trip3.png'
import Circle from '../../../assets/icons/circleBadge.png'
import More from '../../../assets/icons/more.png'
import { useDispatch, useSelector } from 'react-redux';
import { getTrips } from '../../../slices/eventSlice';
import Moment from 'moment';

const Trip = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const trips = useSelector(state => state.event.tripsList);
  console.warn('trips data', trips)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTrips()).then(() => setLoading(false));

  }, []);
  const onClickEvent = (event) => {
    console.warn('event', event)
    navigation.navigate('DetailScreen', { event });
  };

  const renderItem = (item, index) => {
    const eventDateTime = Moment(item.eventDateTime);
    const currentDate = Moment();
    const daysDiff = currentDate.diff(eventDateTime, 'days');

    return (
      <TouchableOpacity style={styles.mainView} activeOpacity={0.4} onPress={() => onClickEvent(item)}>
        <View style={styles.imageView}>
          <Image source={{ uri: item.clipart }} style={styles.image} />
        </View>
        <View style={styles.midText}>
          <Text style={{ fontSize: 16, fontWeight: '700', color: '#353535' }}>{item.eventName}</Text>
        </View>
        <View style={styles.lastText}>
          <Image source={Circle} />
          {/* Display the time difference */}
          <Text style={{ fontSize: 12, fontWeight: '500', color: '#707070', paddingLeft: 8 }}>
            Event Advisor . {daysDiff} d
          </Text>
          <Image source={More} style={{ position: 'absolute', right: 25, top: 7 }} />
        </View>
        <View style={styles.separator2} />
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {loading == true ?
        <ActivityIndicator size="large" color="#EC5D78" style={{ marginTop: '40%', marginBottom: '40%' }} />
        :
        <View>
          {/* <Text style={styles.mainText}>Hi Suitch App Team (not an actual signup), we're glad you are here! Welcome to Events & Adventures. Head to your calendar to see what fun events we have coming up!</Text> */}
          <View style={styles.separator} />
          <FlatList
            data={trips}
            renderItem={({ item, index }) => renderItem(item, index)}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      }
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'white',
  },
  mainText: {
    padding: 14,
    fontSize: 14,
    fontWeight: '500',
    color: '#707070',
    paddingTop: 16
  },
  separator: {
    width: '90%',
    alignSelf: 'center',
    borderWidth: 0.8,
    borderColor: '#F6F6F6',
    marginTop: 10,
    marginBottom: 25,
  },
  separator2: {
    width: '90%',
    alignSelf: 'center',
    borderWidth: 0.8,
    borderColor: '#F6F6F6',
    marginTop: 15,
    marginBottom: 24,
  },
  image: {
    width: '92%',
    borderRadius: 18,
    height: 200
  },
  imageView: {
    alignItems: 'center'
  },
  midText: {
    paddingLeft: 16, paddingRight: 16, paddingTop: 10
  },
  lastText: {
    paddingLeft: 16, paddingRight: 16, paddingTop: 10,
    flexDirection: 'row'
  }
});
export default Trip;

