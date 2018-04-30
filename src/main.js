// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './routes'
import Vuetify from 'vuetify'
import AppLayout from './components/Layout.vue'
import AppHome from './components/Home.vue'
import AppSignin from './components/Auth/Signin.vue'
import AppRegister from './components/Auth/Register.vue'
import { store } from './store/index'
import colors from 'vuetify/es5/util/colors'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify, {
  theme: {
    primary: colors.yellow.darken1,
    primarydark: colors.yellow.darken4,
    primarylight: colors.yellow.lighten5,
    accent: colors.yellow.accent4,
    primarytext: colors.grey.darken4,
    secondarytext: colors.grey.darken1,
    divider: colors.grey.lighten1,
    secondary: colors.yellow.lighten5,
    submit: colors.yellow.darken1,
    editicon: colors.grey.lighten2,
    error: colors.red.base,
    info: colors.blue.base,
    success: colors.green.base,
    warning: colors.orange.base
  }
})

Vue.config.productionTip = false

Vue.component('app-layout', AppLayout)
Vue.component('app-home', AppHome)
Vue.component('app-signin', AppSignin)
Vue.component('app-register', AppRegister)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  render: h => h(App)
})
