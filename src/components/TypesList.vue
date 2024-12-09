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
      } else {
        // Se è presente, rimuovilo
        store.clickedTypes.splice(index, 1);
      }
    },
  },
}
</script>

<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12" v-for="type in store.typesList" :key="type.id">
        <div :id="'carousel-' + type.id" class="carousel slide">
          <div class="carousel-inner">
            <div class="carousel-item" :class="{ active: index === 0 }">
              <img src="..." class="d-block w-100" alt="..." @click="getTypeId(type.id)" />
            </div>
          </div>
          <button class="carousel-control-prev" type="button" data-bs-target="'#carousel-' + type.id"
            data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="'#carousel-' + type.id"
            data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
