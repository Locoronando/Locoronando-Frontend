<template>
  <b-container>
    <b-modal @hide="validate" id="plz-modal" ref="modal" title="Willkommen" ok-only>
      <div v-if="error" class="alert alert-danger"> {{ this.error }}</div>
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
        <router-link :to="{ path: `/merchant/${id}` }">
          <b-card
          class="mb-4"
          v-bind:title="'Händler-' + id"
          sub-title="Pizzeria"
          @click="openMerchant(id)"
        >
          <b-card-text>Entfernung: 5.8 km</b-card-text>
        </b-card>
        </router-link>
      </div>
    </b-card-group>
  </b-container>
</template>

<script>
export default {
  name: 'Home',
  methods: {
    openMerchant (id) {
      this.$router.push(`/merchant/${id}`)
    },
    validate (bvModalEvt) {
      if (this.plz === undefined || this.plz.toString().length !== 5) {
        this.error = 'Bitte gib eine gültige Postleitzahl ein!'
        bvModalEvt.preventDefault()
      } else {
        localStorage.setItem('plz', this.plz)
      }
    }
  },
  data () {
    return {
      plz: undefined,
      error: '',
      merchants: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    }
  },
  mounted () {
    const storedPlz = localStorage.getItem('plz')

    if (storedPlz) {
      this.plz = storedPlz
    } else {
      this.$refs.modal.show()
    }
  }
}
</script>

<style scoped>
h3 {
  margin: 15px;
}

a, a:hover {
  color: #212529;
  text-decoration: none !important;
}
</style>
