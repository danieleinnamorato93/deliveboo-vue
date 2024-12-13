<script>
import axios from 'axios';
import { Field, ErrorMessage, Form } from 'vee-validate';
import * as yup from 'yup';

const schema = yup.object({
  first_name, last_name: yup.string().trim().min(3, 'Ilnome deve avere almeno 3 caratteri')
    .tranform((value) => {
      return value.chart(0).toUpperCase() + value.slice(1).toLowerCase();
    })
    .required('Questo campo è obbligatorio'),

    phone_number: yup.string().trim().required('Questo campo è obbligatorio').transform(value => value.replace(/\s+/g, ''))
    .matches(
      /^[0-9]{10}$/, // Espressione regolare per garantire che siano presenti solo 10 cifre numeriche
      'Il numero di telefono deve essere composto solo da cifre (10 cifre)')
    .matches(
      /^3\d{9,10}$/, // Numero di cellulare italiano che inizia con "3" ed è lungo 9 o 10 cifre
      'Il numero di telefono deve iniziare con "3" e deve avere 9 o 10 cifre, esempio: 3112224455'
    ),

  email: yup.string().email().required(),

});

export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },

  data() {
    return {
      cart: JSON.parse(localStorage.getItem('cart')) || [],  // Carica il carrello dal localStorage
      order: {
        first_name: '',
        last_name: '',
        phone_number: '',
        address: '',
        email: '',
        paymentMethod: 'cash',
        total: 0,  // Aggiunta proprietà per il total
      },
      errors: {}, //Per i messagi di errore della validazione
    };
  },

  computed: {
    // Calcola il totale dell'ordine
    totalAmount() {
      return this.cart.reduce((total, item) => total + item.price * item.quantity, 0);
    },
  },

  methods: {
    // Modifica la quantità di un piatto nel carrello
    updateCartItem(index) {
      const updatedCart = [...this.cart];
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    },

    // Rimuovi un piatto dal carrello
    removeFromCart(index) {
      this.cart.splice(index, 1);
      localStorage.setItem('cart', JSON.stringify(this.cart));
    },



    //--------------------------------------VALIDAZIONE-------------------------------------------
    // Nome e cognome
    validateName(value) {
      if (!value) {
        return 'Questo campo è obbligatorio';
      }

      if (value.length < 3) {
        return 'Il nome deve avere almeno 3 caratteri';
      }
      return true;
    },

    //Phone 
    validatePhone(value) {
      const phoneRegex = /^3\d{8,9}$/;

      if (!value) {
        return 'Questo campo è obbligatorio';
      }

      if (!phoneRegex.test(value)) {
        return 'Numero di cellulare non valido. Usa il formato corretto (es. 3201234567).';
      }

      return true;
    },


    //Email
    validateEmail(value) {
      // if the field is empty
      if (!value) {
        return 'Questo campo è obbligatorio';
      }
      // if the field is not a valid email
      const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
      if (!regex.test(value)) {
        return 'Questo campo deve essere un indirizzo email valido';
      }
      // All is good
      return true;
    },
  },


  // Invia l'ordine al server Laravel
  submitOrder() {
    // Submit values to API...
    alert(JSON.stringify(values, null, 2))

    this.order.total = this.totalAmount;

    const orderData = {
      first_name: this.order.first_name,
      last_name: this.order.last_name,
      email: this.order.email,
      phone_number: this.order.phone_number,
      address: this.order.address,
      // payment_method: this.order.paymentMethod
      total: this.order.total,
      items: this.cart.map(item => ({
        plate_id: item.id,
        quantity: item.quantity
      }))
    };
    // Effettua la richiesta al backend
    axios.post('http://127.0.0.1:8000/api/orders', orderData)
      .then(() => {
        alert('Ordine completato con successo!');
        localStorage.removeItem('cart'); // Svuota il carrello
        this.cart = [];
        this.$router.push('/'); // Reindirizza alla homepage
      })
      .catch(error => {
        console.error('Errore durante l\'invio dell\'ordine:', error);
        alert('Errore durante l\'invio. Riprova.');
      });
  }
}

</script>
<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <h1 class="text-center my-4">Il tuo Carrello</h1>
      </div>
      <div class="col-12">
        <!-- PRIMO CONTROLLO NEL CASO SIA VUOTO -->
        <div v-if="cart.length === 0">
          <p>Il carrello è vuoto. Aggiungi piatti al carrello per procedere all'ordine.</p>
          <router-link to="/">Torna al menu</router-link>
        </div>
        <!-- Carrello con contenuto -->
        <div v-else>
          <div v-for="(item, index) in cart" :key="item.id" class="mb-3">
            <div>
              <h4>{{ item.name }}</h4>
              <p>Prezzo: €{{ item.price }}</p>
            </div>
            <div class="d-flex align-items-baseline">
              <div class="mb-2">
                <!-- Modifica la quantità -->
                <input type="number" v-model.number="item.quantity" min="1" @change="updateCartItem(index)"
                  class="form-control" style="width: 80px;" />
              </div>
              <button @click="removeFromCart(index)" class="btn btn-danger">Rimuovi</button>
            </div>
            <p class="mb-3 fw-bold border-bottom">Totale per questo piatto: €{{ (item.price *
              item.quantity).toFixed(2) }}</p>
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

              <form @submit="submitOrder" :validation-schema="schema" method="post" autocomplete="off">

                <!-- Nome -->
                <div class="mb-3">
                  <label for="first_name" class="form-label">Nome</label>
                  <Field name="first_name" id="first_name" type="text" class="form-control" :rules="validateName" />
                  <ErrorMessage name="first_name" class="text-danger" />
                </div>

                <!-- Cognome -->
                <div class="mb-3">
                  <label for="last_name" class="form-label">Cognome</label>
                  <Field name="last_name" id="last_name" type="text" class="form-control" :rules="validateName" />
                  <ErrorMessage name="last_name" class="text-danger" />
                </div>

                <!-- Telefone -->
                <div class="mb-3">
                  <label for="phone_number" class="form-label">Telefone</label>
                  <Field name="phone_number" id="phone_number" type="text" class="form-control"
                    :rules="validatePhone" />
                  <ErrorMessage name="phone_number" class="text-danger" />
                </div>

                <!-- Endereço -->
                <div class="mb-3">
                  <label for="address" class="form-label">Endereço</label>
                  <Field name="address" id="address" type="text" class="form-control" />
                  <ErrorMessage name="address" class="text-danger" />
                </div>

                <!-- Email -->
                <div class="mb-3">
                  <label for="email" class="form-label">Email</label>
                  <Field name="email" id="email" type="email" class="form-control" :rules="validateEmail" />
                  <ErrorMessage name="email" class="text-danger" />
                </div>

                <input type="hidden" :value="totalAmount" />
                <button type="submit" class="btn btn-primary">Enviar</button>
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
}

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
</style>
