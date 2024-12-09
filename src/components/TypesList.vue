<script>
import { store } from '../store';
export default {
  data() {
    return {
      store,
      clickedType = [],
      currentIndex = 0,
    }
  },
  methods: {
    showSingleType(typeId) {
      this.$router.push({ name: 'types.show', params: { id: typeId } })
    }
  }
}
</script>

<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <div id="carouselExample" class="carousel slide" v-for="type in store.TypesList" 
        :key="type.id"
        @click="showSingleType(type.id)">
          <div class="carousel-inner">
            <div class="carousel-item">
              <img src="..." class="d-block w-100" alt="..." />
            </div>
          </div>
          <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
