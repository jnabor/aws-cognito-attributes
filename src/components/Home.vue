<template>
  <v-container>

    <section>
      <v-layout column align-center justify-center>
        <transition appear name="fadeout">
        <img class="aws-logo mt-5 mb-4" src="../../static/aws_cognito_vue.png">
        </transition>
        <h1 class="mb-2 display-2 text-xs-center black--text hidden-xs-only">AUTHENTICATION DEMO</h1>
        <h3 class="mb-3 text-xs-center grey--text hidden-xs-only">using Amazon Cognito and Vue.js with Material Design</h3>
        <v-btn v-if="!$store.state.authenticated" color="amber accent-3" dark large @click="navRegister()">Get Started</v-btn>
        <v-alert v-if="$store.state.authenticated" outline type="success" class="mt-4 mb-4" :value="true">
          <div class="title mt-2 mb-2">You have signed in.</div>
        </v-alert>
        <v-btn v-if="$store.state.authenticated" @click="navSignOut()" color="amber accent-3" dark large>Sign Out</v-btn>
      </v-layout>
    </section>

  </v-container>
</template>

<script>
import router from '../routes'

export default {
  methods: {
    navRegister: function () {
      console.log('navigatig to sign up')
      router.push('/register')
    },
    navSignOut: function () {
      console.log('signing out')
      this.$store.commit('signOut')
      router.push('/home')
    }
  }
}
</script>

<style>
.aws-logo {
  max-height: 80px;
}
</style>
