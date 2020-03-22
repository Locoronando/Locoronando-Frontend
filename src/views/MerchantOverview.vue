<template>
  <b-container>
    <b-row v-if="this.merchant.header" class="my-4">
      <img class="col-12" :src="this.merchant.header" />
    </b-row>

    <b-row class="my-4">
      <b-col class="col-sm-7 parent">
        <h3 class="mb-4">{{ this.merchant.name }}</h3>
        <div class="flex">
          <span>{{ this.merchant.description }}</span>

          <div>
            <p class="mt-1">
              <span>{{ this.merchant.address.street }}</span>
              <br />
              <span>{{ this.merchant.address.city }}</span>
              <br />
              <span>{{ this.merchant.phone }}</span>
              <br />
            </p>
          </div>
        </div>
      </b-col>

      <img class="col-sm-5" :src="this.merchant.map" />
    </b-row>

    <b-row class="mt-2 mb-4">

      <b-col v-if="contentType === 'application/pdf'">
        <Pdf :src="products.pdf" :page="page" @num-pages="maxPages = $event"></Pdf>
        <b-row align-h="around">
          <button class="col-3 btn btn-outline-success font-weight-bold" @click="changePage(-1)">-</button>
          <span>{{ this.page }}</span>
          <button class="col-3 btn btn-outline-success font-weight-bold" @click="changePage(1)">+</button>
        </b-row>
      </b-col>

      <div v-if="contentType === 'application/json'">
        <b-card-group deck>
          <div id="cards" class="col-sm-3" v-for="product in products" :key="product.id">
            <b-card
              class="mb-4"
              @click="addToCart(product.id)"
              :title="product.name"
              :sub-title="product.prize + ' €'"
            >
              <b-card-text>Lorem ipsum dolor sit amet, consetetur sadipscing elitr</b-card-text>
            </b-card>
          </div>
        </b-card-group>
      </div>

      <div v-if="contentType === 'image/jpeg'">
        <img :src="products" />
      </div>
    </b-row>

    <button class="request-btn btn btn-success">Anfrage {{ items > 0 ? items : '' }}</button>
  </b-container>
</template>

<script>
import Pdf from 'vue-pdf'

export default {
  name: 'Overview',
  components: {
    Pdf
  },
  data () {
    return {
      id: this.$route.params.id,
      merchant: {
        name: 'San Marco',
        description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est ',
        header: 'https://www.kurhaus-salinenparc.de/wp-content/uploads/2017/09/header-restaurant-bar.jpg',
        address: {
          street: 'Samplestreet 42',
          city: '39221 Berlin'
        },
        phone: '+4981281283',
        map: 'https://images-na.ssl-images-amazon.com/images/I/81AH5Xe0XXL._SX425_.jpg'
      },
      products: undefined,
      contentType: undefined,
      page: 1,
      maxPages: 0,
      cart: {},
      items: 0
    }
  },
  methods: {
    changePage (i) {
      if (this.page + i > 0 && this.page + i <= this.maxPages) {
        this.page += i
      }
    },
    loadMerchant () {
      // get data from this.id
    },
    addToCart (id) {
      if (this.cart[id] !== undefined) {
        this.cart[id] += 1
      } else {
        this.cart[id] = 1
      }
      this.items++
    },
    loadProducts () {
      // this.contentType = 'application/pdf'
      // this.products = { pdf: 'https://pizzeria-ristorante-san-marco.de/dokumente/speisekarte.pdf' }
      this.contentType = 'application/json'
      this.products = [
        { id: 1, name: 'Test 1', prize: '128' },
        { id: 2, name: 'Test 2', prize: '128' },
        { id: 3, name: 'Test 3', prize: '128' },
        { id: 4, name: 'Test 4', prize: '128' },
        { id: 5, name: 'Test 5', prize: '128' }
      ]
    }
  },
  beforeMount () {
    this.loadMerchant()
    this.loadProducts()
  }
}
</script>

<style scoped>
.parent {
  display: flex;
  flex-direction: column;
}

.flex {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;
}

.request-btn {
  position: fixed;
  bottom: 20px;
  right: 20px;
}
</style>
