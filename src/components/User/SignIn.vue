<template lang="html">
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <h4>Sign In</h4>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12>
        <form @submit.prevent="onSignIn">
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
              <v-btn
              class="primary"
              :disabled="!formIsValid"
              type="submit">Sign In</v-btn>
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
      password: ''
    }
  },
  computed: {
    formIsValid () {
      return this.email !== '' &&
        this.password !== ''
    },
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
    onSignIn () {
      this.$store.dispatch('signUserIn', {username: this.username, password: this.password})
    }
  }
}
</script>

<style lang="css">
</style>
