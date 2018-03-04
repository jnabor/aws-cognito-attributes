<template>
<div>
  <v-card-text class="pl-4 pr-4">
    <div class="tool a-0 ma-0">
      <div class="caption mb-1">
        <v-icon small class="mr-1">location_on</v-icon>
        {{ caption }}
      </div>
      <v-spacer></v-spacer>
      <v-btn icon flat small class="pa-0 ma-0 topright" @click="showEditView = !showEditView">
        <v-icon v-if="addressUp !== ''" small color="indigo lighten-1">edit</v-icon>
        <v-icon v-else small color="indigo lighten-1">mdi-plus-circle-outline</v-icon>
      </v-btn>
    </div>
    <div class="body-2" v-if="addressUp === ''">...</div>
    <div class="body-2" v-else>
      <div v-if="addressUpdate.line !== ''">{{ addressUpdate.line }}</div>
      <div v-if="addressUpdate.city + addressUpdate.state + addressUpdate.zipcode + addressUpdate.country !== ''">
      {{ addressUpdate.city + ' ' + addressUpdate.state + ' ' + addressUpdate.zipcode + ' ' + addressUpdate.country}}
      </div>
    </div>
  </v-card-text>
  <div v-if="showEditView" class="pt-2 pl-2 pr-2 pb-2 indigo lighten-5">
    <v-card-text class="indigo lighten-5">
      <v-text-field
        v-model="addressUpdate.line"
        label="Address Line">
      </v-text-field>
      <v-layout row wrap>
        <v-flex>
          <v-text-field
            v-model="addressUpdate.city"
            label="Town/City">
          </v-text-field>
        </v-flex>
        <v-flex>
          <v-text-field
            v-model="addressUpdate.state"
            label="Province/State">
          </v-text-field>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex>
          <v-text-field
            v-model="addressUpdate.zipcode"
            label="Zip Code">
          </v-text-field>
        </v-flex>
        <v-flex >
          <v-select
            :items="countries"
            label="Country"
            v-model="addressUpdate.country"
            autocomplete>
          </v-select>
        </v-flex>
      </v-layout>
    </v-card-text>
    <v-card-actions>
      <v-btn class="ml-4" small :disabled="!enableSave" @click="cancelEdit()">CANCEL</v-btn>
      <v-spacer></v-spacer>
      <v-btn small  @click="closeEdit()" >CLOSE</v-btn>
      <v-btn class="mr-4" small :disabled="!enableSave" @click="updateAttribute()" color="success">SAVE</v-btn>
    </v-card-actions>
  </div>
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
      menu: false,
      modal: false,
      addressUpdate: {
        line: '',
        city: '',
        state: '',
        zipcode: '',
        country: ''
      },
      showEditView: false,
      enableSave: false,
      countries: countries.getNames()
    }
  },
  methods: {
    cancelEdit: function () {
      this.addressUpdate = JSON.parse(JSON.stringify(this.address))
    },
    closeEdit: function () {
      this.cancelEdit()
      this.showEditView = false
    },
    updateAttribute: function () {
      this.$emit('updateAddress', this.addressUpdate)
      this.enableSave = false
    }
  },
  computed: {
    addressUp: function () {
      return this.addressUpdate.line + this.addressUpdate.city + this.addressUpdate.state + this.addressUpdate.zipcode + this.addressUpdate.country
    },
    addressProp: function () {
      return this.address.line + this.address.city + this.address.state + this.address.zipcode + this.address.country
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
