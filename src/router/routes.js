import Home from "../pages/Index.vue";
import Room from "../pages/rooms/Index.vue";
import Rating from "../pages/rating/Index.vue";
import AdminLayout from "../pages/admin/Layout.vue"
import LogIn from "../pages/auth/LogIn.vue";
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
    {
        path: '/rate-call',
        name: 'rate-call',
        component: Rating,
    },
    {
        path: '/login',
        name: 'login',
        component: LogIn,
    },
    {
        path: '/admin',
        component: AdminLayout,
        children: [
            {
                path: '/admin',
                name: 'admin.home',
                component: () => import('@/pages/admin/dashboard/Index.vue'),
            },
            {
                path: '/admin/call-center',
                name: 'admin.call-center',
                component: () => import('@/pages/admin/call-center/Index.vue'),
            },
            {
                path: '/admin/users',
                name: 'admin.users',
                component: () => import('@/pages/admin/users/Index.vue'),
            },
            {
                path: '/admin/reports/call',
                name: 'admin.reports.call',
                component: () => import('@/pages/admin/report/call/Index.vue'),
            },
        ],
    },
];