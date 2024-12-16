<script>
import { RouterLink } from "vue-router";

export default {
  data() {
    return {};
  },
};
</script>

<template>
  <div class="flud-container bg-img-container">
    <div class="row d-flex justify-content-center align-items-center">
      <div class="col-12 text-center">
        <h1 class="mt-4 highlighted-text">
          Grazie dell'ordine effettuato. A breve riceverai una email con tutti i
          dettagli!
        </h1>
        <h3 class="mt-5 highlighted-text">
          Se hai dubbi, non esitare a contattarci
        </h3>
        <RouterLink to="/">
          <button class="btn btn-primary mt-4">Torna alla home</button>
        </RouterLink>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.bg-img-container {
  background-color: #fae7d3;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  h1 {
    font-size: 3rem;
    font-weight: bold;
  }
}

.highlighted-text {
  color: #ffffff;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.9);
}

button {
  font-size: 1rem;
  padding: 12px 30px;
  border-radius: 5px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
}
</style>
