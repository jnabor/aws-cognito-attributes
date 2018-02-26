<template>
  <v-container grid-list-md class="mt-3">
    <v-layout row wrap>
      <v-flex xl12 lg12 md12 sm12 xs12>
        <v-card class="elevation-0 transparent pa-4 ml-4 mr-4">
          <v-layout row justify-center>
            <v-flex xl2 lg3 md4 sm4 class="hidden-xs-only">
              <v-card class="elevation-0 mr-2 transparent">
                <div class="headline mb-2">User Profile</div>
                <div class="body-1">Manage your basic information: your name, email, and phone number, etc. Help others find you and make it easier to get in touch.</div>
                 <v-btn small @click="getAttributes()">Test</v-btn>
              </v-card>
            </v-flex>
            <v-flex xl4 lg5 md6 sm6>
              <v-card class="mb-2">
                <v-expansion-panel>

                  <v-expansion-panel-content ripple>
                    <div slot="header">
                      <div class="caption">Name</div>
                      <div class="body-2">{{ fullName }}</div>
                    </div>
                    <v-card class="pt-4 pl-2 pr-2 pb-2 grey lighten-4">
                      <v-card-text class="grey lighten-4">
                        <v-text-field
                          v-model="userModel.firstName"
                          label="First Name">
                        </v-text-field>
                        <v-text-field
                          v-model="userModel.middleName"
                          label="Middle Name">
                        </v-text-field>
                        <v-text-field
                          v-model="userModel.lastName"
                          label="Last Name">
                        </v-text-field>
                        <v-btn small :disabled="!enable.nameEditButtons" @click="updateDate()" color="success">
                          SAVE
                        </v-btn>
                        <v-btn small :disabled="!enable.nameEditButtons" @click="cancelEdit('name')">
                          CANCEL
                        </v-btn>
                      </v-card-text>
                    </v-card>
                  </v-expansion-panel-content>

                  <v-expansion-panel-content expand-icon="">
                    <div slot="header">
                      <div class="caption">Email Address</div>
                      <div class="body-2">{{ userModel.emailAddress }}</div>
                    </div>
                  </v-expansion-panel-content>

                  <v-expansion-panel-content ripple>
                    <div slot="header">
                      <div class="caption">Birthday Date</div>
                      <div class="body-2">{{ userModel.birthDate }}</div>
                    </div>
                    <v-card class="pt-4 pl-2 pr-2 pb-2 grey lighten-4">
                      <v-card-text class="grey lighten-4">
                        <v-date-picker
                          full-width
                          class="mb-3 grey lighten-4 black--text"
                          v-model="userModel.birthDate"
                          :max="new Date().toISOString().substr(0, 10)">
                        </v-date-picker>
                        <v-btn small :disabled="!enable.dateEditButtons" @click="updateDate()" color="success">
                          SAVE
                        </v-btn>
                        <v-btn small :disabled="!enable.dateEditButtons" @click="cancelEdit('date')">
                          CANCEL
                        </v-btn>
                      </v-card-text>
                    </v-card>
                  </v-expansion-panel-content>

                  <v-expansion-panel-content ripple>
                    <div slot="header">
                      <div class="caption">Phone Number</div>
                      <div class="body-2">{{ userModel.phoneNumber }}</div>
                    </div>
                    <v-card class="pt-4 pl-2 pr-2 pb-2 grey lighten-4">
                      <v-card-text class="grey lighten-4">
                        <v-text-field
                          name="input-3-3"
                          label="Phone Number"
                          v-model="userModel.phoneNumber"
                          prepend-icon="phone"
                          single-line>
                        </v-text-field>
                        <v-btn small :disabled="!enable.phoneEditButtons" @click="updatePhone()" color="success">
                          SAVE
                        </v-btn>
                        <v-btn small :disabled="!enable.phoneEditButtons" @click="cancelEdit('phone')">
                          CANCEL
                        </v-btn>
                      </v-card-text>
                    </v-card>
                  </v-expansion-panel-content>

                </v-expansion-panel>
              </v-card>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import router from '../routes'
var AmazonCognitoIdentity = require('amazon-cognito-identity-js')

