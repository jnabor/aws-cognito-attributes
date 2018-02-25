<template>
  <v-container>
    <section>
      <v-layout column align-center justify-center>
User Profile

      </v-layout>
    </section>
  </v-container>
</template>

<script>
import router from '../routes'

export default {
  methods: {
    navSignOut: function () {
      console.log('signing out')
      this.$store.state.authenticated = false
      router.push('/home')
    }
  }
}
</script>
