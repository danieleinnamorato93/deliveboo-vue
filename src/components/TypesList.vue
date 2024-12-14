<template>
  <section id="carousel-types" class="container-fluid mt-5">
    <!-- Titolo della sezione -->
    <h3 class=" mt-3 fw-bold text-wrap text-center fs-5 fs-md-4 fs-lg-3">Hai fame? <br> il ristorante perfetto per te e ordina subito!</h3>

    <div class="row justify-content-center">
      <div class="col-12 col-lg-10">
        <div class="thumbnails-wrapper d-flex align-items-center">
          <!-- Pulsante precedente -->
          <button class="btn btn-outline-danger me-4 fs-5 d-md-block" @click="prev" aria-label="Previous">
            &lsaquo;
          </button>

          <!-- Miniature -->
          <div class="thumbnails row w-100 g-3">
            <div v-for="type in visibleThumbnails" :key="type.id" class="col-8 col-md-4 col-lg-2">
              <article class="thumbnail d-flex flex-column align-items-center text-center"
                :class="{ active: store.clickedTypes.includes(type.id) }" @click="getTypeId(type.id)">
                <img :src="getImage(type.logo)" :alt="type.name" class="adaptive-cover img-fluid rounded" />
                <div class="mt-2">
                  <h6 class="fw-bold">{{ type.name }}</h6>
                </div>
              </article>
            </div>
          </div>

          <!-- Pulsante successivo -->
          <button class="btn btn-outline-danger ms-4 fs-5 d-md-block" @click="next" aria-label="Next">
            &rsaquo;
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { store } from "../js/store";

export default {
  data() {
    return {
      store,
      currentIndex: 0, // Indice dell'elemento corrente
      thumbnailsPerPage: 5, // Numero di thumbnails da visualizzare per volta
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
  mounted() {
    this.updateThumbnailsPerPage();
    window.addEventListener("resize", this.updateThumbnailsPerPage);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.updateThumbnailsPerPage);
  },
  methods: {
    updateThumbnailsPerPage() {
      const width = window.innerWidth;
      if (width >= 992) this.thumbnailsPerPage = 5; // Desktop
      else if (width >= 768) this.thumbnailsPerPage = 4; // Tablet
      else this.thumbnailsPerPage = 2; // Mobile
    },
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

<style lang="scss" scoped>
h3 {
  color: #f24c00;
  font-weight: bold;
  margin-top: 20px;
}

h6 {
  color: #333333;
}

h5 {
  color: darkslategray;
}

.thumbnails-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  margin-bottom: 50px;
  margin-top: 50px;

  .thumbnails {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;

    article.thumbnail {
      display: flex;
      flex-direction: column;
      align-items: center;
      max-width: 100%;
      cursor: pointer;
      text-align: center;
      border: 3px solid transparent;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      border-radius: 15px;

      &.active {
        border-color: #fc7a1e;
        box-shadow: 0 0 8px rgba(155, 78, 6, 0.7);
        transform: scale(1.1);
      }

      &:hover {
        transform: scale(1.05);
      }

      img.adaptive-cover {
        width: 100%;
        height: 170px;
        object-fit: cover;
        margin-bottom: 10px;
        border-radius: 15px;
        box-shadow: 0 0 4px rgba(48, 20, 2, 0.7);
      }
    }

    .btn {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      color: #faf6f6;
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
