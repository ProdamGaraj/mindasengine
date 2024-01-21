import axios from 'axios';
const instance = axios.create({
baseURL: "http://mindasengine.uz",
});
const baseURL = "http://mindasengine.uz";
instance.interceptors.request.use((config) => {
    config.headers.Authorization = window.localStorage.getItem('token');
	return config;
});

export default baseURL;
