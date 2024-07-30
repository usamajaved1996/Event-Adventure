import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import {
    fetchEventList, fetchEventLocation, fetchEventPhoto, fetchEventDetail, fetchTrips, fetchJointEventList,
    feedBackService
}
    from '../services/eventService';

const initialState = {
    user: null,
    status: 'idle',
    error: null,
};

export const getEventList = createAsyncThunk('Events/event-all', async (data, { getState }) => {
    const response = await fetchEventList(data);
    return response;
});
export const getEventLocation = createAsyncThunk('Events/event-sites', async () => {
    const response = await fetchEventLocation();
    return response;
});
export const getEventPhoto = createAsyncThunk('Events/event-photos', async (data) => {
    const response = await fetchEventPhoto(data);
    return response;
});
export const getEventDetail = createAsyncThunk('Events/event', async (data) => {
    const response = await fetchEventDetail(data);
    return response;
});
export const getTrips = createAsyncThunk('Events/event-trips', async () => {
    const response = await fetchTrips();
    return response;
});
export const getJointEventList = createAsyncThunk('Events/joined-events', async (data) => {
    const response = await fetchJointEventList(data);
    return response;
});
export const feedBack = createAsyncThunk('Events/save-feedback', async (data) => {
    const response = await feedBackService(data);
    return response;
});

export const eventSlice = createSlice({
    name: 'event',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getEventList.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.eventList = action.payload;
            })
            .addCase(getEventList.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action?.error?.message ?? 'Something went wrong.';
            })
            .addCase(getEventList.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(getEventLocation.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.eventLocation = action.payload;
            })
            .addCase(getEventLocation.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action?.error?.message ?? 'Something went wrong.';
            })
            .addCase(getEventLocation.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(getEventPhoto.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.eventPhoto = action.payload;
            })
            .addCase(getEventPhoto.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action?.error?.message ?? 'Something went wrong.';
            })
            .addCase(getEventPhoto.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(getEventDetail.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.eventDetail = action.payload;
            })
            .addCase(getEventDetail.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action?.error?.message ?? 'Something went wrong.';
            })
            .addCase(getEventDetail.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(getTrips.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.tripsList = action.payload;
            })
            .addCase(getTrips.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action?.error?.message ?? 'Something went wrong.';
            })
            .addCase(getTrips.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(getJointEventList.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.jointEventsList = action.payload;
            })
            .addCase(getJointEventList.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action?.error?.message ?? 'Something went wrong.';
            })
            .addCase(getJointEventList.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(feedBack.fulfilled, (state, action) => {
                state.status = 'succeeded';
            })
            .addCase(feedBack.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action?.error?.message ?? 'Something went wrong.';
            })
            .addCase(feedBack.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
    },
});

export default eventSlice.reducer;