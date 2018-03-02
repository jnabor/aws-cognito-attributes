<template>
  <v-app>

  <v-toolbar color="primary">
    <i class="material-icons white--text ml-2 ml-4">fingerprint</i>
    <v-toolbar-title class="white--text hidden-xs-only">Auth</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn icon @click="navDefault()">
      <v-icon class="white--text">home</v-icon>
    </v-btn>

    <v-menu  v-if="$store.state.authenticated" bottom left class="mr-4 hidden-sm-and-up">
      <v-btn icon slot="activator">
        <v-icon class="white--text">person</v-icon>
      </v-btn>
      <v-list>
        <v-list-tile @click="navProfile()">
          <v-list-tile-title>Profile</v-list-tile-title>
        </v-list-tile>
        <v-list-tile @click="navSignOut()">
          <v-list-tile-title>Sign Out</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
    <v-menu  v-if="$store.state.authenticated" bottom left class="mr-4 hidden-xs-only">
      <v-btn depressed small color="primary" slot="activator">
        {{ username }}
        <v-icon class="white--text">arrow_drop_down</v-icon>
      </v-btn>
      <v-list>
        <v-list-tile @click="navProfile()">
          <v-list-tile-title>Profile</v-list-tile-title>
        </v-list-tile>
        <v-list-tile @click="navSignOut()">
          <v-list-tile-title>Sign Out</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
    <v-btn v-if="!$store.state.authenticated" class="hidden-xs-only white--text" @click="navSignIn()" flat>Sign In</v-btn>
    <v-btn v-if="!$store.state.authenticated" class="hidden-xs-only white--text mr-4" @click="navRegister()" flat>Register</v-btn>
    <v-menu v-if="!$store.state.authenticated" bottom left class="hidden-sm-and-up">
      <v-btn icon slot="activator" >
        <v-icon class="white--text">more_vert</v-icon>
      </v-btn>
      <v-list>
        <v-list-tile
          v-if="!$store.state.authenticated"
          @click="navSignIn()">
          <v-list-tile-title >
            Sign In
          </v-list-tile-title>
        </v-list-tile>
        <v-list-tile
          v-if="!$store.state.authenticated"
          @click="navRegister()">
          <v-list-tile-title>
            Register
          </v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
  </v-toolbar>

  <v-content>
    <router-view></router-view>
  </v-content>

  <v-footer fixed app>
    <v-layout column align-center justify-center>
      <div class="ml-3">
        <span>&copy; 2018 <a href="http://sonabstudios.com">SonabStudios&trade;</a> is a trademark of Jayson Nabor</span>
      </div>
    </v-layout>
  </v-footer>

  </v-app>
</template>

<script>
import router from '../routes'

export default {
  data: () => ({
    username: ''
  }),
  methods: {
    navDefault: function () {
      console.log('navigating to sign in')
      router.push('/home')
    },
    navSignIn: function () {
      console.log('navigating to sign in')
      router.push('/signin')
    },
    navRegister: function () {
      console.log('navigating to sign up')
      router.push('/register')
    },
    navSignOut: function () {
      console.log('signing out')
      this.$store.commit('signOut')
      router.push('/home')
    },
    navProfile: function () {
      console.log('navigating to profile')
      router.push('/profile')
    }
  },
  beforeUpdate () {
    console.log('store.username: ' + this.$store.state.username)
    var str = this.$store.state.username
    var index = str.indexOf('@')
    this.username = str.substring(0, index)
  }
}
</script>

<style>

</style>
