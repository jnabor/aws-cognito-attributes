<template>
  <div>
    <v-text-field
      prepend-icon="add_a_photo"
      single-line
      v-model="filename"
      label="Select Photo"
      @click.native="onFocus"
      ref="fileTextField">
    </v-text-field>
    <input
      type="file"
      :accept="accept"
      ref="fileInput"
      @change="onFileChange">
  </div>
</template>

<script>
export default {
  props: {
    accept: {
      type: String,
      default: '*'
    }
  },
  data () {
    return {
      filename: ''
    }
  },
  watch: {
    value (v) {
      this.filename = v
    }
  },
  mounted () {
    this.filename = this.value
  },
  methods: {
    onFocus () {
      this.$refs.fileInput.click()
    },
    onFileChange (event) {
      this.filename = event.target.files[0].name
      console.log('selected file: ' + this.filename)
    },
    test () {

    }
  }
}
</script>

<style scoped>
  input[type=file] {
    position: absolute;
    left: -99999px;
  }
</style>
