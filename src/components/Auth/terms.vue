<template>
  <div class="mt-3 ml-2 mr-2 caption">
    By using this service, you agree to the <router-link class="link" :to="''">Terms of Service</router-link> and <router-link class="link" :to="''">Privacy Policy</router-link>.
  </div>
</template>

<script>
export default {
}
</script>
<style scoped>
.link {
  text-decoration: none;
}
.link:hover {
  text-decoration: underline;
}
</style>
