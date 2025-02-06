import api from './api';

const pokedexService = {
  async getPokemonsList(limit, offset) {
    try {
      const response = await api.get('/pokemon', {
        params: { limit, offset },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async getPokemonDetail(name) {
    try {
      const response = await api.get(`/pokemon/${name}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default pokedexService;
