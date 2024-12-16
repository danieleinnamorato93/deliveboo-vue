<script>
import { RouterLink } from "vue-router";

export default {
  data() {
    return {};
  },
};
</script>

<template>
  <div class="container bg-img-container">
    <div class="row">
      <div class="col-12 text-center">
        <h1 class="mt-4">
          Grazie dell'ordine effettuato. A breve riceverai una email con tutti i
          dettagli!
        </h1>
        <h3 class="mt-5">Se hai dubbi, non esitare a contattarci</h3>
        <RouterLink to="/"
          ><button class="btn btn-primary">Torna alla home</button></RouterLink
        >
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.bg-img-container {
  background-image: url("");
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  min-height: 100vh;
  justify-content: center;
  align-items: center;
  color: red;
  text-align: center;
}
</style>
