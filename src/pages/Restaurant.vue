<script>
import { store } from "../js/store.js";
import axios from "axios";


export default {
  name: "Restaurant",
  data() {
    return {
      apiUrl: "http://127.0.0.1:8000/api/restaurants",
      restaurant: null,
      notFound: false,
      store,
      showModal: false
    }
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
      const quantity =
        plateObj.quantity && plateObj.quantity > 0 ? plateObj.quantity : 1;

      const item = {
        id: plateObj.id,
        name: plateObj.name,
        price: plateObj.price,
        quantity: quantity,
        restaurantId: this.$route.params.id,
      };

      if (this.store.cart.length > 0) {
        const firstRestaurantId = this.store.cart[0].restaurantId;

        if (firstRestaurantId !== item.restaurantId) {
          const userConfirmed = window.confirm(
            "Hai già piatti di un altro ristorante nel carrello. Vuoi cambiare ristorante e svuotare il carrello?"
          );

          if (userConfirmed) {
            this.store.cart = [];
          } else {
            return;
          }
        }
      }
      this.store.addToCart(item);
    },
    // metodo da inserire nel bottone per prendere quello dalla store
    removeFromCart(itemId) {
      this.store.removeFromCart(itemId);
    },
  },
  created() {
    // Carica il carrello all'avvio
    this.getSingleRestaurant();
  },
  mounted() {
    // carica qui così non ho problema async
    this.store.loadFromLocalStorage();
  },
};
</script>

<template>
  <div class="container-fluid">
    <div v-if="notFound">
      <div class="row py-3">
        <div class="col-12 text-center mt-3">
          <h2 class="fw-bold">Ristorante non trovato!</h2>
          <p>L'ID fornito non corrisponde a nessun ristorante esistente.</p>
          <router-link to="/">Torna alla Lista dei Ristoranti</router-link>
        </div>
      </div>
    </div>
    <div v-else>
      <section id="restaurant" class="pt-3" v-if="restaurant && restaurant.plates" @click="showModal = false">
        <div class="row">
          <div class="col-12 text-center">
            <h2 class="fw-bold">{{ restaurant.name }}</h2>
            <h5>{{ restaurant.address }}</h5>
          </div>
        </div>
        <div id="plates" class="mt-4">
          <ul class="list-unstyled mb-4">
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
                  <div id="modalAdd">
                    <button class="btn btn-success" @click="addToCart(plate), showModal = true">
                      Aggiungi al carrello
                    </button>
                    <transition name="fade" mode="out-in" appear>
                      <div
                        class="model-overlay text-center badge rounded-pill d-flex align-items-center justify-content-center pt-4"
                        v-if="showModal">
                        <p class="fw-bold fs-6 py-3"> Prodotto aggiunto al carrello</p>
                      </div>
                    </transition>
                  </div>
                  <!-- aggiungo bottone per gestire la rimozione del singolo elelemento -->
                  <button class="btn btn-danger" @click="removeFromCart(plate.id)">
                    Rimuovi dal carrello
                  </button>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </section>
    </div>
  </div>
</template>
<style scoped lang="scss">
h2 {
  color: #fc7a1e;
}

.quantity-input {
  width: 60px;
  padding: 5px;
  margin-left: 10px;
}

#modalAdd {
  position: relative;
}

.model-overlay {
  position: fixed;
  /* padding: 15px 20px; */
  top: 10%;
  right: 20%;
  left: 80%;
  transform: translate(-50%, -50%);
  z-index: 2;
  width: 250px;
  height: 50px;
  border: 1px solid black;
  border-radius: 16px;
  background-color: #06af3e;
  box-shadow: 3px 3px rgba(0, 0, 0, 0.2);
  transition: 1s ease-in-out;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity(2s);
}

.fade-enter,
.fade-leave-to {
  transition-delay: 0.8s;
  opacity: 0;
}
</style>
