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
       <v-list-tile v-for="item in items" :key="item.title" :to="item.link">
         <v-list-tile-action>
           <v-icon>{{ item.icon }}</v-icon>
         </v-list-tile-action>
         <v-list-tile-content>
           <v-list-tile-title>{{ item.title }}</v-list-tile-title>
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
    <v-toolbar-items class="hidden-xs-only" v-for="item in items" :key="item.title">
      <v-btn flat :to="item.link">
        <v-icon right dark>{{ item.icon }}</v-icon>{{ item.title }}
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
      items: [
        {icon: 'group', title: 'MEETUPS', link: '/meetups'},
        {icon: 'location_on', title: 'LOCATION', link: '/locationmeetup'},
        {icon: 'weekend', title: 'CREATE', link: '/meetup/new'},
        {icon: 'face', title: 'PROFILE', link: '/profile'},
        {icon: 'person', title: 'SIGNIN', link: '/signin'},
        {icon: 'lock_open', title: 'SIGNUP', link: '/signup'}
      ],
      title: 'Meetup'
    }
  }
}
</script>

<style lang="stylus">
  @import './stylus/main'
</style>
