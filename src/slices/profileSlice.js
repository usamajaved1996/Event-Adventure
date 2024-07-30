import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import {
    fetchProfile, profileUpdateService, uploadProfileImageService, fetchEventMemberPhotoService,
    fetchState, fetchCity, uploadEventImageService
}
    from '../services/profileService';

const initialState = {
    user: null,
    status: 'idle',
    error: null,
};

export const getProfile = createAsyncThunk('Auth/profile-get', async (id) => {
    const response = await fetchProfile(id);
    return response;
});
export const getEventMemberPhoto = createAsyncThunk('/Auth/member-photos', async (id) => {
    const response = await fetchEventMemberPhotoService(id);
    return response;
});
export const profileUpdate = createAsyncThunk('/Auth/profile-add', async (formData) => {
    console.warn('formData', formData)
    const response = await profileUpdateService(formData);
    return response;
});
export const uploadProfileImage = createAsyncThunk('/Auth/profile-update', async (formData) => {
    const response = await uploadProfileImageService(formData);
    return response;
});
export const uploadEventImage = createAsyncThunk('/Auth/member-photo-insert', async (formData) => {
    const response = await uploadEventImageService(formData);
    return response;
});
export const getState = createAsyncThunk('/Auth/state', async () => {
    const response = await fetchState();
    return response;
});
export const getCity = createAsyncThunk('/Auth/cities', async (data) => {
    const response = await fetchCity(data);
    return response;
});
export const profileSlice = createSlice({
    name: 'event',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getProfile.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.profileData = action.payload;
            })
            .addCase(getProfile.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action?.error?.message ?? 'Something went wrong.';
            })
            .addCase(getProfile.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(getEventMemberPhoto.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.memberPhotoData = action.payload;
            })
            .addCase(getEventMemberPhoto.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action?.error?.message ?? 'Something went wrong.';
            })
            .addCase(getEventMemberPhoto.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(profileUpdate.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload;
            })
            .addCase(profileUpdate.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action?.error?.message ?? 'Something went wrong.';
            })
            .addCase(profileUpdate.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(uploadProfileImage.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload;
            })
            .addCase(uploadProfileImage.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action?.error?.message ?? 'Something went wrong.';
            })
            .addCase(uploadProfileImage.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(getState.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.listofState = action.payload;
            })
            .addCase(getState.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action?.error?.message ?? 'Something went wrong.';
            })
            .addCase(getState.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(getCity.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.listofCity = action.payload;
            })
            .addCase(getCity.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action?.error?.message ?? 'Something went wrong.';
            })
            .addCase(getCity.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(uploadEventImage.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.eventPhotoList = action.payload;
            })
            .addCase(uploadEventImage.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action?.error?.message ?? 'Something went wrong.';
            })
            .addCase(uploadEventImage.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
    },
});

export default profileSlice.reducer;