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
                <h1>Deliveboo - Food Delivery</h1>
            </div>
            <div id="nav-link">
                <RouterLink to="/">Home</RouterLink>
                <RouterLink to="/ristoranti">Ristoranti</RouterLink>
                <RouterLink to="/tipologia">Tipologie</RouterLink>
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
        transition: scale 150ms;
    }
    img:hover {
        scale: (1.2);
    }
    h1 {
        margin-left: 20px;
        display: inline;
        vertical-align: middle;
        color: white;
        font-weight: 700;
        text-decoration: underline;
    }
}

#nav-link {
    * {
        margin-right: 20px;
        text-decoration: none;
        color: white;
        font-size: 1.2rem;
        font-weight: 700;
    }
    :last-child {
        color: black;
    }
}
</style>