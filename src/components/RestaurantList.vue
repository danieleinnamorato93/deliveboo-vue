<script>
import RestaurantCard from "./RestaurantCard.vue";
import axios from "axios";
import {store} from '../js/store.js'

export default {
  data() {
    return {
      store,
      apiRestaurants:'',
      apiTypes:'',
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
        store.restaurantsList = response.data.data;
        })
      },

      // chiamata per ottenere le tipologie dei ristoranti
    getTypes (){
      axios.get(this.apiTypes)
        .then((response)=> {
        store.typesList = response.data;
        })
      },
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
  <li v-for="n in 5">
    <RestaurantCard />
  </li>
</ul>
</template>

<style scoped lang="scss">
ul {
  list-style-type: none;
}
</style>