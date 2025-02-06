import { createRouter, createWebHistory } from 'vue-router';
import WelcomeView from '@/views/WelcomeView.vue';
import PokedexView from '@/views/PokedexView.vue';

const router = createRouter({
  history: createWebHistory('/pokedex/'),
  routes: [
    { path: '/', name: 'welcome', component: WelcomeView },
    {
      path: '/list',
      name: 'list',
      component: PokedexView,
      props: { onlyFavorites: false },
    },
    {
      path: '/list/favorites',
      name: 'favorites',
      component: PokedexView,
      props: { onlyFavorites: true },
    },
  ],
});

export default router;
