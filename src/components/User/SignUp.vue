<template lang="html">
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <h4>Sign UP</h4>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12>
        <form @submit.prevent="onSignup">
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="email"
                label="Email"
                id="email"
                v-model="email"
                type="email"
                required>
              </v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="password"
                label="Password"
                id="password"
                v-model="password"
                type="password"
                required>
              </v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="comfirmPassword"
                label="Comfirm Password"
                id="comfirmPassword"
                v-model="comfirmPassword"
                :rules="[comparePassword]"
                type="password">
              </v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-btn
              class="primary"
              :disabled="!formIsValid"
              type="submit">Sign Up</v-btn>
            </v-flex>
          </v-layout>
        </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      email: '',
      password: '',
      comfirmPassword: ''
    }
  },
  computed: {
    formIsValid () {
      return this.email !== '' &&
        this.password !== ''
    },
    comparePassword () {
      return this.password !== this.comfirmPassword ? 'Password do not match' : ''
    }
  },
  methods: {
    onSignup () {
      console.log({email: this.email, password: this.password, comfirmPassword: this.comfirmPassword})
    }
  }
}
</script>

<style lang="css">
</style>
