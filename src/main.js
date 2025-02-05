import { createApp } from 'vue';
import '@/assets/styles/custom.scss';
import Vue from '@/App.vue';
import i18n from '@/i18n.js';
import router from '@/router';

const app = createApp(Vue);

app.use(i18n);
app.use(router);
app.mount('#pokedex');
