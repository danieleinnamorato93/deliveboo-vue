<script>
import RestaurantCard from '../components/RestaurantCard.vue';
import RestaurantCard from '../components/RestaurantCard.vue';
import {store} from '../js/store.js';

export default {
  name:"Restaurant",
  data() {
    return {
     
    }
  },
  component: {
    RestaurantCard
  },
  computed: {
    restaurantsList() {
      return store.restaurantsList;
    }
  },
}
</script>

<template>
<h1>Sono un singolo ristorante</h1>

    <div v-for="restaurant in restaurantsList" :key="restaurant.id">
      <RestaurantCard :restaurantObject="restaurant" />
    </div>
  
</template>

<style scoped lang="scss">

</style>