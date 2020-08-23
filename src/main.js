import Vue from "vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
	faCopy,
	faEdit,
	faTrash,
	faSyncAlt
} from "@fortawesome/free-solid-svg-icons";
import App from "./App.vue";
import router from "./router";
import store from "./store";

library.add(faCopy, faEdit, faTrash, faSyncAlt);

Vue.component("font-awesome-icon", FontAwesomeIcon);

import "./assets/styles/index.css";

Vue.config.productionTip = false;

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount("#app");
