<script>
import { RouterLink, RouterView } from "vue-router";
import Navbar from "./components/Navbar.vue";
import Type from "./components/Type.vue";

export default {
  data() {
    return {};
  },

  components: {
    Navbar,
    Type
  },
};
</script>

<template>
  <Navbar />
  <Type />
  <RouterView />
</template>

<style lang="scss">
@use "../node_modules/bootstrap/scss/bootstrap.scss" as *;
@use "../src/scss/general.scss" as *;
</style>
