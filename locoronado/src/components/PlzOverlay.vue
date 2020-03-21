<template>
  <div>
  <b-modal ref="welcomeModal" id="welcomeModal" title="Willkommen" @hide="sendData" >
    <div class="search pr-m-1">
        <div class="">
          <b-form-input class="form-control mr-sm-2" @keydown.native="hideModal" v-model="input" type="search" placeholder="Bitte geben Sie Ihre Postleizahl an" aria-label="Search" />
        </div>
      </div>
  </b-modal>
  </div>
</template>

<script>
export default {
  name: 'top',
  methods: {

    hideModal (event) {
      if (event.which === 13) {
        this.$refs.welcomeModal.hide()
      }
    },
    sendData (bvModalEvt) {
      if (bvModalEvt.trigger === 'ok') {
        console.log(this.input)
      }
    }
  },
  props: {
    input: String
  }
}
</script>
