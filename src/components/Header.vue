<template>
  <div>
    <div class="navbar fixed-top container-fluid bg-light">
        <span class=".navbar-brand col-1 font-weight-bold">Locoronado</span>
      <div class="nav-item search search-bar pr-sm-1">
        <div class=" form-inline">
          <b-form-input class="form-control mr-sm-2" @keydown.native="search" v-model="input" type="search" placeholder="Händler suchen" aria-label="Search" />
        </div>
      </div>
      <Button class="navbar-right nav-item col-m-1 btn btn-outline-success">Login</Button>
    </div>
    <div class="container-fluid">
      <div class="nav-item search_mobile search-bar col-12 pr-m-1">
        <div class="form-inline">
          <b-form-input class="form-control mr-sm-2" @keydown.native="search" v-model="input" type="search" placeholder="Händler suchen" aria-label="Search" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'top',
  methods: {
    search (event) {
      if (event.which === 13) {
        console.log(this.input)
      }
    }
  },
  props: {
    input: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@media (max-width: 767.9px) {
.search{
  visibility: hidden;
}
.search_mobile{
  visibility: visible;
}
}
@media (min-width: 768px) {
.search{
  visibility: visible;
}
.search_mobile{
  visibility: hidden;
}
}

h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.login {
  position: absolute;
  right: 1vw;
}
</style>
