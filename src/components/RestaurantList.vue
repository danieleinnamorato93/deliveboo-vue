<script>
import RestaurantCard from "./RestaurantCard.vue";
import axios from "axios";
import { store } from "../js/store.js";
import { RouterLink } from "vue-router";

export default {
  data() {
    return {
      store,
      apiRestaurants: "http://127.0.0.1:8000/api/restaurants",
      currentFilters: [],
      apiTypes: "http://127.0.0.1:8000/api/types",
      lastPageNumber: 1,
      currentPageNumber: 1,
      restaurants: [],
    };
  },
  components: {
    RestaurantCard,
  },

  methods: {
    getRestaurants(pageNumber) {
      console.log('chiamata axios iniziata')
      axios.get(this.apiRestaurants, {
        params: {
          page: pageNumber
        }
      })
        .then((response) => {

          store.restaurantsList = [...response.data.results.data];
          this.lastPageNumber = response.data.results.last_page;
          this.currentPageNumber = pageNumber;
          console.log("Ristoranti:", store.restaurantsList);
        })
        .catch((error) => {
          console.error("Errore nel caricamento dei ristoranti:", error);
        });
    },

    updateCurrentFilters() {
      this.currentFilters = [];
      store.clickedTypes.forEach((typeID, index) => {
        this.currentFilters.push({
          array: `[${index}]`,
          id: typeID,
          filterType: '[$in]',
        });
      });

    },
    getFilteredRestaurants() {
      store.filteredRestaurants = [];
      this.updateCurrentFilters()
      const filtersQuery = this.currentFilters.map((filter, index) => {
        return `filters[$and][${index}][types][id]${filter.filterType}=${filter.id}`;
      }).join('&')
      let apiFilters = `${this.apiRestaurants}?${filtersQuery}`;

      axios.get(apiFilters)
        .then((response) => {
          store.filteredRestaurants = [...response.data.results.data];
        })
        .catch((error) => {
          console.error("Errore nel caricamento dei ristoranti:", error);
        });
    },

    getTypes() {
      axios
        .get(this.apiTypes)
        .then((response) => {
          store.typesList = response.data.results;
          console.log("Tipologie:", store.typesList);
        })
        .catch((error) => {
          console.error("Errore nel caricamento delle tipologie:", error);
        });
    },

    previusPage() {
      if (this.currentPageNumber > 1) {
        this.currentPageNumber--;
        this.getRestaurants(this.currentPageNumber);
      }
    },
    nextPage() {
      if (this.currentPageNumber < this.lastPageNumber) {
        this.currentPageNumber++;
        this.getRestaurants(this.currentPageNumber);
      }
    }
  },

  computed: {
    displayedRestaurants() {
      const restaurants = store.clickedTypes.length > 0 ? store.filteredRestaurants : store.restaurantsList;
      if (Array.isArray(restaurants)) {
        return restaurants
      }
      return [];
    },

    // disabilito i bottone delle paginazione
    firstPage() {
      return this.currentPageNumber === 1;
    },
    lastPage() {
      return this.currentPageNumber >= this.lastPageNumber;
    }

  },

  watch: {
    "store.clickedTypes": {
      handler() {
        this.getFilteredRestaurants();
      },
      deep: true,
    },
  },

  created() {
    this.getRestaurants(1);
    this.getTypes();
  },
}

</script>
<template>
<section id="restaurant-cards">
  <div class="container">
    <h3 class="mb-4">I migliori ristoranti, a un clic di distanza.</h3>
    <section>
      <div class="row">
        <div v-if="store.clickedTypes.length > 0" class="col-12 my-2 fw-bold">Ristoranti trovati: <p
            class="fs-5 d-inline">
            {{ store.filteredRestaurants.length }}</p>
        </div>
        <div v-for="restaurant in displayedRestaurants" :key="restaurant.id" class="col-6 col-md-3">
          <RouterLink class="text-decoration-none" :to="{ name: 'singleRestaurant', params: { id: restaurant.id } }">
            <RestaurantCard :restaurantObject="restaurant" />
          </RouterLink>
        </div>
      </div>
    </section>
    <section>
        <div class="d-flex justify-content-center gap-2 mb-3">
            <button class="btn btn-outline-dark fs-5" @click="previusPage" :class="{ 'disabled': firstPage }">
              <font-awesome-icon icon="arrow-left" /></button>

            <button class="btn btn-outline-dark fs-5" @click="nextPage" :class="{ 'disabled': lastPage }">
              <font-awesome-icon icon="arrow-right" /></button>
        </div>
    </section>
  </div>
</section>
</template>

<style scoped lang="scss">

</style>
