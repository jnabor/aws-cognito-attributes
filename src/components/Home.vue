<template>
  <v-container fluid fill-height>
    <v-layout column align-center justify-center class="mb-5">
      <transition appear name="fadeout">
        <img class="aws-logo mb-4" src="../../static/aws_cognito_vue.png">
      </transition>
      <h1 class="mb-2 display-2 text-xs-center black--text hidden-xs-only">VUE ELECTION APP</h1>
      <h3 class="mb-3 text-xs-center grey--text hidden-xs-only">Cognito : DynamoDB : API Gateway : Lambda</h3>
      <v-btn v-if="!isAuthenticated" color="amber accent-3" dark large @click="navRegister()" class="mb-5">Get Started</v-btn>
      <v-alert v-if="isAuthenticated" outline type="success" class="mt-4 mb-4" :value="true">
        <div class="title mt-2 mb-2">You have signed in.</div>
      </v-alert>
      <v-btn v-if="isAuthenticated" @click="navSignOut()" color="amber accent-3" dark large class="mb-5">Sign Out</v-btn>
    </v-layout>
  </v-container>
</template>

<script>
import router from '../routes'

export default {
  computed: {
    isAuthenticated: function () {
      return this.$store.state.auth.authenticated
    }
  },
  methods: {
    navRegister: function () {
      console.log('navigatig to sign up')
      router.push('/register')
    },
    navSignOut: function () {
      this.$store.dispatch('signOut')
      router.push('/')
    }
  }
}
</script>

<style>
.aws-logo {
  max-height: 80px;
}
</style>
