import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, FlatList, ActivityIndicator } from 'react-native';
import Img1 from '../../../assets/images/event1.png';
import Img2 from '../../../assets/images/event2.png';
import Img3 from '../../../assets/images/event3.png';
import Img4 from '../../../assets/images/event4.png';
import { useDispatch, useSelector } from 'react-redux';
import { getJointEventList } from '../../../slices/eventSlice';
import Moment from 'moment';

const Events = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const jointEvents = useSelector(state => state.event.jointEventsList);
  const user = useSelector(state => state.auth.user);
  console.warn('joint event list data', jointEvents, user)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getJointEventList(user.object.id)).then(() => setLoading(false));
  }, []);
  const onClickEvent = (event) => {
    console.warn('event', event)
    navigation.navigate('Detail', { event });
  };
  const renderItem = (item, index) => {
    console.warn('item', item)
    return (
      <TouchableOpacity style={styles.mainView} activeOpacity={0.4} onPress={() => onClickEvent(item)}>
        <View style={styles.imageView}>
          {item.clipart !== null ? (
            <Image source={{ uri: item.clipart }} style={styles.image} />
          ) : (
            <Image source={require('../../../assets/images/event1.png')} style={styles.image} />
          )}
          <View style={styles.overlay}>

            <View style={styles.overlayTop}>
              <Text style={styles.overlayText1}>{item.eventName}</Text>
              <Text style={styles.overlayText2}>{item.location}</Text>
            </View>
            <View style={styles.overlayBottom}>
              <Text style={styles.overlayTextDate}>{Moment(item.eventDateTime).format('D')}</Text>
              <Text style={styles.overlayTextDay}>{Moment(item.eventDateTime).format('MMM')}</Text>
              <Text style={styles.overlayTextTime}>{Moment(item.eventDateTime).format('hh:mm A')}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.goingButton}>
            <Text style={styles.goingText}>GOING</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#EC5D78" style={{ marginTop: '40%', marginBottom: '40%' }} />
      ) : (
        <View>
          <View style={styles.separator} />
          {jointEvents.length === 0 ? ( // Check if the jointEvents array is empty
            <Text style={styles.noDataText}>No events available</Text>
          ) : (
            <FlatList
              data={jointEvents}
              renderItem={({ item, index }) => renderItem(item, index)}
              keyExtractor={(item, index) => index.toString()}
            />
          )}
        </View>
      )}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'white'
  },
  separator: {
    width: '90%',
    alignSelf: 'center',
    borderWidth: 0.8,
    borderColor: '#F6F6F6',
    marginTop: 20,
    marginBottom: 25,
  },
  imageView: {
    alignItems: 'center',
    marginBottom: 30
  },
  midText: {
    paddingLeft: 16, paddingRight: 16, paddingTop: 10
  },
  image: {
    width: '92%',
    height: 200, // Set the height as needed
    borderRadius: 18,
    overflow: 'hidden',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 18,
    justifyContent: 'space-between',
    width: '90%',
    alignItems: 'center',
    left: '4%', // Adjust this value to set the distance from the left edge
  },
  overlayTop: {
    position: 'absolute',
    top: 16,
    left: 16,
  },
  overlayBottom: {
    position: 'absolute',
    bottom: 20,
    left: 25,
    flexDirection: 'column',
  },
  overlayText1: {
    color: 'white',
    fontSize: 18,
    marginBottom: 6,
    fontWeight: '600',
    marginLeft: 10
  },
  overlayText2: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 10
  },
  overlayTextDate: {
    color: 'white',
    fontSize: 24,
    fontWeight: '600',
  },
  overlayTextDay: {
    color: 'white',
    fontSize: 12,
    fontWeight: '400',
  },
  overlayTextTime: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
  goingButton: {
    position: 'absolute',
    bottom: 20,
    right: 40,
    backgroundColor: '#FFFFFFCC', // Set your desired background color
    padding: 10,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15
  },
  goingText: {
    color: '#EC5D78',
    fontSize: 12,
    fontWeight: '500',
  },
  noDataText: {
    textAlign: 'center',
    fontSize: 20
  }

});
export default Events;

