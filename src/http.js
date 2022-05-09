import axios from 'axios';
import Cookie from "js-cookie";
import { router } from "./router";

const instance = axios.create({
    // baseURL: 'http://localhost:3000/api/v1',
    baseURL: 'https://video.racecoursehospital.com/api/v1',
    timeout: 6000,
    headers: { Authorization: `Bearer ${Cookie.get('TW___')}` }
});

instance.interceptors.response.use(
    res => Promise.resolve(res),
    err => {
        if(err.response.status == 401) {
            Cookie.remove('TW___')
            router.push({name: `login`})
        }

        return Promise.reject(err);
    }
);
export default instance;
