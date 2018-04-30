<template>
  <v-list-tile>
    <v-list-tile-content>
      <v-list-tile-sub-title>
        <v-icon class="mr-1">email</v-icon>
        Email Address
      </v-list-tile-sub-title>
      <v-list-tile-title>{{ emailProp === '  ' ? '...' : emailProp }}</v-list-tile-title>
    </v-list-tile-content>
    <v-list-tile-action>
    </v-list-tile-action>
  </v-list-tile>
</template>

<script>
export default {
  props: {
    email: String
  },
  data: function () {
    return {
      showEditView: false,
      enableSave: false
    }
  },
  methods: {
  },
  computed: {
    emailProp: function () {
      return this.email
    }
  },
  watch: {
    emailProp: function () {
      this.emailUpdate = JSON.parse(JSON.stringify(this.email))
    }
  }
}
</script>
<style scoped>
</style>
