<template>
  <div class="home">
    <Overlay />
    <!--<b-button v-b-modal.welcomeModal>Launch demo modal</b-button>-->
    <h4> Deine Postleizahl {{ getPlz() }}</h4>
    <b-card-group deck>
      <div id="cards" class="col-6" v-for="mercant in getMerchants()" :key="mercant.id">
        <b-card class="mb-4"
        v-bind:title="'Händler ' + mercant.id"
        sub-title="Pizzaria"
        @click="openMerchant(mercant.id)">
          <b-card-text>Lorem ipsum dolor sit amet, consetetur sadipscing elitr</b-card-text>
        </b-card>
      </div>
    </b-card-group>
  </div>
</template>

<script>
// @ is an alias to /src
import Overlay from '@/components/PlzOverlay.vue'

export default {
  name: 'Home',
  methods: {
    getPlz () {
      return 70283
    },
    getMerchants () {
      return [{ id: '1' }, { id: '2' }, { id: '3' }, { id: '4' }, { id: '5' }]
    },
    openMerchant (id) {
      console.log(id)
      this.$router.push('/merchant/' + id)
    }
  },
  components: {
    Overlay
  },
  mounted () {
    // this.$refs.welcomeModal.show()
  }
}
</script>

<style scoped>
h4 {
  padding-bottom:10px
}

</style>
