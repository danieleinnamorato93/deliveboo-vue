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

  <section class="mb-3">
      <p>Restaurant ID: {{ $route.params.id }} </p>
      <div class="row justify-content-center container-fluid">
        <RestaurantCard :restaurantObject="restaurant" /> 
      </div>
  </section> 
  <section class="container">    
      <h1 class="text-center mb-5">{{restaurant.name}}</h1>
      <ul class="list-unstyled">
        <!-- Itera sobre os pratos e exibe o nome, descrição e preço -->
        <li v-for="plate in restaurant.plates" :key="plate.name" class="mb-5">
          <h3>{{ plate.name }}</h3>
          <p>{{ plate.description }}</p>
          <p>Ingredienti: {{ plate.ingredients }}</p>
          <p>Prezzo: €{{ plate.price }}</p>
        </li>
      </ul>
    </section>

</template>

<style scoped lang="scss">

</style>