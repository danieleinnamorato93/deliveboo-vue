<script>
import { store } from "../js/store";
export default {
  data() {
    return {
      store,
      currentIndex: 0, // Indice dell'elemento corrente
      thumbnailsPerPage: 6, // Numero di thumbnails da visualizzare per volta
    };
  },
  computed: {
    // Calcola la porzione di thumbnails visibili basandosi su currentIndex
    visibleThumbnails() {
      return store.typesList.slice(
        this.currentIndex,
        this.currentIndex + this.thumbnailsPerPage
      );
    },
  },
  methods: {
    getTypeId(typeId) {
      // cerca indice typeid
      const index = store.clickedTypes.indexOf(typeId);
      // Se non è presente, aggiungilo
      if (index === -1) {
        store.clickedTypes.push(typeId);
        console.log("tutto ok visto", typeId);
        console.log(store.clickedTypes);
      } else {
        // Se è presente, rimuovilo
        store.clickedTypes.splice(index, 1);
      }
    },
    getImage(img) {
      // URL absoluta para o Laravel
      return img ? `http://127.0.0.1:8000${img}` : "";
    },
    prev() {
      if (this.currentIndex <= 0) {
        this.currentIndex = store.typesList.length - this.thumbnailsPerPage;
      } else {
        this.currentIndex -= 1;
      }
    },
    next() {
      if (
        this.currentIndex + this.thumbnailsPerPage >=
        store.typesList.length
      ) {
        this.currentIndex = 0;
      } else {
        this.currentIndex += 1;
      }
    },
  },
};
</script>
<template>
  <section id="carousel-types" class="container-fluid mt-5">
    <div class="row">
      <div class="col-12">
        <div class="thumbnails-wrapper">
          <button class="btn prev" @click="prev">⬅️</button>
          <div class="thumbnails d-flex">
            <article
              v-for="type in visibleThumbnails"
              :key="type.id"
              class="thumbnail"
              :class="{ active: store.clickedTypes.includes(type.id) }"
              @click="getTypeId(type.id)"
            >
              <img
                :src="getImage(type.logo)"
                :alt="type.name"
                class="adaptive-cover"
              />
              <div>
                <h6 class="fw-bold">{{ type.name }}</h6>
              </div>
            </article>
          </div>
          <button class="btn next" @click="next">➡️</button>
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
  margin: 50px;

  .thumbnails {
    display: flex;
    overflow: hidden;
    justify-content: flex-start;
    gap: 20px;

    article.thumbnail {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 200px;
      height: 250px;
      cursor: pointer;
      text-align: center;
      margin: 15px;

      img.adaptive-cover {
        width: 100%;
        height: 200px;
        object-fit: cover;
        margin-bottom: 30px;
        border-radius: 15px;
        transition: transform 0.3s ease, box-shadow 0.6s ease;
      }
      &.active {
        border: 3px solid #ff9800;
        box-shadow: 0 0 6px rgba(255, 152, 0, 0.7);
        border-radius: 15px;
        transform: scale(1.1);
      }
      :hover {
        transform: scale(1.1);
      }
    }

    .btn {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
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
