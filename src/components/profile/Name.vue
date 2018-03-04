<template>
<div>
  <v-card-text class="pl-4 pr-4">
    <div class="tool a-0 ma-0">
      <div class="caption mb-1">Name</div>
      <v-spacer></v-spacer>
      <v-btn icon flat small class="pa-0 ma-0 topright" @click="showEditView = !showEditView">
        <v-icon v-if="fullName !== '  '" small color="indigo lighten-1">edit</v-icon>
        <v-icon v-else small color="indigo lighten-1">mdi-plus-circle-outline</v-icon>
      </v-btn>
    </div>
    new: {{ nameUpdate }}<br />
    original: {{ name }}<br />
    <div class="body-2">{{ fullName === '  ' ? '...' : fullName }}</div>
  </v-card-text>
  <template v-if="showEditView" class="pt-2 pl-2 pr-2 pb-2 indigo lighten-5">
    <v-card-text class="indigo lighten-5">
      <v-text-field
        v-model="nameUpdate.first"
        label="First Name">
      </v-text-field>
      <v-text-field
        v-model="nameUpdate.middle"
        label="Middle Name">
      </v-text-field>
      <v-text-field
        v-model="nameUpdate.last"
        label="Last Name">
      </v-text-field>
    </v-card-text>
    <v-card-actions>
      <v-btn class="ml-4" small :disabled="!enableSave" @click="cancelEdit()">CANCEL</v-btn>
      <v-spacer></v-spacer>
      <v-btn small  @click="closeEdit()" >CLOSE</v-btn>
      <v-btn class="mr-4" small :disabled="!enableSave" @click="updateAttribute()" color="success">SAVE</v-btn>
    </v-card-actions>
  </template>
</div>
</template>

<script>
export default {
  props: {
    name: Object
  },
  data: function () {
    return {
      nameUpdate: '',
      showEditView: false,
      enableSave: false
    }
  },
  methods: {
    cancelEdit: function () {
      console.log('Name: cancelling...')
      this.nameUpdate = JSON.parse(JSON.stringify(this.name))
    },
    closeEdit: function () {
      this.cancelEdit()
      this.showEditView = false
    },
    updateAttribute: function () {
      console.log('Name: updating...')
      this.$emit('updateName', this.nameUpdate)
    }
  },
  computed: {
    fullName: function () {
      return this.nameUpdate.first + ' ' + this.nameUpdate.middle + ' ' + this.nameUpdate.last
    },
    propName: function () {
      return this.name
    }
  },
  watch: {
    propName: function () {
      console.log('Name: child name change: ' + this.name)
      this.nameUpdate = JSON.parse(JSON.stringify(this.name))
    },
    fullName: function () {
      console.log('Name: name update changed: ' + this.fullName)
      if ((this.nameUpdate.first !== this.name.first) ||
          (this.nameUpdate.middle !== this.name.middle) ||
          (this.nameUpdate.last !== this.name.last)) {
        this.enableSave = true
      } else {
        this.enableSave = false
      }
    }
  },
  beforeMount: function () {
    console.log('Name: beforeMount')
    this.nameUpdate = JSON.parse(JSON.stringify(this.name))
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
