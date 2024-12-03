<script>
export default {
  data() {
    return {
      
    }
  }
}
</script>

<template>
    <nav class="d-flex align-items-center justify-content-between p-3">
        <div>
            <img src="../../public/Food-Delivery-Service-PNG-High-Quality-Image.png" alt="logo">
        </div>
        <div id="nav-link">
            <RouterLink to="/">Home</RouterLink>
            <a href="#">Accedi al tuo Ristorante</a>
        </div>
    </nav>
</template>

<style scoped lang="scss">
nav {
    min-height: 2.5rem;
    background-color: #4fae5a;
    img {
        height: 5.5rem;
    }
}

#nav-link {
    * {
        margin-right: 10px;
        text-decoration: none;
        color: white;
        font-weight: 700;
    }
}

</style>