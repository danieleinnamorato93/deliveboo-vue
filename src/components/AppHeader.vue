<script>
export default {
  data() {
    return {
      isHidden: true,
    }
  }
}
</script>

<template>
        <nav class="d-flex align-items-center justify-content-between p-3">
            <div>
                <img src="../../public/Food-Delivery-Service-PNG-High-Quality-Image.png" alt="logo">
                <RouterLink to="/" class="link"><h1>Deliveboo - Food Delivery </h1></RouterLink>
            </div>
            <!-- Sezione Link -->
            <div id="nav-link">
                <RouterLink to="/">Home</RouterLink>
                <RouterLink to="/checkout">Carrello</RouterLink>
                <!-- Sezione Log-In/Registrazione -->
                <!-- <button @mouseover="isHidden = false">Sei un ristoratore? &#129123;</button>
                <div class="d-inline dropdown-log" @mouseleave="isHidden = true">
                    <ul :class="{ none: isHidden }">
                        <li><a href="http://127.0.0.1:8000/login">Accedi al tuo ristorante</a></li>
                        <li><a href="http://127.0.0.1:8000/register">Registra il tuo ristorante</a></li>
                    </ul>
                </div> -->
            </div>
    </nav>
</template>

<style scoped lang="scss">
// Stile Navbar
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

.link {
    text-decoration: none;
}

// Sezione Link
#nav-link {
    position: relative;
    * {
        margin-right: 20px;
        text-decoration: none;
        color: white;
        font-size: 1.2rem;
        font-weight: 700;
    }

    
    // bottone per menu a tendina
    button {
        border: 1px;
        padding: 5px;
        border-radius: 12px;
        display: inline;
    }
    
    // proprietà in comune tra bottone e lista
    button, .dropdown-log > ul > li {
        border: 3px solid black;
        background-color: #ea555f;
        }
    
    button, ul > li > a {
        color: black;
    }

    // Sezione menu a tendina

    .dropdown-log > ul, .dropdown-log li {
        max-width: fit-content;
        margin: 0;
    }

    .dropdown-log{
        ul {
            position: absolute;
            list-style-type: none;
            padding: 0;
            margin-top: 2px;
            left: 290px;
            top: 45px;
            li {
                margin-bottom: 2px;
                width: 205px;
                border-radius: 12px;
                padding: 5px;
            }
        }
    }
}

// classe per triggerare visibilità lista
.none {
    display: none;
}
</style>