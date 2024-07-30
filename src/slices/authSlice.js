import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import {
  LoginService as loginAPI, SignUpService, socialLoginService, resetService, deleteAccountService, forgotPasswordService, otpCodeService
  , changePasswordService, OtpSentSignUpService,uploadProfileImageService
} from '../services/authService';

const initialState = {
  user: null,
  status: 'idle',
  forgotStatus: 'idle',
  loginStatus: 'idle',
  resetPasswordStatus: 'idle',
  changePasswordStatus: 'idle',
  error: null,
  profileUpdateStatus: 'idle',
  signupStatus: "idle",
  verifyStatus: "idle",
  isFromSignup: "idle",
  deleteAccountStatus: "idle",
  otpStatus: "idle",
  otpSignUpStatus: "idle",
};

// Create an action creator for setting the FCM result

export const login = createAsyncThunk('/auth/login', async data => {
  const response = await loginAPI(data);
  console.warn('response on login', response)
  return response;
});

export const signUp = createAsyncThunk('/auth/signup', async data => {
  const response = await SignUpService(data);
  return response;
});
export const OtpSentSignUp = createAsyncThunk('/auth/send-otp', async data => {
  const response = await OtpSentSignUpService(data);
  return response;
});
export const resetPassword = createAsyncThunk('Auth/ResetPassword', async (data, { getState }) => {
  console.warn('data for ResetPassword', data)
  const response = await resetService(data);
  return response;
});

export const forgotPassword = createAsyncThunk('/Auth/forgot-password', async data => {
  const response = await forgotPasswordService(data);
  return response;
});


export const otpCode = createAsyncThunk('/Auth/otp-validate', async (data) => {
  const response = await otpCodeService(data);
  return response;
});
export const changePassword = createAsyncThunk('/Auth/change-password', async (data) => {
  const response = await changePasswordService(data);
  return response;
});

export const clearUser = createAsyncThunk('/auth/clearUser', async (_, { dispatch }) => {
  dispatch(authSlice.actions.clearUserData());
});

export const socialLogin = createAsyncThunk('/Auth/GoogleSignIn', async (data, { getState }) => {
  console.warn('data for socialLogin', data)
  const response = await socialLoginService(data);
  console.warn('response on social login', response)
  return response;
});

export const deleteAccount = createAsyncThunk('/Auth/delete-account', async (id, { getState }) => {
  console.warn(id, 'id slice')
  const response = await deleteAccountService(id);
  console.warn('response delete', response)
  return response;
});
export const uploadProfileImage = createAsyncThunk('/Auth/profile-update', async (formData) => {
  console.warn('fpr,',formData)
  const response = await uploadProfileImageService(formData);
  return response;
});
export const saveUser = createAction('auth/saveUser');

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearUserData: (state) => {
      state.user = null;
      state.status = 'idle';
      state.error = null;
    },
    fcmResult: (state, action) => {
      state.fcmResult = action.payload;
      state.status = 'idle';
    },
  },
  extraReducers: builder => {
    builder
      .addCase(login.pending, state => {
        state.loginStatus = 'loading';
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loginStatus = 'succeeded';
        state.user = state.loginStatus === 'succeeded' && action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loginStatus = 'failed';
        state.error = action?.error?.message ?? 'Something went wrong.';
      })
      .addCase(saveUser, (state, action) => {
        state.user = action.payload; // Update user data in state
      })
      .addCase(signUp.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        console.warn('state', state, action)
        state.signupStatus = 'succeeded';
        // state.user = state.signupStatus === 'succeeded' && action.payload;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.status = 'failed';
        state.signupStatus = 'failed';
        state.error = action?.error?.message ?? 'Something went wrong.';
      })

      .addCase(OtpSentSignUp.pending, state => {
        state.otpSignUpStatus = 'loading';
        state.error = null;
      })
      .addCase(OtpSentSignUp.fulfilled, (state, action) => {
        state.otpSignUpStatus = 'succeeded';
      })
      .addCase(OtpSentSignUp.rejected, (state, action) => {
        state.otpSignUpStatus = 'failed';
        state.error = action?.error?.message ?? 'Something went wrong.';
      })

      .addCase(socialLogin.pending, state => {
        state.loginStatus = 'loading';
        state.error = null;
      })
      .addCase(socialLogin.fulfilled, (state, action) => {
        console.warn('socialLogin', state, action)
        state.loginStatus = 'succeeded';
        // state.socialLogin = action.payload;
        state.user = action.payload;
      })
      .addCase(socialLogin.rejected, (state, action) => {
        state.loginStatus = 'failed';
        state.error = action?.error?.message ?? 'Something went wrong.';
      })

      .addCase(resetPassword.pending, state => {
        state.resetPasswordStatus = 'loading';
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.resetPasswordStatus = 'succeeded';
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.resetPasswordStatus = 'failed';
        state.error = action?.error?.message ?? 'Something went wrong.';

      })

      .addCase(deleteAccount.pending, state => {
        state.deleteAccountStatus = 'loading';
        state.error = null;
      })
      .addCase(deleteAccount.fulfilled, (state, action) => {
        state.deleteAccountStatus = 'succeeded';
      })
      .addCase(deleteAccount.rejected, (state, action) => {
        state.deleteAccountStatus = 'failed';
        state.error = action?.error?.message ?? 'Something went wrong.';
      })

      .addCase(forgotPassword.pending, state => {
        state.forgotStatus = 'loading';
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.forgotStatus = 'succeeded';
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.forgotStatus = 'failed';
        state.error = action?.error?.message ?? 'Something went wrong.';
      })
      .addCase(otpCode.pending, state => {
        state.otpStatus = 'loading';
        state.error = null;
      })
      .addCase(otpCode.fulfilled, (state, action) => {
        state.otpStatus = 'succeeded';
      })
      .addCase(otpCode.rejected, (state, action) => {
        state.otpStatus = 'failed';
        state.error = action?.error?.message ?? 'Something went wrong.';
      })

      .addCase(changePassword.pending, state => {
        state.changePasswordStatus = 'loading';
        state.error = null;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.changePasswordStatus = 'succeeded';
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.changePasswordStatus = 'failed';
        state.error = action?.error?.message ?? 'Something went wrong.';
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
  },

});

export default authSlice.reducer;
