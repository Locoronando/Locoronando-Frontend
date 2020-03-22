<template>
  <b-container class="my-4">
    <b-card no-body>
      <b-tabs card>
        <b-tab title="Kunde" active>
          <h4>Kundenregistrierung</h4>

          <b-alert
            v-for="error in this.customerErrors"
            :key="error"
            show
            variant="danger"
          >{{ error }}</b-alert>

          <b-form id="customer" @submit.prevent="submitCustomer" novalidate>
            <b-form-group id="input-group-1" label="Vorname:" label-for="input-1">
              <b-form-input id="input-1" v-model="customerForm.firstname" placeholder="Vorname"></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-2" label="Nachname:" label-for="input-2">
              <b-form-input id="input-2" v-model="customerForm.surname" placeholder="Nachname"></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-3" label="Email:" label-for="input-3">
              <b-form-input
                id="input-3"
                v-model="customerForm.email"
                placeholder="Email"
                type="email"
              ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-4" label="Passwort:" label-for="input-4">
              <b-form-input
                id="input-4"
                v-model="customerForm.password"
                placeholder="Passwort"
                type="password"
              ></b-form-input>
            </b-form-group>

            <hr class="my-6" />

            <b-button @click="checkCustomerForm" variant="primary">Registrieren</b-button>
          </b-form>
        </b-tab>
        <b-tab title="Händler">
          <h4>Händleregistrierung</h4>

          <p>Als Händler müssen Sie mehr Informationen als ein Kunde beim registrieren angeben. Außerdem werden Sie nach dem Vorgang manuell bestätigt.</p>

          <b-alert
            v-for="error in this.merchantErrors"
            :key="error"
            show
            variant="danger"
          >{{ error }}</b-alert>

          <b-form id="merchant" @submit.prevent="submitMerchant" novalidate>
            <b-form-group id="input-group-5" label="Inhaber:" label-for="input-5">
              <b-form-input
                id="input-5"
                v-model="merchantForm.owner"
                placeholder="Inhaber"
                required
              ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-6" label="Name des Geschäfts:" label-for="input-6">
              <b-form-input id="input-6" v-model="merchantForm.name" placeholder="Name"></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-7" label="Straße:" label-for="input-7">
              <b-form-input id="input-7" v-model="merchantForm.address.street" placeholder="Straße"></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-8" label="Hausnummer:" label-for="input-8">
              <b-form-input
                id="input-8"
                v-model="merchantForm.address.houseNumber"
                placeholder="Hausnummer"
              ></b-form-input>
            </b-form-group>

            <b-form-group
              id="input-group-9"
              class="not-required"
              label="Adresszusatz:"
              label-for="input-9"
            >
              <b-form-input
                id="input-9"
                v-model="merchantForm.address.additive"
                placeholder="Adresszusatz"
              ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-10" label="Postleitzahl:" label-for="input-10">
              <b-form-input
                id="input-10"
                v-model="merchantForm.address.plz"
                placeholder="Postleitzahl"
              ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-11" label="Ort:" label-for="input-11">
              <b-form-input id="input-11" v-model="merchantForm.address.city" placeholder="Ort"></b-form-input>
            </b-form-group>

            <b-form-group
              id="input-group-12"
              class="not-required"
              label="Telefonnummer:"
              label-for="input-12"
            >
              <b-form-input id="input-12" v-model="merchantForm.phone" placeholder="Telefonnummer"></b-form-input>
            </b-form-group>

            <b-form-group
              id="input-group-13"
              class="not-required"
              label="Öffnungszeiten:"
              label-for="input-13"
            >
              <b-form-input id="input-13" v-model="merchantForm.times" placeholder="Öffnungszeiten"></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-14" label="Email:" label-for="input-14">
              <b-form-input
                id="input-14"
                v-model="merchantForm.email"
                placeholder="Email"
                type="email"
              ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-15" label="Passwort:" label-for="input-15">
              <b-form-input id="input-15" v-model="merchantForm.password" placeholder="Passwort" type="password"></b-form-input>
            </b-form-group>

            <hr class="my-6" />

            <b-button @click="checkMerchantForm" variant="primary">Registrieren</b-button>
          </b-form>
        </b-tab>
      </b-tabs>
    </b-card>
  </b-container>
</template>

<script>
export default {
  name: 'Registrieren',
  data () {
    return {
      customerErrors: [],
      customerForm: {
        firstname: '',
        surname: '',
        email: '',
        password: ''
      },
      merchantErrors: [],
      merchantForm: {
        owner: '',
        name: '',
        address: {
          street: '',
          houseNumber: '',
          additive: '',
          plz: undefined,
          city: ''
        },
        phone: '',
        times: '',
        email: '',
        password: ''
      },
      emailRegex: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    }
  },
  methods: {
    checkCustomerForm (event) {
      this.customerErrors = []

      if (this.customerForm.firstname === '') {
        this.customerErrors.push('Bitte gib einen Vornamen ein')
      }

      if (this.customerForm.surname === '') {
        this.customerErrors.push('Bitte gib einen Nachnamen ein')
      }

      if (!this.emailRegex.test(this.customerForm.email)) {
        this.customerErrors.push('Keine gültige Email')
      }

      if (this.customerForm.password.length < 8) {
        this.customerErrors.push(
          'Das Password muss mindestens 8 Zeichen lang sein'
        )
      }

      if (!this.customerErrors.length) {
        console.log('Register customer: ' + JSON.stringify(this.customerForm))
        localStorage.setItem('login', true)
        localStorage.setItem('user', this.customerForm.firstname + ' ' + this.customerForm.surname)
        this.$router.push('/')
      }
    },
    checkMerchantForm (event) {
      this.merchantErrors = []

      if (this.merchantForm.owner === '') {
        this.merchantErrors.push('Bitte gib einen Inhaber ein')
      }

      if (this.merchantForm.name === '') {
        this.merchantErrors.push('Bitte gib einen Geschäftsnamen ein')
      }

      if (this.merchantForm.address.street === '') {
        this.merchantErrors.push('Bitte gib eine Straße ein')
      }

      if (this.merchantForm.address.houseNumber === '') {
        this.merchantErrors.push('Bitte gib eine Hausnummer ein')
      }

      if (this.merchantForm.address.plz === '') {
        this.merchantErrors.push('Bitte gib eine Postleitzahl ein')
      }

      if (this.merchantForm.address.city === '') {
        this.merchantErrors.push('Bitte gib einen Ort ein')
      }

      if (!this.emailRegex.test(this.merchantForm.email)) {
        this.merchantErrors.push('Keine gültige Email')
      }

      if (this.merchantForm.password.length < 8) {
        this.merchantErrors.push(
          'Das Password muss mindestens 8 Zeichen lang sein'
        )
      }

      if (!this.merchantErrors.length) {
        console.log('Register merchant: ' + JSON.stringify(this.merchantForm))
      }
    }
  }
}
</script>

<style scoped>
.form-group:not(.not-required)::before {
  content: "*";
  color: red;
  float: left;
  margin-right: 4px;
}
</style>
