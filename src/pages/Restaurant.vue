<script>
import axios from "axios";

export default {
  name: "Restaurant",
  data() {
    return {
      apiUrl: "http://127.0.0.1:8000/api/restaurants",
      restaurant: null,
      notFound: false,
    };
  },

  methods: {
    getSingleRestaurant() {
      axios
        .get(`${this.apiUrl}/${this.$route.params.id}`)
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
      // devo vedere 
      console.log('Piatto aggiunto:', plateObj);

      const quantity = plateObj.quantity && plateObj.quantity > 0 ? plateObj.quantity : 1;

      const item = {
        id: plateObj.id,
        name: plateObj.name,
        price: plateObj.price,
        quantity: quantity,
        // aggiunta per il check
        restaurantId: this.$route.params.id,
      };

      let cart = JSON.parse(localStorage.getItem('cart')) || [];

      if (cart.length > 0) {
        const firstRestaurantId = cart[0].restaurantId;

        if (firstRestaurantId !== item.restaurantId) {
          const userConfirmed = window.confirm("Hai già piatti di un altro ristorante nel carrello. Vuoi cambiare ristorante e svuotare il carrello?");

          if (userConfirmed) {
            cart = [];
            localStorage.setItem('cart', JSON.stringify(cart));
          } else {
            // Interrompe l'esecuzione della funzione e non aggiunge il nuovo piatto al carrello
            return;
          }
        }
      }
      const existingItem = cart.find(item => item.id === plateObj.id);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.push(item);
      }
      localStorage.setItem('cart', JSON.stringify(cart));
      // mi serve per vedere il funzionamento
      alert(`${plateObj.name} aggiunto al carrello con quantità ${quantity}`);
    },
  },
  created() {
    this.getSingleRestaurant();
  },
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
                  <div class="card-body text-center">
                    <h5 class="card-title fw-bold">{{ restaurant.name }}</h5>
                    <p class="card-text">Indirizzo: {{ restaurant.address }}</p>
                  </div>
                </div>
              </div>
            </div>
            <div id="plates" class="mt-4">
              <ul class="list-unstyled mb-4">
                <!-- mostra solo i piatti disponibili -->
                <li v-for="plate in restaurant.plates" :key="plate.id" class="m-4">
                  <div v-if="plate.visibility === 1">
                    <h3>{{ plate.name }}</h3>
                    <p>{{ plate.description }}</p>
                    <p>Ingredienti: {{ plate.ingredients }}</p>
                    <p>Prezzo: €{{ plate.price }}</p>

                    <div class="d-flex align-items-baseline justify-content-start gap-3 border-bottom pb-4">
                      <label for="quantity">Quantità</label>
                      <input type="number" v-model.number="plate.quantity" min="1" placeholder="1" id="quantity"
                        class="quantity-input" />
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
h1 {
  color: red;
  font-weight: bold;
}
h3 {
  color: #4fae5a;
}

.quantity-input {
  width: 60px;
  padding: 5px;
  margin-left: 10px;
}
</style>