export default {
    namespaced: true,
    state: {
      products: [],
    },
    mutations: {
      setProducts(state, products) {
        state.products = products;
      },
    },
    actions: {
      async fetchProducts({ commit }) {
        const response = await fetch('/api/products');
        const data = await response.json();
        commit('setProducts', data);
      },
    },
    getters: {
      getProducts: (state) => state.products,
    },
  };  