import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './registerServiceWorker'
import router from './router'
import store from './store'
import logger from "@/log/baselog";
import Api from "@/api/baseApi";

const app = createApp(App);
app.use(ElementPlus, { size: 'small', zIndex: 3000 });
app.use(store);
app.use(router);
app.mount('#app');

app.config.globalProperties.$log = logger;
app.config.globalProperties.$http = Api
