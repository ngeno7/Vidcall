import { createApp } from 'vue';
import { router } from "./router";
import App from './App.vue';
import './assets/input.css';
import http from './http';
import Swal from 'sweetalert2';

const app = createApp(App);
app.use(router);
app.mount('#app');

app.config.globalProperties.$http = http;
app.config.globalProperties.$Swal = Swal;
