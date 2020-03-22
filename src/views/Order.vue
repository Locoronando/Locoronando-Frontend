<template>
  <b-container class="mt-4">
    <b-row style="justify-content: space-betweem">
      <b-col cols="8" >
        <h2>Order-Nr.: 1</h2>
      </b-col>
      <b-col cols="4" v-if="user.role === 'DEALER' && order.status !== 5" align-h="end">
        Status:
        <select v-model="selected">
          <option v-for="option in StatusOptions" :key="option">
            {{ option }}
          </option>
        </select>
      </b-col>
      <b-col sm="4" class="float-right" v-else-if="user.role === 'user' ">
        Status: {{status}}
      </b-col>
    </b-row>
    <b-row class="mt-3">
      <b-col>
        <b-card bg-variant="light" header="Händler" class="text-center">
          <b-card-text>
            <span>{{ order.merchant.name }}</span><br />
            <span>{{ order.merchant.street }}</span><br />
            <span>{{ order.merchant.zip }}</span><br />
            <span>{{ order.merchant.phone }}</span><br />
          </b-card-text>
        </b-card>
      </b-col>
      <b-col >
        <b-card bg-variant="light" header="Kunde" class="text-center">
          <b-card-text>
            <span>{{ order.customer.name }}</span><br />
            <span>{{ order.customer.street }}</span><br />
            <span>{{ order.customer.zip }}</span><br />
            <span>{{ order.customer.phone }}</span><br />
          </b-card-text>
        </b-card>
      </b-col>
    </b-row>
    <b-row class="mt-3">
      <b-col md="6" >
      <b-btn class="m-2" v-b-toggle.shoppinglistCol variant="secondary">Einkaufsliste</b-btn>
      <b-collapse class="mycollapse shoppinglist" id="shoppinglistCol">
          <ul>
            <li v-for="product in order.products" :key="product.id">
              {{ product.amount }} x {{ product.name }} a {{ product.prize }} € = {{ product.amount*product.prize }} €
            </li>
            <p><u>Gesamt: {{ total }} €</u></p>
          </ul>
      </b-collapse>
    </b-col>
      <b-col md="6">
        <b-btn class="m-2" v-b-toggle.chatCol variant="secondary">Nachrichten</b-btn>
        <b-collapse class="mycollapse" id="chatCol">
          <Chat :user="id" />
        </b-collapse>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import Chat from '@/components/Chat.vue'
export default {
  name: 'Order',
  data () {
    return {
      user: {
        id: 1,
        role: 'DEALER'
      },
      order: {
        status: 4,
        merchant: {
          id: 1,
          name: 'Pizzeria La Casetta',
          street: 'Meyerstraße 198',
          zip: '28201 Bremen',
          phone: '0421 554762'
        },
        customer: {
          id: 2,
          name: 'Tammo Steffens',
          street: 'Samplestreet 26',
          zip: '39221 Berlin',
          phone: '+4981223412'
        },
        products: [{ id: 1, name: 'Pizza Margherita', amount: '1', prize: '4.00' }, { id: 2, name: 'Pizza Salami', amount: '1', prize: '5.00' }]
      },
      StatusOptions: ['Offen', 'Angenommen', 'Bearbeitung', 'Lieferung', 'Abgeschlossen', 'Archiv'],
      selected: 'Offen',
      type: 'Kunde'
    }
  },
  methods: {
    getOrder () {
      // get order by this.id
    },
    changeUser (event) {
      if (this.type === 'Kunde') {
        this.user = { id: 1, role: 'CUSTOMER' }
      } else {
        this.user = { id: 1, role: 'DEALER' }
      }
    }
  },
  computed: {
    total () {
      return this.order.products.map(p => p.prize * p.amount).reduce((accumulator, currentValue) => accumulator + currentValue)
    }
  },
  components: {
    Chat
  },
  props: {
    id: String
  }

}
</script>

<style scoped>
@media (max-width: 767.9px) {
  .mycollapse{
    visibility: block;
  }
  }
  @media (min-width: 768px) {
  .mycollapse{
    visibility: block;
  }
}

.shoppinglist {
  text-align: center;
}

li {
  list-style-type: none;
}
</style>
