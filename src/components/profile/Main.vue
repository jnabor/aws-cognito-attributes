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
                <v-btn small @click="getAttributes()">GET</v-btn>
              </v-card>
            </v-flex>
            <v-flex xl8 lg8 md8 sm8>
              <v-card class="mb-2">

                <app-user-name
                  :name="userModel.name"
                  @updateName="updateName($event)">
                </app-user-name>
                <v-divider></v-divider>

                <v-card-text class="pl-4 pr-4">
                  <div class="caption mb-1">
                    <v-icon small class="mr-1">email</v-icon>
                    Email Address
                  </div>
                  <div class="body-2">{{ userModel.emailAddress === ''? '...' :  userModel.emailAddress }}</div>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-text class="pl-4 pr-4">
                  <div class="tool a-0 ma-0">
                    <div class="caption mb-1">
                      <v-icon small class="mr-1">date_range</v-icon>
                      Birth Date
                    </div>
                    <v-spacer></v-spacer>
                    <v-btn icon flat small class="pa-0 ma-0 topright" @click="edit.birthdate = !edit.birthdate">
                      <v-icon v-if="userModel.birthDate !== ''" small color="indigo lighten-1">edit</v-icon>
                      <v-icon v-else small color="indigo lighten-1">mdi-plus-circle-outline</v-icon>
                    </v-btn>
                  </div>
                  <div class="body-2">{{ userModel.birthDate === ''? '...' : userModel.birthDate }}</div>
                </v-card-text>
                <div v-if="edit.birthdate" class="pt-2 pl-2 pr-2 pb-2 indigo lighten-5">
                  <v-card-text class="pl-4 pr-4">
                    <v-date-picker
                      full-width
                      class="mb-3 grey lighten-4 black--text"
                      v-model="userModel.birthDate"
                      :max="new Date().toISOString().substr(0, 10)">
                    </v-date-picker>
                  </v-card-text>
                  <v-card-actions>
                    <v-btn class="ml-4" small :disabled="!enable.dateEditButtons" @click="cancelEdit('date')">CANCEL</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn small  @click="edit.birthdate = false" >CLOSE</v-btn>
                    <v-btn class="mr-4" small :disabled="!enable.dateEditButtons" @click="updateDate()" color="success">SAVE</v-btn>
                  </v-card-actions>
                </div>
                <v-divider></v-divider>
                <v-card-text class="pl-4 pr-4">
                  <div class="tool a-0 ma-0">
                    <div class="caption mb-1">
                      <v-icon small class="mr-1">phone</v-icon>
                      Phone Number
                    </div>
                    <v-spacer></v-spacer>
                    <v-btn icon flat small class="pa-0 ma-0 topright" @click="edit.phone = !edit.phone">
                      <v-icon
                        v-if="userModel.phoneNumber.mobile === '' && userModel.phoneNumber.business === '' && userModel.phoneNumber.home === ''"
                        small color="indigo lighten-1">
                        mdi-plus-circle-outline
                      </v-icon>
                      <v-icon v-else small color="indigo lighten-1">edit</v-icon>
                    </v-btn>
                  </div>
                  <v-chip>
                    <v-avatar>
                      <v-icon color="amber">mdi-cellphone</v-icon>
                    </v-avatar>
                    {{ userModel.phoneNumber.mobile === ''? '...' :  userModel.phoneNumber.mobile }}
                  </v-chip>
                  <v-chip>
                    <v-avatar>
                      <v-icon color="amber">mdi-deskphone</v-icon>
                    </v-avatar>
                    {{ userModel.phoneNumber.business === ''? '...' :  userModel.phoneNumber.business }}
                  </v-chip>
                  <v-chip>
                    <v-avatar>
                      <v-icon color="amber">mdi-home-variant</v-icon>
                    </v-avatar>
                    {{ userModel.phoneNumber.home === ''? '...' :  userModel.phoneNumber.home }}
                  </v-chip>
                </v-card-text>
                <div v-if="edit.phone" class="pt-2 pl-2 pr-2 pb-2 indigo lighten-5">
                  <v-card-text class="indigo lighten-5">
                    <v-text-field
                      v-model="userModel.phoneNumber.mobile"
                      label="Mobile Number">
                    </v-text-field>
                    <v-text-field
                      v-model="userModel.phoneNumber.business"
                      label="Business Number">
                    </v-text-field>
                    <v-text-field
                      v-model="userModel.phoneNumber.home"
                      label="Home Number">
                    </v-text-field>
                  </v-card-text>
                  <v-card-actions>
                    <v-btn class="ml-4" small :disabled="!enable.phoneEditButtons" @click="cancelEdit('phone')">CANCEL</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn small  @click="edit.phone = false" >CLOSE</v-btn>
                    <v-btn class="mr-4" small :disabled="!enable.phoneEditButtons" @click="updatePhone()" color="success">SAVE</v-btn>
                  </v-card-actions>
                </div>
                <v-divider></v-divider>
                <v-card-text class="pl-4 pr-4">
                  <div class="tool a-0 ma-0">
                    <div class="caption mb-1">
                      <v-icon small class="mr-1">location_on</v-icon>
                      Home Address
                    </div>
                    <v-spacer></v-spacer>
                    <v-btn icon flat small class="pa-0 ma-0 topright" @click="edit.haddress = !edit.haddress">
                      <v-icon v-if="homeAddress !== ''" small color="indigo lighten-1">edit</v-icon>
                      <v-icon v-else small color="indigo lighten-1">mdi-plus-circle-outline</v-icon>
                    </v-btn>
                  </div>
                  <div class="body-2" v-if="homeAddress === ''">...</div>
                  <div class="body-2" v-else>
                    <div v-if="userModel.homeAddress.line !== ''">{{ userModel.homeAddress.line }}</div>
                    <div v-if="userModel.homeAddress.city + userModel.homeAddress.state + userModel.homeAddress.zipcode + userModel.homeAddress.country !== ''">
                    {{ userModel.homeAddress.city + ' ' + userModel.homeAddress.state + ' ' + userModel.homeAddress.zipcode + ' ' + userModel.homeAddress.country}}
                    </div>
                  </div>
                </v-card-text>
                <div v-if="edit.haddress" class="pt-2 pl-2 pr-2 pb-2 indigo lighten-5">
                  <v-card-text class="indigo lighten-5">
                    <v-text-field
                      v-model="userModel.homeAddress.line"
                      label="Address Line">
                    </v-text-field>
                    <v-layout row wrap>
                      <v-flex>
                        <v-text-field
                          v-model="userModel.homeAddress.city"
                          label="Town/City">
                        </v-text-field>
                      </v-flex>
                      <v-flex>
                        <v-text-field
                          v-model="userModel.homeAddress.state"
                          label="Province/State">
                        </v-text-field>
                      </v-flex>
                    </v-layout>
                    <v-layout row wrap>
                      <v-flex>
                        <v-text-field
                          v-model="userModel.homeAddress.zipcode"
                          label="Zip Code">
                        </v-text-field>
                      </v-flex>
                      <v-flex >
                        <v-select
                          :items="countries"
                          label="Country"
                          v-model="userModel.homeAddress.country"
                          autocomplete>
                        </v-select>
                      </v-flex>
                    </v-layout>
                  </v-card-text>
                  <v-card-actions>
                    <v-btn class="ml-4" small :disabled="!enable.haddressEditButtons" @click="cancelEdit('home_address')">CANCEL</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn small  @click="edit.haddress = false" >CLOSE</v-btn>
                    <v-btn class="mr-4" small :disabled="!enable.haddressEditButtons" @click="updateAddress('home_address')" color="success">SAVE</v-btn>
                  </v-card-actions>
                </div>
                <v-divider></v-divider>
                <v-card-text class="pl-4 pr-4">
                  <div class="tool a-0 ma-0">
                    <div class="caption mb-1">
                      <v-icon small class="mr-1">location_on</v-icon>
                      Business Address
                    </div>
                    <v-spacer></v-spacer>
                    <v-btn icon flat small class="pa-0 ma-0 topright" @click="edit.baddress = !edit.baddress">
                      <v-icon v-if="businessAddress !== ''" small color="indigo lighten-1">edit</v-icon>
                      <v-icon v-else small color="indigo lighten-1">mdi-plus-circle-outline</v-icon>
                    </v-btn>
                  </div>
                  <div class="body-2" v-if="businessAddress === ''">...</div>
                  <div class="body-2" v-else>
                    <div v-if="userModel.businessAddress.line !== ''">{{ userModel.businessAddress.line }}</div>
                    <div v-if="userModel.businessAddress.city + userModel.businessAddress.state + userModel.businessAddress.zipcode + userModel.businessAddress.country !== ''">
                    {{ userModel.businessAddress.city + ' ' + userModel.businessAddress.state + ' ' + userModel.businessAddress.zipcode + ' ' + userModel.businessAddress.country }}
                    </div>
                  </div>
                </v-card-text>
                <div v-if="edit.baddress" class="pt-2 pl-2 pr-2 pb-2 indigo lighten-5">
                  <v-card-text class="indigo lighten-5">
                    <v-text-field
                      v-model="userModel.businessAddress.line"
                      label="Address Line">
                    </v-text-field>
                    <v-layout row wrap>
                      <v-flex>
                        <v-text-field
                          v-model="userModel.businessAddress.city"
                          label="Town/City">
                        </v-text-field>
                      </v-flex>
                      <v-flex>
                        <v-text-field
                          v-model="userModel.businessAddress.state"
                          label="Province/State">
                        </v-text-field>
                      </v-flex>
                    </v-layout>
                    <v-layout row wrap>
                      <v-flex>
                        <v-text-field
                          v-model="userModel.businessAddress.zipcode"
                          label="Zip Code">
                        </v-text-field>
                      </v-flex>
                      <v-flex >
                        <v-select
                          :items="countries"
                          label="Country"
                          v-model="userModel.businessAddress.country"
                          autocomplete>
                        </v-select>
                      </v-flex>
                    </v-layout>
                  </v-card-text>
                  <v-card-actions>
                    <v-btn class="ml-4" small :disabled="!enable.baddressEditButtons" @click="cancelEdit('business_address')">CANCEL</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn small  @click="edit.baddress = false" >CLOSE</v-btn>
                    <v-btn class="mr-4" small :disabled="!enable.baddressEditButtons" @click="updateAddress('business_address')" color="success">SAVE</v-btn>
                  </v-card-actions>
                </div>
              </v-card>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import userName from './Name.vue'
