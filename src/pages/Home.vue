<script>
import RestaurantList from "../components/RestaurantList.vue";
import TypesList from "../components/TypesList.vue"

export default {
  data() {
    return {
      
    }
  },
  components: {
    TypesList,
    RestaurantList
  }
}
</script>

<template>
<TypesList />
<h1>Questa è la home</h1>
<RestaurantList />
</template>

<style scoped lang="scss">

</style>