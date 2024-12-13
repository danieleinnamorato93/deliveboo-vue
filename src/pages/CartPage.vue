<script>
import axios from 'axios';
import { Field, ErrorMessage, Form } from 'vee-validate';
import * as yup from 'yup';

// const schema = yup.object({
//   first_name: yup.string().trim()
//     .min(3, 'Ilnome deve avere almeno 3 caratteri')
//     .transform((value) => {
//       return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
//     })
//     .required('Questo campo è obbligatorio'),

//   last_name: yup.string().trim()
//     .min(3, 'O sobrenome deve ter pelo menos 3 caracteres')
//     .transform((value) => {
//       return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
//     })
//     .required('Este campo é obrigatório'),

//   phone_number: yup.string().trim()
//     .required('Questo campo è obbligatorio')
//     .transform(value => value.replace(/\s+/g, ''))
//     .matches(
//       /^[0-9]{10}$/, // Espressione regolare per garantire che siano presenti solo 10 cifre numeriche
//       'Il numero di telefono deve essere composto solo da cifre (10 cifre)')
//     .matches(
//       /^3\d{9,10}$/, // Numero di cellulare italiano che inizia con "3" ed è lungo 9 o 10 cifre
//       'Il numero di telefono deve iniziare con "3" e deve avere 9 o 10 cifre, es. 3112224455'
//     ),

//   adress: yup.string().trim()
//     .required('Questo campo è obbligatorio')
//     .min(3, 'L\'indirizzo deve contenere almeno 3 caratteri')
//     .matches(
//       /\d/, // Espressione regolare per garantire che l'indirizzo contenga almeno un numero
//       'L\'indirizzo deve contenere almeno un numero'
//     ),

//   email: yup.string().email().required(),

// });

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

    schema() {
      return yup.object({
        first_name: yup.string().trim()
          .min(3, 'Il nome deve avere almeno 3 caratteri')
          .required('Questo campo è obbligatorio'),

        last_name: yup.string().trim()
          .min(3, 'Il cognome deve avere almeno 3 caratteri')
          .required('Questo campo è obbligatorio'),

        phone_number: yup.string().trim()
          .required('Questo campo è obbligatorio')
          .matches(/^[0-9]{10}$/, 'Il numero di telefono deve essere composto solo da cifre (10 cifre)'),

        address: yup.string().trim()
          .required('Questo campo è obbligatorio')
          .min(3, 'L\'indirizzo deve contenere almeno 3 caratteri')
          .matches(/\d/, 'L\'indirizzo deve contenere almeno un numero'),

        email: yup.string().email().required('Questo campo è obbligatorio')
      });
    }
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
    // validateName(value) {
    //   if (!value) {
    //     return 'Questo campo è obbligatorio';
    //   }

    //   if (value.length < 3) {
    //     return 'Il nome deve avere almeno 3 caratteri';
    //   }
    //   return true;
    // },

    // //Phone 
    // validatePhone(value) {
    //   const phoneRegex = /^3\d{9,10}$/; //iniziare com il numero 3, avere entro 9,10 carattere
    //   if (!value) {
    //     return 'Questo campo è obbligatorio';
    //   }

    //   if (!phoneRegex.test(value)) {
    //     return 'Numero di cellulare non valido. Usa il formato corretto (es. 3201234567).';
    //   }

    //   return true;
    // },

    // //Adress
    // validateAddress(value) {
    //   const addressRegex = /\d/; //avere al meno 1 numero
    //   if (!value) {
    //     return 'Questo campo è obbligatorio';
    //   }
    //   if (!addressRegex.test(value)) {
    //     return 'L\'indirizzo deve contenere almeno un numero'; // Mensagem de erro se não houver números no endereço
    //   }
    //   return true;
    // },


    //   //Email
    //   validateEmail(value) {
    //     const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //     // if the field is empty
    //     if (!value) {
    //       return 'Questo campo è obbligatorio';
    //     }
    //     // if the field is not a valid email
    //     if (!regex.test(value)) {
    //       return 'Questo campo deve essere un indirizzo email valido, com @ e "."';
    //     }
    //     // All is good
    //     return true;
    //   },
    // },
    onInvalidSubmit({ values, errors, results }) {
      console.log(values); // current form values
      console.log(errors); // a map of field names and their first error message
      console.log(results); // a detailed map of field names and their validation results
    },

    // Invia l'ordine al server Laravel
    submitOrder() {
      this.$refs.form.validate().then((isValid) => {
        if (isValid) {
          this.order.total = this.totalAmount;
          const orderData = {
            first_name: this.order.first_name,
            last_name: this.order.last_name,
            email: this.order.email,
            phone_number: this.order.phone_number,
            address: this.order.address,
            total: this.totalAmount,
            items: this.cart.map(item => ({
              plate_id: item.id,
              quantity: item.quantity
            }))
          };

          // inviare dati della ordine al backend
          axios.post('http://127.0.0.1:8000/api/orders', orderData)
            .then(() => {
              alert('Ordine completato con successo!');
              localStorage.removeItem('cart');
              this.cart = [];
              this.$router.push('/'); // Redireciona para a homepage
            })
            .catch(error => {
              console.error('Erro durante l\'invio dell\'ordine:', error);
              alert('Errore durante l\'invio. Riprova.');
            });
        } else {
          alert('Per favore, aggiuste i errore del formulario');
        }
      });
    }
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

              <form ref="form" @submit="submitOrder" :validation-schema="schema" method="post" autocomplete="off" @invalid-submit="onInvalidSubmit">

                <!-- Nome -->
                <div class="mb-3">
                  <label for="first_name" class="form-label">Nome</label>
                  <Field name="first_name" id="first_name" type="text" class="form-control" />
                  <ErrorMessage name="first_name" class="text-danger" />
                </div>

                <!-- Cognome -->
                <div class="mb-3">
                  <label for="last_name" class="form-label">Cognome</label>
                  <Field name="last_name" id="last_name" type="text" class="form-control" />
                  <ErrorMessage name="last_name" class="text-danger" />
                </div>

                <!-- Contatto -->
                <div class="mb-3">
                  <label for="phone_number" class="form-label">Contatto</label>
                  <Field name="phone_number" id="phone_number" type="text" class="form-control" />
                  <ErrorMessage name="phone_number" class="text-danger" />
                </div>

                <!-- Indirizzo -->
                <div class="mb-3">
                  <label for="address" class="form-label">Indirizzo</label>
                  <Field name="address" id="address" type="text" class="form-control" />
                  <ErrorMessage name="address" class="text-danger" />
                </div>

                <!-- Email -->
                <div class="mb-3">
                  <label for="email" class="form-label">Email</label>
                  <Field name="email" id="email" type="email" class="form-control" />
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
