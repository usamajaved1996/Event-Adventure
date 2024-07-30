import React, { useRef, useEffect, useState } from 'react';
import { View, Image, StyleSheet, Text, ScrollView, ActivityIndicator } from 'react-native';
import ProfileImg from '../../../assets/icons/profileImg.png';
import Circle1 from '../../../assets/icons/profileCircle.png';
import Circle2 from '../../../assets/icons/profileCircle2.png';
import Tick from '../../../assets/icons/tick.png';
import Line from '../../../assets/icons/line.png';
import Layer from '../../../assets/icons/profileLayer.png';
import CalenderImg from '../../../assets/icons/calendarProfile.png';
import Male from '../../../assets/icons/woman.png';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { useDispatch, useSelector } from 'react-redux';
import { getEventMemberPhoto, getProfile } from '../../../slices/profileSlice';
import { useFocusEffect } from '@react-navigation/native'; // Import useFocusEffect hook
import Moment from 'moment';

const Profile = ({ navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  // console.warn('user', user.object.id)
  const profile = useSelector(state => state.profile.profileData);
  // console.warn('profile', profile)
  const eventPhoto = useSelector(state => state.profile.memberPhotoData);
  const [loading, setLoading] = useState(true);
  const carouselRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    dispatch(getProfile(user.object.id)).then(() => setLoading(false));
    dispatch(getEventMemberPhoto(user.object.id)).then(() => setLoading(false));

  }, []);
  useEffect(() => {
    // Auto-advance to the next slide every 3 seconds
    const intervalId = setInterval(() => {
      carouselRef.current?.snapToNext();
    }, 3000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);
  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        setLoading(true);
        await dispatch(getProfile(user.object.id));
        await dispatch(getEventMemberPhoto(user.object.id));
        setLoading(false);
      };
      fetchData();

      return () => {
        // Clean up function if needed
      };
    }, [])
  );

  const renderCarouselItem = ({ item }) => (
    <Image source={{ uri: item }} style={styles.carouselImage} />
  );
  const renderDots = () => (
    <Pagination
      dotsLength={eventPhoto.length}
      activeDotIndex={activeSlide}
      containerStyle={styles.paginationContainer}
      dotStyle={styles.activeDot}
      inactiveDotStyle={styles.inactiveDot}
      inactiveDotOpacity={0.6}
      inactiveDotScale={0.8}
    />
  );
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {loading == true ?
        <ActivityIndicator size="large" color="#EC5D78" style={{ marginTop: '40%', marginBottom: '40%' }} />
        :
        <View style={styles.container}>
          <View style={styles.circleContainer1}>
            <Image source={Circle1} style={styles.circleImage1} />
            <View style={styles.circleContainer2}>
              <Image source={Circle2} style={styles.circleImage2} />
              <View style={styles.profileImageContainer}>
              <Image source={profile && profile.photo ? { uri: profile.photo } : ProfileImg} style={styles.profileImage} />
              </View>
            </View>
          </View>
          <View style={{ marginTop: 25, flexDirection: 'row' }}>
            <Text style={{ fontSize: 18, fontWeight: '600', color: '#353535' }}>{profile.firstName} {profile.lastName},28  </Text>
            <Image source={Tick} />
          </View>
          <View style={{ marginTop: 25, flexDirection: 'row' }}>
            <Text style={styles.addressText}>{!profile.address ? 'address' : profile.address}    </Text>
            <Image source={Line} />
            <Text style={styles.addressText}>      {profile.phone}  </Text>
          </View>

          <View style={{ flexDirection: 'row', width: '100%', marginTop: '3%', position: 'relative' }}>
            <Image source={Layer} style={{ zIndex: 1 }} />
            <Image source={CalenderImg} style={styles.calenderImage} />
            <Text style={styles.calenderText}> {Moment(profile.birthday).format('ddd, MMM D, YYYY')}</Text>
          </View>
          <View style={{ flexDirection: 'row', width: '100%', marginTop: '-7%', position: 'relative' }}>
            <Image source={Layer} style={{ zIndex: 1 }} />
            <Image source={Male} style={styles.calenderImage} />
            <Text style={styles.calenderText}>{profile.gender}</Text>
          </View>
          <View style={styles.aboutMeCont}>
            <Text style={styles.aboutMeText} >About Me </Text>
            <Text style={styles.aboutMeDetail}>{profile.aboutMe}</Text>
          </View>
          <View style={styles.imageSliderContainer}>
            {eventPhoto && eventPhoto.length > 0 && (
              <Carousel
                ref={carouselRef}
                data={eventPhoto.map(photo => photo.photo)
                } // Map eventPhoto to extract image URLs or paths
                renderItem={renderCarouselItem}
                sliderWidth={300}
                itemWidth={300}
                autoplay
                autoplayInterval={3000} // Change the interval as needed
                loop
                onSnapToItem={(index) => setActiveSlide(index)}
              />
            )}
            {eventPhoto && eventPhoto.length > 0 && (
              <View style={{ position: 'absolute', top: 165 }}>
                {renderDots()}
              </View>
            )}
            <View style={{ marginBottom: 30 }}>

            </View>

          </View>
        </View>
      }
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: 'white',
  },
  container: {
    flexGrow: 1,
    alignItems: 'center',
  },

  circleImage1: {
    width: 180, // Adjust the width as needed
    height: 180, // Adjust the height as needed
  },
  circleImage2: {
    width: '100%', // Set to 100% to match the container size
    height: '100%', // Set to 100% to match the container size
  },
  circleContainer1: {
    position: 'relative',
    marginTop: 20,
    alignItems: 'center', // Center the content horizontally
  },
  circleContainer2: {
    position: 'absolute',
    top: (180 - 220) / 2, // Center vertically within circleImage1
    left: (180 - 220) / 2, // Center horizontally within circleImage1
    width: 220, // Increase the width as needed
    height: 220, // Increase the height as needed
  },
  profileImageContainer: {
    position: 'absolute',
    top: (220 - 120) / 2, // Center vertically within circleContainer2
    left: (220 - 120) / 2, // Center horizontally within circleContainer2
    width: 120, // Adjust the width as needed
    height: 120, // Adjust the height as needed
    borderRadius: 80, // Make it half of the width and height to create a circular shape
    overflow: 'hidden', // Ensure the image is clipped to the border-radius
  },
  profileImage: {
    width: '100%', // Make the image fill its container
    height: '100%', // Make the image fill its container
    resizeMode: 'cover', // Maintain aspect ratio and cover the container
  },



  addressText: {
    fontSize: 14, fontWeight: '400', color: '#707070'
  },
  calenderText: {
    marginTop: 50, zIndex: 1, fontSize: 14, fontWeight: '500', color: '#5B5B5B'
  },
  calenderImage: {
    position: 'absolute', top: 44, left: 38, zIndex: 1
  },
  aboutMeText: {
    fontSize: 18, fontWeight: '500', color: '#353535'
  },
  aboutMeDetail: {
    paddingTop: 13, fontSize: 14, fontWeight: '500', color: '#707070'
  },
  aboutMeCont: {
    alignSelf: 'flex-start', paddingLeft: 30, paddingRight: 30
  },

  imageSliderTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#353535',
    marginBottom: 10,
  },
  carouselImage: {
    width: 300,
    height: 200,
    borderRadius: 10,
  },
  imageSliderContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  carouselImage: {
    width: 300,
    height: 200,
    borderRadius: 10,
  },
  paginationContainer: {
    marginTop: 10,
    alignSelf: 'center', // Center the pagination dots horizontally
  },
  activeDot: {
    width: 30, // Adjust the size as needed
    height: 7, // Adjust the size as needed
    borderRadius: 6, // Make it half of the width and height
    backgroundColor: '#EC5D78',
    marginHorizontal: 6, // Add some spacing between dots
  },
  inactiveDot: {
    width: 8, // Adjust the size as needed
    height: 8, // Adjust the size as needed
    borderRadius: 4, // Make it half of the width and height
    backgroundColor: '#D9D9D9',
    marginHorizontal: 6, // Add some spacing between dots
  },
});
export default Profile;
