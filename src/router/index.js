import { createRouter, createWebHistory } from 'vue-router';
import WelcomeView from '@/views/WelcomeView.vue';
import ExampleView from '@/views/ExampleView.vue';

const router = createRouter({
  history: createWebHistory('/pokedex/'),
  routes: [
    { path: '/', name: 'welcome', component: WelcomeView },
    { path: '/about', name: 'about', component: ExampleView },
  ],
});

export default router;
