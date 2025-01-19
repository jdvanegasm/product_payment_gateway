import { fetchProducts } from '@/services/productService';

export const state = () => ({
  products: [],
});

export const mutations = {
  setProducts(state, products) {
    state.products = products;
  },
};

export const actions = {
  async loadProducts({ commit }) {
    try {
      const products = await fetchProducts();
      commit('setProducts', products);
    } catch (error) {
      console.error('Failed to load products:', error);
    }
  },
};

export const getters = {
  allProducts: (state) => state.products,
};

export default {
  namespaced: true, 
  state,
  mutations,
  actions,
  getters,
};