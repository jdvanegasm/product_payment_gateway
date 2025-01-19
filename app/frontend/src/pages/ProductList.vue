<template>
  <div class="product-list container mx-auto p-6 custom-background-dark">
    <h1 class="text-4xl font-extrabold mb-10 text-center custom-title-text">
      Explore Our Products
    </h1>
    <div class="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      <ProductCard
        v-for="product in products"
        :key="product.product_id"
        :name="product.name"
        :description="product.description"
        :price="product.price"
        :stock="product.stock"
        :image="product.image_url"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import ProductCard from '@/components/ProductCard';

export default {
  name: 'ProductList',
  components: {
    ProductCard,
  },
  computed: {
    ...mapGetters('products', ['allProducts']),
    products() {
      return this.allProducts;
    },
  },
  created() {
    this.loadProducts();
  },
  methods: {
    ...mapActions('products', ['loadProducts']),
  },
};
</script>

<style scoped>
.custom-background-dark {
  background-color: var(--background-dark);
}

.custom-title-text {
  color: var(--title-text);
}
</style>