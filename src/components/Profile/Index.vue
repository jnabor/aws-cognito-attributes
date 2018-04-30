<template>
  <v-container grid-list-md class="mt-3">
    <v-layout row wrap>
      <v-flex md12 sm12 xs12>
        <v-card class="elevation-0 transparent pa-2 ma-0">
          <v-layout row wrap justify-center>
            <v-flex sm4 xs12>
              <v-layout justify-center>
                <div class="pa-4">
                  <v-avatar color="primary" size="120">
                    <img src="/static/avatar_placeholder.png" alt="avatar">
                  </v-avatar>
                </div>
              </v-layout>
            </v-flex>
            <v-flex sm8 xs12>
              <v-card class="mb-2">
                <v-list two-line>
                  <app-user-name
                    :name="userModel.name"
                    @updateName="updateName($event)">
                  </app-user-name>
                  <v-divider></v-divider>
                  <app-user-email
                    :email="userModel.emailAddress">
                  </app-user-email>
                  <v-divider></v-divider>
                  <app-birth-date
                    :date="userModel.birthDate"
                    :caption="'Birth Date'"
                    @update="updateBirthDate($event)">
                  </app-birth-date>
                  <v-divider></v-divider>
                </v-list>
                <v-list>
                  <app-phone-number
                    :phone="userModel.phoneNumber"
                    @updatePhoneNumber="updatePhone($event)">
                  </app-phone-number>
                  <v-divider></v-divider>
                </v-list>
                <v-list>
                  <app-address
                    :address="userModel.homeAddress"
                    :caption="'Home Address'"
                    @updateAddress="updateAddress($event, 'home')">
                  </app-address>
                  <v-divider></v-divider>
                  <app-address
                    :address="userModel.businessAddress"
                    :caption="'Business Address'"
                    @updateAddress="updateAddress($event, 'business')">
                  </app-address>
                </v-list>
              </v-card>
              <v-card class="mt-4">
                <v-toolbar dense class="elevation-0 grey--text">
                  <v-toolbar-title>Custom Attributes</v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-btn icon flat class="mr-3" @click="addCustomForm =! addCustomForm">
                    <v-icon color="editicon">add</v-icon>
                  </v-btn>
                </v-toolbar>
                <template v-for="(item, index) in userModel.custom">
                  <app-custom
                    :key="index"
                    :obj="item"
                    :newEntry="false"
                    @update="updateCustom($event, index)"
                    @delete="deleteCustom(index)"
                    :caption="'Custom Atribute' + ' ' + index">
                  </app-custom>
                </template>
              </v-card>
              <v-dialog v-if="addCustomForm" max-width="500px">
                <app-custom
                  :obj="{ prop1: '', prop2: '', prop3: '', prop4: '', prop5: '' }"
                  :newEntry="true"
                  @add="addCustom($event)"
                  @close="addCustomForm =! addCustomForm"
                  :caption="'Custom Attribute'">
                </app-custom>
              </v-dialog>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import userName from './name.vue'
import userEmail from './email.vue'
import birthDate from './datefield.vue'
import phoneNumber from './phone.vue'
import address from './address.vue'
import custom from './custom.vue'
var AmazonCognitoIdentity = require('amazon-cognito-identity-js')

