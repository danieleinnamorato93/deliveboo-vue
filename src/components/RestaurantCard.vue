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
  <div class="card mb-3" style="max-width: 540px">
    <div class="row g-0">
      <div class="col-md-4">
        <img src="../../public/1600w-9Gfim1S8fHg.webp" class="img-fluid rounded-start" alt="..." />
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">{{ restaurantObject.name }}</h5>

          <div v-for="(type, index) in restaurantObject.types" :key="index">
            <span class="badge rounded-pill text-bg-danger m-1">
              <h6 class="card-text">{{ type.name }}</h6>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.card {
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  width: 700px;
  transition: border 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    border: 3px solid #fc7a1e;
    box-shadow: 0 0 10px rgba(94, 47, 3, 0.7);
    transform: scale(1.05);
  }
}

.card-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
