<script>
import RestaurantCard from '../components/RestaurantCard.vue';
import RestaurantCard from '../components/RestaurantCard.vue';
import {store} from '../js/store.js';

export default {
  name:"Restaurant",
  data() {
    return {
     restaurant: null,
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

<RestaurantCard :restaurantObject = 'restaurant' />
  
</template>

<style scoped lang="scss">

</style>