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
      filters: [],
      apiTypes: "http://127.0.0.1:8000/api/types",
      lastPageNumber: 1,
      currentPageNumber: 1
    };
  }, 
  components: {
    RestaurantCard,
  },

  methods: {

    addFilters() {
      this.filters = this.clickedTypes.map((typeID, index) => {
        return {
          array: `[${index}]`,
          id: typeID,
          filterType: '[$in]',
        };
      });
      console.log('Filters:', this.filters);
    },

    getRestaurants(pageNumber) {
      console.log('chiamata axios iniziata')
      axios.get(this.apiRestaurants, {
        params: {
          page: pageNumber
        }
      })
        .then((response) => {
          
          store.restaurantsList = response.data.results.data;
          this.lastPageNumber = response.data.results.last_page;
          this.currentPageNumber = pageNumber;
          console.log("Ristoranti:", store.restaurantsList);
        })
        .catch((error) => {
          console.error("Errore nel caricamento dei ristoranti:", error);
        });
    },
// rivedi dove usarla in questa pagina
    
    getFilteredRestaurants() {
      this.addFilters()
      this.currentFilters.push(...this.filters);

      const filtersQuery = this.currentFilters.map((filter, index) => {
        return `filters[$and][${index}][types][id]${filter.filterType}=${filter.id}`;
      }).join('&')

      console.log('Filters Query:', filtersQuery);
      
      axios
        .get(`${this.apiRestaurants}?${filtersQuery}`)
        .then((response) => {
          store.clickedTypes = response.data.results;
          console.log("Filtered Ristoranti:", store.clickedTypes);
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

    showRestaurantTypes() {
      store.filteredRestaurants = store.restaurantsList.filter((restaurant) => {
        for (let type of restaurant.types) {
          if (store.clickedTypes.includes(type.id)) {
            return true;
          }
        }
        return false;
      });
      console.log("Ristoranti filtrati:", store.filteredRestaurants);
    },

    // bottone della paginazione delle card ristorant
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
      if (store.clickedTypes.length > 0 ) {
        return store.filteredRestaurants;
      }
      return store.restaurantsList;
    },

    // disabilito i bottone delle paginazione
    firstPage(){
      return this.currentPageNumber === 1;
    },
    lastPage(){
      return this.currentPageNumber >= this.lastPageNumber;
    }

  },

  watch: {
    "store.clickedTypes": {
      handler() {
        this.showRestaurantTypes();
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
  <div class="container">
    <section>
      <div class="row">
        <div v-for="restaurant in displayedRestaurants" :key="restaurant.id" class="col-6 col-md-4">
          <RouterLink class="text-decoration-none" :to="{ name: 'singleRestaurant', params: { id: restaurant.id } }">
            <RestaurantCard :restaurantObject="restaurant" />
          </RouterLink>
        </div>
      </div>
    </section>
    <section>
      <nav>
        <ul class="list_unstyled d-flex justify-content-center gap-2">
          <li>
            <button class="btn btn-outline-dark" @click="previusPage" :class="{ 'disabled' : firstPage}"><< Prev</button>
          </li>
          <li>
            <button class="btn btn-outline-dark" @click="nextPage" :class="{ 'disabled' : lastPage}">Next >></button>
          </li>
        </ul>
      </nav>
    </section>
  </div>

</template>

<style scoped lang="scss">
ul {
  list-style-type: none;
}
</style>
