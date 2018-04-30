<template>
  <app-wrapper>
    <transition appear name="fadeout">
      <v-card class="pa-2">
        <v-card-media class="mt-4" height="80" contain>
          <img class="aws-logo" src="/static/aws_cognito.png">
        </v-card-media>
        <v-card-title primary-title>
          <div>
            <h4 class="headline mb-0">REGISTER</h4>
            <h4 class="subheading mb-0">to Election App</h4>
          </div>
        </v-card-title>
        <v-card-text>
          <v-alert outline type="error" dismissible class="mb-4 mt-0" v-model="showerr">
            {{ errmsg }}
          </v-alert>
          <v-form v-model="valid">
            <v-text-field
              label="E-mail"
              v-model="email"
              :rules="[emailrules.required, emailrules.email]"
              required clearable>
            </v-text-field>
            <v-text-field
              label="Password"
              v-model="password"
              :rules="passRules"
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
            Sign Up
            <span slot="loader">Connecting...</span>
          </v-btn>
        </v-card-text>
        <v-card-actions class="ml-2 mb-2">
          <v-btn flat small color="accent" :to="'/signin'">Sign In</v-btn>
          <v-btn flat small :to="'/resend'">Confirm Registration</v-btn>
        </v-card-actions>
      </v-card>
    </transition>
    <app-terms></app-terms>
  </app-wrapper>
</template>

<script>
import wrapper from './wrapper'
import terms from './terms'
import router from '../../routes'
import config from '../../config'
var AmazonCognitoIdentity = require('amazon-cognito-identity-js')

var userPool = []
var attributeList = []
var dataEmail = {
  Name: 'email',
  Value: ''
}

export default {
  components: {
    'app-wrapper': wrapper,
    'app-terms': terms
  },
  data: function () {
    return {
      callback: false,
      showerr: false,
      errcode: '',
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
        (v) => v.length >= 8 || 'Password must be 8-20 characters',
        (v) => /^(?=.*[0-9])/.test(v) || 'Password must contain at least 1 number',
        (v) => /^(?=.*[a-z])/.test(v) || 'Password must contain at least 1 lower case letter',
        (v) => /^(?=.*[A-Z])/.test(v) || 'Password must contain at least 1 upper case letter',
        (v) => /^(?=.*[!@#$%^&*"])/.test(v) || 'Password must contain at least 1 special character (!@#$%^&*")'
      ],
      hidepw: true,
      loader: false,
      loading: false
    }
  },
  methods: {
    onSubmit () {
      this.loader = 'loading'
      const l = this.loader
      this[l] = !this[l]

      dataEmail.Value = this.email
      var attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(dataEmail)
      attributeList.push(attributeEmail)
      console.log('attribute list: ' + attributeList)
      userPool = new AmazonCognitoIdentity.CognitoUserPool(config.poolData)
      console.log('sign up with: ' + this.email + ' ' + this.password)
      this.callback = false
      this.errcode = ''
      this.username = ''

      userPool.signUp(this.email, this.password, attributeList, null, (err, result) => {
        if (!this.callback) {
          this.callback = true
          console.log('register callback')
          if (err) {
            console.error('registration error: ' + JSON.stringify(err))
            this.errcode = JSON.stringify(err.code)
          } else {
            console.log('registration success: ' + JSON.stringify(result))
            this.message = JSON.stringify(result.message)
            console.log('user name is ' + result.user.getUsername())
            this.username = result.user.getUsername()
            this.$store.commit('setUsername', this.username)
            router.push('/confirm')
          }
          this[l] = false
          this.loader = null
        }
      })
    },
    getMessage: function () {
      return this.message
    }
  },
  watch: {
    errcode () {
      console.log('watched error code: ' + this.errcode)
      if (this.errcode !== '') {
        if (this.errcode === '"UsernameExistsException"') {
          this.errmsg = 'An account with the given email already exists!'
        } else {
          this.errmsg = 'An error has occured!'
        }
        this.showerr = true
      }
    }
  }
}

</script>

<style scoped>
</style>
