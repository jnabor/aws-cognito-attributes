import Vue from 'vue'
import Vuex from 'Vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    userPool: [],
    cognitoUser: '',
    username: '',
    authenticated: false
  },
  mutations: {
    signOut (state) {
      state.authenticated = false
      state.username = ''
      state.cognitoUser = ''
      state.userPool = []
      console.log('store: signed out')
    }
  }
})
