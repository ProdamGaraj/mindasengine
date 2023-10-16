import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:1337'
});


const baseURL = 'http://mindasengine.uz';


instance.interceptors.request.use((config) => {
    config.headers.Authorization = window.localStorage.getItem('token');

    return config;
});

export default baseURL;