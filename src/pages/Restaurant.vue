<script>
import { store } from '../js/store';
import axios from 'axios';

export default {
  data() {
    return {
      store,
      apiRestaurants:'http://127.0.0.1:8000/api/restaurants',
      restaurant: [],
    }
  },
  
  methods: {
    getSingleRestaurant(){
      axios.get(`${this.apiRestaurants}/${this.$route.params.id}`)
        .then((response) => {
        this.restaurant = response.data.results;
        console.log(this.restaurant);
        })
    },
  },

  created(){
    this.getSingleRestaurant();
  }
}
</script>

<template>
  <div class="container"> 

    <div class="row justify-content-center ">
      <div class="col-6">

        
        <div class="card w-100 mt-3">
          <img src="..." class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">{{ restaurant.name }}</h5>
            <p class="card-text">{{ restaurant.address }}</p>
          </div>  
          <ul class="list-group list-group-flush">
            <li class="list-group-item" v-for="plate in restaurant.plates">
              <h5>{{ plate.name }}</h5>
              <h6>Ingredienti:</h6>
              <p> 
                {{ plate.description }} 
              </p>
              <h6>Prezzo: {{ plate.price }}€</h6>
              <h6>Disponibilità:</h6>
              <p v-if="plate.description">
                  Disponibile
              </p>
              <p v-else>
                Non Disponibile
              </p>
            </li>
          </ul>
        </div>
        
        
      </div>
    </div>
    </div>
    </template>

<style scoped lang="scss">

</style>