<template>
  <b-container class="overview">
    <b-row>
      <img class="col-12" :src="header" />
    </b-row>
    <b-row class="mt-2">
      <b-col class="col-sm-7 " >
        <h3>{{ name }}</h3>
        <div>{{ description }}</div>
        <p class="adress mt-1">
          <span>{{ street }}</span><br />
          <span>{{ zip }}</span><br />
          <span>{{ phone }}</span><br />
        </p>
      </b-col>
      <img class="col-sm-5 map" :src="map" />
    </b-row>
    <b-row class="mt-2">

      <div class="col-1"></div>
      <div class="col-10" v-if="contentType === 'application/pdf'">
        <Pdf
          :src="products.pdf"
          :page = "currentPage"
        ></Pdf>
        <b-row>
          <b-col />
          <button class="col-3 btn btn-outline-success font-weight-bold" @click="changePage(-1)"> - </button>
          <b-col />
          <button class="col-3 btn btn-outline-success font-weight-bold" @click="changePage(1)"> + </button>
          <b-col />
        </b-row>
      </div>
      <div class="col-1"></div>

      <div v-if="contentType === 'application/json'">
        <b-card-group deck>
          <div id="cards" class="col-sm-3" v-for="product in products" :key="product.id">
            <b-card class="mb-4"
            @click="addToCart(product.id)"
            :title="product.name"
            :sub-title="product.prize + ' €'" >
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
  name: 'Home',
  data () {
    return {
      header: 'https://www.kurhaus-salinenparc.de/wp-content/uploads/2017/09/header-restaurant-bar.jpg',
      name: 'San Marco',
      description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est ',
      street: 'Samplestreet 27',
      zip: '39221 Berlin',
      phone: '+4981281283',
      map: 'https://images-na.ssl-images-amazon.com/images/I/81AH5Xe0XXL._SX425_.jpg',
      products: null,
      contentType: null,
      pageCount: 0,
      currentPage: 1,
      cart: {},
      items: 0
    }
  },
  methods: {
    changePage (i) {
      if (this.currentPage > 0 || this.currentPage < this.pageCount) {
        this.currentPage = this.currentPage + i
        console.log(this.currentPage)
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
      this.$nextTick(function () {
        console.log('Update UI')
      })
    },
    loadProducts () {
      // this.contentType = 'application/pdf'
      // this.products = { pdf: 'https://pizzeria-ristorante-san-marco.de/dokumente/speisekarte.pdf', pages: 4 }
      this.contentType = 'application/json'
      this.products = [{ id: 1, name: 'Test1', prize: '128' }, { id: 2, name: 'Test2', prize: '128' }, { id: 3, name: 'Test3', prize: '128' }, { id: 4, name: 'Test4', prize: '128' }, { id: 5, name: 'Test5', prize: '128' }]
      this.$nextTick(function () {
        console.log('Update UI')
      })
    }
  },
  components: {
    Pdf
  },
  props: {
    id: String
  },
  beforeMount () {
    this.loadMerchant()
    this.loadProducts()
  }
}

</script>

<style scoped>
.map{
  height: 100%;
}

.request-btn{
  position: fixed;
  bottom: 20px;
  right: 20px;
}
</style>
