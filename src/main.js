import App from './App.vue';  // Your root component
import { createApp } from 'vue';
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import 'primeicons/primeicons.css';
import { createPinia } from 'pinia';
import { createRouter, createWebHistory } from 'vue-router'; // Import Vue Router
import router from '@/routes'; // Import your router instance
import './style.css';

// Create the Vue application
const app = createApp(App);
const pinia = createPinia();

// Use Pinia for state management
app.use(pinia);

// Use PrimeVue with your theme
app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
});

// Use Vue Router
app.use(router); // This line adds the router to the app

// Mount the app to the DOM
app.mount('#app');
