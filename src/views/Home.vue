<template>
  <b-container class="home">
    <Overlay />
    <!--<b-button v-b-modal.welcomeModal>Launch demo modal</b-button>-->

    <b-row><b-col><h3> Deine Postleizahl {{ getPlz() }}</h3></b-col></b-row>
    <b-card-group deck>
      <div id="cards" class="col-sm-6" v-for="merchant in getMerchants()" :key="merchant.id">
        <b-card class="mb-4"
        v-bind:title="'Händler ' + merchant.id"
        sub-title="Pizzaria"
        @click="openMerchant(merchant.id)">
          <b-card-text>Lorem ipsum dolor sit amet, consetetur sadipscing elitr</b-card-text>
        </b-card>
      </div>
    </b-card-group>
  </b-container>
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
h3 {
  padding-left:15px
}

</style>
