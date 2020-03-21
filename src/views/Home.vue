<template>
  <div class="home">
    <Head> </Head>
    <b-button v-b-modal.welcomeModal>Launch demo modal</b-button>
    <overlay />
  </div>
</template>

<script>
import overlay from '@/components/PlzOverlay.vue'
import Head from '@/components/Header.vue'

export default {
  name: 'Home',
  components: {
    Head,
    overlay
  },
  mounted () {
    console.log(this)
    // this.$refs.welcomeModal.show()
  }
}
</script>
