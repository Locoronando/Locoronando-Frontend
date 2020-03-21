<template>
  <b-container>
    <b-modal @hide="validate" id="plz-modal" ref="modal" title="Willkommen" ok-only>
      <b-form-input
        v-model.number="plz"
        type="number"
        class="form-control mr-sm-2"
        placeholder="Postleitzahl"
      />
    </b-modal>

    <h3>Deine Postleitzahl: {{ this.plz }}</h3>

    <b-card-group deck>
      <div id="cards" class="col-sm-6" v-for="id in this.merchants" :key="id">
        <b-card
          class="mb-4"
          v-bind:title="'Händler-' + id"
          sub-title="Pizzeria"
          @click="openMerchant(id)"
        >
          <b-card-text>Lorem ipsum dolor sit amet, consetetur sadipscing elitr</b-card-text>
        </b-card>
      </div>
    </b-card-group>
  </b-container>
</template>

<script>
export default {
  name: 'Home',
  methods: {
    openMerchant (id) {
      this.$router.push('/merchant/' + id)
    },
    validate (bvModalEvt) {
      if (this.plz === undefined || this.plz.toString().length !== 5) {
        bvModalEvt.preventDefault()
      }
    }
  },
  data () {
    return {
      plz: undefined,
      merchants: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    }
  },
  mounted () {
    this.$refs.modal.show()
  }
}
</script>

<style scoped>
h3 {
  margin: 15px;
}
</style>
