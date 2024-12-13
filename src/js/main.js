import { createApp } from "vue";
// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'
import router from "./router";
import App from "../App.vue";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
// Importa tutte le icone
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";

// Aggiungi tutte le icone alla libreria
library.add(fas, far,);
createApp(App).use(router).component("font-awesome-icon", FontAwesomeIcon).mount("#app");
