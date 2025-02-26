import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import GlobalDialog from './components/GlobalDialog.vue'; 

// Pinia
const pinia = createPinia();
const app = createApp(App);
app.use(pinia); // Đảm bảo Pinia được sử dụng trước khi mount

app.use(router);
app.mount('#app');

// Mount dialog vào #global-dialog
const dialogApp = createApp(GlobalDialog);
dialogApp.mount("#global-dialog");
