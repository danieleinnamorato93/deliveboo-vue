<script>
import { RouterLink } from "vue-router";
import { store } from "../js/store.js";

export default {
  data() {
    return {
      store,
    };
  },
  props: {
    restaurantObject: {
      type: Object,
      required: true,
    },
  },
};
</script>

<template>
  <div class="card mb-2 p-2" style="width: 18rem;">
    <h5 class="card-title">{{ restaurantObject.name }}</h5>
    <p class="card-text">{{ restaurantObject.address }}</p>
    <div
      v-for="(type, index) in restaurantObject.types"
      :key="index"
      class="d-flex mb-1"
    >
      <span class="badge rounded-pill text-bg-danger">
        {{ type.name }}
      </span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.card {
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  transition: border 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    border: 3px solid #fc7a1e;
    box-shadow: 0 0 10px rgba(94, 55, 3, 0.7);
    transform: scale(1.05);
  }
}
</style>
