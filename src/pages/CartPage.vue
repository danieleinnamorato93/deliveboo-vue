<script>
import { store } from "../js/store.js"; 
import axios from "axios";
export default {
  data() {
    return {
      store,
      order: {
        first_name: '',
        last_name: '',
        phone_number: '',
        address: '',
        email: '',
        paymentMethod: 'cash',
        total: 0
      }
    };
  },
  computed: {
    totalAmount() {
      return this.store.cart.reduce((total, item) => total + item.price * item.quantity, 0);
    },
    cartCount() {
      return this.store.cartCount; 
    }
  },
  methods: {
    removeFromCart(index) {
      this.store.cart.splice(index, 1); 
      this.store.syncWithLocalStorage(); 
    },
    submitOrder() {
      this.order.total = this.totalAmount; 
      const orderData = {
        first_name: this.order.first_name,
        last_name: this.order.last_name,
        email: this.order.email,
        phone_number: this.order.phone_number,
        address: this.order.address,
        total: this.order.total,
        items: this.store.cart.map(item => ({
          plate_id: item.id,
          quantity: item.quantity
        }))
      };
      // Invia l'ordine al server
      axios.post('http://127.0.0.1:8000/api/orders', orderData)
        .then((response) => {
          console.log('Ordine completato con successo!', response);
           // Svuota il carrello dopo l'ordine
          this.store.clearCart();
          // Reindirizza alla pagina di pagamento
          this.$router.push(`/payment/${response.data.orderId}`); 
        })
        .catch(error => {
          console.error('Errore durante l\'invio dell\'ordine:', error);
          alert('Errore durante l\'invio. Riprova.');
        });
    }
  },
  mounted() {
    this.store.loadFromLocalStorage(); 
  }
}
</script>
<template>
  <div class="container">
    <div class="row">
      <!-- Se il carrello è vuoto -->
      <div v-if="store.cart.length === 0">
        <p>Il carrello è vuoto. Aggiungi piatti al carrello per procedere all'ordine.</p>
        <router-link to="/">Torna al menu</router-link>
      </div>
      <div v-else>
        <div v-for="(item, index) in store.cart" :key="item.id" class="mb-3">
          <div>
            <h5>{{ item.name }} x{{ item.quantity }} - €{{ item.price * item.quantity }}</h5>
            <button @click="removeFromCart(index)" class="btn btn-danger">Rimuovi</button>
          </div>
        </div>
        <div class="d-flex justify-content-between mt-4">
          <h3>Total: €{{ totalAmount }}</h3>
          <button @click="submitOrder" class="btn btn-primary">Completa l'Ordine</button>
        </div>
        <!-- Form di checkout -->
        <section class="mt-5">
          <h3>Dettagli Ordine</h3>
          <form @submit.prevent="submitOrder">
            <div class="mb-3">
              <label for="first_name" class="form-label">Nome</label>
              <input type="text" id="first_name" v-model="order.first_name" class="form-control" required />
            </div>
            <div class="mb-3">
              <label for="last_name" class="form-label">Cognome</label>
              <input type="text" id="last_name" v-model="order.last_name" class="form-control" required />
            </div>
            <div class="mb-3">
              <label for="phone_number" class="form-label">Numero di telefono</label>
              <input type="tel" id="phone_number" v-model="order.phone_number" class="form-control" required />
            </div>
            <div class="mb-3">
              <label for="address" class="form-label">Indirizzo di spedizione</label>
              <input type="text" id="address" v-model="order.address" class="form-control" required />
            </div>
            <div class="mb-3">
              <label for="email" class="form-label">Email</label>
              <input type="email" id="email" v-model="order.email" class="form-control" required />
            </div>
            <div class="d-flex justify-content-between mt-4">
              <h3>Total: €{{ totalAmount }}</h3>
              <button type="submit" class="btn btn-success">Conferma Ordine</button>
            </div>
          </form>
        </section>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
</style>
