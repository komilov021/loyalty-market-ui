import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./routers/index";
import ElementPlus from "element-plus";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import "./permissions";
import "./assets/styles/main.scss";
import "element-plus/dist/index.css";
import "./assets/styles/tailwindcss.scss";
import "./assets/styles/element-ui/index.scss";
import { i18n } from "./i18n";

const app = createApp(App);

const pinia = createPinia();
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}


app.use(i18n);
app.use(router);
app.use(pinia);
app.use(ElementPlus);
app.mount("#app");
