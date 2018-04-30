
<template>
<div>
  <v-list-tile>
    <v-list-tile-content>
      <v-list-tile-sub-title>
        {{ caption }}
      </v-list-tile-sub-title>
    </v-list-tile-content>
    <v-list-tile-action>
      <v-btn icon flat class="pa-0 ma-0" @click="dialog = !dialog">
        <v-icon color="editicon">edit</v-icon>
      </v-btn>
    </v-list-tile-action>
  </v-list-tile>
  <div class="subheading ml-3 pb-3">{{ objUp === '    ' ? '...' : objUp }}</div>
  <v-dialog
    v-model="dialog"
    :fullscreen="fullscreen"
    max-width="500"
    transition="dialog-bottom-transition"
    scrollable>
    <v-card>
      <v-toolbar class="elevation-0 white--text" color="primary">
        <v-toolbar-title v-if="!newEntry" >Edit Custom Attribute</v-toolbar-title>
        <v-toolbar-title v-else>Add Custom Attribute</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click.native="dialog = false" dark>
          <v-icon>close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text>
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
      <div>
        <v-card-actions>
          <v-btn v-if="!newEntry" icon flat color="editicon" class="mx-3 mb-2" @click="deleteAttribute()">
            <v-icon medium>delete</v-icon>
          </v-btn>
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
      dialog: false,
      objUpdate: {
        prop1: '',
        prop2: '',
        prop3: '',
        prop4: '',
        prop5: ''
      },
      fullscreen: true,
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
      this.dialog = false
    },
    updateAttribute: function () {
      if (this.newEntry === true) {
        this.$emit('add', this.objUpdate)
        this.objUpdate = { prop1: '', prop2: '', prop3: '', prop4: '', prop5: '' }
      } else {
        this.$emit('update', this.objUpdate)
      }
      this.enableSave = false
      this.dialog = false
    },
    deleteAttribute: function () {
      if (this.newEntry === true) {
        this.objUpdate = { prop1: '', prop2: '', prop3: '', prop4: '', prop5: '' }
      } else {
        this.$emit('delete')
      }
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
    objUp: function () {
      return this.objUpdate.prop1 + ' ' + this.objUpdate.prop2 + ' ' + this.objUpdate.prop3 + ' ' + this.objUpdate.prop4 + ' ' + this.objUpdate.prop5
    },
    objProp: function () {
      return this.obj.prop1 + ' ' + this.obj.prop2 + ' ' + this.obj.prop3 + ' ' + this.obj.prop4 + ' ' + this.obj.prop5
    },
    breakpoint () {
      return this.$vuetify.breakpoint.name
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
    },
    breakpoint () {
      this.setHeaders(this.breakpoint)
    }
  },
  created () {
    this.objUpdate = JSON.parse(JSON.stringify(this.obj))
    if (this.newEntry === true) {
      this.dialog = true
    } else {
      this.dialog = false
    }
    this.setHeaders(this.breakpoint)
  }
}
</script>
<style scoped>
</style>
