<template>
  <b-navbar variant="dark" type="dark" toggleable="md">
    <b-navbar-toggle target="nav-text-collapse"></b-navbar-toggle>
    <b-collapse id="nav-text-collapse" is-nav>
      <b-navbar-nav>
      <b-nav-item to="/">
        <h3>Locoronando</h3>
      </b-nav-item>
      <b-nav-item to="/register">
        <b-nav-text>Registrieren</b-nav-text>
      </b-nav-item>
      <b-nav-item to="/login">
        <b-nav-text>Login</b-nav-text>
      </b-nav-item>
      <b-nav-item v-if="this.login" to="/transactions">
        <b-nav-text>Bestellungen</b-nav-text>
      </b-nav-item>
    </b-navbar-nav>
    <b-navbar-nav class="ml-md-auto">
      <b-nav-form>
        <b-form-input v-model="this.query" class="mb-2 mb-md-0 mr-md-2" placeholder="Suche Händler"></b-form-input>
        <b-button @click.prevent="search" class="mb-1 mb-md-0">Suche</b-button>
      </b-nav-form>
    </b-navbar-nav>
    </b-collapse>
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
      query: '',
      login: localStorage.getItem('login')
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
