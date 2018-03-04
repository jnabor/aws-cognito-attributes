<template>
<div>
  <v-card-text class="pl-4 pr-4">
    <div class="caption mb-1">
      <v-icon small class="mr-1">email</v-icon>
      Email Address
    </div>
    <div class="body-2">{{ emailUp === '  ' ? '...' : emailUp }}</div>
  </v-card-text>
</div>
</template>

<script>
export default {
  props: {
    email: String
  },
  data: function () {
    return {
      emailUpdate: '',
      showEditView: false,
      enableSave: false
    }
  },
  methods: {
    cancelEdit: function () {
      console.log('Name: cancelling...')
      this.emailUpdate = JSON.parse(JSON.stringify(this.email))
    },
    closeEdit: function () {
      this.cancelEdit()
      this.showEditView = false
    }
    // email update done by system
    // updateAttribute: function () {
    //   console.log('email: updating...')
    //  this.$emit('updateEmail', this.nameUpdate)
    //  this.enableSave = false
    // }
  },
  computed: {
    emailUp: function () {
      return this.emailUpdate
    },
    emailProp: function () {
      return this.email
    }
  },
  watch: {
    emailUp: function () {
      if (this.emailUpdate !== this.email) {
        this.enableSave = true
      } else {
        this.enableSave = false
      }
    },
    emailProp: function () {
      this.emailUpdate = JSON.parse(JSON.stringify(this.email))
    }
  }
}
</script>
<style scoped>
.tool {
    position: relative;
    padding: 0px;
    margin: 0px;
}
.topright {
    position: absolute;
    top: 0px;
    right: 0px;
}
</style>
