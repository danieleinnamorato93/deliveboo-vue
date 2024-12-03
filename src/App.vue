<script>
import { RouterLink, RouterView } from "vue-router";
import Navbar from "./components/Navbar.vue";

export default {
  data() {
    return {};
  },

  components: {
    Navbar
  },
};
</script>

<template>
  <Navbar />
  <RouterView />
</template>

<style lang="scss">
@use "../node_modules/bootstrap/scss/bootstrap.scss" as *;
@use "../src/scss/general.scss" as *;
</style>
