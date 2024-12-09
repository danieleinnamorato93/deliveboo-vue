<script>
import RestaurantCard from './RestaurantCard.vue';

export default {
  data() {
    return {
      
    }
  },

  components: {
    RestaurantCard
  }
}
</script>

<template>
<h2>Sono la lista dei ristoranti</h2>
<ul>
  <li v-for="n in 5">
    <RestaurantCard />
  </li>
</ul>
</template>

<style scoped lang="scss">
ul {
  list-style-type: none;
}
</style>