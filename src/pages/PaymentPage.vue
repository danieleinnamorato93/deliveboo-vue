<script>
import axios from 'axios';
export default {
  data() {
    return {};
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
    setBraintreeContainer(token) {
      //documentazione: https://developer.paypal.com/braintree/docs/start/hello-client/javascript/v3/
      window.braintree.dropin.create({
        authorization: token,
        container: document.getElementById('dropin-container'),
      }).then((dropinInstance) => {
        console.log('Braintree is working', dropinInstance);
      }).catch((error) => {
        console.error('BrainTree is not working properly!', error);
      });

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
        <div id="dropin-container">

        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