export default {
  data: function () {
    return {
      menu: false,
      modal: false,
      enable: {
        nameEditButtons: false,
        dateEditButtons: false,
        phoneEditButtons: false
      },
      userModel: {
        firstName: '',
        middleName: '',
        lastName: '',
        birthDate: '',
        emailAddress: '',
        phoneNumber: ''
      },
      userData: {
        firstName: '',
        middleName: '',
        lastName: '',
        birthdate: '',
        emailAddress: '',
        phoneNumber: ''
      }
    }
  },
  methods: {
    getAttributes: function () {
      console.log('getting attributes from server...')
      this.$store.state.cognitoUser.getUserAttributes((err, result) => {
        if (err) {
          console.log('get attribute error: ' + err)
          return
        }
        this.mapAttributes(result)
      })
    },
    mapAttributes: function (result) {
      console.log('mapping attributes...')
      for (let attribute of result) {
        if (attribute.Name === 'given_name') {
          this.userModel.firstName = attribute.Value
          this.userData.firstName = attribute.Value
        }
        if (attribute.Name === 'middle_name') {
          this.userModel.middleName = attribute.Value
          this.userData.middleName = attribute.Value
        }
        if (attribute.Name === 'family_name') {
          this.userModel.lastName = attribute.Value
          this.userData.lastName = attribute.Value
        }
        if (attribute.Name === 'birthdate') {
          this.userModel.birthDate = attribute.Value
          this.userData.birthDate = attribute.Value
          this.enable.dateEditButtons = false
        }
        if (attribute.Name === 'email') {
          this.userModel.emailAddress = attribute.Value
          this.userData.emailAddress = attribute.Value
        }
        if (attribute.Name === 'phone') {
          this.userModel.phoneNumber = attribute.Value
          this.userData.phoneNumber = attribute.Value
        }
        console.log('property:' + attribute.Name + ' value:' + attribute.Value)
      }
    },
    navSignOut: function () {
      console.log('signing out')
      this.$store.state.authenticated = false
      router.push('/home')
    },
    cancelEdit: function (field) {
      if (field === 'name') {
        this.userModel.firstName = this.userData.firstName
        this.userModel.middleName = this.userData.middleName
        this.userModel.lastName = this.userData.lastName
      } else if (field === 'date') {
        this.userModel.birthDate = this.userData.birthDate
      } else if (field === 'phone') {
        this.userModel.phoneNumber = this.userData.phoneNumber
      }
    },
    updateName: function () {
      console.log('updating name...')
      var attributeList = []
      var attributeFirstName = { Name: 'given_name', Value: this.userModel.firstName }
      var attributeMiddleName = { Name: 'middle_name', Value: this.userModel.middleName }
      var attributeLastName = { Name: 'family_name', Value: this.userModel.lastName }
      var firstName = new AmazonCognitoIdentity.CognitoUserAttribute(attributeFirstName)
      var middleName = new AmazonCognitoIdentity.CognitoUserAttribute(attributeMiddleName)
      var lastName = new AmazonCognitoIdentity.CognitoUserAttribute(attributeLastName)
      attributeList.push(firstName)
      attributeList.push(middleName)
      attributeList.push(lastName)
      this.$store.state.cognitoUser.updateAttributes(attributeList, (err, result) => {
        if (err) {
          console.log('error: ' + err)
          return
        }
        console.log('call result: ' + result)
        this.userData.firstName = this.userModel.firstName
        this.userData.middleName = this.userModel.middleName
        this.userData.lastName = this.userModel.lastName
        this.enable.nameEditButtons = false
      })
    },
    updateDate: function () {
      console.log('updating birthday date...')
      var attributeList = []
      var attributeBirthDate = { Name: 'birthdate', Value: this.userModel.birthDate }
      var birthDate = new AmazonCognitoIdentity.CognitoUserAttribute(attributeBirthDate)
      attributeList.push(birthDate)
      this.$store.state.cognitoUser.updateAttributes(attributeList, (err, result) => {
        if (err) {
          console.log('error: ' + err)
          return
        }
        console.log('call result: ' + result)
        this.userData.birthDate = this.userModel.birthDate
        this.enable.dateEditButtons = false
      })
    },
    updatePhone: function () {
      console.log('updating phone number...')
      var attributeList = []
      var attributePhoneNumber = { Name: 'phone_number', Value: this.userModel.phoneNumber }
      var phoneNumber = new AmazonCognitoIdentity.CognitoUserAttribute(attributePhoneNumber)
      attributeList.push(phoneNumber)
      this.$store.state.cognitoUser.updateAttributes(attributeList, (err, result) => {
        if (err) {
          console.log('error: ' + err)
          return
        }
        console.log('call result: ' + result)
        this.userData.phoneNumber = this.userModel.phoneNumber
        this.enable.phoneEditButtons = false
      })
    }
  },
  computed: {
    fullName: function () {
      return this.userModel.firstName + ' ' + this.userModel.middleName + ' ' + this.userModel.lastName
    },
    birthDate: function () {
      return this.userModel.birthDate
    },
    phoneNumber: function () {
      return this.userModel.phoneNumber
    }
  },
  watch: {
    fullName: function () {
      console.log('name changed')
      if ((this.userModel.firstName !== this.userData.firstName) || (this.userModel.middleName !== this.userData.middleName) || (this.userModel.lastName !== this.userData.lastName)) {
        this.enable.nameEditButtons = true
      } else {
        this.enable.nameEditButtons = false
      }
    },
    birthDate: function () {
      console.log('birthdate changed')
      if (this.userModel.birthDate !== this.userData.birthDate) {
        this.enable.dateEditButtons = true
      } else {
        this.enable.dateEditButtons = false
      }
    },
    phoneNumber: function () {
      console.log('phone number changed')
      if (this.userModel.phoneNumber !== this.userData.phoneNumber) {
        this.enable.phoneEditButtons = true
      } else {
        this.enable.phoneEditButtons = false
      }
    }
  },
  mounted: function () {
    if (this.$store.state.authenticated === true) {
      this.getAttributes()
    }
    this.enable.nameEditButtons = false
    this.enable.dateEditButtons = false
  }
}
</script>

<style scoped>

</style>
