import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080'
});

// axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

axiosInstance.interceptors.request.use(request => {
    //   if (!request.headers.Authorization) {
    //     const token = JSON.parse(localStorage.getItem("token")).token;
    //     if (token) {
    //         request.headers.Authorization = `Bearer ${token}`;
    //     } else {
    //         console.log('No token yet');
    //     }
    //   }
      return request;
    },
    error => Promise.reject(error)
);

axiosInstance.interceptors.response.use(response => {
    console.log(response);
    // Edit response config
    return response;
}, error => {
    console.log(error);
    return Promise.reject(error);
});


export default axiosInstance;