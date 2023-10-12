import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:1337'
});

export const baseURL = 'https://ваш_адрес_веб-сервиса/';

instance.interceptors.request.use((config) => {
    config.headers.Authorization = window.localStorage.getItem('token');

    return config;
});

export default instance;