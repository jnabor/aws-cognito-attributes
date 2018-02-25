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
                        <v-btn small :disabled="!enable.nameChanged" color="success">
                          SAVE
                        </v-btn>
                        <v-btn small :disabled="!enable.nameChanged" @click="cancelEdit('name')">
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

export default {
  data: function () {
    return {
      enable: {
        nameChanged: false
      },
      userModel: {
        firstName: 'First Name',
        middleName: 'Middle Name',
        lastName: 'Last Name'
      },
      userData: {
        firstName: 'First Name',
        middleName: 'Middle Name',
        lastName: 'Last Name'
      },
      message: 'test'
    }
  },
  methods: {
    getAttributes: function () {
      console.log('getting attributes from server...')
      console.log(this.usermodel.firstName)
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
        this.enable.nameChanged = true
      } else {
        this.enable.nameChanged = false
      }
    }
  }
}
</script>

<style scoped>

</style>
