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
              <v-card>
                <v-list two-line>
                  <template v-for="(attribute, index) in attributes">
                    <v-list-tile avatar ripple :key="index">
                      <v-list-tile-content>
                        <v-list-tile-sub-title>{{ attribute.name }}</v-list-tile-sub-title>
                        <v-list-tile-title>{{ attribute.name }} Placeholder</v-list-tile-title>
                      </v-list-tile-content>
                    </v-list-tile>
                    <v-divider v-if="index + 1 < attributes.length" :key="`divider-${index}`"></v-divider>
                  </template>
                </v-list>
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
  data () {
    return {
      attributes: [
        { name: 'Last Name', value: '' },
        { name: 'First Name', value: '' },
        { name: 'Middle Name', value: '' },
        { name: 'Birthdate', value: '' },
        { name: 'Mobile Phone No.', value: '' },
        { name: 'Home Phone No.', value: '' },
        { name: 'Business Phone No.', value: '' },
        { name: 'Home Address', value: '' },
        { name: 'Business Address', value: '' }
      ]
    }
  },
  methods: {
    getAttributes: function () {
      console.log('getting attributes from server...')
    },
    navSignOut: function () {
      console.log('signing out')
      this.$store.state.authenticated = false
      router.push('/home')
    }
  }
}
</script>

<style scoped>

</style>
