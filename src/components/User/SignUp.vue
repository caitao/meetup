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
      return this.password !== this.comfirmPassword ? 'Password do not match.' : ''
    },
    // checkIfUserExists () {
    //   this.$store.dispatch('checkIfUserExists', {email: this.email})
    //   return this.$store.getters.emailExist ? 'Email already exist.' : ''
    // },
    user () {
      return this.$store.getters.user
    }
  },
  watch: {
  // 判断是否已已经注册成功，如果注册成功且客户信息不为空或者未定义，则返回主页
    user (value) {
      if (value !== null && value !== undefined) {
        this.$router.push('/')
      }
    }
  },
  methods: {
    onSignup () {
      this.$store.dispatch('signUserUp', {email: this.email, password: this.password})
    }
  }
}
</script>

<style lang="css">
</style>
