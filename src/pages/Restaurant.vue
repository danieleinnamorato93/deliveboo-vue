<script>
import { store } from '../js/store';
import axios from 'axios';

export default {
  data() {
    return {
      store,
      apiRestaurants:'http://127.0.0.1:8000/api/restaurants',
      restaurant: [],
    }
  },
  
  methods: {
    getSingleRestaurant(){
      axios.get(`${this.apiRestaurants}/${this.$route.params.id}`)
        .then((response) => {
        this.restaurant = response.data.results;
        console.log(this.restaurant);
        })
    },
  },

  created(){
    this.getSingleRestaurant();
  }
}
</script>

<template>
<h1>Sono un singolo ristorante</h1>
<h2>Ciao io sono {{ restaurant.name }} </h2>
</template>

<style scoped lang="scss">

</style>