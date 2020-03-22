<template>
  <b-container>
    <select v-model="type" @change="changeUser" hidden>
      <option>Kunde</option>
      <option>Händer</option>
    </select>
    <b-row class="mt-1">
      <b-col cols="8" >
        <h2>Order-Nr.: 1</h2>
      </b-col>
      <b-col cols="4" class="float-right" v-if="user.role === 'merchant' && order.status !== 5">
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
      <b-col cols="1" class="d-none d-lg-block d-xl-block" style="padding: 0px;" />
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
      <b-col md="5" class="shoppinglist">
      <b-btn class="m-2" block v-b-toggle.shoppinglistCol variant="secondary">Einkaufsliste</b-btn>
      <b-collapse class="mycollapse" id="shoppinglistCol">
          <ul>
            <li v-for="product in order.products" :key="product.id">
              {{ product.amount }} x {{ product.name }} a {{ product.prize }} € = {{ product.amount*product.prize }} €
            </li>
            <p><u>Gesamt: {{ total }} €</u></p>
          </ul>
      </b-collapse>
    </b-col>
    <b-col cols="1" class=" mr-5 d-none d-lg-block d-xl-block"  />

      <b-col md="5">
        <b-btn class="m-2" block v-b-toggle.chatCol variant="secondary">Nachrichten</b-btn>
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
          name: 'San Marco',
          street: 'Samplestreet 27',
          zip: '39221 Berlin',
          phone: '+4981281283'
        },
        customer: {
          id: 2,
          name: 'Maxi Muster',
          street: 'Samplestreet 26',
          zip: '39221 Berlin',
          phone: '+4981223412'
        },
        products: [{ id: 1, name: 'Test1', amount: '1', prize: '128' }, { id: 2, name: 'Test2', amount: '2', prize: '128' }, { id: 3, name: 'Test3', amount: '1', prize: '128' }, { id: 4, name: 'Test4', amount: '1', prize: '128' }, { id: 5, name: 'Test5', amount: '1', prize: '128' }]
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
    total: function () {
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
