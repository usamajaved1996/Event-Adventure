import React, { useState, useEffect, useRef } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, TextInput, Text, ScrollView, ActivityIndicator } from 'react-native';
import ProfileImg from '../../../assets/icons/userImg.jpeg';
import Header from '../../modules/header/header';
import Camera from '../../../assets/icons/camera.png';
import Profile from '../../../assets/icons/profileBlack.png';
import Calendar from '../../../assets/icons/calendar.png';
import Gender from '../../../assets/icons/gender.png';
import Location from '../../../assets/icons/location.png';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';
import DropDownPicker from 'react-native-dropdown-picker';
import UploadIcon from '../../../assets/images/uploadImg.png';
import AddIcon from '../../../assets/images/add.png';
import DocumentPicker from 'react-native-document-picker';
import { useDispatch, useSelector } from 'react-redux';
import { getState, getCity } from '../../../slices/profileSlice';
import { uploadProfileImage } from '../../../slices/authSlice';
import { toastMsg } from '../../modules/Toast/index';
import Button from '../../modules/Button';

const UpdateProfileUser = ({ navigation }) => {
    const profile = useSelector(state => state.profile.profileData);
    const user = useSelector(state => state.auth.user);
    console.warn('auth', user)
    const stateDataList = useSelector(state => state.profile.listofState);
    const cityDataList = useSelector(state => state.profile.listofCity);
    const eventPhoto = useSelector(state => state.profile.memberPhotoData);
    const scrollViewRef = useRef(null);

    const dispatch = useDispatch();
    const [id, setId] = useState(user.object.id);
    const [firstName, setFirstName] = useState(user.object.firstName);
    const [lastName, setLastName] = useState(user.object.lastName);
    const [birthday, setBirthday] = useState(user.object.birthday == null ? '' : user.object.birthday);
    const [email, setEmail] = useState(user.object.email);
    const [phone, setPhone] = useState(0);
    const [userName, setUserName] = useState(user.object.username);
    const [zipCode, setZipCode] = useState(0);
    const [loading, setLoading] = useState(false);
    const [address, setAddress] = useState(user.object.address == null ? '' : user.object.address);
    const [profilePicture, setProfilePic] = useState([]);
    const [memberPhotos, setEventPic] = useState([]);
    const [imgLoader, setImgLoader] = useState(false);
    const [profilePhoto, setProfilePhoto] = useState('');

    const [genderData, setGenderData] = useState([
        { label: 'Male', value: 'MALE' },
        { label: 'Female', value: 'FEMALE' },
    ]);
    const [openGender, setOpenGender] = useState(false);
    const [openState, setOpenState] = useState(false);
    const [openCity, setOpenCity] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [city, setCity] = useState(null);
    const [gender, setGender] = useState(null);
    const [state, setState] = useState(null);

    const [firstNameError, setFirstNameError] = useState('');
    const [lastNameError, setLastNameError] = useState('');
    const [birthdayError, setBirthdayError] = useState('');
    const [genderError, setGenderError] = useState('');
    const [addressError, setAddressError] = useState('');
    const [stateError, setStateError] = useState('');
    const [cityError, setCityError] = useState('');
    const [aboutMeError, setAboutMeError] = useState('');

    const [profilePictureError, setProfilePictureError] = useState('');

    const [isVisible, setIsVisible] = useState(false);
    const [aboutMe, setAboutMe] = useState(user.object.aboutMe == null ? '' : user.object.aboutMe);

    const [stateData, setStateData] = useState([]);
    const [cityData, setCityData] = useState([]);

    const [isStateSelected, setIsStateSelected] = useState(false);

    useEffect(() => {
        if (state) {
            setIsStateSelected(true);
        } else {
            setIsStateSelected(false);
        }
    }, [state]);
    useEffect(() => {
        if (cityDataList) {
            const transformedCityData = cityDataList.map(cityObj => ({
                label: cityObj.City,
                value: cityObj.City
            }));
            setCityData(transformedCityData);
        }
    }, [cityDataList]);
    useEffect(() => {
        if (stateDataList) {
            const transformedStateData = stateDataList.map(stateObj => ({
                label: stateObj.State,
                value: stateObj.State
            }));
            setStateData(transformedStateData);
        }
    }, [stateDataList]);
    useEffect(() => {
        dispatch(getState()).then(() => setLoading(false));
    }, []);
    useEffect(() => {
        dispatch(getCity(state)).then(() => setLoading(false));
    }, [state]);
    const handleStateChange = (value) => {
        setState(value);
    };

    // Function to update city value when user selects a city from dropdown
    const handleCityChange = (value) => {
        setCity(value);
    };

    // Function to update gender value when user selects a gender from dropdown
    const handleGenderChange = (value) => {
        setGender(value);
    };

    const updateProfileData = async () => {
        const isValid = validateFields();
        if (isValid) {
            setLoading(true);
            try {
                await uploadPreviousPhoto();
                if (profilePicture) {
                    const formData = new FormData();
                    formData.append('Id', id);
                    formData.append('FirstName', firstName);
                    formData.append('LastName', lastName);
                    formData.append('UserName', userName);
                    formData.append('Email', email);
                    formData.append('Address', address);
                    formData.append('City', city);
                    formData.append('State', state);
                    formData.append('ZipCode', zipCode);
                    formData.append('Phone', phone);
                    formData.append('Gender', gender);
                    formData.append('Birthday', birthday);
                    formData.append('AboutMe', aboutMe);
                    profilePicture.forEach((picture, index) => {
                        formData.append(`profilePicture`, {
                            uri: picture.uri,
                            type: picture.type,
                            name: picture.name,
                        });
                    });
                    memberPhotos.forEach((picture, index) => {
                        formData.append(`memberPhotos`, {
                            uri: picture.uri,
                            type: picture.type,
                            name: picture.name,
                        });
                    });
                    const data = await dispatch(uploadProfileImage(formData));
                    console.warn('data.isSuccess', data)
                    if (data.payload.isSuccess) {
                        toastMsg('Member profile updated successfully')
                        navigation.goBack();
                    }
                    else {
                        toastMsg('Error')
                    }
                    setLoading(false);
                } else {
                    // Wait for uploadPreviousPhoto response or state to be set
                    console.log('Waiting for photo upload or state to be set...');
                }
            } catch (error) {
                console.error('err', error)
            }
        }
    };

    const validateFields = () => {
        let isValid = true;

        if (!firstName.trim()) {
            setFirstNameError('Please enter your first name.');
            isValid = false;
        } else {
            setFirstNameError('');
        }

        if (!lastName.trim()) {
            setLastNameError('Please enter your last name.');
            isValid = false;
        } else {
            setLastNameError('');
        }

        if (!birthday) {
            setBirthdayError('Please select your date of birth.');
            isValid = false;
        } else {
            setBirthdayError('');
        }

        if (!gender) {
            setGenderError('Please select your gender.');
            isValid = false;
        } else {
            setGenderError('');
        }

        if (!address.trim()) {
            setAddressError('Please enter your address.');
            isValid = false;
        } else {
            setAddressError('');
        }

        if (!aboutMe.trim()) {
            setAboutMeError('Please enter this field.');
            isValid = false;
        } else {
            setAboutMeError('');
        }
        if (!state) {
            setStateError('Please select your state.');
            isValid = false;
        } else {
            setStateError('');
        }

        if (!city) {
            setCityError('Please select your city.');
            isValid = false;
        } else {
            setCityError('');
        }
        if (profilePicture.length == 0 && profilePhoto.length == 0) {
            setProfilePictureError('Please upload your profile picture.');
            isValid = false;
        } else {
            setProfilePictureError('');
        }

        // Validate memberPhotos
        if (memberPhotos.length === 0) {
            toastMsg('Please upload at least one event picture.');
            isValid = false;
        }

        return isValid;
    };
    const hideDatePicker = () => {
        setIsVisible(false);
    };
    const handleConfirm = (date) => {
        const currentDate = new Date();
        if (date > currentDate) {
            // If the selected date is in the future
            setBirthdayError('Please select a valid date of birth.');
            setIsVisible(false); // Keep the date picker open
            return;
        }

        // If the selected date is valid
        let userSelectDate = moment(date).format('YYYY-MM-DD');
        setBirthday(userSelectDate);
        hideDatePicker();
        setBirthdayError(''); // Clear any previous error messages
    };
    const openOverLay = () => {
        setIsVisible(true);
    };
    const uploadEventPic = async () => {
        try {
            const result = await DocumentPicker.pick({
                type: [DocumentPicker.types.images],
                mimeTypes: ['image/jpeg', 'image/jpg', 'image/png'],
                allowMultiSelection: true,
            });

            const updatedEventPic = [...memberPhotos, ...result.map(image => ({
                uri: image.uri,
                type: 'image/jpeg',
                name: image.name,
            }))];

            setEventPic(updatedEventPic);
        } catch (err) {
            console.error('Error selecting images:', err);
        }
    };
    const uploadProfilePic = async () => {
        setImgLoader(true);
        try {
            const result = await DocumentPicker.pick({
                type: [DocumentPicker.types.images],
                mimeTypes: ['image/jpeg', 'image/jpg', 'image/png'],
            });
            const selectedImageUri = result[0].uri; // Get the URI of the selected image
            setProfilePhoto(selectedImageUri); // Update profile photo state with selected image URI
            const profilePicArray = result.map(image => ({
                uri: image.uri,
                type: 'image/jpeg',
                name: image.name,
            }));
            setImgLoader(false);
            setProfilePic(profilePicArray);

            // await onSubmitData();
        } catch (error) {
            console.error('Error selecting images:', error);
        }
    };
    const uploadPreviousPhoto = async () => {
        console.warn(' uploadPreviousPhoto profilePhoto', profilePhoto);
        setImgLoader(true);
        try {
            if (profilePhoto) {
                setProfilePic([{ uri: profilePhoto, type: 'image/jpeg', name: 'profileImage.jpg' }]);
                setImgLoader(false);
                console.warn('profilePicture', profilePicture);
                return true; // Return true indicating photo upload is done
            } else {
                console.warn('else');
                setImgLoader(false);

                return false; // Return false indicating photo upload is not done
            }
        } catch (error) {
            console.error('Error selecting images:', error);
            setImgLoader(false);

            return false; // Return false indicating photo upload is not done
        }
    };

    // Add useEffect to ensure setProfilePic is called once
    useEffect(() => {
        uploadPreviousPhoto();
    }, []);
    return (
        <View style={styles.container}>
            <Header title={'Update Profile'} />
            <ScrollView style={styles.scrollContainer}>
                <View style={styles.profileContainer}>
                    <View style={{ position: 'relative' }}>
                        {!imgLoader ? (
                            profilePhoto ? (
                                <Image
                                    source={{ uri: profilePhoto }}
                                    style={styles.profileImg}
                                />
                            ) : (
                                <Image
                                    source={ProfileImg} // Placeholder image when profilePhoto is null or empty
                                    style={styles.profileImg}
                                />
                            )
                        ) : (
                            <ActivityIndicator size="large" color="#0000ff" />
                        )}
                        <TouchableOpacity style={styles.cameraIcon} onPress={uploadProfilePic}>
                            <Image source={Camera} />
                        </TouchableOpacity>
                    </View>
                </View>
                {profilePictureError ? <Text style={{
                    color: "#f75959", textAlign: 'center'
                }}>{profilePictureError}</Text> : null}

                <View style={styles.inputContainer}>
                    <Image source={Profile} />
                    <TextInput
                        placeholder="First Name"
                        placeholderTextColor="#353535"
                        style={[styles.textInput, { width: '80%' }]} // Adjust the width as needed
                        onChangeText={(text) => setFirstName(text)}
                        value={firstName}
                    />
                </View>
                {firstNameError ? <Text style={styles.errorText}>{firstNameError}</Text> : null}
                <View style={styles.inputContainer}>
                    <Image source={Profile} />
                    <TextInput
                        placeholder="Last Name"
                        placeholderTextColor="#353535"
                        style={[styles.textInput, { width: '80%' }]} // Adjust the width as needed
                        onChangeText={(text) => setLastName(text)}
                        value={lastName}
                    />
                </View>
                {lastNameError ? <Text style={styles.errorText}>{lastNameError}</Text> : null}

                <View style={styles.dateView}>
                    <TouchableOpacity onPress={openOverLay}>
                        <View style={{ padding: 0, flexDirection: 'row' }}>
                            <Image source={Calendar} style={{ marginTop: 20 }} />
                            <Text style={{ color: '#353535', fontSize: 16, marginTop: 20, paddingLeft: 15, fontWeight: '500' }}>
                                {birthday ? moment(birthday).format('YYYY-MM-DD') : "Date of Birth"}
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <DateTimePickerModal
                        date={selectedDate}
                        isVisible={isVisible}
                        mode="date"
                        onConfirm={handleConfirm}
                        onCancel={hideDatePicker}
                        maximumDate={new Date()} // Set the maximum date to today's date

                    />
                </View>
                {birthdayError ? <Text style={styles.errorText}>{birthdayError}</Text> : null}

                <View style={styles.dateView}>
                    <View style={{ flexDirection: 'row', width: '90%' }}>
                        <Image source={Gender} style={{ marginTop: 20 }} />
                        <DropDownPicker
                            style={{ backgroundColor: '#E4E4E4', borderColor: '#E4E4E4' }}
                            containerStyle={{ marginTop: 5 }}
                            placeholderStyle={{ color: '#353535', fontSize: 16, fontWeight: '500' }}
                            labelStyle={{ fontSize: 16, fontWeight: '500', color: '#353535', marginLeft: 5 }}
                            textStyle={{ fontSize: 16, color: '#353535', marginLeft: 5 }}
                            dropDownContainerStyle={{
                                backgroundColor: '#E4E4E4',
                                borderColor: '#E4E4E4',
                                width: 250,

                            }}
                            arrowColor={'#353535'}
                            open={openGender}
                            value={gender}
                            onChangeItem={item => handleGenderChange(item.value)} // Call handleGenderChange when gender changes
                            items={genderData}
                            setOpen={setOpenGender}
                            setValue={setGender}
                            setItems={setGenderData}
                            placeholder={'Gender'}
                            dropDownDirection="TOP" // Set the dropdown direction to TOP

                        />
                    </View>
                </View>
                {genderError ? <Text style={styles.errorText}>{genderError}</Text> : null}

                <View style={styles.inputContainer}>
                    <Image source={Location} />
                    <TextInput
                        placeholder="Location"
                        placeholderTextColor="#353535"
                        style={[styles.textInput, { width: '80%' }]} // Adjust the width as needed
                        value={address}
                        onChangeText={(text) => setAddress(text)}
                    />
                </View>
                {addressError ? <Text style={styles.errorText}>{addressError}</Text> : null}

                <View style={styles.rowContainer}>
                    <View style={{ width: '100%', marginLeft: 20 }}>
                        <View style={styles.multiDropDown}>
                            <Image source={Location} style={{ marginTop: 20 }} />
                            <DropDownPicker
                                style={{ backgroundColor: '#E4E4E4', borderColor: '#E4E4E4', width: '80%' }}
                                containerStyle={{ marginTop: 5 }}
                                placeholderStyle={{ color: '#353535', fontSize: 16, fontWeight: '500' }}
                                labelStyle={{ fontSize: 16, fontWeight: '500', color: '#353535', marginLeft: 5 }}
                                textStyle={{ fontSize: 16, color: '#353535', marginLeft: 5 }}
                                dropDownContainerStyle={{
                                    backgroundColor: 'white', borderColor: '#E4E4E4', marginTop: 8, marginLeft: -30,
                                    maxHeight: 400, // Adjust the maxHeight as needed

                                }}
                                arrowColor={'#353535'}
                                open={openState}
                                value={state}
                                onChangeItem={item => handleStateChange(item.value)} // Call handleStateChange when state changes
                                items={stateData} // Update this line
                                setOpen={setOpenState}
                                setValue={setState}
                                setItems={setStateData}
                                placeholder={'State'}
                                searchable={true}
                                searchablePlaceholder="Search State"
                                dropDownDirection="TOP" // Set the dropdown direction to TOP
                            />
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            {stateError ? <Text style={styles.errorTextBelowDropdown}>{stateError}</Text> : null}
                        </View>
                    </View>
                    <View style={{ width: '100%', marginLeft: 20 }}>
                        <View style={styles.multiDropDown}>
                            <Image source={Location} style={{ marginTop: 20 }} />
                            <DropDownPicker
                                style={{ backgroundColor: '#E4E4E4', borderColor: '#E4E4E4', width: '80%' }}
                                containerStyle={{ marginTop: 5 }}
                                placeholderStyle={{ color: '#353535', fontSize: 16, fontWeight: '500' }}
                                labelStyle={{ fontSize: 16, fontWeight: '500', color: '#353535', marginLeft: 5 }}
                                textStyle={{ fontSize: 16, color: '#353535', marginLeft: 5 }}
                                dropDownContainerStyle={{
                                    backgroundColor: 'white', borderColor: '#E4E4E4', marginTop: 8, marginLeft: -30,
                                    maxHeight: 400, // Adjust the maxHeight as needed

                                }}
                                arrowColor={'#353535'}
                                open={openCity && isStateSelected} // Render city dropdown only if a state is selected
                                value={city}
                                onChangeItem={item => handleCityChange(item.value)} // Call handleCityChange when city changes
                                items={cityData}
                                setOpen={setOpenCity}
                                setValue={setCity}
                                setItems={setCityData}
                                placeholder={'City'}
                                searchable={true}
                                searchablePlaceholder="Search City"
                                dropDownDirection="TOP" // Set the dropdown direction to TOP
                            />

                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            {cityError ? <Text style={styles.errorTextBelowDropdown}>{cityError}</Text> : null}
                        </View>
                    </View>
                </View>
                <View>
                    <Text style={styles.heading}>About Me</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Description"
                        placeholderTextColor="#353535"
                        multiline
                        numberOfLines={6}
                        value={aboutMe}
                        onChangeText={(text) => setAboutMe(text)}
                        textAlignVertical="top"
                    />
                </View>
                {aboutMeError ? <Text style={styles.errorText}>{aboutMeError}</Text> : null}
                <Text style={styles.heading}>Upload Pictures</Text>
                <ScrollView style={styles.scrollView} horizontal={true} showsHorizontalScrollIndicator={false}>
                    <View style={styles.imageRow}>
                        {memberPhotos.map((image, index) => (
                            <Image key={index} source={{ uri: image.uri }} style={styles.uploadImage} />
                        ))}
                        <TouchableOpacity style={styles.uploadImage} onPress={uploadEventPic}>
                            <React.Fragment>
                                <Image source={UploadIcon} />
                                <View style={styles.addOverlay}>
                                    <Image source={AddIcon} />
                                </View>
                            </React.Fragment>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                {loading == true ? (
                    <Button title={<ActivityIndicator size="small" color="#ffff" />} />
                ) : (
                    <TouchableOpacity style={styles.button} onPress={updateProfileData}>
                        <Text style={styles.buttonText}>Update Profile</Text>
                    </TouchableOpacity>
                )}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: 'white',
    },
    scrollContainer: {
        flex: 1,
    },
    errorText: {
        paddingTop: 8, paddingLeft: 25, color: "#f75959"
    },
    errorTextBelowDropdown: {
        color: "#f75959",
        fontSize: 13,
        padding: 5
    },
    profileContainer: {
        height: 120,
        width: 120,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 7,
        alignSelf: 'center',
    },
    profileImg: {
        height: 120,
        width: 120,
        borderRadius: 120 / 2,
    },
    textInput: {
        color: '#353535',
        paddingLeft: 15,
        fontSize: 16
    },
    cameraIcon: {
        position: 'absolute',
        backgroundColor: 'white',
        padding: 6,
        borderRadius: 50,
        bottom: 0,
        right: 0,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 20,
        paddingLeft: 20,
        borderColor: '#BBB',
        height: 64,
        marginTop: 15,
        width: '90%',
        backgroundColor: '#E4E4E4',
        alignSelf: 'center',
        zIndex: -10
    },
    dateView: {
        borderWidth: 1,
        borderRadius: 20,
        paddingLeft: 20,
        borderColor: '#BBB',
        height: 64,
        marginTop: 15,
        width: '90%',
        backgroundColor: '#E4E4E4',
        alignSelf: 'center',
    },
    button: {
        width: '85%',
        height: 64,
        borderRadius: 20,
        backgroundColor: '#EC5D78',
        color: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
        alignSelf: 'center',
        marginBottom: 10
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    rowContainer: {
        flexDirection: 'row',
        width: '42%',
        marginTop: 15,
    },
    multiDropDown: {
        borderWidth: 1,
        borderRadius: 20,
        paddingLeft: 20,
        borderColor: '#BBB',
        height: 64,
        // width: '48%',
        backgroundColor: '#E4E4E4',
        // alignSelf: 'center',
        flexDirection: 'row'
    },
    heading: {
        fontSize: 18,
        fontWeight: '500',
        marginBottom: 16,
        color: '#353535',
        paddingLeft: 20,
        paddingTop: 14
    },
    input: {
        borderWidth: 1,
        borderColor: '#BBB',
        borderRadius: 20,
        width: '90%',
        alignSelf: 'center',
        backgroundColor: '#E4E4E4',
        padding: 15,
        color: 'black',
        fontSize: 16
    },
    imageRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15,
        paddingHorizontal: 5,
    },
    uploadImage: {
        height: 80,
        width: 80,
        borderRadius: 16,
        backgroundColor: '#E4E4E4',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 12
    },
    addOverlay: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.7)', // Adjust the opacity as needed
        borderRadius: 0,
    },
    rememberMeContainer: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 20
    },
    radio: {
        width: 19,
        height: 19,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#EC5D78',
        marginRight: 10,
        backgroundColor: '#fff',

    },
    radioSelected: {
        backgroundColor: 'black',
    },
    rememberMeText: {
        fontSize: 16,
        color: '#353535'
    },
    radioSelected: {
        backgroundColor: '#EC5D78',
    },
});

export default UpdateProfileUser;
