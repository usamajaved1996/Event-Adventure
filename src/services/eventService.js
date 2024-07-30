import axios from 'axios';
import { BASEURL } from '../constants/api';

export const fetchEventList = async (data) => {
  const apiUrl = `${BASEURL}Events/event-all`;
  return axios
    .post(apiUrl, data)
    .then(response => {
      // console.warn("response evennt", response)
      return response.data;
    })
    .catch(error => {
      if (error?.response && error?.response?.data && error?.response?.data && error?.response?.data?.message) {
        const err = error?.response?.data?.message
        throw new Error(err); // Throw the server error message
      } else {
        throw new Error("Err."); // Fallback error message
      }
    });
};

export const fetchEventLocation = async () => {
  const apiUrl = `${BASEURL}Events/event-sites`;
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

export const fetchEventPhoto = async (data, token) => {
  return axios
    .get(`${BASEURL}Events/event-photos/${data}`, {
    }).then(response => {
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

export const fetchEventDetail = async (data) => {
  const apiUrl = `${BASEURL}Events/event`;
  return axios
    .post(apiUrl, data)
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

export const fetchTrips = async () => {
  const apiUrl = `${BASEURL}Events/event-trips`;
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

export const fetchJointEventList = async (data) => {
  return axios
    .get(`${BASEURL}Events/joined-events/${data}`)
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

export const feedBackService = async (data) => {
  console.warn('data feedBackService',data)
  const apiUrl = `${BASEURL}Events/save-feedback`;
  return axios
    .post(apiUrl, data)
    .then(response => {
      console.warn("response feedback", response)
      return response.data;
    })
    .catch(error => {
      if (error?.response && error?.response?.data && error?.response?.data && error?.response?.data?.message) {
        const err = error?.response?.data?.message
        throw new Error(err); // Throw the server error message
      } else {
        throw new Error("Err."); // Fallback error message
      }
    });
};