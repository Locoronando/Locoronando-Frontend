<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <b-button v-b-modal.welcomeModal>Launch demo modal</b-button>
    <overlay />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import overlay from '@/components/PlzOverlay.vue'
export default {
  name: 'Home',
  components: {
    HelloWorld,
    overlay
  },
  mounted () {
    console.log(this)
    // this.$refs.welcomeModal.show()
  }
}
</script>
