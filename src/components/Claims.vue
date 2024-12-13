<script>
export default {
  data() {
    return {};
  },
};
</script>

<template>
  <div class="claim-container text-center">
    <h1 class="claim">Dalla cucina alla tua tavola, un viaggio di gusto</h1>
  </div>
  <h3 class="text-center call">
    Hai fame? Scegli il ristorante perfetto per te e ordina subito!
  </h3>
</template>

<style lang="scss" scoped>
.claim-container {
  height: 110px;
  background-color: #fae7d3;
  display: flex;
  justify-content: center;
  align-items: center;
  .claim {
    font-size: 3.3rem;
    color: #333333;
  }
}
.call {
  margin-top: 20px;
  font-size: 2.1rem;
  font-weight: bolder;
}
</style>
