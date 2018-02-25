<template>
  <v-container>

    <section>
      <v-layout column align-center justify-center>
        <v-alert outline type="success" class="mt-4 mb-4" :value="true">
          <div class="title mt-2 mb-2">You have updated your password.</div>
        </v-alert>
        <transition appear name="fadeout">
        <v-btn color="amber accent-3" dark large @click="navSignIn()">Sign In</v-btn>
        </transition>
      </v-layout>
    </section>

  </v-container>
</template>

<script>
import router from '../routes'

export default {
  methods: {
    navSignIn: function () {
      console.log('navigating to sign in')
      router.push('/signin')
    }
  }
}
</script>

<style>
.aws-logo {
  max-height: 80px;
}
</style>
