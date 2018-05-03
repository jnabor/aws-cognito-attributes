<template>
  <v-dialog
    v-model="show"
    :fullscreen="fullscreen"
    max-width="400"
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
      <v-card-media>
      </v-card-media>
      <v-card-text class="px-4">
        <v-alert outline type="error" dismissible class="mb-4 mt-0" v-model="showerr">
          {{ errmsg }}
        </v-alert>
        <input style="display: none" type="file" @change="onFileSelected" ref="fileInput">
         <v-text-field
            v-model="fileName"
            prepend-icon="add_a_photo"
            label="Select Image"
            autofocus
            @click="$refs.fileInput.click()"
            single-line readonly>
          </v-text-field>
      </v-card-text>
      <v-card-actions class="px-4 pb-3">
        <v-btn @click="onUpload">Upload</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    dialog: Boolean
  },
  data: function () {
    return {
      show: false,
      selectedFile: null,
      fileName: '',
      showerr: false,
      errmsg: '',
      fullscreen: true,
      valid: false,
      loader: false,
      loading: false
    }
  },
  methods: {
    onFileSelected (event) {
      this.selectedFile = event.target.files[0]
      this.fileName = this.selectedFile.name
    },
    onUpload () {

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
    dialog () {
      this.show = this.dialog
    },
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
