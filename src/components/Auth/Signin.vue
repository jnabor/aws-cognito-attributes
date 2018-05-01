<template>
  <app-wrapper>
    <transition appear name="fadeout">
      <v-card class="pa-2">
        <v-card-media class="mt-4" height="80" contain>
          <img class="aws-logo" src="/static/aws_cognito.png">
        </v-card-media>
        <v-card-title primary-title>
          <div>
            <h4 class="headline mb-0">SIGN IN</h4>
            <h4 class="subheading mb-0">to Election App</h4>
          </div>
        </v-card-title>
        <v-card-text>
          <v-alert outline type="error" dismissible class="mb-4 mt-0" v-model="showerr">
            {{ errmsg }}
            <v-btn v-if="resend" color="primary" flat small :to="'/resend'">Re-send Confirmation</v-btn>
          </v-alert>
          <v-form v-model="valid" ref="form">
            <v-text-field
              autocomplete="username"
              label="E-mail"
              v-model="email"
              :rules="[emailrules.required, emailrules.email]"
              required clearable>
            </v-text-field>
            <v-text-field
              autocomplete="current-password"
              label="Password"
              v-model="password"
              :rules="passRules"
              hint="At least 8 characters"
              :append-icon="hidepw ? 'visibility' : 'visibility_off'"
              :append-icon-cb="() => (hidepw = !hidepw)"
              :type="hidepw ? 'password' : 'text'"
              required>
            </v-text-field>
          </v-form>
          <v-btn
            block
            :loading="loading"
            @click.native="onSubmit()"
            :disabled="!valid"
            class="mt-3 mb-3 white--text"
            color="submit">
            Sign In
            <span slot="loader">Connecting...</span>
          </v-btn>
        </v-card-text>
        <v-card-actions class="ml-2 mb-2">
          <v-btn flat small color="accent" :to="'/register'">Register</v-btn>
          <v-btn flat small :to="'/forgot'">Forgot Password?</v-btn>
        </v-card-actions>
      </v-card>
    </transition>
    <app-terms></app-terms>
  </app-wrapper>
</template>

<script>
import wrapper from './wrapper'
import terms from './terms'

export default {
  components: {
    'app-wrapper': wrapper,
    'app-terms': terms
  },
  data: function () {
    return {
      callback: false,
      showerr: false,
      resend: false,
      errmsg: '',
      username: '',
      valid: false,
      email: '',
      emailrules: {
        required: (value) => !!value || 'E-mail is required',
        email: (value) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'E-mail must be valid'
        }
      },
      password: '',
      passRules: [
        (v) => !!v || 'Password is required',
        (v) => !v || v.length >= 8 || 'Password must be at least 8 characters'
      ],
      hidepw: true,
      loader: false,
      loading: false
    }
  },
  computed: {
    errcode: function () {
      return this.$store.state.auth.errcode
    }
  },
  methods: {
    onSubmit () {
      this.loader = 'loading'
      const l = this.loader
      this[l] = !this[l]
      console.log('sign in with: ' + this.email + ' ' + this.password)
      var authData = {
        Username: this.email,
        Password: this.password
      }
      this.$store.dispatch('signIn', authData)
    },
    getMessage: function () {
      return this.message
    }
  },
  watch: {
    errcode () {
      this.loader = 'loading'
      const l = this.loader
      this[l] = !this[l]
      console.log('watched error code: ' + this.errcode)
      if (this.errcode !== '') {
        if (this.errcode === '"NotAuthorizedException"') {
          this.errmsg = 'Incorrect username or password'
        } else if (this.errcode === '"UserNotFoundException"') {
          this.errmsg = 'User not found'
        } else if (this.errcode === '"UserNotConfirmedException"') {
          this.$store.commit('setUsername', this.email)
          this.resend = true
          this.errmsg = 'User registration not confirmed'
        } else if (this.errcode === '"LimitExceededException"') {
          this.errmsg = 'Attempt limit exceeded, please try after some time'
        } else {
          this.errmsg = 'An error has occured!'
        }
        this.showerr = true
      } else {
        this.showerr = false
      }
      this[l] = false
      this.loader = null
    }
  }
}
</script>
<style scoped>
</style>
