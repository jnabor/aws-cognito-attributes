import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/Home.vue'
/* authentication */
import SignIn from '@/components/Auth/Signin'
import Register from '@/components/Auth/Register'
import Registered from '@/components/Auth/Registered'
import Forgot from '@/components/Auth/Forgot'
import Confirm from '@/components/Auth/Confirm'
import Changed from '@/components/Auth/Changed'
import Resend from '@/components/Auth/Resend'
/* Profiles */
import Profile from '@/components/Profile/Index'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', redirect: '/home' },
    { path: '/home', name: 'Home', component: Home },
    /* Authentication */
    { path: '/signin', name: 'SignIn', component: SignIn },
    { path: '/register', name: 'Register', component: Register },
    { path: '/registered', name: 'Registered', component: Registered },
    { path: '/forgot', name: 'Forgot', component: Forgot },
    { path: '/confirm', name: 'Confirm', component: Confirm },
    { path: '/changed', name: 'Changed', component: Changed },
    { path: '/resend', name: 'Resend', component: Resend },
    /* Profiles */
    { path: '/profile', name: 'Profile', component: Profile }
  ],
  mode: 'history'
})
