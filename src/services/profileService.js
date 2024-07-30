import axios from 'axios';
import { BASEURL } from '../constants/api';

export const fetchProfile = async (id) => {
  const apiUrl = `${BASEURL}Auth/profile-get?userId=${id}`;
  return axios
    .get(apiUrl)
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
export const fetchEventMemberPhotoService = async (id) => {
  const apiUrl = `${BASEURL}Auth/member-photos?userId=${id}`;
  return axios
    .get(apiUrl)
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
// export const profileUpdateService = async (formData) => {
//   try {
//     const response = await fetch('http://3.221.235.57:81/api/auth/profile-update', {
//       method: 'POST',
//       body: formData,
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       },
//     });

//     if (!response.ok) {
//       throw new Error(`Server responded with status ${response.status}`);
//     }

//     return response; // Return the response
//   } catch (error) {
//     throw error; // Throw the caught error for better error handling
//   }
// };

export const uploadProfileImageService = (formData) => {
  console.warn('formdta', formData)
  const loginUrl = `${BASEURL}Auth/profile-update`;
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
export const uploadEventImageService = (formData) => {
  console.warn('formdata'), formData
  const loginUrl = `${BASEURL}Auth/member-photo-insert`;
  return axios
    .post(loginUrl, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.error("error profile error", error);
      throw new Error(error); // Fallback error message
    });
};
export const fetchState = async () => {
  const apiUrl = `${BASEURL}Auth/state`;
  return axios
    .get(apiUrl)
    .then(response => {
      // console.warn('response of satatE', response.data)
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
export const fetchCity = async (data) => {
  const apiUrl = `${BASEURL}Auth/cities/${data}`;
  return axios
    .get(apiUrl)
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