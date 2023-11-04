// main.ts

import { createApp } from 'vue';
import { createPinia } from 'pinia'; // Import Pinia
import App from './App.vue';
import router from './router';

const app = createApp(App);

const pinia = createPinia(); // Create a Pinia instance
app.use(pinia); // Use Pinia

app.use(router);

app.mount('#app');
