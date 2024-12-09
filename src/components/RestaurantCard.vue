<script>
export default {
  data() {
    return {
      
    }
  },
  props: {
    restaurantObject: {
      type: Object, required: true,
    }

  }
}
</script>

<template>
<div class="card mb-3" style="max-width: 540px;">
  <div class="row g-0">
    <div class="col-md-4">
      <img src="../../public/1600w-9Gfim1S8fHg.webp" class="img-fluid rounded-start" alt="...">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">{{restaurantObject.name}}</h5>
        <h5 class="card-text">{{restaurantObject.types[0].name}}</h5>
        <p class="card-text">Descrizione: {{restaurantObject.types[0].description }}</p>
      </div>
    </div>
  </div>
</div>
</template>

<style scoped lang="scss">
</style>