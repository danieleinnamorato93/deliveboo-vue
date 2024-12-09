<script>
import { store } from '../js/store';
export default {
  data() {
    return {
      store,
    }
  },
  methods: {
    getTypeId(typeId) {
      // cerca indice typeid
      const index = store.clickedTypes.indexOf(typeId);
      // Se non è presente, aggiungilo
      if (index === -1) {
        store.clickedTypes.push(typeId);
        console.log('tutto ok visto',typeId);
        console.log(store.clickedTypes);

      } else {
        // Se è presente, rimuovilo
        store.clickedTypes.splice(index, 1);
      }
    },
  },
}
</script>

<template>
  <div id="app">
    <div id="categoryCarousel" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-inner">
        <div v-for="(type, index) in store.typesList" :key="index" :class="['carousel-item', { active: index === 0 }]" @click="getTypeId(type.id)">
          <div class="d-flex justify-content-center">
            <div class="text-center mx-2">
              <img :src="type.logo" class="rounded-circle" :alt="type.name" width="100">
              <p>{{ type.name }}</p>
            </div>
          </div>
        </div>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#categoryCarousel" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#categoryCarousel" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.carousel-item{
  background-color: blue;
}
.carousel-item img {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
