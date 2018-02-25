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
                <v-btn depressed small @click="getAttributes()" color="primary" >
                  GET
                </v-btn>
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
                        <v-btn small :disabled="!enable.nameEditButtons" @click="updateName()" color="success">
                          SAVE
                        </v-btn>
                        <v-btn small :disabled="!enable.nameEditButtons" @click="cancelEdit('name')">
                          CANCEL
                        </v-btn>
                      </v-card-text>
                    </v-card>
                  </v-expansion-panel-content>

                  <v-expansion-panel-content ripple>
                    <div slot="header">
                      <div class="caption">Birthdate</div>
                      <div class="body-2">November 29, 1985</div>
                    </div>
                    <v-card>
                      <v-card-text class="grey lighten-4">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
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
      enable: {
        nameEditButtons: false
      },
      exist: {
        firstName: false,
        middleName: false,
        lastName: false
      },
      userModel: {
        firstName: '',
        middleName: '',
        lastName: ''
      },
      userData: {
        firstName: '',
        middleName: '',
        lastName: ''
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
      }
    },
    updateName: function () {
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
        this.userData.fisrtName = this.userModel.firstName
        this.userData.middleName = this.userModel.middleName
        this.userData.lastName = this.userModel.lastName
        this.enable.nameEditButtons = false
      })
    }
  },
  computed: {
    fullName: function () {
      return this.userModel.firstName + ' ' + this.userModel.middleName + ' ' + this.userModel.lastName
    }
  },
  watch: {
    fullName: function () {
      if ((this.userModel.firstName !== this.userData.firstName) || (this.userModel.middleName !== this.userData.middleName) || (this.userModel.lastName !== this.userData.lastName)) {
        this.enable.nameEditButtons = true
      } else {
        this.enable.nameEditButtons = false
      }
    }
  }
}
</script>

<style scoped>

</style>
