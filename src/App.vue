<template>
<v-app light>
  <v-navigation-drawer  temporary v-model = "sideNav"  >
     <v-list class="pa-0">
       <v-list-tile avatar tag="div">
         <v-list-tile-avatar>
           <img src="https://randomuser.me/api/portraits/men/85.jpg" />
         </v-list-tile-avatar>
         <v-list-tile-content>
           <v-list-tile-title>caitao</v-list-tile-title>
         </v-list-tile-content>
       </v-list-tile>
     </v-list>
     <v-list class="pt-0" dense>
       <v-divider></v-divider>
       <v-list-tile v-for="item in menuItems" :key="item.title" :to="item.link">
         <v-list-tile-action>
           <v-icon>{{ item.icon }}</v-icon>
         </v-list-tile-action>
         <v-list-tile-content>
           <v-list-tile-title>{{ item.title }}</v-list-tile-title>
         </v-list-tile-content>
       </v-list-tile>
       <v-list-tile v-if="userIsAuthenticated" @click="onLogout">
         <v-list-tile-action>
           <v-icon>exit_to_app</v-icon>
         </v-list-tile-action>
         <v-list-tile-content>
           <v-list-tile-title>LOGOUT</v-list-tile-title>
         </v-list-tile-content>
       </v-list-tile>
     </v-list>
  </v-navigation-drawer>
  <v-toolbar class="primary" dark>
    <v-toolbar-side-icon
      @click.stop ="sideNav = !sideNav"
      class="hidden-sm-and-up"></v-toolbar-side-icon>
    <v-toolbar-title>
      <router-link to="/" tag="span" style="cursor: pointer">{{ title }}</router-link>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-xs-only" >
      <v-btn flat v-for="item in menuItems" :key="item.title"  :to="item.link" >
        <v-icon right dark>{{ item.icon }}</v-icon>{{ item.title }}
      </v-btn>
      <v-btn v-if="userIsAuthenticated" flat  @click="onLogout">
        <v-icon right dark>exit_to_app</v-icon>LOGOUT
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
  <main>
    <router-view>
    </router-view>
  </main>
</v-app>
</template>

<script>
export default {
  data () {
    return {
      sideNav: false,
      title: 'Meetup'
    }
  },
  computed: {
    menuItems () {
      let menuItems = [
          {icon: 'person', title: 'SIGNIN', link: '/signin'},
          {icon: 'lock_open', title: 'SIGNUP', link: '/signup'}
      ]
      if (this.userIsAuthenticated) {
        menuItems = [
          {icon: 'group', title: 'MEETUPS', link: '/meetups'},
          {icon: 'location_on', title: 'LOCATION', link: '/locationmeetup'},
          {icon: 'weekend', title: 'CREATE', link: '/meetup/new'},
          {icon: 'face', title: 'PROFILE', link: '/profile'}
        ]
      }
      return menuItems
    },
    userIsAuthenticated () {
      return this.$store.getters.user !== null && this.$store.getters.user !== undefined
    }
  },
  methods: {
    onLogout () {
      this.$store.dispatch('logOut')
      this.$router.push('/')
    }
  }
}
</script>

<style lang="stylus">
  @import './stylus/main'
</style>
© 2017 GitHub, Inc.
