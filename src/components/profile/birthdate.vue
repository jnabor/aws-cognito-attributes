<template>
<div>
  <v-card-text class="pl-4 pr-4">
    <div class="tool a-0 ma-0">
      <div class="caption mb-1">
        <v-icon small class="mr-1">date_range</v-icon>
        {{ caption }}
      </div>
      <v-spacer></v-spacer>
      <v-btn icon flat small class="pa-0 ma-0 topright" @click="showEditView = !showEditView">
        <v-icon v-if="birthDateUpdate !== ''" small color="indigo lighten-1">edit</v-icon>
        <v-icon v-else small color="indigo lighten-1">mdi-plus-circle-outline</v-icon>
      </v-btn>
    </div>
    <div class="body-2">{{ birthDateUpdate === '' ? '...' : birthDateUpdate }}</div>
  </v-card-text>
  <div v-if="showEditView" class="pt-2 pl-2 pr-2 pb-2 indigo lighten-5">
    <v-card-text class="indigo lighten-5">
      <v-date-picker
        full-width
        class="mb-3 grey lighten-4 black--text"
        v-model="birthDateUpdate"
        :max="new Date().toISOString().substr(0, 10)">
      </v-date-picker>
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
    caption: String,
    birthdate: String
  },
  data: function () {
    return {
      birthDateUpdate: '',
      showEditView: false,
      enableSave: false
    }
  },
  methods: {
    cancelEdit: function () {
      this.birthDateUpdate = JSON.parse(JSON.stringify(this.birthdate))
    },
    closeEdit: function () {
      this.cancelEdit()
      this.showEditView = false
    },
    updateAttribute: function () {
      this.$emit('updateBirthDate', this.birthDateUpdate)
      this.enableSave = false
    }
  },
  computed: {
    birthDateUp: function () {
      return this.birthDateUpdate
    },
    birthDateProp: function () {
      return this.birthdate
    }
  },
  watch: {
    birthDateUp: function () {
      if (this.birthDateUpdate !== this.birthdate) {
        this.enableSave = true
      } else {
        this.enableSave = false
      }
    },
    birthDateProp: function () {
      this.birthDateUpdate = JSON.parse(JSON.stringify(this.birthdate))
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
