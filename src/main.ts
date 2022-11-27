import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import VeeValidatePlugin from "@/utility/validation";
import { auth } from "@/utility/firebaseConfig";

import "./assets/base.css";
import "./assets/main.css";

let app: any;
auth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App);

    app.use(createPinia());
    app.use(router);
    app.use(VeeValidatePlugin, { foo: 100 });

    app.mount("#app");
  }
});
