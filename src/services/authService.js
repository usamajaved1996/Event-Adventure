import axios from 'axios';
import { BASEURL } from '../constants/api';

export const LoginService = data => {
  const loginUrl = `${BASEURL}auth/login`;
  return fetch(loginUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(response => {
      console.warn('response', response.ok)
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(responseData => {
      console.log('response.data', responseData);
      return responseData;
    })
    .catch(error => {
      throw new Error(error.message);
    });
};

export const SignUpService = data => {
  console.warn('data ', data)
  const loginUrl = `${BASEURL}auth/signup`;
  return axios
    .post(loginUrl, data)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.warn('error ====', error)
      throw new Error(error);
    });
};
export const OtpSentSignUpService = async (email) => {
  const apiUrl = `${BASEURL}auth/send-otp?email=${email}`;
  console.warn('apiUrl', apiUrl)
  return axios
    .post(apiUrl)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      if (error?.response && error?.response?.data && error?.response?.data && error?.response?.data?.message) {
        const err = error?.response?.data?.message
        throw new Error(err);
      } else {
        throw new Error("Err.");
      }
    });
};

export const socialLoginService = data => {
  console.log("data on social service", data)
  return axios
    .post(`${BASEURL}Auth/GoogleSignIn`, data)
    .then(response => {
      console.warn('response.data', response.data)
      return response.data;
    })
    .catch(error => {
      console.log("error", error)
      if (error?.response && error?.response?.data && error?.response?.data && error?.response?.data?.message) {
        console.log("err", error?.response?.data?.message, error)
        const err = error?.response?.data?.message
        throw new Error(err); // Throw the server error message
      } else {
        throw new Error("Err."); // Fallback error message
      }
    });
};


export const resetService = data => {
  const url = `${BASEURL}auth/ResetPassword`;
  console.warn('Complete URL:', url); // Log the complete URL
  return axios
    .post(url, data)
    .then(response => {
      console.log(response.data, 'response.data')
      return response.data;
    })
    .catch(error => {
      if (error?.response && error?.response?.status === 400) {
        const err = error?.response?.data?.message || 'Invalid data'; // You can customize this message
        throw new Error(err); // Throw the server error message
      } else {
        throw new Error("Err."); // Fallback error message
      }
    });
};

export const deleteAccountService = async (id) => {
  console.warn(id, 'id')
  const apiUrl = `${BASEURL}Auth/delete-account?memberId=${id}`;
  console.warn(apiUrl, 'data on deletye')
  return axios
    .post(apiUrl)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.warn('error ====', error)
      if (error?.response && error?.response?.data && error?.response?.data && error?.response?.data?.message) {
        const err = error?.response?.data?.message
        throw new Error(err); // Throw the server error message
      } else {
        throw new Error("Err."); // Fallback error message
      }
    });
};

export const forgotPasswordService = async (email) => {
  let param = email.userName;
  const apiUrl = `${BASEURL}Auth/forgot-password?userName=${param}`;
  return axios
    .get(apiUrl)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      if (error?.response && error?.response?.data && error?.response?.data && error?.response?.data?.message) {
        const err = error?.response?.data?.message
        throw new Error(err);
      } else {
        throw new Error("Err.");
      }
    });
};

export const otpCodeService = async (data) => {
  let code = data.otp;
  let email = data.userName;
  console.warn(data, 'data for otp password')

  const apiUrl = `${BASEURL}Auth/otp-validate?userName=${email}&otp=${code}`;
  console.warn(apiUrl, 'apiUrl for otp password')

  return axios
    .post(apiUrl)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.warn('error on otp', error)

      if (error?.response && error?.response?.data && error?.response?.data && error?.response?.data?.message) {
        const err = error?.response?.data?.message
        throw new Error(err);
      } else {
        throw new Error("Err.");
      }
    });
};


export const changePasswordService = async (data) => {
  console.warn(data, 'data for change password')
  let code = data.otpCodeParse;
  let email = data.userName;
  let password = data.password;
  const apiUrl = `${BASEURL}Auth/change-password?userName=${email}&password=${password}&otp=${code}`;
  console.warn(apiUrl, 'apiUrl for change password')
  return axios
    .post(apiUrl)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.warn('error on otp', error)

      if (error?.response && error?.response?.data && error?.response?.data && error?.response?.data?.message) {
        const err = error?.response?.data?.message
        throw new Error(err);
      } else {
        throw new Error("Err.");
      }
    });
};

export const uploadProfileImageService = (formData) => {
  const loginUrl = `${BASEURL}auth/profile-update`;
  console.warn('loginUrl', loginUrl, formData)
  return axios
    .post(loginUrl, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    .then(response => {
      console.warn('response uploadProfileImageService update', response.data)
      return response.data;
    })
    .catch(error => {
      console.error("error profile error", error);
      throw new Error(error); // Fallback error message
    });
};