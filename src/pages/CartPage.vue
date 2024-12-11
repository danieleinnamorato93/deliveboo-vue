<script>
export default {
  data() {
    return {
      cart: JSON.parse(localStorage.getItem('cart')) || [],  // Carica il carrello dal localStorage
      order: {
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        address: '',
        total: 0,
        paymentMethod: 'cash'
      }
    };
  },
}
</script>
<template>
  <h1>Ciao sono il carrello</h1>
</template>

<style scoped lang="scss"></style>