import { shallowMount } from '@vue/test-utils';
import ProductList from '@/pages/ProductList.vue';
import ProductCard from '@/components/ProductCard.vue';

const mockStore = {
  getters: {
    allProducts: jest.fn(() => [
      { product_id: 1, name: 'Product A', description: 'Desc A', price: 100, stock: 5, image_url: 'image-a.jpg' },
      { product_id: 2, name: 'Product B', description: 'Desc B', price: 200, stock: 3, image_url: 'image-b.jpg' },
    ]),
  },
  dispatch: jest.fn(() => Promise.resolve()),
};

describe('ProductList.vue', () => {
  it('renders product cards', () => {
    const wrapper = shallowMount(ProductList, {
      global: {
        components: { ProductCard },
        mocks: {
          $store: mockStore,
        },
      },
    });

    const productCards = wrapper.findAllComponents(ProductCard);
    expect(productCards).toHaveLength(mockStore.getters.allProducts().length);
  });
});