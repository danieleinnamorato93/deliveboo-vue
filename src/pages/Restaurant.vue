<script>
import RestaurantCard from '../components/RestaurantCard.vue';
import axios from 'axios';

export default {
  name: "Restaurant",
  data() {
    return {
      apiUrl: 'http://127.0.0.1:8000/api/restaurants',
      restaurant: null,  // Variável para armazenar o restaurante individual

    }
  },

  methods: {
    getSingleRestaurant(){
      axios.get(`${this.apiUrl}/${this.$route.params.id}`)
        .then((response) => {
          this.restaurant = response.data.results;
          console.log(this.restaurant);
        })
    },
  },

  created() {
    this.getSingleRestaurant();
  }
}
</script>

<template>
  <!-- se non trova il ID del ristorante fa vedere l'erore-->
  <div v-if="notFound">
    <h2>not found</h2>
  </div>

  <!-- Se trova il ID del ristorante mostra in pagina -->
  <div v-else>
    <section class="mb-3">
         <p>Restaurant ID: {{ $route.params.id }} </p>
         <div class="row justify-content-center container-fluid">
              <RestaurantCard :restaurantObject="restaurant" />
         </div>
    </section>
    <section class="container">
          <h1 class="text-center mb-5">{{ restaurant.name }}</h1>
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
  </div>
</template>

<style scoped lang="scss"></style>