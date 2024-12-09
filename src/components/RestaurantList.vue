<script>
import RestaurantCard from "./RestaurantCard.vue";
import axios from "axios";

export default {
  data() {
    return {
      restaurantList: [],
      /* Placejolder endpoint
      apiRestaurantUrl:http://localhost:5173/,
      */
    };
  },

  components: {
    RestaurantCard,
  },
};
</script>

<template>
  <h2>Sono la lista dei ristoranti</h2>
  <RestaurantCard />
</template>

<style scoped lang="scss"></style>
