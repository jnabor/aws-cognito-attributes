<template>
<div>
  <v-list-tile>
    <v-list-tile-content>
      <v-list-tile-sub-title>
        <v-icon class="mr-1">location_on</v-icon>
        {{ caption }}
      </v-list-tile-sub-title>
    </v-list-tile-content>
    <v-list-tile-action>
      <v-btn icon flat class="pa-0 ma-0" @click="dialog = !dialog">
        <v-icon v-if="addressUp !== ''" color="editicon">edit</v-icon>
        <v-icon v-else color="editicon">add</v-icon>
      </v-btn>
    </v-list-tile-action>
  </v-list-tile>
  <div class="subheading ml-4 mb-2" v-if="addressUp === ''">...</div>
  <div class="subheading ml-4 mb-2" v-else>
    <div v-if="addressUpdate.line !== ''">{{ addressUpdate.line }}</div>
    <div v-if="addressUpdate.city + addressUpdate.state + addressUpdate.zipcode + addressUpdate.country !== ''">
    {{ addressUpdate.city + ' ' + addressUpdate.state + ' ' + addressUpdate.zipcode + ' ' + addressUpdate.country}}
    </div>
  </div>
  <v-dialog
    v-model="dialog"
    :fullscreen="fullscreen"
    max-width="500"
    transition="dialog-bottom-transition"
    scrollable>
    <v-card>
      <v-toolbar class="elevation-0 white--text" color="primary">
        <v-toolbar-title>Edit {{ caption }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click.native="dialog = false" dark>
          <v-icon>close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text>
        <v-text-field
          v-model="addressUpdate.line"
          label="Address Line">
        </v-text-field>
        <v-text-field
          v-model="addressUpdate.city"
          label="Town/City">
        </v-text-field>
        <v-text-field
          v-model="addressUpdate.state"
          label="Province/State">
        </v-text-field>
        <v-text-field
          v-model="addressUpdate.zipcode"
          label="Zip Code">
        </v-text-field>
        <v-select
          :items="countries"
          label="Country"
          v-model="addressUpdate.country"
          autocomplete>
        </v-select>
      </v-card-text>
      <div>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="mx-3 mb-2" @click="cancelEdit()">CANCEL</v-btn>
          <v-btn class="mx-3 mb-2" :disabled="!enableSave" @click="updateAttribute()" color="success">SAVE</v-btn>
        </v-card-actions>
      </div>
    </v-card>
  </v-dialog>
</div>
</template>

<script>
var countries = require('country-list')()
export default {
  props: {
    caption: String,
    address: Object
  },
  data: function () {
    return {
      dialog: false,
      menu: false,
      modal: false,
      addressUpdate: {
        line: '',
        city: '',
        state: '',
        zipcode: '',
        country: ''
      },
      fullscreen: true,
      enableSave: false,
      countries: countries.getNames()
    }
  },
  methods: {
    cancelEdit: function () {
      this.addressUpdate = JSON.parse(JSON.stringify(this.address))
      this.dialog = false
    },
    updateAttribute: function () {
      this.$emit('update', this.addressUpdate)
      this.enableSave = false
      this.dialog = false
    },
    setHeaders (param) {
      if (param === 'xs') {
        this.fullscreen = true
      } else {
        this.fullscreen = false
      }
    }
  },
  computed: {
    addressUp: function () {
      return this.addressUpdate.line + this.addressUpdate.city + this.addressUpdate.state + this.addressUpdate.zipcode + this.addressUpdate.country
    },
    addressProp: function () {
      return this.address.line + this.address.city + this.address.state + this.address.zipcode + this.address.country
    },
    breakpoint () {
      return this.$vuetify.breakpoint.name
    }
  },
  watch: {
    addressUp: function () {
      if ((this.addressUpdate.line !== this.address.line) ||
          (this.addressUpdate.city !== this.address.city) ||
          (this.addressUpdate.state !== this.address.state) ||
          (this.addressUpdate.zipcode !== this.address.zipcode) ||
          (this.addressUpdate.country !== this.address.country)) {
        this.enableSave = true
      } else {
        this.enableSave = false
      }
    },
    addressProp: function () {
      this.addressUpdate = JSON.parse(JSON.stringify(this.address))
    },
    breakpoint () {
      this.setHeaders(this.breakpoint)
    }
  },
  created () {
    this.addressUpdate = JSON.parse(JSON.stringify(this.address))
    this.setHeaders(this.breakpoint)
  }
}
</script>
<style scoped>
</style>
