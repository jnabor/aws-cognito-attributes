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
                <v-alert outline type="success" dismissible class="ml-3 mr-3" v-model="codesent">
                  A confirmation was code sent to your email.
                </v-alert>

                <!-- search for user account -->
                <template v-if="!codesent">
                  <v-card-title primary-title>
                    <div>
                      <h4 class="headline mb-0">Find your cognito account</h4>
                    </div>
                  </v-card-title>
                  <v-card-text>
                    <v-form  v-model="valid">
                      <v-text-field
                      label="Enter E-mail"
                      v-model="email"
                      :rules="emailRules"
                      required>
                      </v-text-field>
                    </v-form>
                    <v-btn
                      block
                      :loading="loading"
                      @click.native="onFind()"
                      :disabled="!valid"
                      class="mt-3 mb-3"
                      light
                      color="secondary">
                      Find
                      <span slot="loader">Verifying account...</span>
                    </v-btn>
                    <div>
                      A confirmation code will be sent to your email address.
                    </div>
                  </v-card-text>
                </template>

                <!-- enter confirmation code and new password -->
                <template v-if="codesent">
                  <v-card-title primary-title>
                    <div>
                      <h4 class="headline mb-0">Confirm password change</h4>
                    </div>
                  </v-card-title>
                  <v-card-text>
                    <v-form  v-model="valid">
                      <v-text-field
                        label="Confirmation Code"
                        v-model="code"
                        :rules="codeRules"
                        required>
                      </v-text-field>
                      <v-text-field
                        label="New Password"
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
                      Confirm
                    <span slot="loader">Updating password...</span>
                    </v-btn>
                  </v-card-text>
                </template>

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

export default {
  data: () => ({
    codesent: false,
    callback: false,
    showerr: false,
    errcode: '',
    errmsg: '',
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
    code: '',
    codeRules: [
      (v) => !!v || 'Code is required'
    ],
    hidepw: true,
    loader: false,
    loading: false
  }),
  methods: {
    onSubmit () {
      this.loader = 'loading'
      const l = this.loader
      this[l] = !this[l]

      userPool = new AmazonCognitoIdentity.CognitoUserPool(config.poolData)
      var userData = {
        Username: this.email,
        Pool: userPool
      }
      console.log('password change for ' + userData.Username)
      var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData)
      this.showerr = false
      this.errcode = ''

      cognitoUser.confirmPassword(this.code, this.password, {
        onSuccess: (data) => {
          // successfully initiated reset password request
          console.log('forgot password confirmed: ' + JSON.stringify(data))
          this[l] = false
          this.loader = null
          router.push('/changed')
        },
        onFailure: (err) => {
          var code = JSON.stringify(err.code)
          console.log('forgot password confirm error: ' + code)
          this.errcode = code
          this[l] = false
          this.loader = null
        }
      })
    },
    onFind () {
      this.loader = 'loading'
      const l = this.loader
      this[l] = !this[l]

      userPool = new AmazonCognitoIdentity.CognitoUserPool(config.poolData)
      var userData = {
        Username: this.email,
        Pool: userPool
      }
      console.log('password forgot for ' + userData.Username)
      var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData)
      this.showerr = false
      this.errcode = ''

      cognitoUser.forgotPassword({
        onSuccess: (data) => {
          // successfully initiated reset password request
          console.log('forgot password initiated: ' + JSON.stringify(data))
          this[l] = false
          this.loader = null
        },
        onFailure: (err) => {
          var code = JSON.stringify(err.code)
          console.log('forgot password error: ' + code)
          this.errcode = code
          this[l] = false
          this.loader = null
        },
        // Optional automatic callback
        inputVerificationCode: (data) => {
          var result = JSON.stringify(data)
          console.log('Code sent to: ' + result)
          this.codesent = true
          this[l] = false
          this.loader = null
        }
      })
    }
  },
  watch: {
    errcode () {
      console.log('watched error code: ' + this.errcode)
      if (this.errcode !== '') {
        if (this.errcode === '"CodeMismatchException"') {
          this.errmsg = 'Invalid verification code provided'
        } else if (this.errcode === '"NotAuthorizedException"') {
          this.errmsg = 'The user has already been confirmed'
        } else if (this.errcode === '"UserNotFoundException"') {
          this.errmsg = 'Username email not found!'
        } else if (this.errcode === '"LimitExceededException"') {
          this.errmsg = 'Attempt limit exceeded, please try after some time'
        } else if (this.errcode === '"UserNotConfirmedException"') {
          this.errmsg = 'User registration not confirmed'
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
