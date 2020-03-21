<template>
  <div id="app">
    <Overlay />
    <Head />
    <router-view/>
    <Footer />
  </div>
</template>

<script>
import Head from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

export default {
  components: {
    Head,
    Footer
  }
}
</script>

<style>

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

</style>
