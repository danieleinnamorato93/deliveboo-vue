<script>
import RestaurantCard from '../components/RestaurantCard.vue';
import {store} from '../js/store.js';
import axios from 'axios';

export default {
  name:"Restaurant",
  data() {
    return {
      store,
      apiUrl:'http://127.0.0.1:8000/api/restaurants',
      restaurant: null,  // Variável para armazenar o restaurante individual

    }
  },
  components: {
    RestaurantCard,
  },

  methods: {
    getRestaurant (){
      console.log('Chiamata axios iniziata') 
      axios.get(`${this.apiUrl}/${this.$route.params.id}`)
        .then((response) => {
          if (response.data) {
            console.log(response.data.results);
            this.restaurant = response.data.results;  // Assegna i dati ricevuti alla variabile
          } else {
            console.error('Nessun piatto trovato nel ristorante');
          }
        })
      },
    },
    created(){
    this.getRestaurant();
    },
}
</script>

<template>
<p>Restaurant ID: {{ $route.params.id }} </p>
<RestaurantCard :restaurantObject="restaurant" />  
<h1>{{restaurant.name}}</h1>

</template>

<style scoped lang="scss">

</style>