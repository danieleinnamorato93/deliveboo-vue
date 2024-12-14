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
      apiTypes: "http://127.0.0.1:8000/api/types",
    };
  },
  components: {
    RestaurantCard,
  },
  methods: {
    getRestaurants(pageNumber) {
      console.log('chiamata axios iniziata')
      axios.get(this.apiRestaurants, {
        params:{
          page: pageNumber
        }
      })
        .then((response) => {
          console.log(response.data.results.data);
          store.restaurantsList = response.data.results.data;
          console.log("Ristoranti:", store.restaurantsList);
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
  },
  computed: {
    displayedRestaurants() {
      if (store.clickedTypes.length > 0) {
        return store.filteredRestaurants;
      }
      return store.restaurantsList;
    },
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
};
</script>
<template>
  <div class="container">
    <div class="row">
      <div v-for="restaurant in displayedRestaurants" :key="restaurant.id" class="col-6 col-md-4">
        <RouterLink class="text-decoration-none" :to="{ name: 'singleRestaurant', params: { id: restaurant.id } }">
          <RestaurantCard :restaurantObject="restaurant" />
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
ul {
  list-style-type: none;
}
</style>
