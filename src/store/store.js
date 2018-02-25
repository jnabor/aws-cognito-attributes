import Vue from 'vue'
import Vuex from 'Vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    username: '',
    email: '',
    token: '',
    authenticated: false
  }
})
