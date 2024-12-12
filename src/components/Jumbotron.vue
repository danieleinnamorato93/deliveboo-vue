<script>
export default {
  data() {
    return {};
  },
};
</script>

<template>
  <main>
    <section class="container-fluid jumbotron">
      <div class="row">
        <div class="col-12">
          <img
            class="jumbo-img"
            src="../assets/imgs/pexels-horizon-content-2100060-3738730.jpg"
            alt="jumbo-deliveboo"
          />
          <div class="overlay">
            <div class="claim">
              <h1>Dalla cucina al tuo tavolo, un viaggio di gusto</h1>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style lang="scss" scoped>
.jumbotron {
  position: relative;
  height: 600px;
  overflow: hidden;
  padding: 0px;

  .jumbo-img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
  h1 {
    color: #f25c00;
  }

  .overlay {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      0deg,
      transparent 0,
      transparent 65%,
      rgba(0, 0, 0, 0.5)
    );
  }
  .claim.h1 {
    position: absolute;
    left: 0;
    top: 0;
  }
}
</style>
