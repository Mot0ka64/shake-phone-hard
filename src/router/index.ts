import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'
import {KEY_ID} from '@/composables/LocalStorage'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Main',
        component: () => import('@/views/Main.vue')
    },
    {
        path: '/register',
        name: 'Register',

        component: () => import('../views/Register.vue')
    },
    {
        path: '/no-phone',
        name: 'No-phone',

        component: () => import('@/views/NoPhone.vue')
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

const isPhone = window.innerWidth < 700;

router.beforeEach((to, from, next) => {
    if(!isPhone) {
        if(to.name !== "No-phone"){
            next({name: "No-phone"});
        }else {
            next();
        }
    }else{
        if (to.name !== "Register" && !localStorage.getItem(KEY_ID)) {
            next({name: "Register"});
        } else {
            next();
        }
    }
});

export default router
