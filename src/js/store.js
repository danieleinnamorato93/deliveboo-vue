import { reactive } from "vue";

export const store = reactive({
    restaurantsList: [],
    typesList: [],
    clickedTypes: [],
    filteredRestaurants: [],

    // vado ad implementare tutto quello che mi serve per il carrello
    cart: [],

    get cartCount() {
        let total = 0;
        for (let i = 0; i < this.cart.length; i++) {
            total += this.cart[i].quantity;
        }
        return total;
    },

    // Metodo per aggiungere un articolo al carrello
    addToCart(item) {
        const existingItem = this.cart.find(cartItem => cartItem.id === item.id);
        if (existingItem) {
            existingItem.quantity += item.quantity;
        } else {
            this.cart.push(item);
        }
        this.syncWithLocalStorage();
    },

    // Metodo per svuotare il carrello
    clearCart() {
        this.cart.length = 0;
        this.syncWithLocalStorage();
    },

    // Metodo per sincronizzare il carrello con il localStorage
    syncWithLocalStorage() {
        localStorage.setItem("cart", JSON.stringify(this.cart));
    },

    // Metodo per caricare il carrello dal localStorage
    loadFromLocalStorage() {
        const storedCart = JSON.parse(localStorage.getItem("cart"));
        if (storedCart) {
            this.cart = storedCart;
        }
    },
    // definisco un metodo per rimuovere gli elementi dal carrello uno ad uno
    removeFromCart(itemId) {
        const itemIndex = this.cart.findIndex(cartItem => cartItem.id === itemId);
        if (itemIndex !== -1) {
            // qui li decrementa
            if (this.cart[itemIndex].quantity > 1) {
                this.cart[itemIndex].quantity--;
            } else {
                // qui li toglie del tutto
                this.cart.splice(itemIndex, 1);
            }
            this.syncWithLocalStorage();
        }
    },
    // metodo per aggiornare il carrello con la qauntità
    
});
