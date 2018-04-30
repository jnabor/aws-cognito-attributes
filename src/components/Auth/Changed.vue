<template>
  <app-wrapper>
    <transition appear name="fadeout">
      <v-layout column align-center justify-center class="mb-5">
        <v-alert outline type="success" class="mt-4 mb-4" :value="true">
          <div class="title mt-2 mb-2">You have updated your password.</div>
        </v-alert>
        <transition appear name="fadeout">
        <v-btn color="amber accent-3" dark large class="mb-5" @click="navSignIn()">Sign In</v-btn>
        </transition>
      </v-layout>
    </transition>
  </app-wrapper>
</template>

<script>
import wrapper from './wrapper'
import router from '../../routes'

export default {
  components: {
    'app-wrapper': wrapper
  },
  methods: {
    navSignIn: function () {
      console.log('navigating to sign in')
      router.push('/signin')
    }
  }
}
</script>
<style>
</style>
