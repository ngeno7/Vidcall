import Home from "../pages/Index.vue";
import Room from "../pages/rooms/Index.vue";
export const routes = [
    {
        path: '/',
        name: 'home',
        component: Home,
    },
    {
        path: '/room',
        name: 'room',
        component: Room,
    },
];