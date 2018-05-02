<template>
  <v-dialog
    v-model="dialog"
    :fullscreen="fullscreen"
    max-width="600"
    transition="dialog-bottom-transition"
    scrollable>
    <v-card>
      <v-toolbar class="elevation-0 white--text" color="primary">
        <v-toolbar-title>Upload Picture</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click.native="close()" dark>
          <v-icon>close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text class="px-4">
        <v-alert outline type="error" dismissible class="mb-4 mt-0" v-model="showerr">
          {{ errmsg }}
        </v-alert>
        <app-imginput v-model="filename" @formData="formData"></app-imginput>
      </v-card-text>
      <v-card-actions class="px-4">
        <v-btn
          block
          :loading="loading"
          @click.native="onSubmit()"
          :disabled="!valid"
          class="mt-3 mb-3 white--text"
          color="submit">
          Upload
          <span slot="loader">Uploading...</span>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import fileInput from './imginput.vue'

export default {
  props: {
    dialog: Boolean
  },
  components: {
    'app-imginput': fileInput
  },
  data: function () {
    return {
      formData: '',
      filename: '',
      showerr: false,
      errmsg: '',
      fullscreen: true,
      valid: false,
      loader: false,
      loading: false
    }
  },
  methods: {
    uploadFiles () {
      // your custom upload method
      const form = this.formData
      console.log(form)
    },
    close: function () {
      this.$emit('close')
    },
    setHeaders (param) {
      if (param === 'xs') {
        this.fullscreen = true
      } else {
        this.fullscreen = false
      }
    }
  },
  watch: {
    breakpoint () {
      this.setHeaders(this.breakpoint)
    }
  },
  created () {
    this.setHeaders(this.breakpoint)
  }
}
</script>
<style scoped>
</style>
