<script>
export default {
    data() {
        return {
            name: "ErrorPage",
        }
    }
}
</script>
<template>
    <div class="error-page">
        <h1>Errore 404</h1>
        <p>Il ristorante richiesto non è stato trovato.</p>
        <router-link to="/">Torna alla home</router-link>
    </div>
</template>

<style scoped lang="scss">
.error-page {
    text-align: center;
    margin-top: 50px;
}
</style>