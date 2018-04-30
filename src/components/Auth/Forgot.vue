<template>
  <app-wrapper>
    <transition appear name="fadeout">
      <v-card class="pa-2">
        <v-card-media class="mt-4" height="80" contain>
          <img class="aws-logo" src="/static/aws_cognito.png">
        </v-card-media>
        <v-card-title primary-title>
          <div>
            <h4 class="headline mb-0">RESET PASSWORD</h4>
            <h4 class="subheading mb-0">in Election App</h4>
          </div>
        </v-card-title>
        <v-card-text>
          <v-alert outline type="error" dismissible class="mb-4 mt-0" v-model="showerr">
            {{ errmsg }}
          </v-alert>
          <v-alert outline type="success" dismissible class="mb-4 mt-0" v-model="codesent">
            A confirmation was code sent to your email.
          </v-alert>
          <div v-show="!codesent">
            <h4 class="subheading mb-2">Find your account</h4>
            <v-form  v-model="validemail">
              <v-text-field
                label="Enter E-mail"
                v-model="email"
                :rules="emailRules"
                required clearable>
              </v-text-field>
            </v-form>
            <v-btn
              block
              :loading="loading"
              @click.native="onFind()"
              :disabled="!validemail"
              class="mt-3 mb-3 white--text"
              color="submit">
              Find
              <span slot="loader">Verifying account...</span>
            </v-btn>
            <div class="accent--text">
              A confirmation code will be sent to your email address.
            </div>
          </div>
          <div v-show="codesent">
            <h4 class="subheading mb-2 accent--text">Confirm password change</h4>
            <v-form  v-model="validcode">
              <v-text-field
                label="Confirmation Code"
                v-model="code"
                :rules="codeRules"
                required clearable>
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
              :disabled="!validcode"
              class="mt-3 mb-3 white--text"
              color="submit">
              Confirm
            <span slot="loader">Updating password...</span>
            </v-btn>
          </div>
        </v-card-text>
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

export default {
  components: {
    'app-wrapper': wrapper,
    'app-terms': terms
  },
  data: () => {
    return {
      codesent: false,
      callback: false,
      showerr: false,
      errcode: '',
      errmsg: '',
      validemail: false,
      validcode: false,
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
    }
  },
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
          console.log('forgot password initiated: ' + JSON.stringify(data))
          this[l] = false
          this.loader = null
        },
        onFailure: (err) => {
          var code = JSON.stringify(err.code)
          console.error('forgot password error: ' + code)
          this.errcode = code
          this[l] = false
          this.loader = null
        },
        inputVerificationCode: (data) => {
          var result = JSON.stringify(data)
          console.log('Code sent to: ' + result)
          this.codesent = true
          this.valid = false
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
</style>
