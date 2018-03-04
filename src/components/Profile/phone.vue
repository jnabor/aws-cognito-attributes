<template>
<div>
  <v-card-text class="pl-4 pr-4">
    <div class="tool a-0 ma-0">
      <div class="caption mb-1">
        <v-icon small class="mr-1">phone</v-icon>
        Phone Number
      </div>
      <v-spacer></v-spacer>
      <v-btn icon flat small class="pa-0 ma-0 topright" @click="showEditView = !showEditView">
        <v-icon v-if="phoneUpdate.mobile === '' && phoneUpdate.business === '' && phoneUpdate.home === ''"
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
      {{ phoneUpdate.mobile === ''? '...' :  phoneUpdate.mobile }}
    </v-chip>
    <v-chip>
      <v-avatar>
        <v-icon color="amber">mdi-deskphone</v-icon>
      </v-avatar>
      {{ phoneUpdate.business === ''? '...' :  phoneUpdate.business }}
    </v-chip>
    <v-chip>
      <v-avatar>
        <v-icon color="amber">mdi-home-variant</v-icon>
      </v-avatar>
      {{ phoneUpdate.home === ''? '...' :  phoneUpdate.home }}
    </v-chip>
  </v-card-text>
  <div v-if="showEditView" class="pt-2 pl-2 pr-2 pb-2 indigo lighten-5">
    <v-card-text class="indigo lighten-5">
      <v-text-field
        v-model="phoneUpdate.mobile"
        label="Mobile Number">
      </v-text-field>
      <v-text-field
        v-model="phoneUpdate.business"
        label="Business Number">
      </v-text-field>
      <v-text-field
        v-model="phoneUpdate.home"
        label="Home Number">
      </v-text-field>
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
export default {
  props: {
    phone: Object
  },
  data: function () {
    return {
      phoneUpdate: {
        mobile: '',
        business: '',
        home: ''
      },
      showEditView: false,
      enableSave: false
    }
  },
  methods: {
    cancelEdit: function () {
      this.phoneUpdate = JSON.parse(JSON.stringify(this.phone))
    },
    closeEdit: function () {
      this.cancelEdit()
      this.showEditView = false
    },
    updateAttribute: function () {
      this.$emit('updatePhoneNumber', this.phoneUpdate)
      this.enableSave = false
    }
  },
  computed: {
    phoneNumberUp: function () {
      return this.phoneUpdate.mobile + this.phoneUpdate.business + this.phoneUpdate.home
    },
    phoneNumberProp: function () {
      return this.phone.mobile + ' ' + this.phone.business + ' ' + this.phone.home
    }
  },
  watch: {
    phoneNumberUp: function () {
      if ((this.phoneUpdate.mobile !== this.phone.mobile) ||
          (this.phoneUpdate.business !== this.phone.business) ||
          (this.phoneUpdate.home !== this.phone.home)) {
        this.enableSave = true
      } else {
        this.enableSave = false
      }
    },
    phoneNumberProp: function () {
      this.phoneUpdate = JSON.parse(JSON.stringify(this.phone))
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
