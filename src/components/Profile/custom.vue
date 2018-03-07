<template>
<div>
  <v-card-text class="pl-4 pr-4">
    <div class="tool a-0 ma-0">
      <div class="caption mb-1">{{ caption }}</div>
      <v-spacer></v-spacer>
      <v-btn v-if="!newEntry" icon flat small class="pa-0 ma-0 topright-2" @click="deleteAttribute()">
        <v-icon small color="indigo lighten-1">delete</v-icon>
      </v-btn>
      <v-btn v-if="!newEntry" icon flat small class="pa-0 ma-0 topright" @click="showEditView = !showEditView">
        <v-icon small color="indigo lighten-1">edit</v-icon>
      </v-btn>
    </div>
    <div class="body-2">{{ objUp === '    ' ? '...' : objUp }}</div>
  </v-card-text>
  <div v-if="showEditView" class="pt-2 pl-2 pr-2 pb-2 indigo lighten-5">
    <v-card-text class="indigo lighten-5">
      <v-text-field
        v-model="objUpdate.prop1"
        label="Property 1">
      </v-text-field>
      <v-text-field
        v-model="objUpdate.prop2"
        label="Property 2">
      </v-text-field>
      <v-text-field
        v-model="objUpdate.prop3"
        label="Property 3">
      </v-text-field>
      <v-text-field
        v-model="objUpdate.prop4"
        label="Property 4">
      </v-text-field>
      <v-text-field
        v-model="objUpdate.prop5"
        label="Property 5">
      </v-text-field>
    </v-card-text>
    <v-card-actions>
      <v-btn class="ml-4" small :disabled="!enableSave && !newEntry" @click="cancelEdit()">CANCEL</v-btn>
      <v-spacer></v-spacer>
      <v-btn v-if="!newEntry" small  @click="closeEdit()" >CLOSE</v-btn>
      <v-btn class="mr-4" small :disabled="!enableSave" @click="updateAttribute()" color="success">SAVE</v-btn>
    </v-card-actions>
  </div>
</div>
</template>

<script>
export default {
  props: {
    obj: Object,
    caption: String,
    delete: {
      default: true,
      type: Boolean
    },
    newEntry: {
      default: false,
      type: Boolean
    }
  },
  data: function () {
    return {
      objUpdate: {
        prop1: '',
        prop2: '',
        prop3: '',
        prop4: '',
        prop5: ''
      },
      showEditView: false,
      enableSave: false
    }
  },
  methods: {
    cancelEdit: function () {
      if (this.newEntry === true) {
        this.$emit('close')
        this.objUpdate = { prop1: '', prop2: '', prop3: '', prop4: '', prop5: '' }
      } else {
        this.objUpdate = JSON.parse(JSON.stringify(this.obj))
      }
    },
    closeEdit: function () {
      this.cancelEdit()
      this.showEditView = false
    },
    updateAttribute: function () {
      if (this.newEntry === true) {
        this.$emit('add', this.objUpdate)
        this.objUpdate = { prop1: '', prop2: '', prop3: '', prop4: '', prop5: '' }
      } else {
        this.$emit('update', this.objUpdate)
      }
      this.enableSave = false
    },
    deleteAttribute: function () {
      this.$emit('delete')
    }
  },
  computed: {
    objUp: function () {
      return this.objUpdate.prop1 + ' ' + this.objUpdate.prop2 + ' ' + this.objUpdate.prop3 + ' ' + this.objUpdate.prop4 + ' ' + this.objUpdate.prop5
    },
    objProp: function () {
      return this.obj.prop1 + ' ' + this.obj.prop2 + ' ' + this.obj.prop3 + ' ' + this.obj.prop4 + ' ' + this.obj.prop5
    }
  },
  watch: {
    objUp: function () {
      if ((this.objUpdate.prop1 !== this.obj.prop1) ||
          (this.objUpdate.prop2 !== this.obj.prop2) ||
          (this.objUpdate.prop3 !== this.obj.prop3) ||
          (this.objUpdate.prop4 !== this.obj.prop4) ||
          (this.objUpdate.prop5 !== this.obj.prop5)) {
        this.enableSave = true
      } else {
        this.enableSave = false
      }
    },
    objProp: function () {
      this.objUpdate = JSON.parse(JSON.stringify(this.obj))
    }
  },
  created () {
    this.objUpdate = JSON.parse(JSON.stringify(this.obj))
    if (this.newEntry === true) {
      this.showEditView = true
    } else {
      this.showEditView = false
    }
    console.log('noedit: ' + this.noedit)
    console.log('showEdit: ' + this.showEditView)
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
.topright-2 {
    position: absolute;
    top: 0px;
    right: 32px;
}
</style>
