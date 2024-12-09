<script>
import RestaurantCard from "./RestaurantCard.vue";
import axios from "axios";

export default {
  data() {
    return {
 
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
