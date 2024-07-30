import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, FlatList, ActivityIndicator } from 'react-native';
import GPS from '../../../assets/icons/gps.png';
import Cale from '../../../assets/icons/calendar.png';
import Right from '../../../assets/icons/arrowR.png';
import Left from '../../../assets/icons/arrowL.png';
import Circle from '../../../assets/icons/circle.png';
import EventModal from '../../modules/Modal/eventModal'
import { useDispatch, useSelector } from 'react-redux';
import { getEventList, getEventLocation } from '../../../slices/eventSlice';
import Moment from 'moment';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePickerModal from "react-native-modal-datetime-picker";

const Calender = ({ navigation }) => {
  const [loading, setLoading] = useState(true); // State for controlling loading
  const dispatch = useDispatch();
  const eventList = useSelector(state => state.event.eventList);
  const eventLocations = useSelector(state => state.event.eventLocation);

  const checkForProfileOpen = useSelector(state => state.auth.user);
  const [eventGroups, setEventGroups] = useState([]);
  const [selectedValue, setSelectedValue] = useState(null);
  const [openLocation, setOpenLocation] = useState(false);
  const [locationName, setLocationName] = useState([]);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState([]);
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const handleConfirm = (date) => {
    setSelectedDate(date)
    hideDatePicker();
  };
  // useEffect(() => {
  //   setTimeout(() => { // Introduce a slight delay
  //     // Check if isProfileCompleted is initially false
  //     if (!checkForProfileOpen.isProfileCompleted) {
  //       // Navigate to UpdateProfileUser if it's false
  //       navigation.navigate('UpdateProfileUser');
  //     } else {
  //       // If it's true, continue monitoring changes in the state
  //       const unsubscribe = navigation.addListener('focus', () => {
  //         // Check if isProfileCompleted becomes false after the app restarts
  //         if (!checkForProfileOpen.isProfileCompleted) {
  //           // If it becomes false, navigate to UpdateProfileUser
  //           navigation.navigate('UpdateProfileUser');
  //         }
  //       });
  //       // Clean up the subscription when the component unmounts
  //       return unsubscribe;
  //     }
  //   }, 500); // Adjust the delay time as needed
  // }, [checkForProfileOpen.isProfileCompleted, navigation]);
  useEffect(() => {
    const groupedEvents = groupEventsByDate(eventList);
    groupedEvents.sort((a, b) => parseInt(a.date) - parseInt(b.date));
    setEventGroups(groupedEvents);
  }, [eventList]);

  useEffect(() => {
    dispatch(getEventLocation());
  }, []);

  useEffect(() => {
    if (selectedValue && selectedDate) {
      dispatch(getEventList({ siteID: selectedValue, startDate: selectedDate }));
    }
  }, [selectedValue, selectedDate]);
  const groupEventsByDate = (events) => {
    if (!events || events.length === 0) {
      return [];
    }
    const groupedEvents = {};
    events.forEach((event) => {
      const dateKey = Moment(event.eventDateTime).format('DD');
      if (!groupedEvents[dateKey]) {
        groupedEvents[dateKey] = [];
      }
      groupedEvents[dateKey].push(event);
    });

    return Object.entries(groupedEvents).map(([date, events]) => ({
      date,
      day: Moment(events[0].eventDateTime).format('ddd'), // Assuming you want to display the day
      events,
    }));
  };
  const onClickEvent = (event) => {
    navigation.navigate('DetailScreen', { event });
  };
  const renderCalendarItem = ({ item }) => {
    return (
      <View style={styles.calendarItemContainer}>
        <View style={styles.dateContainer}>
          <Image source={Circle} style={styles.circleIcon} />
          <Text style={styles.dateText}>{item.date}</Text>
          <Text style={styles.dayText}>{item.day}</Text>
        </View>
        <View style={styles.eventContainer}>
          {item.events.map((event, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.eventCard, { backgroundColor: '#28B97C' }]}
              onPress={() => onClickEvent(event)}
            >
              <Text style={styles.eventName}>{event.eventName}</Text>
              <Text style={styles.eventTime}>{Moment(event.eventDateTime).format('h:mm A')}</Text>
              <Text style={[styles.eventDescription]}>{event.eventDescription} </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* {isModal && (
        <EventModal
          isVisible={true}
          onCancel={() => setIsModal(false)}
          onEvent={onClick}
        />
      )} */}
      <View style={{ flexDirection: 'row', marginTop: 25, marginLeft: 10, width: '100%', marginRight: 10 }}>
        <View style={{ width: '65%' }}>
          {eventLocations && (
            <DropDownPicker
              open={openLocation}
              value={selectedValue}
              items={eventLocations.map(location => ({
                label: location.SiteName,
                value: location.SiteID
              }))}
              setOpen={setOpenLocation}
              setValue={setSelectedValue}
              setItems={setLocationName}
              placeholder="Select Location"
              style={[
                {
                  height: 64,
                  width: '90%',
                  backgroundColor: '#E4E4E4',
                  borderWidth: 1, borderColor: '#BBBBBB', borderRadius: 16
                },
              ]}
              textStyle={{ color: 'black' }}
              arrowColor="black"
              dropDownContainerStyle={{ borderWidth: 1, borderColor: '#BBBBBB', borderRadius: 16, backgroundColor: '#E4E4E4', width: '90%', }}
              ArrowDownIconComponent={({ }) => (
                <Image source={GPS} />
              )}
              ArrowUpIconComponent={({ }) => (
                <Image source={GPS} />
              )}
            />
          )}
        </View>
        <TouchableOpacity
          style={{
            width: '30%',
            backgroundColor: '#E4E4E4',
            borderRadius: 16,
            borderWidth: 1,
            borderColor: '#BBBBBB',
            height: 64,
          }}
          onPress={showDatePicker}
        >
          <Text style={{ paddingTop: 20, paddingLeft: 20, color: 'black' }}>{selectedDate != null ? Moment(selectedDate).format('MMMM') : 'March'}</Text>
          <Image source={Cale} style={{ position: 'absolute', right: 10, top: 17 }} />
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      </View>

      <View style={{ flexDirection: 'row', padding: 20, width: '100%' }}>
        <View style={{ width: '80%' }}>
          <Text style={{ fontSize: 18, fontWeight: '500', color: 'black' }}>March</Text>
        </View>
        <TouchableOpacity>
          <Image source={Left} style={{ marginRight: 15 }} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={Right} />
        </TouchableOpacity>
      </View>

      <View>
        <FlatList
          data={eventGroups}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderCalendarItem}
          showsVerticalScrollIndicator={false}
        />
      </View>

    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'white',
  },
  calendarItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  dateContainer: {
    marginRight: 10,
    borderRightWidth: 2,
    borderColor: '#D4321C',
    paddingRight: 10,
  },
  circleIcon: {
    position: 'absolute',
    right: -6,
    top: -20,
  },
  dateText: {
    color: 'black',
    fontWeight: '500',
    fontSize: 24,
  },
  dayText: {
    color: 'black',
    fontWeight: '400',
    fontSize: 14,
    textAlign: 'center',
  },
  eventContainer: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
  },
  eventCard: {
    width: '50%',
    borderRadius: 15,
    marginVertical: 5,
    marginRight: 15,
    padding: 12,
  },
  eventName: {
    fontSize: 11,
    fontWeight: '400',
    color: 'white',
    width: '78%'
  },
  eventTime: {
    fontSize: 10,
    fontWeight: '400',
    color: 'white',
    position: 'absolute',
    top: 13,
    right: 4
  },
  eventDescription: {
    fontSize: 10,
    fontWeight: '400',
    paddingTop: 10,
    paddingLeft: 0,
    color: 'white',
  },
});

export default Calender;
