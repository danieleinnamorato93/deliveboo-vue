<template>
  <div class="container-fluid footer text-white">
    <div class="row justify-content-center py-4 text-center">
      <div class="col-md-3">
        <h5 class="fw-bold">Link Utili</h5>
        <ul class="list-unstyled">
          <li><a href="#" class="text-white text-decoration-none">Home</a></li>
          <li>
            <RouterLink to="/carrello">
              <a href="" class="text-white text-decoration-none">Carrello</a>
            </RouterLink>
          </li>
          <li>
            <a
              href="http://127.0.0.1:8000/login"
              class="text-white text-decoration-none"
              >Sei un ristoratore?</a
            >
          </li>
        </ul>
      </div>

      <div class="col-md-3">
        <h5 class="fw-bold">Metodi di pagamento</h5>
        <ul class="list-unstyled">
          <li>Visa</li>
          <li>Mastercard</li>
          <li>Amex</li>
        </ul>
      </div>

      <div class="col-md-3">
        <h5 class="fw-bold">Info Legali</h5>
        <ul class="list-unstyled">
          <li>
            <a href="#" class="text-white text-decoration-none"
              >Privacy Policy</a
            >
          </li>
          <li>
            <a href="#" class="text-white text-decoration-none"
              >Termini e Condizioni</a
            >
          </li>
        </ul>
        <h5 class="fw-bold mt-3">Lavora con Noi</h5>
        <a href="#" class="text-white text-decoration-none"
          >Scopri le opportunità</a
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style scoped>
.footer {
  background-color: #6b717e;
  height: 230px;
}
.footer h5 {
  margin-bottom: 15px;
}
.footer i {
  color: white;
}
.text-center {
  text-align: center;
}
</style>
