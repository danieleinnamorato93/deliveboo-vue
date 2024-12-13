<script>
import Jumbotron from "../components/Jumbotron.vue";
import Claims from "../components/Claims.vue";
import RestaurantList from "../components/RestaurantList.vue";
import TypesList from "../components/TypesList.vue";

export default {
  data() {
    return {};
  },
  components: {
    Jumbotron,
    Claims,
    TypesList,
    RestaurantList,
  },
};
</script>

<template>
  <Jumbotron />
  <Claims />
  <TypesList />
  <RestaurantList />
</template>

<style scoped lang="scss"></style>