import router from '../../routes'
var AmazonCognitoIdentity = require('amazon-cognito-identity-js')
var countries = require('country-list')()

export default {
  components: {
    'app-user-name': userName
  },
  data: function () {
    return {
      menu: false,
      modal: false,
      edit: {
        name: false,
        birthdate: false,
        phone: false,
        haddress: false,
        baddress: false
      },
      enable: {
        nameEditButtons: false,
        dateEditButtons: false,
        phoneEditButtons: false,
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
        birthdate: '',
        emailAddress: '',
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
      countries: countries.getNames()
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
          this.userData.emailAddress = attribute.Value
        } else if (attribute.Name === 'custom:phone_numbers') {
          this.userData.phoneNumber = JSON.parse(attribute.Value)
          this.userModel.phoneNumber = JSON.parse(attribute.Value)
        } else if (attribute.Name === 'custom:home_address') {
          this.userModel.homeAddress = JSON.parse(attribute.Value)
          this.userData.homeAddress = JSON.parse(attribute.Value)
        } else if (attribute.Name === 'custom:business_address') {
          this.userModel.businessAddress = JSON.parse(attribute.Value)
          this.userData.businessAddress = JSON.parse(attribute.Value)
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
      if (field === 'date') {
        this.userModel.birthDate = this.userData.birthDate
      } else if (field === 'phone') {
        this.userModel.phoneNumber = JSON.parse(JSON.stringify(this.userData.phoneNumber))
      } else if (field === 'home_address') {
        this.userModel.homeAddress = JSON.parse(JSON.stringify(this.userData.homeAddress))
      } else if (field === 'business_address') {
        this.userModel.businessAddress = JSON.parse(JSON.stringify(this.userData.businessAddress))
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
      // pack all phone numbers in JSON
      var phoneNumbers = JSON.stringify(this.userModel.phoneNumber)
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
        this.userData.phoneNumber = JSON.parse(JSON.stringify(this.userModel.phoneNumber))
        this.enable.phoneEditButtons = false
      })
    },
    updateAddress: function (type) {
      console.log('updating address...')
      var attributeList = []
      var addressJSON
      if (type === 'home_address') {
        addressJSON = JSON.stringify(this.userModel.homeAddress)
      } else {
        addressJSON = JSON.stringify(this.userModel.businessAddress)
      }
      var attributeAddress = { Name: 'custom:' + type, Value: addressJSON }
      var address = new AmazonCognitoIdentity.CognitoUserAttribute(attributeAddress)
      attributeList.push(address)
      this.$store.state.cognitoUser.updateAttributes(attributeList, (err, result) => {
        if (err) {
          console.log('error: ' + JSON.stringify(err))
          return
        }
        console.log('call result: ' + result)
        if (type === 'home_address') {
          console.log('home address updated')
          this.userData.homeAddress = JSON.parse(JSON.stringify(this.userModel.homeAddress))
          this.enable.haddressEditButtons = false
        } else {
          console.log('business address updated')
          this.userData.businessAddress = JSON.parse(JSON.stringify(this.userModel.businessAddress))
          this.enable.baddressEditButtons = false
        }
      })
    }
  },
  computed: {
    birthDate: function () {
      return this.userModel.birthDate
    },
    phoneNumber: function () {
      return this.userModel.phoneNumber.mobile + this.userModel.phoneNumber.business + this.userModel.phoneNumber.home
    },
    homeAddress: function () {
      return this.userModel.homeAddress.line + this.userModel.homeAddress.city + this.userModel.homeAddress.state + this.userModel.homeAddress.zipcode + this.userModel.homeAddress.country
    },
    businessAddress: function () {
      return this.userModel.businessAddress.line + this.userModel.businessAddress.city + this.userModel.businessAddress.state + this.userModel.businessAddress.zipcode + this.userModel.businessAddress.country
    }
  },
  watch: {
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
      if ((this.userModel.phoneNumber.mobile !== this.userData.phoneNumber.mobile) ||
          (this.userModel.phoneNumber.business !== this.userData.phoneNumber.business) ||
          (this.userModel.phoneNumber.home !== this.userData.phoneNumber.home)) {
        this.enable.phoneEditButtons = true
      } else {
        this.enable.phoneEditButtons = false
      }
    },
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
    this.enable.nameEditButtons = false
    this.enable.dateEditButtons = false
    this.enable.phoneEditButtons = false
    this.enable.addressEditButtons = false
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
