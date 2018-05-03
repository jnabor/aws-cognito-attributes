<template>
  <v-dialog
    v-model="show"
    :fullscreen="fullscreen"
    max-width="500"
    transition="dialog-bottom-transition"
    scrollable>
    <v-card>
      <v-toolbar class="elevation-0 white--text" color="primary">
        <v-toolbar-title>Update Picture</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click.native="close()" dark>
          <v-icon>close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text class="px-4">
        <v-layout justify-center>
          <v-avatar
          class="my-4"
            :size="160">
            <template v-if="imageData.length > 0">
              <img class="preview" :src="imageData">
            </template>
            <template v-else>
              <img class="preview" src="/static/avatar_placeholder.png">
            </template>
          </v-avatar>
        </v-layout>
        <v-alert outline type="error" dismissible class="mb-4 mt-0" v-model="showerr">
          {{ errmsg }}
        </v-alert>
        <input style="display: none" type="file" @change="onFileSelected" ref="fileInput" accept="image/*">
         <v-text-field
            v-model="fileName"
            prepend-icon="add_a_photo"
            label="Select Image"
            autofocus
            @click="$refs.fileInput.click()"
            hint="200 x 200 resolution recommended"
            persistent-hint
            single-line
            readonly>
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
      imageData: '',
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
      let input = event.target
      if (input.files && input.files[0]) {
        let reader = new FileReader()
        reader.onload = (e) => {
          this.imageData = e.target.result
        }
        reader.readAsDataURL(input.files[0])
      }
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
  computed: {
    breakpoint () {
      return this.$vuetify.breakpoint.name
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
