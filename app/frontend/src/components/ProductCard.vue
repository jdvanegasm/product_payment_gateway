<template>
  <div
    class="product-card p-6 border rounded-lg shadow-md hover:shadow-xl transition custom-card-background flex flex-col justify-between"
  >
    <div>
      <div class="image-container mb-4">
        <img
          :src="image"
          :alt="name"
          class="w-full h-full object-cover rounded-lg"
        />
      </div>
      <h2 class="text-xl font-semibold custom-title-text text-center">
        {{ name }}
      </h2>
      <p class="custom-body-text mt-3 text-sm leading-relaxed text-center">
        {{ description }}
      </p>
      <p class="custom-accent font-bold text-lg mt-4 text-center">${{ price }}</p>
      <p class="custom-highlight text-sm mt-1 text-center">
        Stock: {{ stock }}
      </p>
    </div>
    <button
      class="mt-6 py-3 text-white custom-button hover:opacity-90 transition rounded-full font-medium"
      @click.stop="goToCheckout"
    >
      Pay Now
    </button>
  </div>
</template>

<script>
export default {
  name: 'ProductCard',
  props: {
    name: String,
    description: String,
    price: Number,
    stock: Number,
    image: String,
  },
  methods: {
    goToCheckout() {
      this.$router.push({
        path: '/checkout',
        query: {
          productName: this.name,
          productPrice: this.price,
        },
      });
    },
  },
};
</script>

<style scoped>
:root {
  --background-dark: #1E1E2F;
  --card-background: #2E2E40;
  --button: #5865F2;
  --title-text: #FFFFFF;
  --body-text: #CCCCCC;
  --accent: #F0B429;
  --highlight: #FF6F61;
}

.custom-card-background {
  background-color: var(--card-background);
}

.custom-title-text {
  color: var(--title-text);
}

.custom-body-text {
  color: var(--body-text);
}

.custom-accent {
  color: var(--accent);
}

.custom-highlight {
  color: var(--highlight);
}

.custom-button {
  background-color: var(--button);
  width: 100%;
}
</style>
