<template>
  <v-container grid-list-md class="mt-3">
    <v-layout row wrap>
      <v-flex xl12 lg12 md12 sm12 xs12>
        <v-card class="elevation-0 transparent pa-4 ml-4 mr-4">
          <v-layout row justify-center>
            <v-flex xl4 lg4 md4 sm4 class="hidden-xs-only">
              <v-card class="elevation-0 mr-2 transparent">
                <div class="headline mb-2">User Profile</div>
                <div class="body-1">Manage your basic information: your name, email, and phone number, etc. Help others find you and make it easier to get in touch.</div>
                <!-- <v-btn small @click="getAttributes()">GET</v-btn> -->
              </v-card>
            </v-flex>
            <v-flex xl8 lg8 md8 sm8>
              <v-card class="mb-2">

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
                  :birthdate="userModel.birthDate"
                  :caption="'Birth Date'"
                  @updateBirthDate="updateBirthDate($event)">
                </app-birth-date>
                <v-divider></v-divider>

                <app-phone-number
                  :phone="userModel.phoneNumber"
                  @updatePhoneNumber="updatePhone($event)">
                </app-phone-number>
                <v-divider></v-divider>

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

              </v-card>
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
import birthDate from './birthdate.vue'
import phoneNumber from './phone.vue'
import address from './address.vue'
var AmazonCognitoIdentity = require('amazon-cognito-identity-js')

export default {
  components: {
    'app-user-name': userName,
    'app-user-email': userEmail,
    'app-birth-date': birthDate,
    'app-phone-number': phoneNumber,
    'app-address': address
  },
  data: function () {
    return {
      menu: false,
      modal: false,
      edit: {
        haddress: false,
        baddress: false
      },
      enable: {
        haddressEditButtons: false,
        baddressEditButtons: false
      },
      userModel: {
        name: {
          first: '',
          middle: '',
          last: ''
        },
        emailAddress: '',
        birthDate: '',
        phoneNumber: {
          mobile: '',
          business: '',
          home: ''
        },
        homeAddress: {
          line: '',
          city: '',
          state: '',
          zipcode: '',
          country: ''
        },
        businessAddress: {
          line: '',
          city: '',
          state: '',
          zipcode: '',
          country: ''
        }
      },
      userData: {
        homeAddress: {
          line: '',
          city: '',
          state: '',
          zipcode: '',
          country: ''
        },
        businessAddress: {
          line: '',
          city: '',
          state: '',
          zipcode: '',
          country: ''
        }
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
          this.userModel.name.first = attribute.Value
        } else if (attribute.Name === 'middle_name') {
          this.userModel.name.middle = attribute.Value
        } else if (attribute.Name === 'family_name') {
          this.userModel.name.last = attribute.Value
        } else if (attribute.Name === 'birthdate') {
          this.userModel.birthDate = attribute.Value
          this.userData.birthDate = attribute.Value
          this.enable.dateEditButtons = false
        } else if (attribute.Name === 'email') {
          this.userModel.emailAddress = attribute.Value
        } else if (attribute.Name === 'custom:phone_numbers') {
          this.userModel.phoneNumber = JSON.parse(attribute.Value)
        } else if (attribute.Name === 'custom:home_address') {
          this.userModel.homeAddress = JSON.parse(attribute.Value)
        } else if (attribute.Name === 'custom:business_address') {
          this.userModel.businessAddress = JSON.parse(attribute.Value)
        }
        console.log('property:' + attribute.Name + ' value:' + attribute.Value)
      }
    },
    updateName: function (data) {
      console.log('updating name...')
      let attributeList = []
      let attributeFirstName = { Name: 'given_name', Value: data.first }
      let attributeMiddleName = { Name: 'middle_name', Value: data.middle }
      let attributeLastName = { Name: 'family_name', Value: data.last }
      let firstName = new AmazonCognitoIdentity.CognitoUserAttribute(attributeFirstName)
      let middleName = new AmazonCognitoIdentity.CognitoUserAttribute(attributeMiddleName)
      let lastName = new AmazonCognitoIdentity.CognitoUserAttribute(attributeLastName)
      attributeList.push(firstName)
      attributeList.push(middleName)
      attributeList.push(lastName)
      this.$store.state.cognitoUser.updateAttributes(attributeList, (err, result) => {
        if (err) {
          console.log('error: ' + err)
          return
        }
        console.log('call result: ' + result)
        this.userModel.name.first = data.first
        this.userModel.name.middle = data.middle
        this.userModel.name.last = data.last
      })
    },
    updateBirthDate: function (date) {
      console.log('updating birthday date...')
      let attributeList = []
      let attributeBirthDate = { Name: 'birthdate', Value: date }
      let birthDate = new AmazonCognitoIdentity.CognitoUserAttribute(attributeBirthDate)
      console.log(birthDate)
      attributeList.push(birthDate)
      this.$store.state.cognitoUser.updateAttributes(attributeList, (err, result) => {
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
      this.$store.state.cognitoUser.updateAttributes(attributeList, (err, result) => {
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
      this.$store.state.cognitoUser.updateAttributes(attributeList, (err, result) => {
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
    }
  },
  computed: {
    homeAddress: function () {
      return this.userModel.homeAddress.line + this.userModel.homeAddress.city + this.userModel.homeAddress.state + this.userModel.homeAddress.zipcode + this.userModel.homeAddress.country
    },
    businessAddress: function () {
      return this.userModel.businessAddress.line + this.userModel.businessAddress.city + this.userModel.businessAddress.state + this.userModel.businessAddress.zipcode + this.userModel.businessAddress.country
    }
  },
  watch: {
    homeAddress: function () {
      console.log('address changed')
      if ((this.userModel.homeAddress.line !== this.userData.homeAddress.line) ||
          (this.userModel.homeAddress.city !== this.userData.homeAddress.city) ||
          (this.userModel.homeAddress.state !== this.userData.homeAddress.state) ||
          (this.userModel.homeAddress.zipcode !== this.userData.homeAddress.zipcode) ||
          (this.userModel.homeAddress.country !== this.userData.homeAddress.country)) {
        this.enable.haddressEditButtons = true
      } else {
        this.enable.haddressEditButtons = false
      }
    },
    businessAddress: function () {
      console.log('address changed')
      if ((this.userModel.businessAddress.line !== this.userData.businessAddress.line) ||
          (this.userModel.businessAddress.city !== this.userData.businessAddress.city) ||
          (this.userModel.businessAddress.state !== this.userData.businessAddress.state) ||
          (this.userModel.businessAddress.zipcode !== this.userData.businessAddress.zipcode) ||
          (this.userModel.businessAddress.country !== this.userData.businessAddress.country)) {
        this.enable.baddressEditButtons = true
      } else {
        this.enable.baddressEditButtons = false
      }
    }
  },
  beforeMount: function () {
    if (this.$store.state.authenticated === true) {
      this.getAttributes()
    }
  }
}
</script>
<style scoped>
.tool {
    position: relative;
    padding: 0px;
    margin: 0px;
}
.topright {
    position: absolute;
    top: 0px;
    right: 0px;
}
</style>
