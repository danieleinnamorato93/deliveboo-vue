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
                <RouterLink to="/" class="link text-decoration-none"><h1>Deliveboo - Food Delivery </h1></RouterLink>
            </div>
            <!-- Sezione Link -->
            <div class="nav-link">
                <RouterLink to="/">Home</RouterLink>
                <RouterLink to="/checkout">Carrello</RouterLink>
                <button type="button" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                  Sei un Ristoratore?
                </button>
            </div>

            <!-- Modal -->
            <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-body">
                        <button type="button" class="log-btn me-2"><a href="http://127.0.0.1:8000/login">Accedi al tuo ristorante</a></button>
                        <button type="button" class="log-btn me-2"><a href="http://127.0.0.1:8000/register">Registra il tuo ristorante</a></button>
                        <button type="button" class="close-btn" data-bs-dismiss="modal">Chiudi</button>
                    </div>
                </div>
            </div>
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
.nav-link {
    * {
        margin-right: 20px;
        text-decoration: none;
        color: white;
        font-size: 1.2rem;
        font-weight: 700;
    }
}

button {
    border: 1px;
    padding: 5px;
    border-radius: 12px;
    display: inline;
    border: 3px solid black;
    background-color: #ea555f;
    color: black;
}


.log-btn {
    background-color: #4fae5a;
}

.close-btn {
    background-color: #ea555f;
}

a {
    text-decoration: underline;
    color: black;
}
</style>