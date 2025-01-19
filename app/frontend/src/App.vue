<template>
  <div id="app">
    <HeaderComponent />
    <router-view />
    <FooterComponent />
  </div>
</template>

<script>
import HeaderComponent from '@/components/HeaderComponent.vue';
import FooterComponent from '@/components/FooterComponent.vue';

export default {
  name: 'App',
  components: {
    HeaderComponent,
    FooterComponent,
  },
};
</script>

<style>
:root {
  --background-dark: #1E1E2F;
  --card-background: #2E2E40;
  --button: #5865F2;
  --title-text: #FFFFFF;
  --body-text: #CCCCCC;
  --accent: #F0B429;
  --highlight: #FF6F61;
}

html, body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  height: 100%;
  overflow-x: hidden;
  background-color: var(--background-dark);
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

router-view {
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: var(--background-dark);
}

.container {
  max-width: 100%;
  margin: 0 auto;
  padding: 0 1rem;
}
</style>