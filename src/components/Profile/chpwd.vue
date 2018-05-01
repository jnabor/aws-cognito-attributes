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
        <v-form v-model="valid" ref="form">
            <v-text-field
              v-show="false"
              label="Email">
            </v-text-field>
           <v-text-field
              autocomplete="current-password"
              label="Old Password"
              v-model="oldPassword"
              :rules="pwdRules0"
              :append-icon="hidepw ? 'visibility' : 'visibility_off'"
              :append-icon-cb="() => (hidepw = !hidepw)"
              :type="hidepw ? 'password' : 'text'">
            </v-text-field>
            <v-text-field
              autocomplete="new-password"
              label="New Password"
              v-model="newPassword1"
              :rules="pwdRules1"
              :append-icon="hidepw1 ? 'visibility' : 'visibility_off'"
              :append-icon-cb="() => (hidepw1 = !hidepw1)"
              :type="hidepw1 ? 'password' : 'text'">
            </v-text-field>
            <v-text-field
              autocomplete="new-password"
              label="Confirm New Password"
              v-model="newPassword2"
              :rules="pwdRules2"
              :append-icon="hidepw2 ? 'visibility' : 'visibility_off'"
              :append-icon-cb="() => (hidepw2 = !hidepw2)"
              :type="hidepw2 ? 'password' : 'text'">
            </v-text-field>
        </v-form>
      </v-card-text>
      <div>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="mx-3 mb-2" @click="close()">CANCEL</v-btn>
          <v-btn class="mx-3 mb-2" :disabled="!valid" @click="changePassword()" color="success">Change Password</v-btn>
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
      hidepw1: true,
      hidepw2: true,
      fullscreen: true,
      valid: false,
      pwdRules0: [
        (v) => !!v || 'Password is required',
        (v) => !v || v.length >= 8 || 'Password must be at least 8 characters'
      ],
      pwdRules1: [
        (v) => !!v || 'Password is required',
        (v) => !v || v.length >= 8 || 'Password must be 8-20 characters',
        (v) => v !== this.oldPassword || 'Password must not match old password',
        (v) => /^(?=.*[0-9])/.test(v) || 'Password must contain at least 1 number',
        (v) => /^(?=.*[a-z])/.test(v) || 'Password must contain at least 1 lower case letter',
        (v) => /^(?=.*[A-Z])/.test(v) || 'Password must contain at least 1 upper case letter',
        (v) => /^(?=.*[!@#$%^&*"])/.test(v) || 'Password must contain at least 1 special character (!@#$%^&*")'
      ],
      pwdRules2: [
        (v) => !!v || 'Password is required',
        (v) => v === this.newPassword1 || 'Password does not match'
      ]
    }
  },
  methods: {
    close: function () {
      this.$emit('close')
      this.$refs.form.reset()
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
  watch: {
    breakpoint () {
      this.setHeaders(this.breakpoint)
    },
    dialog () {
      if (!this.dialog) {

      }
    }
  },
  created () {
    this.setHeaders(this.breakpoint)
  }
}
</script>
<style scoped>
</style>
