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
                <h1>Deliveboo - Food Delivery</h1>
            </div>
            <div id="nav-link">
                <RouterLink to="/">Home</RouterLink>
                <RouterLink to="/ristoranti">Ristoranti</RouterLink>
                <RouterLink to="/tipologia">Tipologie</RouterLink>
                <button @mouseover="isHidden = false">Sei un ristoratore? &#129123;</button>
                <div class="d-inline dropdown-log" @mouseleave="isHidden = true">
                    <ul :class="{ none: isHidden }">
                        <li><a href="http://127.0.0.1:8000/login">Accedi al tuo ristorante</a></li>
                        <li><a href="http://127.0.0.1:8000/register">Registra il tuo ristorante</a></li>
                    </ul>
                </div>
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
    position: relative;
    * {
        margin-right: 20px;
        text-decoration: none;
        color: white;
        font-size: 1.2rem;
        font-weight: 700;
    }
    button {
        border: 1px;
        background-color: #ea555f;
        padding: 5px;
        border: 3px solid black;
        border-radius: 12px;
        color: black;
        display: inline;
    }

    .dropdown-log{
        * {
            color: black;
        }
        ul {
            position: absolute;
            list-style-type: none;
            max-width: fit-content;
            padding: 0;
            margin: 0;
            margin-top: 2px;
            left: 290px;
            top: 45px;
            li {
                margin: 0;
                margin-bottom: 2px;
                width: 205px;
                background-color: #ea555f;
                border: 3px solid black;
                border-radius: 12px;
                padding: 5px;
                max-width: fit-content;
            }
        }
    }
}

.none {
    display: none;
}
</style>