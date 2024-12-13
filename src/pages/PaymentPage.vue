<script>
import axios from 'axios';
export default {
  data() {
    return {
      dropinInstance: null,
      nonce: '',
      deviceDataInput:null,
    }
  },
  mounted() {
    let brainTreeScript = document.createElement('script');
    brainTreeScript.setAttribute('src', 'https://js.braintreegateway.com/web/dropin/1.43.0/js/dropin.min.js');
    document.head.appendChild(brainTreeScript);

    // speriamo che carichi la roba sopra dopo un secondo!
    setTimeout(this.setBrainTree, 1000);
  },
  methods: {
    setBrainTree() {
      axios.get('http://127.0.0.1:8000/api/braintree-token')
        .then((response) => {
          this.setBraintreeContainer(response.data);
        })
        .catch((error) => {
          console.error(error);
          alert('Ops, si è rotto! Riprova più tardi');
        });
    },
    performTransaction(){
      const transactionData ={
        orderId: this.$route.params.orderId,
        payment_method_nonce: this.nonce,
        device_data: this.deviceDataInput.value,
      }
      axios.post('http://127.0.0.1:8000/api/braintree-transaction',transactionData)
        .then((response) => {
          console.log("transaction response", response);

          if (response && response.data && response.data.success) {
            // alert("pagamento effettuato con successo!");
            // qui dovremo fare redirect alla pagina di thank-you
            // per l'ordine con questo ID
            this.$router.push(`/checkout/${this.$route.params.orderId}`);
          } else {
            alert("pagamento rifiutato");
          }

        })
        .catch((error) => {
          console.error("transaction error", error);
          alert('Ops, si è rotto! Riprova più tardi');
        });
    },
    setBraintreeContainer(token) {
      //documentazione: https://developer.paypal.com/braintree/docs/start/hello-client/javascript/v3/
      window.braintree.dropin.create({
        authorization: token,
        container: document.getElementById('dropin-container'),
        dataCollector: true,
      }).then((dropinInstance) => {
        const form = document.getElementById('payment-form');
        this.dropinInstance = dropinInstance;

        if (this.deviceDataInput == null) {
          this.deviceDataInput = document.createElement('input');
          this.deviceDataInput.name = 'device_data';
          this.deviceDataInput.type = 'hidden';
          form.appendChild(this.deviceDataInput);
        }
        console.log('Braintree is working', this.dropinInstance);
      }).catch((error) => {
        console.error('BrainTree is not working properly!', error);
      });

    },
    handlePayment(event) {
      event.preventDefault();
      console.log('gestione pagamento', event);
      this.dropinInstance.requestPaymentMethod().then((payload) => {
        // Step four: when the user is ready to complete their
        //   transaction, use the dropinInstance to get a payment
        //   method nonce for the user's selected payment method, then add
        //   it a the hidden field before submitting the complete form to
        //   a server-side integration
        this.nonce = payload.nonce;
        this.deviceDataInput.value = payload.deviceData;
        this.performTransaction();
      }).catch((error) => { throw error; });
    }
  }
}
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <h1 class="text-center">Pagamento per ordine con numero: {{ $route.params.orderId }}</h1>
      </div>
      <div class="col-12">
        <form id="payment-form" @submit="handlePayment">
          <!-- Putting the empty container you plan to pass to 'braintree.dropin.create' inside a form will make layout and flow
      easier to manage -->
          <div id="dropin-container"></div>
          <input type="submit" />
          <input type="hidden" id="nonce" :value="nonce" name="payment_method_nonce" />
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
</style>
