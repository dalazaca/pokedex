import { createRouter, createWebHistory } from 'vue-router';
import WelcomeView from '@/views/WelcomeView.vue';

const router = createRouter({
  history: createWebHistory('/pokedex/'),
  routes: [{ path: '/', name: 'welcome', component: WelcomeView }],
});

export default router;
