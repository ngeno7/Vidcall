import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:3000/api/v1',
    // baseURL: 'https://video.racecoursehospital.com/api/v1',
    timeout: 6000,
    // headers: {'X-Custom-Header': 'foobar'}
});

export default instance;
