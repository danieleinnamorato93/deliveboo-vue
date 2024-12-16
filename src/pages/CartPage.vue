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
        total: 0
      },
      errors: {
        first_name: '',
        last_name: '',
        phone_number: '',
        address: '',
        email: '',
      }
    }
  },
  computed: {
    // Calcola il totale dell'ordine
    totalAmount() {
      let total = 0;
      for (let i = 0; i < this.store.cart.length; i++) {
        const item = this.store.cart[i];
        total += item.price * item.quantity;
      }
      return total;
    },
    cartCount() {
      return this.store.cartCount;
    },
  },
  methods: {
    // per poter usare il metodo nella store devo splittare il metodo che avevo creato
    // in questo modo potrà eliminare uno alla volta gli elementi nel carrello con il metodo creato ora nella store
    // e dovrò creare un metodo separato qui per poter fare la sync con il localstorage
    // removeFromCart(index) {
    // qui li toglieva tutti in una botta
    // this.store.cart.splice(index, 1);
    // this.store.syncWithLocalStorage();
    // },
    removeFromCart(itemId) {
      this.store.removeFromCart(itemId);
    },
    updateCartItem(index) {
      // Sincronizza il carrello nel localStorage quando cambia la quantità
      this.store.syncWithLocalStorage();
    },

    //------------------------VALIDAZIONI--------------------------
    validateForm() {
      let valid = true;

      //Pulisci caso abbia errore da prima
      this.errors = {
        first_name: '',
        last_name: '',
        phone_number: '',
        address: '',
        email: '',
      };

      // Validare nome
      if (!this.order.first_name.trim()) {
        this.errors.first_name = 'Il nome è obbligatorio.';
        valid = false;
      } else if (this.order.first_name.length < 3 || this.order.first_name.length > 20) {
        this.errors.first_name = 'Il nome deve avere tra 3 e 20 caratteri.';
        valid = false;
      } else {
        this.order.first_name = this.order.first_name.charAt(0).toUpperCase() + this.order.first_name.slice(1).toLowerCase();
      }

      // Validare cognome
      if (!this.order.last_name.trim()) {
        this.errors.last_name = 'Il cognome è obbligatorio.';
        valid = false;
      } else if (this.order.last_name.length < 3 || this.order.last_name.length > 30) {
        this.errors.last_name = 'Il cognome deve avere tra 3 e 30 caratteri.';
        valid = false;
      } else {
        this.order.last_name = this.order.last_name.charAt(0).toUpperCase() + this.order.last_name.slice(1).toLowerCase();
      }

      // Validare numero di telefono 
      const phoneRegex = /^[0-9]{10}$/;
      if (!this.order.phone_number.trim()) {
        this.errors.phone_number = 'Il numero di telefono è obbligatorio.';
        valid = false;
      } else if (!phoneRegex.test(this.order.phone_number.trim())) {
        this.errors.phone_number = 'Il numero di telefono deve contenere 10 cifre numeriche.';
        valid = false;
      }

      // Validare indirizzo
      if (!this.order.address.trim()) {
        this.errors.address = 'L\'indirizzo è obbligatorio.';
        valid = false;
      } else if (this.order.address.length < 3 || this.order.address.length > 30) {
        this.errors.address = 'L\'indirizzo deve avere tra 3 e 30 caratteri.';
        valid = false;
      } else if (!/\d/.test(this.order.address)) {
        // Verifica se há pelo menos um dígito numérico no endereço
        this.errors.address = 'L\'indirizzo deve contenere almeno un numero.';
        valid = false;
      } else {
        this.order.address = this.order.address.charAt(0).toUpperCase() + this.order.address.slice(1).toLowerCase();
      }


      // Validar email
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      if (!this.order.email.trim()) {
        this.errors.email = 'L\'email è obbligatoria.';
        valid = false;
      } else if (!emailRegex.test(this.order.email)) {
        this.errors.email = 'Indirizzo email non valido.';
        valid = false;
      }

      return valid;

    },


    // Invia l'ordine al server
    submitOrder() {
      //validare prima del invio del'ordine
      if (this.validateForm()) {
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
            this.store.clearCart();
            this.$router.push(`/payment/${response.data.orderId}`);
          })
          .catch((error) => {
            console.error("Erro durante l'invio dell'ordine:", error);
            alert("Errore durante l'invio. Riprova.");

          });
      }
    },
  },
  mounted() {
    this.store.loadFromLocalStorage();
  },
}
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
                <input type="number" v-model.number="item.quantity" min="1" @change="updateCartItem(index)"
                  class="form-control" style="width: 80px" />
              </div>
              <button @click="removeFromCart(item.id)" class="btn btn-danger">
                Rimuovi una quantità
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
              <form @submit.prevent="submitOrder" class="mb-4" method="POST" autocomplete="off">
                <div class="mb-3">
                  <label for="first_name" class="form-label">Nome</label>
                  <input type="text" v-model="order.first_name" id="first_name" name="first_name" class="form-control"
                    placeholder="Minimo 3 caratteri" required />
                  <span v-if="errors.first_name" class="text-danger">{{ errors.first_name }}</span>

                </div>
                <div class="mb-3">
                  <label for="last_name" class="form-label">Cognome</label>
                  <input type="text" v-model="order.last_name" id="last_name" name="last_name" class="form-control"
                    placeholder="Minimo 3 caratteri" required />
                  <span v-if="errors.last_name" class="text-danger">{{ errors.last_name }}</span>
                </div>
                <div class="mb-3">
                  <label for="phone_number" class="form-label">Numero di Telefono</label>
                  <input type="text" v-model="order.phone_number" id="phone_number" name="phone_number"
                    placeholder="10 cifre numeriche. es.:3332224455" class="form-control" required />
                  <span v-if="errors.phone_number" class="text-danger">{{ errors.phone_number }}</span>
                </div>
                <div class="mb-3">
                  <label for="address" class="form-label">Indirizzo</label>
                  <input type="text" v-model="order.address" id="address" name="address" class="form-control"
                    placeholder="Via e numero" required />
                  <span v-if="errors.address" class="text-danger">{{ errors.address }}</span>
                </div>
                <div class="mb-3">
                  <label for="email" class="form-label">Email</label>
                  <input type="email" v-model="order.email" id="email" name="email" class="form-control"
                    placeholder="es. utente@example.com" required />
                  <span v-if="errors.email" class="text-danger">{{ errors.email }}</span>
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
.text-danger {
  color: red;
}

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
