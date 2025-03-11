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
import Hobby from '../views/Hobby.vue';
import ListComic from '../views/ListComic.vue';
import History from '../views/History.vue';
import UserManagerment from '../admin/UserManagerment.vue';
import HelloAdmin from '../admin/HelloAdmin.vue';
import ComicManagerment from '../admin/ComicManagerment.vue';
import UpdateComic from '../admin/UpdateComic.vue';
import AdminAccount from '../admin/AdminAccount.vue';

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
    {
        path: "/Hobby",
        name: "Hobby",
        component: Hobby,
    },


    // Comic
    {
        path: `/DetailComic/:id`,
        name: "DetailComic",
        component: DetailComic,
    },
    {
        path: `/ListComic`,
        name: "ListComic",
        component: ListComic,
    },

    // History
    {
        path: `/History`,
        name: "History",
        component: History,
    },

    // Dashboard
    {
        path: `/Dashboard`,
        name: "Dashboard",
        component: HelloAdmin,
    },
    {
        path: `/UserManagerment`,
        name: "UserManagerment",
        component: UserManagerment,
    },
    {
        path: `/ComicManagerment`,
        name: "ComicManagerment",
        component: ComicManagerment,
    },
    {
        path: `/UpdateComic/:id`,
        name: "UpdateComic",
        component: UpdateComic,
    },
    {
        path: `/AdminAccount`,
        name: "AdminAccount",
        component: AdminAccount
    },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
