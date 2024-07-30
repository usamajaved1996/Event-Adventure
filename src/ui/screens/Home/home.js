import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, FlatList, ActivityIndicator } from 'react-native';
import GPS from '../../../assets/icons/gps.png';
import Cale from '../../../assets/icons/calendar.png';
import Right from '../../../assets/icons/arrowR.png';
import Left from '../../../assets/icons/arrowL.png';
import Circle from '../../../assets/icons/circle.png';
import PlaceholderImage from '../../../assets/images/placeholder.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { getEventList, getEventLocation } from '../../../slices/eventSlice';
import Moment from 'moment';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePickerModal from "react-native-modal-datetime-picker";

const Home = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
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
    setSelectedDate(date);
    hideDatePicker();
  };

  useEffect(() => {
    setTimeout(() => {
      if (!checkForProfileOpen.isProfileCompleted) {
      } else {
        const unsubscribe = navigation.addListener('focus', () => {
          if (!checkForProfileOpen.isProfileCompleted) {
          }
        });
        return unsubscribe;
      }
    }, 500);
  }, [checkForProfileOpen.isProfileCompleted, navigation]);

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
      setLoading(true);
      dispatch(getEventList({ siteID: selectedValue, startDate: selectedDate }))
        .finally(() => setLoading(false));
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
      day: Moment(events[0].eventDateTime).format('ddd'),
      events,
    }));
  };

  const onClickEvent = (event) => {
    navigation.navigate('DetailScreen', { event });
  };

  const renderEventItem = ({ item: event }) => (
    <TouchableOpacity
      style={[styles.eventCard, { backgroundColor: '#28B97C' }]}
      onPress={() => onClickEvent(event)}
    >
      <Image
        source={
          event.clipart && event.clipart.startsWith('http://3.221.235.57/images')
            ? PlaceholderImage
            : { uri: event.clipart }
        }
        style={{ width: '100%', borderRadius: 6, height: 100 }}
      />
      <Text style={styles.eventName}>{event.eventName}</Text>
      <Text style={styles.eventTime}>{Moment(event.eventDateTime).format('h:mm A')}</Text>
      <Text style={[styles.eventDescription]}>{event.eventDescription}</Text>
    </TouchableOpacity>
  );

  const renderCalendarItem = ({ item }) => {
    return (
      <View style={styles.calendarItemContainer}>
        <View style={styles.dateContainer}>
          <Image source={Circle} style={styles.circleIcon} />
          <Text style={styles.dateText}>{item.date}</Text>
          <Text style={styles.dayText}>{item.day}</Text>
        </View>
        <View style={styles.eventContainer}>
          <FlatList
            data={item.events}
            keyExtractor={(event, index) => index.toString()}
            renderItem={renderEventItem}
            numColumns={2}
            columnWrapperStyle={styles.row}
            scrollEnabled={false}
          />
        </View>
      </View>
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container} scrollEnabled={!openLocation}>
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
          <Text style={{ paddingTop: 20, paddingLeft: 20, color: 'black' }}>{selectedDate != null ? Moment(selectedDate).format('MMMM') : 'Month'}</Text>
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
          <Text style={{ fontSize: 18, fontWeight: '500', color: 'black' }}>{selectedDate != null ? Moment(selectedDate).format('MMMM') : 'Month'}</Text>
        </View>
        <TouchableOpacity>
          <Image source={Left} style={{ marginRight: 15 }} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={Right} />
        </TouchableOpacity>
      </View>
      <View>
        {loading ? (
          <ActivityIndicator size="large" color="#EC5D78" />
        ) : eventGroups.length === 0 ? (
          <Text style={styles.noEventsText}>No events found</Text>
        ) : (
          <FlatList
            data={eventGroups}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderCalendarItem}
            showsVerticalScrollIndicator={false}
          />
        )}
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
    alignItems: 'flex-start',
    padding: 20,
  },
  dateContainer: {
    alignItems: 'center', // Center the content horizontally
    marginRight: 10,
    borderRightWidth: 2,
    borderColor: '#D4321C',
    paddingRight: 10,
    alignSelf: 'stretch', // Make the container stretch vertically
    marginTop:10
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
    marginTop:12
  },
  dayText: {
    color: 'black',
    fontWeight: '400',
    fontSize: 14,
    textAlign: 'center',
  },
  eventContainer: {
    flex: 1,
  },
  row: {
    justifyContent: 'space-between',
  },
  eventCard: {
    width: '50%', // Adjust the width to ensure two cards fit in a row
    borderRadius: 12,
    marginVertical: 5,
    marginRight: 15,
    padding: 0,
  },
  eventName: {
    fontSize: 10,
    fontWeight: '400',
    color: 'white',
    textAlign: 'center',
    marginTop: 5,
    marginBottom: -10,
  },
  eventTime: {
    fontSize: 10,
    fontWeight: '400',
    color: 'black',
    position: 'absolute',
    top: 5,
    right: 4,
    backgroundColor: 'white',
    borderRadius: 10,
    width: '33%',
    padding: 3,
  },
  eventDescription: {
    fontSize: 10,
    fontWeight: '400',
    paddingTop: 10,
    paddingLeft: 0,
    color: 'white',
  },
  noEventsText: {
    fontSize: 16,
    fontWeight: '500',
    color: 'black',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default Home;
