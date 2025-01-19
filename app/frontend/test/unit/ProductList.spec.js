import { shallowMount } from '@vue/test-utils';
import ProductList from '@/pages/ProductList.vue';
import ProductCard from '@/components/ProductCard.vue';

jest.mock('vue-router', () => ({
  createRouter: jest.fn().mockReturnValue({
    push: jest.fn(),
    replace: jest.fn(),
    go: jest.fn(),
    back: jest.fn(),
    history: createWebHistory(), // O puedes cambiar a createWebHashHistory() o createMemoryHistory() dependiendo de lo que necesites.
  }),
  createWebHistory: jest.fn(),
  createWebHashHistory: jest.fn(),
  createMemoryHistory: jest.fn(),
}));

const mockStore = {
  _modulesNamespaceMap: {
    'products/': {
      context: {
        dispatch: jest.fn(() => Promise.resolve()),
      },
    },
  },
  getters: {
    'products/allProducts': jest.fn(() => [
      { product_id: 1, name: 'Product A', description: 'Desc A', price: 100, stock: 5, image_url: 'image-a.jpg' },
      { product_id: 2, name: 'Product B', description: 'Desc B', price: 200, stock: 3, image_url: 'image-b.jpg' },
    ]),
  },
};

describe('ProductList.vue', () => {
  it('renders the correct number of product cards', async () => {
    const wrapper = shallowMount(ProductList, {
      global: {
        components: { ProductCard },
        mocks: {
          $store: mockStore,
        },
      },
    });

    await wrapper.vm.$nextTick();

    const productCards = wrapper.findAllComponents(ProductCard);

    expect(productCards.length).toBeGreaterThanOrEqual(2);
  });

  it('calls loadProducts action on mount', async () => {
    shallowMount(ProductList, {
      global: {
        mocks: {
          $store: mockStore,
        },
      },
    });

    expect(mockStore._modulesNamespaceMap['products/'].context.dispatch).toHaveBeenCalledWith('loadProducts');
  });
});