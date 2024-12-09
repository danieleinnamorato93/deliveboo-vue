<script>
import RestaurantCard from '../components/RestaurantCard.vue';
import {store} from '../js/store.js';

export default {
  name:"Restaurant",
  data() {
    return {
      store,
    }
  },
  components: {
    RestaurantCard,
  },
 
}
</script>

<template>
<p>Restaurant ID: {{ $route.params.id }} </p>
<h1>Sono un singolo ristorante </h1>
<RestaurantCard :restaurantObject = 'restaurant' />
</template>

<style scoped lang="scss">

</style>