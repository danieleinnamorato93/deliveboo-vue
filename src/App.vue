<script>
import { RouterLink, RouterView } from "vue-router";
import AppHeader from "./components/AppHeader.vue";
import AppFooter from "./components/AppFooter.vue";

export default {
  data() {
    return {};
  },

  components: {
    AppHeader,
    AppFooter,
  },
};
</script>

<template>
  <main>
    <AppHeader />
    <div class="wrapper-box">
      <RouterView />
    </div>
    <AppFooter />
  </main>
</template>

<style lang="scss">
@use "../node_modules/bootstrap/scss/bootstrap.scss" as *;
@use "../src/scss/general.scss" as *;

main {

  .wrapper-box{
    // tolgo in ordine altezza navbar e footer
    min-height: calc( 100vh - 100px - 200px);
  }
}
</style>
