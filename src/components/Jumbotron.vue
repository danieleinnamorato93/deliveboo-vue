<script>
export default {
  data() {
    return {};
  },
};
</script>

<template>
  <div class="jumbo">
    <div class="overlay"></div>
  </div>
</template>

<style scoped>
.jumbo {
  position: relative;
  min-height: 540px;

  background-image: url("../assets/imgs/pexels-horizon-content-2100060-3738730.jpg");
  background-position: center;
  background-size: cover;
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
</style>
