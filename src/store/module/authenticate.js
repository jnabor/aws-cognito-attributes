import config from '../../config'
import router from '../../routes'
var AmazonCognitoIdentity = require('amazon-cognito-identity-js')

const state = {
  userPool: [],
  authDetails: '',
  userData: '',
  cognitoUser: '',
  username: '',
  errcode: '',
  attributes: [],
  authenticated: false
}

const getters = {
  getStateAttributes (state) {
    return state.attributes
  }
}

const mutations = {
  signOut (state) {
    state.cognitoUser.signOut()
    state.authenticated = false
    state.username = ''
    state.userPool = []
  },
  setAttributes (state, attributes) {
    state.attributes = attributes
    state.username = state.attributes.filter(function (Obj) {
      return Obj.Name === 'email'
    })[0].Value
  },
  setUsername (state, payload) {
    state.username = payload
  },
  signIn (state) {
    state.authenticated = true
  },
  setUserPool (state) {
    state.userPool = new AmazonCognitoIdentity.CognitoUserPool(config.poolData)
  },
  setCognitoUser (state, payload) {
    state.cognitoUser = payload
  },
  setCognitoDetails (state, authData) {
    state.authDetails = new AmazonCognitoIdentity.AuthenticationDetails(authData)
    state.userData = { Username: authData.Username, Pool: state.userPool }
    state.cognitoUser = new AmazonCognitoIdentity.CognitoUser(state.userData)
  },
  setError (state, payload) {
    state.errcode = payload
  },
  clearError (state) {
    state.errcode = ''
  }
}

const actions = {
  signIn ({ state, commit, dispatch }, authData) {
    commit('clearError')
    commit('setUserPool')
    commit('setCognitoDetails', authData)
    state.cognitoUser.authenticateUser(state.authDetails, {
      onSuccess: (result) => {
        console.log('sign in success')
        commit('signIn')
        router.push('/profile')
        dispatch('getUserAttributes')
        dispatch('setLogoutTimer', 3600)
      },
      onFailure: (err) => {
        console.log('sign in failure')
        commit('setError', JSON.stringify(err.code))
      }
    })
  },
  tryAutoSignIn ({ state, commit, dispatch }) {
    commit('setUserPool')
    let cognitoUser = state.userPool.getCurrentUser()
    if (cognitoUser != null) {
      commit('setCognitoUser', cognitoUser)
      state.cognitoUser.getSession(function (err, session) {
        if (err) {
          console.error(JSON.stringify(err))
        } else {
          commit('signIn')
          dispatch('getUserAttributes')
          dispatch('setLogoutTimer', 3600)
        }
      })
    }
  },
  getUserAttributes ({ commit, dispatch }) {
    state.cognitoUser.getUserAttributes(function (err, attributes) {
      if (err) {
        console.error(JSON.stringify(err))
      } else {
        commit('setAttributes', attributes)
      }
    })
  },
  setLogoutTimer ({ state, commit, dispatch }, expirationTime) {
    setTimeout(() => {
      dispatch('signOut')
    }, expirationTime * 1000)
  },
  signOut ({ commit }) {
    commit('signOut')
    router.push('/home')
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
