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
      <div id="cards" class="col-sm-6" v-for="merchant in this.merchants" :key="merchant.id">
        <router-link :to="{ path: `/merchant/${merchant.id}` }">
          <b-card
          class="mb-4"
          :title="merchant.title"
          :sub-title="merchant.subtitle"
        >
          <b-card-text>Entfernung: {{ merchant.distance }} km</b-card-text>
        </b-card>
        </router-link>
      </div>
    </b-card-group>

    <b-pagination class="pagination" pills value="1" total-rows="100" limit="5" align="center"></b-pagination>
  </b-container>
</template>

<script>
export default {
  name: 'Home',
  methods: {
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
      merchants: [
        {
          id: 1,
          title: 'Pizzeria La Casetta',
          subtitle: 'Pizzeria',
          distance: 0.5
        },
        {
          id: 2,
          title: 'San Marco',
          subtitle: 'Restaurant',
          distance: 1.3
        },
        {
          id: 3,
          title: 'Thalia',
          subtitle: 'Buchhandel',
          distance: 1.5
        },
        {
          id: 4,
          title: 'Rewe',
          subtitle: 'Supermarkt',
          distance: 1.7
        },
        {
          id: 5,
          title: 'Aldi',
          subtitle: 'Supermarkt',
          distance: 2.1
        },
        {
          id: 6,
          title: 'Mikado Asian',
          subtitle: 'Fast Food',
          distance: 2.5
        },
        {
          id: 7,
          title: 'Aleco Biomarkt',
          subtitle: 'Supermarkt',
          distance: 2.7
        },
        {
          id: 8,
          title: 'Hol Ab',
          subtitle: 'Getränkemarkt',
          distance: 3.9
        }
      ]
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

.pagination {
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
