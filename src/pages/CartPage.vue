<script>
import { store } from "../js/store.js";
import axios from "axios";

export default {
  data() {
    return {
      store,
      order: {
        first_name: "",
        last_name: "",
        phone_number: "",
        address: "",
        email: "",
        paymentMethod: "cash",
        total: 0,
      },
    };
  },
  computed: {
    // Calcola il totale dell'ordine
    totalAmount() {
      return this.store.cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },
    cartCount() {
      return this.store.cartCount;
    },
  },
  methods: {
    // Rimuovi un piatto dal carrello
    removeFromCart(index) {
      this.store.cart.splice(index, 1);
      this.store.syncWithLocalStorage();
    },

    // Invia l'ordine al server
    submitOrder() {
      this.order.total = this.totalAmount;
      const orderData = {
        first_name: this.order.first_name,
        last_name: this.order.last_name,
        email: this.order.email,
        phone_number: this.order.phone_number,
        address: this.order.address,
        total: this.order.total,
        items: this.store.cart.map((item) => ({
          plate_id: item.id,
          quantity: item.quantity,
        })),
      };

      // Invia l'ordine al server
      axios
        .post("http://127.0.0.1:8000/api/orders", orderData)
        .then((response) => {
          console.log("Ordine completato con successo!", response);
          // Svuota il carrello dopo l'ordine
          this.store.clearCart();
          // Reindirizza alla pagina di pagamento
          this.$router.push(`/payment/${response.data.orderId}`);
        })
        .catch((error) => {
          console.error("Errore durante l'invio dell'ordine:", error);
          alert("Errore durante l'invio. Riprova.");
        });
    },
  },
  mounted() {
    this.store.loadFromLocalStorage();
  },
};
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <!-- PRIMO CONTROLLO NEL CASO SIA VUOTO -->
        <div v-if="store.cart.length === 0">
          <p>
            Il carrello è vuoto. Aggiungi piatti al carrello per procedere
            all'ordine.
          </p>
          <router-link to="/">Torna al menu</router-link>
        </div>
        <!-- Carrello con contenuto -->
        <div v-else>
          <div v-for="(item, index) in store.cart" :key="item.id" class="mb-3">
            <div>
              <h4>{{ item.name }}</h4>
              <p>Prezzo: €{{ item.price }}</p>
            </div>
            <div class="d-flex align-items-baseline">
              <div class="mb-2">
                <!-- Modifica la quantità -->
                <input
                  type="number"
                  v-model.number="item.quantity"
                  min="1"
                  @change="updateCartItem(index)"
                  class="form-control"
                  style="width: 80px"
                />
              </div>
              <button @click="removeFromCart(index)" class="btn btn-danger">
                Rimuovi
              </button>
            </div>
            <p class="mb-3 fw-bold border-bottom">
              Totale per questo piatto: €{{
                (item.price * item.quantity).toFixed(2)
              }}
            </p>
          </div>
          <!-- Totale carrello -->
          <div class="mb-3">
            <h4>Totale Carrello: €{{ totalAmount.toFixed(2) }}</h4>
          </div>
          <div class="row">
            <div class="col-12">
              <!-- Form di checkout -->
              <h3 class="my-4">Dati per l'ordine</h3>
            </div>
            <div class="col-12">
              <form
                @submit.prevent="submitOrder"
                class="mb-4"
                method="POST"
                autocomplete="off"
              >
                <div class="mb-3">
                  <label for="first_name" class="form-label">Nome</label>
                  <input
                    type="text"
                    v-model="order.first_name"
                    id="first_name"
                    name="first_name"
                    class="form-control"
                    required
                  />
                </div>
                <div class="mb-3">
                  <label for="last_name" class="form-label">Cognome</label>
                  <input
                    type="text"
                    v-model="order.last_name"
                    id="last_name"
                    name="last_name"
                    class="form-control"
                    required
                  />
                </div>
                <div class="mb-3">
                  <label for="phone_number" class="form-label"
                    >Numero di Telefono</label
                  >
                  <input
                    type="text"
                    v-model="order.phone_number"
                    id="phone_number"
                    name="phone_number"
                    class="form-control"
                    required
                  />
                </div>
                <div class="mb-3">
                  <label for="address" class="form-label">Indirizzo</label>
                  <input
                    type="text"
                    v-model="order.address"
                    id="address"
                    name="address"
                    class="form-control"
                    required
                  />
                </div>
                <div class="mb-3">
                  <label for="email" class="form-label">Email</label>
                  <input
                    type="email"
                    v-model="order.email"
                    id="email"
                    name="email"
                    class="form-control"
                    required
                  />
                </div>
                <input type="hidden" :value="totalAmount" />
                <button type="submit" class="btn btn-primary mt-3">
                  Vai al pagamento
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  max-width: 800px;
  margin: 0 auto;

  h1,
  h3 {
    font-size: 2em;
  }

  button {
    margin-left: 10px;
  }

  form {
    margin-top: 20px;
  }

  input,
  select {
    margin-bottom: 15px;
  }
}
</style>
