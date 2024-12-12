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
    addToCart(plateObj) {
      // Se la quantità non è definita o inferiore a 1, la impostiamo a 1
      const quantity = plateObj.quantity && plateObj.quantity > 0 ? plateObj.quantity : 1;
      // Crea un oggetto del piatto da aggiungere al carrello con le proprità richieste
      const item = {
        id: plateObj.id,
        name: plateObj.name,
        price: plateObj.price,
        quantity: quantity,
      };
      // controlla se abbiamo un carrello in localstorage converisone da string a obj
      let cart = JSON.parse(localStorage.getItem('cart')) || [];

      // controlla se ci sono elementi all'interno del carrello
      const existingItem = cart.find(item => item.id === plateObj.id);

      if (existingItem) {
        // se abbiamo un item andiamo a modificarne la quantità
        existingItem.quantity += quantity;
      } else {
        cart.push(item);
      }
      // qui salvataggio nel localStorage, conversione da obj a string
      localStorage.setItem('cart', JSON.stringify(cart));

      alert(`${plateObj.name} aggiunto al carrello con quantità ${quantity}`);
    },
  },
  created() {
    this.getSingleRestaurant();
  }
};
</script>
<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <!-- Mostra il messaggio di errore se l'ID del ristorante non è valido -->
        <div v-if="notFound" class="container">
          <div class="row py-3">
            <div class="col-12">
              <h2>Ristorante non trovato</h2>
              <p>L'ID fornito non corrisponde a nessun ristorante esistente.</p>
              <router-link to="/">Torna alla Lista dei Ristoranti</router-link>
            </div>
          </div>
        </div>
        <!-- Mostra le informazioni del ristorante se l'ID è valido -->
        <div v-else>
          <section class="mb-3">
            <!-- fa vedere la lista dei tipi di ristoranti -->
            <div class="row justify-content-center">
              <RestaurantCard :restaurantObject="restaurant" />
            </div>
          </section>
          <section id="restaurant">
            <div class="row">
              <div class="col-12 d-flex justify-content-center">
                <!-- informazioni del ristorante -->
                <div class="card" style="width: 18rem;">
                  <div class="card-body">
                    <h5 class="card-title">{{ restaurant.name }}</h5>
                    <!-- <h6 class="card-subtitle mb-2 text-body-secondary"> {{ restaurant.type }}</h6> -->
                    <p class="card-text text-center">{{ restaurant.address }}</p>
                  </div>
                </div>
              </div>
            </div>
            <div id="plates">
              <ul class="list-unstyled">
                <!-- mostra solo i piatti disponibili -->
                <li v-for="plate in restaurant.plates" :key="plate.id">
                  <!-- info piatti del ristorante -->
                  <div v-if="plate.visibility === 1">
                    <h3>{{ plate.name }}</h3>
                    <p>{{ plate.description }}</p>
                    <p>Ingredienti: {{ plate.ingredients }}</p>
                    <p>Prezzo: €{{ plate.price }}</p>

                    <div class="d-flex justify-content-start gap-3">
                      <label for="quantity">Quantità</label>
                      <input type="number" v-model.number="plate.quantity" min="1" id="quantity" class="quantity-input"/>
                      <button class="btn btn-success" @click="addToCart(plate)">Aggiungi al carrello</button>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.quantity-input {
  width: 60px;
  padding: 5px;
  margin-left: 10px;
}
</style>
