
<template>

    <b-modal @close="send" id="requestModal" ref="modal" title="Anfrage senden">
      <div v-if="error" class="alert alert-danger"> {{ this.error }}</div>
      <b-row>
        <b-col>
            <b-form-textarea
                v-model="request"
                class="form-control mr-sm-2"
                placeholder="Anfrage"
            />
        </b-col>
        <b-col v-if="products">
            <ul>
            <li v-for="p in products" :key="p.product.id">
              {{ p.amount }} x {{ p.product.name }} a {{ p.product.prize }} €
            </li>
            </ul>
        </b-col>
      </b-row>

    </b-modal>
</template>

<script>
import SockJS from 'sockjs-client'
import Stomp from 'webstomp-client'

export default {
  name: 'request-modal',
  data () {
    return {
      input: '',
      socket: null, // io(window.location.href.split('#')[0]),
      stompClient: null,
      id: 0,
      send_message: null,
      connected: false,
      request: ''
    }
  },
  props: {
    products: Object,
    merchant: Object,
    customer: Object
  },
  created: function () {
    window.addEventListener('beforeunload', this.disconnect)
  },
  methods: {
    send (bvModalEvt) {
      if (bvModalEvt.trigger === 'ok') {
        this.socket = new SockJS('http://173.193.102.115:31353/socket-registry')
        this.stompClient = Stomp.over(this.socket)
        console.log('Connect')
        this.stompClient.connect(
          {},
          frame => {
            this.connected = true
            console.log(frame)
            this.register()
            this.send()
          },
          error => {
            console.log(error)
            this.connected = false
          }
        )
      }
    },
    register () {
      if (this.stompClient && this.stompClient.connected) {
        var msg = { participant: 'CUSTOMER', id: this.customer.id }
        this.stompClient.send('/register', JSON.stringify(msg), {})
      }
    },
    sendMessage () {
      console.log('Send')
      if (this.stompClient && this.stompClient.connected) {
        var msg = { message: this.request + JSON.stringify(this.products), send: true, type: 'PRODUCT', productId: 3 }
        this.stompClient.send('/send/' + this.merchant.id, JSON.stringify(msg), {})
      }
    },
    disconnect () {
      if (this.stompClient) {
        this.stompClient.disconnect()
      }
      this.connected = false
    },
    tickleConnection () {
      this.connected ? this.disconnect() : this.connect()
    }
  },
  beforeDestroy () {
    this.disconnect()
  }
}
</script>
<style>
@media (max-width: 767.9px) {
  #messages{
    height: 70vh;
    overflow-y: scroll;
  }
  }
  @media (min-width: 768px) {
  #messages{
    height: auto;
    min-height: 20vh;
    max-height: 30vh;
    overflow-y: scroll;
  }
}

  #chat{
    border-radius: 5px;
    background-color: #ededed;
  }

  .input{
    width: 95%;
    height: 30px;
    border: none;
    font-size: medium;
    border-radius: 5px;
  }

</style>
