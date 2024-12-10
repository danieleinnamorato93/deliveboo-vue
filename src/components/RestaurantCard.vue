<script>
import { RouterLink } from 'vue-router';
import { store } from '../js/store.js'

export default {
  data() {
    return {
      store,
    }
  },
  props: {
    restaurantObject: {
      type: Object, required: true,
    }

  },
}
</script>

<template>
  <div class="card mb-3">
    <div class="row g-0">
      <!-- <div class="col-md-4">
      <img src="" class="img-fluid rounded-start" alt="...">
    </div> -->
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">{{ restaurantObject.name }}</h5>
          <h5 class="card-text">{{ restaurantObject.types[0].name }}</h5>
          <p class="card-text">Descrizione: {{ restaurantObject.types[0].description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.card {
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  width: 600px;
}
</style>