export default {
  components: {
    'app-user-name': userName,
    'app-user-email': userEmail,
    'app-birth-date': birthDate,
    'app-phone-number': phoneNumber,
    'app-address': address,
    'app-custom': custom
  },
  data: function () {
    return {
      userModel: {
        name: { first: '', middle: '', last: '' },
        emailAddress: '',
        birthDate: '',
        phoneNumber: { mobile: '', business: '', home: '' },
        homeAddress: { line: '', city: '', state: '', zipcode: '', country: '' },
        businessAddress: { line: '', city: '', state: '', zipcode: '', country: '' },
        custom: []
      },
      addCustomForm: false
    }
  },
  methods: {
    getAttributes: function () {
      if (this.$store.getters.getStateAttributes.length < 1) {
        console.log('getting attributes from server...')
        this.$store.state.auth.cognitoUser.getUserAttributes((err, result) => {
          if (err) {
            console.log('get attribute error: ' + err)
          } else {
            this.$store.commit('setAttributes', result)
            this.mapAttributes(result)
          }
        })
      } else {
        console.log('getting attributes from central state...')
        let result = this.$store.getters.getStateAttributes
        this.mapAttributes(result)
      }
    },
    mapAttributes: function (result) {
      for (let attribute of result) {
        if (attribute.Name === 'given_name') {
          this.userModel.name.first = attribute.Value
        } else if (attribute.Name === 'middle_name') {
          this.userModel.name.middle = attribute.Value
        } else if (attribute.Name === 'family_name') {
          this.userModel.name.last = attribute.Value
        } else if (attribute.Name === 'birthdate') {
          this.userModel.birthDate = attribute.Value
        } else if (attribute.Name === 'email') {
          this.userModel.emailAddress = attribute.Value
        } else if (attribute.Name === 'custom:phone_numbers') {
          this.userModel.phoneNumber = JSON.parse(attribute.Value)
        } else if (attribute.Name === 'custom:home_address') {
          this.userModel.homeAddress = JSON.parse(attribute.Value)
        } else if (attribute.Name === 'custom:business_address') {
          this.userModel.businessAddress = JSON.parse(attribute.Value)
        } else if (attribute.Name === 'custom:custom_attribute') {
          this.userModel.custom = JSON.parse(attribute.Value)
        }
      }
    },
    updateName: function (name) {
      console.log('updating name...')
      let attributeList = []
      let attributeFirstName = { Name: 'given_name', Value: name.first }
      let attributeMiddleName = { Name: 'middle_name', Value: name.middle }
      let attributeLastName = { Name: 'family_name', Value: name.last }
      let firstName = new AmazonCognitoIdentity.CognitoUserAttribute(attributeFirstName)
      let middleName = new AmazonCognitoIdentity.CognitoUserAttribute(attributeMiddleName)
      let lastName = new AmazonCognitoIdentity.CognitoUserAttribute(attributeLastName)
      attributeList.push(firstName)
      attributeList.push(middleName)
      attributeList.push(lastName)
      this.$store.state.auth.cognitoUser.updateAttributes(attributeList, (err, result) => {
        if (err) {
          console.log('error: ' + err)
          return
        }
        console.log('call result: ' + result)
        this.userModel.name.first = name.first
        this.userModel.name.middle = name.middle
        this.userModel.name.last = name.last
      })
    },
    updateBirthDate: function (date) {
      console.log('updating birthday date...')
      let attributeList = []
      let attributeBirthDate = { Name: 'birthdate', Value: date }
      let birthDate = new AmazonCognitoIdentity.CognitoUserAttribute(attributeBirthDate)
      console.log(birthDate)
      attributeList.push(birthDate)
      this.$store.state.auth.cognitoUser.updateAttributes(attributeList, (err, result) => {
        if (err) {
          console.log('error: ' + err)
          return
        }
        console.log('call result: ' + result)
        this.userModel.birthDate = date
      })
    },
    updatePhone: function (phone) {
      console.log('updating phone number...')
      var attributeList = []
      var phoneNumbers = JSON.stringify(phone)
      console.log('saving numbers :' + phoneNumbers)
      var attributePhoneNumber = { Name: 'custom:phone_numbers', Value: phoneNumbers }
      var phoneNumber = new AmazonCognitoIdentity.CognitoUserAttribute(attributePhoneNumber)
      attributeList.push(phoneNumber)
      this.$store.state.auth.cognitoUser.updateAttributes(attributeList, (err, result) => {
        if (err) {
          console.log('error: ' + JSON.stringify(err))
          return
        }
        console.log('call result: ' + result)
        this.userModel.phoneNumber = JSON.parse(JSON.stringify(phone))
      })
    },
    updateAddress: function (newAddress, type) {
      console.log('updating address...')
      let attributeList = []
      let addressJSON = ''
      if (type === 'home') {
        addressJSON = JSON.stringify(newAddress)
      } else if (type === 'business') {
        addressJSON = JSON.stringify(newAddress)
      } else {
        return
      }
      var attributeAddress = { Name: 'custom:' + type + '_address', Value: addressJSON }
      var address = new AmazonCognitoIdentity.CognitoUserAttribute(attributeAddress)
      attributeList.push(address)
      this.$store.state.auth.cognitoUser.updateAttributes(attributeList, (err, result) => {
        if (err) {
          console.log('error: ' + JSON.stringify(err))
          return
        }
        console.log('call result: ' + result)
        if (type === 'home') {
          console.log('home address updated')
          this.userModel.homeAddress = JSON.parse(JSON.stringify(newAddress))
        } else if (type === 'business') {
          console.log('business address updated')
          this.userModel.businessAddress = JSON.parse(JSON.stringify(newAddress))
        }
      })
    },
    addCustom: function (value) {
      console.log('adding custom attribute ...')
      let newCustom = this.userModel.custom.slice()
      newCustom.push(value)
      this.updateCustomAtrribute(newCustom)
    },
    updateCustom: function (value, index) {
      console.log('updating custom attribute ...')
      let newCustom = this.userModel.custom.slice()
      newCustom.splice(index, 1, value)
      this.updateCustomAtrribute(newCustom)
    },
    deleteCustom: function (index) {
      console.log('deleting custom attribute at index ' + index)
      let newCustom = this.userModel.custom.slice()
      if (index > -1) {
        newCustom.splice(index, 1)
      }
      this.updateCustomAtrribute(newCustom)
    },
    updateCustomAtrribute: function (customAttribute) {
      let attributeList = []
      let attribute = { Name: 'custom:custom_attribute', Value: JSON.stringify(customAttribute) }
      var newAttribute = new AmazonCognitoIdentity.CognitoUserAttribute(attribute)
      attributeList.push(newAttribute)
      this.$store.state.auth.cognitoUser.updateAttributes(attributeList, (err, result) => {
        if (err) {
          console.log('error: ' + JSON.stringify(err))
          return
        }
        console.log('call result: ' + result)
        console.log('custom attribute updated')
        this.addCustomForm = false
        this.userModel.custom = customAttribute.slice()
      })
    }
  },
  beforeMount: function () {
    if (this.$store.state.auth.authenticated === true) {
      this.getAttributes()
    }
  }
}
</script>
<style scoped>
</style>
