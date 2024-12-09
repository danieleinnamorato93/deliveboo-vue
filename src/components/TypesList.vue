<script>
export default {
  data() {
    return {};
  },
};
</script>

<template>
  <div id="carouselExample" class="carousel slide">
    <div class="carousel-inner">
      <div class="carousel-item active">
        <img src="..." class="d-block w-100" alt="..." />
      </div>
      <div class="carousel-item">
        <img src="..." class="d-block w-100" alt="..." />
      </div>
      <div class="carousel-item">
        <img src="..." class="d-block w-100" alt="..." />
      </div>
    </div>
    <button
      class="carousel-control-prev"
      type="button"
      data-bs-target="#carouselExample"
      data-bs-slide="prev"
    >
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button
      class="carousel-control-next"
      type="button"
      data-bs-target="#carouselExample"
      data-bs-slide="next"
    >
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>
</template>

<style lang="scss" scoped>
.card {
  width: 200px;
}

h4 {
  margin-top: 10px;
  color: #ffa62b;
}

figure {
  padding: 10px;
  text-align: center;
  margin-bottom: 0;
  img {
    height: 100px;
  }
}
</style>
