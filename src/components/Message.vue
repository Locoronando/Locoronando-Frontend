
<template>
    <div class="field">
      <b-row>
        <b-col v-if="message.send" />
        <b-col  class="message m-1 ml-3" v-bind:class="{  send : message.send}">
            <div class="text" v-bind:class="{  right : message.send}">
              {{message.message}}<br />
            </div>
            <span v-bind:class="{  right : message.send}" class="time">{{message.time}}</span>
        </b-col>
        <b-col v-if="!message.send" />
      </b-row>
    </div>
</template>

<script>
export default {
  name: 'Message',
  props: {
    message: Object
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
    border: solid #671ecb 1px;
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
.time {
  font-size: x-small;
  color: #A9A9A9;
}
</style>
