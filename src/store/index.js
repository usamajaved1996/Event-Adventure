import {configureStore} from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice';
import eventReducer from '../slices/eventSlice';
import profileReducer from '../slices/profileSlice';


const store = configureStore({
  reducer: {
    auth: authReducer,
    event: eventReducer,
    profile: profileReducer,

  },
});

export default store;
