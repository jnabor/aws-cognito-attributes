<template>
  <v-container grid-list-md class="mt-3">
    <v-layout row wrap>
      <v-flex xl12 lg12 md12 sm12 xs12>
        <v-card class="pa-4 ml-4 mr-4">
          <v-layout row justify-center>
            <v-flex xl2 lg3 md4 sm4 class="hidden-xs-only">
              <v-card class="elevation-0 pa-2 mr-2">
                <v-card-media >
                <img class="aws-logo" src="../../static/aws_cognito.png">
                </v-card-media>
              </v-card>
            </v-flex>
            <v-flex xl4 lg5 md6 sm6>
              <transition appear name="fadeout">
              <v-card class="elevation-0 pa-2 ml-1 mr-1">
                <v-alert outline type="error" dismissible class="ml-3 mr-3" v-model="showerr">
                  {{ errmsg }}
                </v-alert>
                <v-card-title primary-title>
                  <div>
                    <h4 class="headline mb-0">Register AWS Cognito</h4>
                  </div>
                </v-card-title>
                <v-card-text>

                  <v-form v-model="valid">

                    <v-text-field
                      label="E-mail"
                      v-model="email"
                      :rules="emailRules"
                      required>
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
                    class="mt-3 mb-3"
                    light
                    color="secondary">
                    Sign Up
                    <span slot="loader">Connecting...</span>
                  </v-btn>
                  <div >
                    By signing up, you agree to the <router-link :to="''">Terms of Service</router-link> and <router-link :to="''">Privacy Policy</router-link>, including Cookie Use.
                  </div>
                </v-card-text>
              </v-card>
              </transition>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import router from '../routes'
import * as config from './config'
var AmazonCognitoIdentity = require('amazon-cognito-identity-js')

var userPool = []
var attributeList = []
var dataEmail = {
  Name: 'email',
  Value: ''
}

export default {
  data: function () {
    return {
      callback: false,
      showerr: false,
      errcode: '',
      errmsg: '',
      username: '',
      valid: false,
      email: '',
      emailRules: [
        (v) => !!v || 'E-mail is required',
        // eslint-disable-next-line
        (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
      ],
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
            console.log('registration error: ' + JSON.stringify(err))
            this.errcode = JSON.stringify(err.code)
          } else {
            console.log('registration success: ' + JSON.stringify(result))
            this.message = JSON.stringify(result.message)
            console.log('user name is ' + result.user.getUsername())
            this.username = result.user.getUsername()
            this.$store.state.username = this.username
            router.push('/confirm')
          }
          this[l] = false
          this.loader = null
        }
      })
    },
    navRreset: function () {
      router.push('/reset')
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
.aws-logo {
  width: 100%;
    height: 100%;
    object-fit: contain;
}

a {
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

</style>
