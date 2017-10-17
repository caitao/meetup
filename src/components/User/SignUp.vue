<template lang="html">
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <h4>Sign UP</h4>
        <div v-if="'error' !== ''">{{ error }}</div>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12>
        <form @submit.prevent="onSignup">
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="username"
                label="MobilePhone/Email"
                id="username"
                v-model="username"
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
      username: '',
      password: '',
      comfirmPassword: '',
      error: ''
    }
  },
  computed: {
    formIsValid () {
      return this.username !== '' &&
        this.password !== ''
    },
    comparePassword () {
      return this.password !== this.comfirmPassword ? 'Password do not match.' : ''
    },
    // checkIfUserExists () {
    //   this.$store.dispatch('checkIfUserExists', {mobilePhone: this.mobilePhone})
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
      this.$store.dispatch('signUserUp', {username: this.username, password: this.password})
    }
  }
}
</script>

<style lang="css">
</style>
