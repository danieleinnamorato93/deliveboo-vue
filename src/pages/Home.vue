<script>
import RestaurantList from "../components/RestaurantList.vue";
import TypesList from "../components/TypesList.vue";

export default {
  data() {
    return {};
  },
  components: {
    TypesList,
    RestaurantList,
  },
}
</script>

<template>
  <TypesList />
  <RestaurantList />
</template>

<style scoped lang="scss"></style>
