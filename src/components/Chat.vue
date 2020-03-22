<template>
  <b-row>
    <b-col id="chat" >
      <div id="messages">
        <div v-for="message in messages" :key="message.message">
            <Message  :message="message" :isSend="isSend(message)"></Message>
        </div>
      </div>
      <b-form-input class="input m-2" ref="input" type="text" v-on:keyup.enter="sendMessage" v-model="input" placeholder="Nachricht" />
    </b-col>
  </b-row>
</template>

<script>
import Message from '@/components/Message.vue'
import SockJS from 'sockjs-client'
import Stomp from 'webstomp-client'

export default {
  name: 'Chat',
  data () {
    return {
      messages: [],
      info: Object,
      input: '',
      socket: null, // io(window.location.href.split('#')[0]),
      stompClient: null,
      id: 0,
      send_message: null,
      connected: false

    }
  },
  props: {
    user: String,
    partner: String
  },
  created: function () {
    console.log(this.user)
    this.id = this.$route.params.id
    this.loadMessages()
    this.getInfo()
    this.connect()
  },
  components: {
    Message
  },
  methods: {
    scrollDown () {
      // const view = document.getElementById('messages')
      // view.scrollTop = view.scrollHeight
    },
    loadMessages () {
      // axios.get( window.location.href.split('#')[0] + 'chat/' + this.id).then(res => {
      this.messages = [{ message: 'Hallo, ich bin ein Kunde.', type: 'PRODUCT', productId: 3 }]
      this.scrollDown()
      // }).catch(error => console.log(error))
    },
    connect () {
      this.socket = new SockJS('http://localhost:8080/socket-registry')
      this.stompClient = Stomp.over(this.socket)
      console.log('Connect')
      this.stompClient.connect(
        {},
        frame => {
          this.connected = true
          console.log(frame)
          this.register()
          this.stompClient.subscribe('/user/queue/message/new', tick => {
            console.log('New Msg')
            console.log(tick)
            this.messages.push({ message: 'Neue Nachricht', type: 'PRODUCT', productId: 3 })
          })
        },
        error => {
          console.log(error)
          this.connected = false
        }
      )
    },
    getInfo () {
      this.info = {}
    },
    isSend (message) {
      return this.user.role === 'user'
    },
    register () {
      if (this.stompClient && this.stompClient.connected) {
        var msg = ''
        if (this.user === '1') {
          msg = { participant: 'CUSTOMER', id: 1 }
        } else {
          msg = { participant: 'DEALER', id: 1 }
        }
        this.stompClient.send('/register', JSON.stringify(msg), {})
        this.messages.push({ message: 'Willkommen', type: 'PRODUCT', productId: 3 })
        this.input = ''
      }
    },
    sendMessage () {
      console.log('Send')
      if (this.stompClient && this.stompClient.connected) {
        // var msg = { id: 4, text: this.input, user: { id: 1, name: 'Oli' } }
        var msg = { message: this.input, type: 'PRODUCT', productId: 3 }
        this.stompClient.send('/send/' + 1, JSON.stringify(msg), {})
        this.messages.push(msg)
        this.input = ''
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
