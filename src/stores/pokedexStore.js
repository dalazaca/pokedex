import { defineStore } from 'pinia';

export const usePokedexStore = defineStore('podekex', {
  state: () => ({
    initialLoading: true,
    favorites: [],
    pokemons: [],
  }),
  actions: {
    toggleFavorite(name) {
      const index = this.favorites.findIndex(
        (pokemon) => pokemon.name === name
      );
      if (index !== -1) {
        this.favorites.splice(index, 1);
      } else {
        this.favorites.push({ name });
      }
    },
    isFavorite(name) {
      return this.favorites.some((pokemon) => pokemon.name === name);
    },
    setPokemons(pokemonsList) {
      this.pokemons = [...this.pokemons, ...pokemonsList];
    },
    setInitialLoading(bool) {
      this.initialLoading = bool;
    },
  },
});
