import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/Home.vue'
import SignIn from '@/components/Signin'
import Register from '@/components/Register'
import Registered from '@/components/Registered'
import Forgot from '@/components/Forgot'
import Confirm from '@/components/Confirm'
import Changed from '@/components/Changed'
import Profile from '@/components/Profile/Index'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', redirect: '/home' },
    { path: '/home', name: 'Home', component: Home },
    { path: '/signin', name: 'SignIn', component: SignIn },
    { path: '/register', name: 'Register', component: Register },
    { path: '/registered', name: 'Registered', component: Registered },
    { path: '/forgot', name: 'Forgot', component: Forgot },
    { path: '/confirm', name: 'Confirm', component: Confirm },
    { path: '/changed', name: 'Changed', component: Changed },
    { path: '/profile', name: 'Profile', component: Profile }
  ],
  mode: 'history'
})
