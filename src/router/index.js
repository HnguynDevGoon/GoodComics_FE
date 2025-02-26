import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import Location from '../views/Location.vue';
import Login from '../auth/Login.vue';
import Register from '../auth/Register.vue';
import ForgotPassword from '../auth/ForgotPassword.vue';
import OtpGmail from '../auth/OtpGmail.vue';
import OtpForgotPassword from '../auth/OtpForgotPassword.vue';
import UpdatePassword from '../auth/UpdatePassword.vue';
import Profile from '../auth/Profile.vue';
import DetailComic from '../views/DetailComic.vue';

const routes = [
    {
        path: "/",
        name: "HomePage",
        component: HomePage,
    },

    // auth
    {
        path: "/Login",
        name: "Login",
        component: Login,
    },
    {
        path: "/Register",
        name: "Register",
        component: Register,
    },
    {
        path: "/Forgotpassword",
        name: "ForgotPassword",
        component: ForgotPassword,
    },
    {
        path: "/Otpgmail",
        name: "OtpGmail",
        component: OtpGmail,
    },
    {
        path: "/Otpforgotpassword",
        name: "OtpForgotPassword",
        component: OtpForgotPassword,
    },
    {
        path: "/Updatepassword",
        name: "UpdatePassword",
        component: UpdatePassword,
    },
    {
        path: "/Location",
        name: "Location",
        component: Location,
    },
    {
        path: "/Profile",
        name: "Profile",
        component: Profile,
    },


    // Comic
    {
        path: `/DetailComic/:id`,
        name: "DetailComic",
        component: DetailComic,
    },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
