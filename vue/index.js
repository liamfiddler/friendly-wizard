import { createApp } from 'vue';
import App from './App.vue';
import { Wizard } from '../index';
import steps from './steps.json';

const app = createApp(App);

app.config.globalProperties.wizard = new Wizard({ steps });

app.mount('#app');
