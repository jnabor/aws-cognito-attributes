<template>
  <div id="app">
    <v-app>
      <app-layout
        :sidebar="show"
        :path="path">
      </app-layout>
    </v-app>
  </div>
</template>

<script>
export default {
  name: 'App',
  data: () => {
    return {
      show: false,
      path: ''
    }
  },
  created () {
    this.$store.dispatch('tryAutoSignIn')
    this.path = JSON.stringify(this.$route.path)
    this.show = this.path.includes('dash') || false
  }
}
</script>
<style>
body {
  margin: 0px;
  padding: 0px;
}
.aws-logo {
  width: 100%;
  height: 100%;
  object-fit: contain;
  align-items: left;
}
.fadeout-enter-active, .fadeout-leave-active {
  transition: opacity 0.5s;
}
.fadeout-enter, .fadeout-leave-to {
  opacity: 0;
}
</style>
