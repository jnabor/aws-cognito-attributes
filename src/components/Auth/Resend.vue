<template>
  <app-wrapper>
    <transition appear name="fadeout">
      <v-card class="pa-2">
        <v-card-media class="mt-4" height="80" contain>
          <img class="aws-logo" src="/static/aws_cognito.png">
        </v-card-media>
        <v-card-title primary-title>
          <div>
            <h4 class="headline mb-0">VERIFY</h4>
            <h4 class="subheading mb-0">your email address</h4>
          </div>
        </v-card-title>
        <v-card-text>
          <h4 class="subheading mb-0 accent--text">Send Confirmation Code</h4>
          <v-alert outline type="error" dismissible class="mb-4 mt-2" v-model="showerr">
            {{ errmsg }}
          </v-alert>
          <v-form v-model="valid">
            <v-text-field
              label="E-mail"
              v-model="email"
              :rules="[emailrules.required, emailrules.email]"
              required clearable>
            </v-text-field>
          </v-form>
          <v-btn
            block
            :loading="loading"
            @click.native="onSubmit()"
            :disabled="!valid"
            class="mt-3 mb-3 white--text"
            color="submit">
            Resend
            <span slot="loader">Connecting...</span>
          </v-btn>
        </v-card-text>
      </v-card>
    </transition>
    <app-terms></app-terms>
  </app-wrapper>
</template>

<script>
import wrapper from './wrapper'
import terms from './terms'
// import router from '../../routes'
// import config from '../../config'
// var AmazonCognitoIdentity = require('amazon-cognito-identity-js')

export default {
  components: {
    'app-wrapper': wrapper,
    'app-terms': terms
  },
  data: () => ({
    userPool: [],
    cognitoUser: {},
    confirmed: false,
    showerr: false,
    errcode: '',
    errmsg: '',
    email: '',
    emailrules: {
      required: (value) => !!value || 'E-mail is required',
      email: (value) => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return pattern.test(value) || 'E-mail must be valid'
      }
    },
    valid: false,
    loader: false,
    loading: false
  }),
  methods: {
    setCognitoUser () {
    },
    onSubmit () {
    },
    resendConfirmation () {
    },
    reenterVerificationCode () {
    }
  },
  watch: {
    confirmed () {
    },
    errcode () {
    }
  },
  created () {
  }
}
</script>
<style scoped>
</style>
