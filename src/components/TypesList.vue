<script>
import { store } from '../js/store';
export default {
  data() {
    return {
      store,
      currentIndex: 0, // Indice dell'elemento corrente
      thumbnailsPerPage: 6, // Numero di thumbnails da visualizzare per volta 
    }
  },
  computed: {
    // Calcola la porzione di thumbnails visibili basandosi su currentIndex
    visibleThumbnails() {
      return store.typesList.slice(this.currentIndex, this.currentIndex + this.thumbnailsPerPage);
    },
  },
  methods: {
    getTypeId(typeId) {
      // cerca indice typeid
      const index = store.clickedTypes.indexOf(typeId);
      // Se non è presente, aggiungilo
      if (index === -1) {
        store.clickedTypes.push(typeId);
        console.log('tutto ok visto', typeId);
        console.log(store.clickedTypes);

      } else {
        // Se è presente, rimuovilo
        store.clickedTypes.splice(index, 1);
      }
    },
    getImage(img) {
      // URL absoluta para o Laravel
      return img ? `http://127.0.0.1:8000${img}` : '';
    },
    prev() {
      if (this.currentIndex <= 0) {
        this.currentIndex = store.typesList.length - this.thumbnailsPerPage; 
      } else {
        this.currentIndex -= 1; 
      }
    },
    next() {
      if (this.currentIndex + this.thumbnailsPerPage >= store.typesList.length) {
        this.currentIndex = 0; 
      } else {
        this.currentIndex += 1; 
      }
    },
  }
}
</script>
<template>
  <section id="carousel-types" class="container-fluid">
    <div class="row">
      <div class="col-12">
        <div class="thumbnails-wrapper">
          <button class="btn prev" @click="prev">prima</button>
          <div class="thumbnails d-flex">
            <article v-for="type in visibleThumbnails" :key="type.id" class="thumbnail"
              :class="{ 'active': store.clickedTypes.includes(type.id) }" @click="getTypeId(type.id)">
              <img :src="getImage(type.logo)" :alt="type.name" class="adaptive-cover">
              <h4>{{ type.name }}</h4>
            </article>
          </div>
          <button class="btn next" @click="next">dopo</button>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.thumbnails-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  .thumbnails {
    display: flex;
    overflow: hidden;
    justify-content: flex-start;
    gap: 10px;

    article.thumbnail {
      width: 200px;
      height: 200px;
      cursor: pointer;

      img.adaptive-cover {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .btn {
      position: absolute;
      top: 50%;
      z-index: 1;
      color: #fff;
      font-size: 2rem;
      padding: 10px;
      cursor: pointer;

      &.prev {
        left: 0;
      }

      &.next {
        right: 0;
      }
    }
  }
}
</style>
