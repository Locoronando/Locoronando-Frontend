
<template>
    <div class="field">
      <b-row>
        <b-col v-if="isSend" />
        <b-col  class="message m-1 ml-3" v-bind:class="{  send : isSend}">
            <div class="text" v-bind:class="{  right : isSend}">{{message.message}}</div>
            <span>{{message.date}}</span>
        </b-col>
        <b-col v-if="!isSend" />
      </b-row>
    </div>
</template>

<script>
export default {
  name: 'Message',
  props: {
    message: Object,
    isSend: Boolean
  },
  methods: {
    getUser (id) {
      return '/user/' + id
    }
  }
}
</script>
<style>
.message{
    border: solid #ecb671 1px;
    border-radius: 5px;
    background-color: #fff;
    word-break: break-word;
}
.user{
    text-align: right;
}
.field{
    width: 95%;
}
.send{
    border: solid #ecb671 1px;
}

.text{
    text-align: left;
    padding-left: 10px;
    font-size: 1.1em;
}

.text.right{
    text-align: right;
    padding-right: 10px;
}
</style>
