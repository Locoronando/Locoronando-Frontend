<template>
  <b-navbar variant="dark" toggleable="md">
    <b-navbar-nav>
      <b-nav-item to="/">
        <h3>Locoronando</h3>
      </b-nav-item>
    </b-navbar-nav>
    <b-navbar-nav class="ml-md-auto">
      <b-nav-form>
        <b-form-input v-model="query" class="mb-2 mb-md-0 mr-md-2" placeholder="Suche Händler"></b-form-input>
        <b-button @click.prevent="search" class="mb-1 mb-md-0">Suche</b-button>
      </b-nav-form>

      <b-button class="my-1 my-md-0 mx-2">Register</b-button>
      <b-button class="my-1 my-md-0 mx-2">Login</b-button>
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
export default {
  methods: {
    search (event) {
      console.log(this.query)
      this.query = ''
    }
  },
  data () {
    return {
      query: ''
    }
  }
}
</script>

<style scoped>

h3 {
  color: white;
  margin: 0;
}

a {
  text-decoration: none;
}

</style>
