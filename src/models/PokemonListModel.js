import axios from "axios";

const pokemonList = {
  state: {
    data: [],
    isFetching: false,
    error: false
  },
  reducers: {
    request(prevState) {
        return {
          ...prevState,
          isFetching: true,
          error: false
        }
    },
    success(prevState, data) {
      console.log(prevState);
      return {
        ...prevState,
        data: [...prevState.data, ...data],
        isFetching: false,
        error: false
      }
    },
    failure(prevState, error) {
      return {
        ...prevState,
        data: [],
        isFetching: false,
        error
      }
    }
  },
  effects: {
    async fetchPokemonList(payload) {
      console.log(payload);
      this.request();
      const { offset, limit } = payload;
      return axios
      .get(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`)
      .then(res => {
        this.success(res.data.results);
      }).catch(error => {
        this.failure(error);
      });
    }
  }
};

export default pokemonList;