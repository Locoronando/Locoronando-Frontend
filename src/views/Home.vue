<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <Overlay />
    <b-button v-b-modal.welcomeModal>Launch demo modal</b-button>
  </div>
</template>

<script>
// @ is an alias to /src
import Overlay from '@/components/PlzOverlay.vue'

export default {
  name: 'Home',
  components: {
    Overlay
  },
  mounted () {
    console.log(this)
    // this.$refs.welcomeModal.show()
  }
}
</script>
