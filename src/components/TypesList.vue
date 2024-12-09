<script>
import { store } from '../js/store';
export default {
  data() {
    return {
      store,
    }
  },
  methods: {
    getTypeId(typeId) {
      // cerca indice typeid
      const index = store.clickedTypes.indexOf(typeId);
      // Se non è presente, aggiungilo
      if (index === -1) {
        store.clickedTypes.push(typeId);
        console.log('tutto ok visto',typeId);
        console.log(store.clickedTypes);

      } else {
        // Se è presente, rimuovilo
        store.clickedTypes.splice(index, 1);
      }
    },
    getImage(img){
    return `http://127.0.0.1:8000${img}`;  // URL absoluta para o Laravel
    },
  },
}
</script>

<template>
  <section id="carousel-types" class="container-fluid">
    <div class="row">
      <div class="col-12">
        <div class="thumbnails d-flex">
          <article class="thumbnail" v-for="type in store.typesList" :key="type.id">
            <img :src="getImage(type.logo)" :alt="type.name" width="100"> 
            <!-- <img :src="type.logo" :alt="type.name" class="h-100"> -->
          </article>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>

</style>
