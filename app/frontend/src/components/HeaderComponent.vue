<template>
  <header class="custom-header text-white py-6 shadow-md">
    <div class="container mx-auto flex justify-between items-center">
      <h1 class="text-3xl font-extrabold tracking-wide">
        <span class="text-accent">Wompi</span> Technical Test
      </h1>
      <button
        class="custom-button text-white py-2 px-6 rounded-full shadow hover:bg-accent-light transition font-medium flex items-center"
        @click="goToHome"
      >
      <span class="ml-2">🛒Explore Products🛒</span>
      </button>
    </div>
  </header>
</template>

<script>
export default {
  name: 'HeaderComponent',
  methods: {
    goToHome() {
      this.$router.push('/');
    },
  },
};
</script>

<style scoped>
:root {
  --accent: #F0B429;
  --button: #5865F2;
}

.custom-header {
  background-color: #2A3A4D;
  border-bottom: 4px solid var(--accent);
}

.text-accent {
  color: var(--accent);
}

.custom-button {
  background-color: var(--button);
  display: flex;
  align-items: center;
  justify-content: center;
}

.custom-button:hover {
  background-color: #748FFC;
}

.bg-accent-light {
  background-color: #FFDE94;
}
</style>