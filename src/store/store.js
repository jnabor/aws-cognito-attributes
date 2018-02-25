import Vue from 'vue'
import Vuex from 'Vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    userPool: [],
    cognitoUser: '',
    username: '',
    token: '',
    authenticated: false
  },
  mutations: {
    signOut (state) {
      console.log('store: signing out')
      state.authenticated = false
      state.token = ''
      state.username = ''
      state.cognitoUser = ''
      state.userPool = []
    }
  }
})
