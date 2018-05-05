<template>
  <v-dialog
    v-model="show"
    :fullscreen="fullScreen"
    max-width="600"
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
      <v-card-text class="pa-4">
        <v-layout v-if="step === 1" row wrap justify-center>
          <v-flex>
            <div
              @click="handleClick"
              @drop="handleChange"
              @dragover="preventDefault"
              @dragenter="preventDefault"
              @dragleave="preventDefault">
              <v-container class="image-drop-area grey lighten-4"
                fluid fill-height>
                <v-layout column justify-center align-center>
                  <v-alert :value="!showError" outline color="grey lighten-1" icon="add_a_photo" >
                    Click or drag image file here
                  </v-alert>
                  <v-alert :value="showError" outline color="error" icon="add_a_photo" >
                    {{ errorMessage }} Select another image.
                  </v-alert>
                  <div class="caption grey--text">200px by 200px image recommended</div>
                </v-layout>
              </v-container>
              <input type="file" v-show="false" @change="handleChange" ref="fileInput" accept="image/*">
            </div>
          </v-flex>
        </v-layout>
        <v-layout v-if="step === 2" row wrap justify-center>
          <v-flex xs12 sm8>
            <v-card class="pa-0 ma-0 elevation-2" color="grey darken-2">
              <v-card-media align-center justify-center>
                <v-layout justify-center>
                  <img
                    v-if="sourceImgUrl.length > 0"
                    :src="sourceImgUrl"
                    class="image-preview-area pa-0 ma-0 ">
                  <v-container
                    v-if="sourceImgUrl.length === 0"
                    class="image-preview-area grey lighten-4 pa-0 ma-0"
                    fluid fill-height>
                  </v-container>
                </v-layout>
              </v-card-media>
            </v-card>
            <v-slider v-if="false"
              append-icon="zoom_in"
              :append-icon-cb="() => previewZoom += 10"
              prepend-icon="zoom_out"
              :prepend-icon-cb="() => previewZoom -= 10"
              v-model="previewZoom">
            </v-slider>
          </v-flex>
          <v-flex xs12 sm4>
            <v-card class="pa-0 ma-0 elevation-0 transparent">
            <v-layout row wrap justify-center align-center>
              <v-avatar
                v-if="false"
                class="my-2 mx-4 elevation-2"
                tile
                :size="90">
                <template v-if="sourceImgUrl.length > 0">
                  <img :src="sourceImgUrl">
                </template>
                <template v-else>
                  <img src="/static/avatar_placeholder.png">
                </template>
              </v-avatar>
              <v-avatar
                class="my-2 mx-4 elevation-2"
                :size="90">
                <template v-if="sourceImgUrl.length > 0">
                  <img :src="sourceImgUrl">
                </template>
                <template v-else>
                  <img src="/static/avatar_placeholder.png">
                </template>
              </v-avatar>
            </v-layout>
            </v-card>
          </v-flex>
        </v-layout>
      </v-card-text>
      <div v-if="step === 2">
        <v-card-actions class="px-4 pb-4">
          <v-spacer></v-spacer>
          <v-btn @click="step = 1" class="mr-3">Back</v-btn>
          <v-btn @click="onUpload()" color="primary">Save</v-btn>
        </v-card-actions>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
'use strict'
import config from '../../config'
const AWS = require('aws-sdk')

AWS.config.update({
  region: config.bucketRegion,
  credentials: new AWS.CognitoIdentityCredentials({
    RoleArn: 'arn:aws:iam::815621908682:role/Cognito_AuthCognitoAttributesAuth_Role',
    IdentityPoolId: config.identityPoolId
  })
})

var s3 = new AWS.S3({
  apiVersion: '2006-03-01',
  params: { Bucket: config.bucketName }
})

export default {
  props: {
    dialog: Boolean
  },
  data: function () {
    return {
      step: 1,
      loading: 0,
      progress: 0,
      errorMessage: 'An error occured!',
      showError: false,
      sourceImgUrl: '',
      fileName: '',
      previewZoom: 0,
      fullScreen: true,
      valid: false,
      loader: false,
      maxSize: 102400
    }
  },
  methods: {
    preventDefault (event) {
      event.preventDefault()
      return false
    },
    handleClick (event) {
      if (this.loading !== 1) {
        if (event.target !== this.$refs.fileInput) {
          event.preventDefault()
          if (document.activeElement !== this.$refs) {
            this.$refs.fileInput.click()
          }
        }
      }
    },
    handleChange (event) {
      event.preventDefault()
      if (this.loading !== 1) {
        let files = event.target.files || event.dataTransfer.files
        this.reset()
        if (this.checkFile(files[0])) {
          this.setSourceImg(files[0])
        }
      }
    },
    checkFile (file) {
      if (file.type.indexOf('image') === -1) {
        this.showError = true
        this.errorMessage = 'The selected file is not an image! '
        return false
      }
      if (file.size / 1024 > this.maxSize) {
        this.errorMessage = 'Exceeded maximum size of ' + this.maxSize + ' kb'
        this.showError = true
        return false
      }
      return true
    },
    reset () {
      this.loading = 0
      this.progress = 0
      this.showError = false
      this.errorMessage = ''
      this.errorMessage = 'An error occured!'
      this.showError = false
      this.sourceImgUrl = ''
      this.step = 1
    },
    setSourceImg (file) {
      let reader = new FileReader()
      this.fileName = file.name
      console.log('filename: ' + file.name)
      reader.onload = (event) => {
        this.sourceImgUrl = event.target.result
        this.step = 2
      }
      reader.readAsDataURL(file)
    },
    onUpload () {
      let ext = ''
      if (~this.fileName.indexOf('.jpg')) {
        ext = '.jpg'
      } else if (~this.fileName.indexOf('.jpeg')) {
        ext = '.jpeg'
      } else if (~this.fileName.indexOf('.png')) {
        ext = '.png'
      } else if (~this.fileName.indexOf('.bmp')) {
        ext = '.mbp'
      } else {
        console.error('file type not supported')
        return
      }

      const fileName = this.username + '_' + Date.now().toString() + ext
      console.log('uploading file: ' + fileName)
      const params = {
        Key: fileName,
        Body: this.sourceImgUrl
      }
      s3.upload(params, function (err, data) {
        if (err) {
          console.error(err.message)
        } else {
          console.error('Successfully uploaded photo.')
        }
      })
      // this.$emit('close')
      // this.reset()
    },
    close: function () {
      this.$emit('close')
      this.reset()
    },
    setHeaders (param) {
      if (param === 'xs') {
        this.fullScreen = true
      } else {
        this.fullScreen = false
      }
    }
  },
  computed: {
    breakpoint () {
      return this.$vuetify.breakpoint.name
    },
    show () {
      return this.dialog
    },
    username () {
      let str = this.$store.state.auth.username
      var index = str.indexOf('@')
      return str.substring(0, index)
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
.image-drop-area {
  height: 240px;
}
.image-preview-area {
  max-height: 240px;
  width: auto;
  height: 100%;
}
</style>
