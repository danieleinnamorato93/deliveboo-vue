<script>
import RestaurantCard from '../components/RestaurantCard.vue';
import axios from 'axios';

export default {
  name: "Restaurant",
  data() {
    return {
      apiUrl: 'http://127.0.0.1:8000/api/restaurants',
      restaurant: null,  // Variabile per il ristaurant
      notFound: null,    //Variabile per il messagio 404
    }
  },

  methods: {
    getSingleRestaurant(){
      axios.get(`${this.apiUrl}/${this.$route.params.id}`)
        .then((response) => {
          if (response.data.results){
            this.restaurant = response.data.results; //aggingi i dati nella variabile
            this.notFount = null; //Varibille vuota
            console.log(this.restaurant);
          }else{
            this.restaurant = null;
            this.notFound = 'Ristorante non esiste!';
          }
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .finally(function () {
           // always executed
           console.log("chiamata axios finita!")
        });
    },
  },

  created() {
    this.getSingleRestaurant();
  }
}
</script>

<template>
  <!-- se non trova il ID del ristorante fa vedere l'erore-->
  <div v-if="notFound" >
    <h2>{{ notFound }}</h2>
  </div>

  <!-- Se trova il ID del ristorante mostra in pagina -->
  <div v-else>
    <section class="container py-3">
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