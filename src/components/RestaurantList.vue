<script>
import RestaurantCard from "./RestaurantCard.vue";
import axios from "axios";
import {store} from '../js/store.js'

export default {
  data() {
    return {
      store,
      apiRestaurants:'http://127.0.0.1:8000/api/restaurants',
      apiTypes:'http://127.0.0.1:8000/api/types',
    };
  },

  components: {
    RestaurantCard,
  },

  methods: {
          //chiamata principale per ottenere la lista dei ristoranti
    getRestaurants (){
      axios.get(this.apiRestaurants)
        .then((response) => {
        store.restaurantsList = response.data.results;
        console.log('ristoranti:',store.restaurantsList);
        })
      },

      // chiamata per ottenere le tipologie dei ristoranti
    getTypes (){
      axios.get(this.apiTypes)
        .then((response)=> {
        store.typesList = response.data.results;
        console.log('tipi:',store.typesList)
        })
      },

      showRestaurantTypes() {
       selectedTypes = [];
       selectedRestaurantTypes = store.restaurantsList.filter(restaurant => {
          if (restaurant.types.some(type => clickedTypes.includes(type.id))) {
             selectedTypes.push(restaurant);
          return true;
         }
          return false;
        });
         return selectedTypes;
      }

  },

  computed:{
    shownTypes(){
      if(store.clickedTypes.length > 0){
        this.showRestaurantTypes()
      }
    }
  },

  created(){
    this.getRestaurants();
    this.getTypes();
  },

};

</script>

<template>
  
<h2>Sono la lista dei ristoranti</h2>

<ul>
  <li v-if="shownTypes">

    <RestaurantCard
    v-for=" restaurant in this.selectedTypes" :key="restaurant.id"
    :restaurantObject = 'restaurant'
    />
  </li>
  <li v-else>
    <RestaurantCard
    v-for=" restaurant in store.restaurantsList" :key="restaurant.id"
    :restaurantObject = 'restaurant'
    />
  </li>
</ul>

</template>

<style scoped lang="scss">
ul {
  list-style-type: none;
}
</style>