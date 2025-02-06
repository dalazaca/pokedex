import { createRouter, createWebHistory } from 'vue-router';
import Welcome from '@/views/Welcome.vue';
import ListPokemons from '@/views/ListPokemons.vue';

const router = createRouter({
  history: createWebHistory('/pokedex/'),
  routes: [
    { path: '/', name: 'welcome', component: Welcome },
    { path: '/list', name: 'list', component: ListPokemons },
  ],
});

export default router;
