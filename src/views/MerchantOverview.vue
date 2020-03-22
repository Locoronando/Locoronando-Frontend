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
              <b-card-text>{{ product.description }}</b-card-text>
            </b-card>
          </div>
        </b-card-group>
      </div>

      <div v-if="contentType === 'image/jpeg'">
        <img :src="products" />
      </div>
    </b-row>

    <button @click="createOrder" v-if="this.login" class="request-btn btn btn-success">Anfrage {{ items > 0 ? items : '' }}</button>
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
      merchant: undefined,
      products: undefined,
      contentType: undefined,
      page: 1,
      maxPages: 0,
      cart: {},
      items: 0,
      login: localStorage.getItem('login')
    }
  },
  methods: {
    changePage (i) {
      if (this.page + i > 0 && this.page + i <= this.maxPages) {
        this.page += i
      }
    },
    createOrder () {
      this.$router.push('/order/1')
    },
    loadMerchant (id) {
      // get data from this.id
      if (id === 1) {
        this.merchant = {
          name: 'Pizzeria La Casetta',
          description: 'Restaurant mit schlichtem Interieur, traditioneller italienischer Küche und Spezialangeboten an 3 Wochentagen.',
          header: 'https://pizzeria-casetta-bremen.snack-online.com/images/custom/thumb880/spaghetti_3547078_1920.jpg',
          address: {
            street: 'Meyerstraße 198',
            city: '28201 Bremen'
          },
          phone: '0421 554762',
          map: 'https://www.pflegesuche.de/map/staticmap.php?center=53.0952937,8.8093942&zoom=14&size=400x311&maptype=mapnik&markers=53.0952937,8.8093942,bullseye'
        }
      } else {
        this.merchant = {
          name: 'San Marco',
          description: 'Riesige Auswahl an italienischen Speisen von Antipasti bis Dessert in rustikalem Restaurant mit üppigem Dekor.',
          header: 'https://www.kurhaus-salinenparc.de/wp-content/uploads/2017/09/header-restaurant-bar.jpg',
          address: {
            street: 'Sonnenallee 42',
            city: '39221 Berlin'
          },
          phone: '+49 812 812 83',
          map: 'https://images-na.ssl-images-amazon.com/images/I/81AH5Xe0XXL._SX425_.jpg'
        }
      }
    },
    addToCart (id) {
      if (this.cart[id] !== undefined) {
        this.cart[id] += 1
      } else {
        this.cart[id] = 1
      }
      this.items++
    },
    loadProducts (id) {
      if (id === 1) {
        this.contentType = 'application/json'
        this.products = [
          {
            id: 1,
            name: 'Pizza Margherita',
            prize: '4.00',
            description: 'Belegt wird sie mit Tomatensauce, Mozzarella und ein paar frischen Basilikumblättern. So einfach und so lecker!'
          },
          {
            id: 2,
            name: 'Pizza Salami',
            prize: '5.00',
            description: 'Pizza aus frischem Teigboden, mit Tomatensauce, Salami und Goudakäse.'
          },
          {
            id: 3,
            name: 'Pizza Tonno',
            prize: '5.50',
            description: 'Pizza aus frischem Teigboden, mit Tomatensauce, Thunfisch, Zwiebeln und Goudakäse'
          },
          {
            id: 4,
            name: 'Pizza Prosciutto',
            prize: '5.00',
            description: 'Pizza aus frischem Teigboden, mit Tomatensauce, Hinterschinken und Goudakäse.'
          },
          {
            id: 5,
            name: 'Pizza Gourmet',
            prize: '7.50',
            description: 'Pizza aus frischem Teigboden mit Sauce Hollandaise, Lachswürfeln, Spinat, würzigem Hirtenkäse, Knoblauch und Goudakäse.'
          }
        ]
      } else {
        this.contentType = 'application/pdf'
        this.products = { pdf: 'https://pizzeria-ristorante-san-marco.de/dokumente/speisekarte.pdf' }
      }
    }
  },
  beforeMount () {
    this.loadMerchant(Number(this.$route.params.id))
    this.loadProducts(Number(this.$route.params.id))
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
