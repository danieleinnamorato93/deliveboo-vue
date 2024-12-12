<script>
import Jumbotron from "../components/Jumbotron.vue";
import RestaurantList from "../components/RestaurantList.vue";
import TypesList from "../components/TypesList.vue";

export default {
  data() {
    return {};
  },
  components: {
    Jumbotron,
    TypesList,
    RestaurantList,
  },
};
</script>

<template>
  <Jumbotron />
  <TypesList />
  <RestaurantList />
</template>

<style scoped lang="scss"></style>
