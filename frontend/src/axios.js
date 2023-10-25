import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:1337',
});


const baseURL = 'http://localhost:1337';   // http://37.77.106.193 - ip для prod backend


instance.interceptors.request.use((config) => {
    config.headers.Authorization = window.localStorage.getItem('token');

    return config;
});

export default baseURL;