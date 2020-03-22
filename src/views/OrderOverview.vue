<template>
  <b-container>
  <h1>Transactions</h1>
      <b-row class="m-4">
        <b-col><b>ID</b></b-col>
        <b-col>Händler</b-col>
        <b-col>Preis</b-col>
        <b-col>Status</b-col>
      </b-row>
      <div  class="m-4" v-for="id in this.requests" :key="id">
      <b-row  @click="openOrder(id)">
        <b-col>{{ id }}</b-col>
        <b-col>San Marco</b-col>
        <b-col>25 €</b-col>
        <b-col>{{ status }}</b-col>
      </b-row>
    </div>
  </b-container>
</template>

<script>
export default {
  name: 'OrderOverview',
  methods: {
    openOrder (id) {
      this.$router.push('/order/' + id)
    }
  },
  data () {
    return {
      requests: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      status: 'Offen'
    }
  }
}
</script>

<style scoped>
</style>
