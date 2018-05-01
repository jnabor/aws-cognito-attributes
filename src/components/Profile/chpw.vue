<template>
  <v-dialog
    v-model="dialog"
    :fullscreen="fullscreen"
    max-width="500"
    transition="dialog-bottom-transition"
    scrollable>
    <v-card>
      <v-toolbar class="elevation-0 white--text" color="primary">
        <v-toolbar-title>Change Password</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click.native="close()" dark>
          <v-icon>close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text>
        <v-form v-model="valid">
           <v-text-field
              label="Old Password"
              v-model="oldPassword"
              :rules="passRules"
              :append-icon="hidepw ? 'visibility' : 'visibility_off'"
              :append-icon-cb="() => (hidepw = !hidepw)"
              :type="hidepw ? 'password' : 'text'"
              required>
            </v-text-field>
            <v-text-field
              label="New Password"
              v-model="newPassword1"
              :rules="passRules1"
              :append-icon="hidepw ? 'visibility' : 'visibility_off'"
              :append-icon-cb="() => (hidepw = !hidepw)"
              :type="hidepw ? 'password' : 'text'"
              required>
            </v-text-field>
            <v-text-field
              label="Confirm New Password"
              v-model="newPassword2"
              :rules="passRules2"
              :append-icon="hidepw ? 'visibility' : 'visibility_off'"
              :append-icon-cb="() => (hidepw = !hidepw)"
              :type="hidepw ? 'password' : 'text'"
              required>
            </v-text-field>
        </v-form>
      </v-card-text>
      <div>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="mx-3 mb-2" @click="cancelChange()">CANCEL</v-btn>
          <v-btn class="mx-3 mb-2" @click="changePassword()" color="success">Change Password</v-btn>
        </v-card-actions>
      </div>
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
      oldPassword: '',
      newPassword1: '',
      newPassword2: '',
      hidepw: true,
      fullscreen: true,
      valid: false,
      passRules: [
        (v) => !!v || 'Password is required',
        (v) => v.length >= 8 || 'Password must be at least 8 characters'
      ],
      passRules1: [
        (v) => !!v || 'Password is required',
        (v) => v.length >= 8 || 'Password must be at least 8 characters',
        (v) => v !== this.oldPassword || 'Password must not match old password'
      ],
      passRules2: [
        (v) => !!v || 'Password is required',
        (v) => v.length >= 8 || 'Password must be at least 8 characters',
        (v) => v === this.newPassword1 || 'Password does not match'
      ]
    }
  },
  methods: {
    close: function () {
      this.$emit('close')
    },
    cancelChange: function () {
      this.$emit('close')
    },
    changePassword: function () {
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
