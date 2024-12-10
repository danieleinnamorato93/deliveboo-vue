<script>
import axios from 'axios';

export default {
  name: "Restaurant",
  data() {
    return {
      apiUrl: 'http://127.0.0.1:8000/api/restaurants',
      restaurant: null,
      notFound: false,
    };
  },

  methods: {
    getSingleRestaurant() {
      axios.get(`${this.apiUrl}/${this.$route.params.id}`)
        .then((response) => {
          this.restaurant = response.data.results;
          this.notFound = false;
        })
        .catch((error) => {
          if (error.response && error.response.status === 404) {
            this.notFound = true;
          } else {
            console.error("Errore durante la richiesta:", error);
          }
        });
    },
  },

  created() {
    this.getSingleRestaurant();
  }
};
</script>

<template>
  <!-- Mostra il messaggio di errore se l'ID del ristorante non è valido -->
  <div v-if="notFound">
    <h2>Ristorante non trovato</h2>
    <p>L'ID fornito non corrisponde a nessun ristorante esistente.</p>
    <router-link to="/">Torna alla homepage</router-link>
  </div>

  <!-- Mostra le informazioni del ristorante se l'ID è valido -->
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
        <!-- Itera sui piatti e mostra nome, descrizione e prezzo -->
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
