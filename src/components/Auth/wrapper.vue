<template>
  <v-container fluid fill-height class="pa-3">
    <v-layout justify-center align-center class="mb-5">
      <v-flex xl12 lg12 md12 sm12 xs12>
        <v-layout row justify-center>
          <v-flex xl4 lg4 md6 sm8 xs12>
            <slot>
            </slot>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
}
</script>
<style scoped>
</style>
