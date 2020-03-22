<template>
  <div id="app">
    <Navbar />
    <router-view class="view"/>
    <Footer class="footer"/>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'

export default {
  components: {
    Navbar,
    Footer
  }
}
</script>

<style>
html, body, #app {
  height: 100%;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  display: flex;
  flex-direction: column;
}

.view {
  flex: 1 0 auto;
}

.footer {
  flex-shrink: 0;
}
</style>
