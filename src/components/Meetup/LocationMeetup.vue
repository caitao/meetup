<template lang="html">
  <v-carousel style="cursor: pointer" >
    <v-carousel-item
    v-for="item in items"
    v-bind:src="item.src"
    :key="item.id"
    @click="onLoadMeetup(item.id)">
      <div class="title">
        {{item.title}}
      </div>
    </v-carousel-item>
  </v-carousel>
  <!-- <v-container fluid flex>
    <v-layout row wrap class="mt-2">
      <v-flex xs12> -->

      <!-- </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12 sm6 class="text-xs-center text-sm-right">
        <v-btn large dark class="info" router to="/meetups">Nice Meetups</v-btn>
      </v-flex>
      <v-flex xs12 sm6 class="text-xs-center text-sm-left">
        <v-btn large dark class="info" router to="/meetup/new">Create Meetup</v-btn>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12 class="text-xs-center">
      <p>Join us awesome meetup! </p>
      </v-flex>
    </v-layout>
  </v-container> -->
</template>

<script>
export default {
  computed: {
    items () {
      return this.$store.getters.featuredMeetups
    }
  },
  methods: {
    onLoadMeetup (id) {
      this.$router.push('/meetups/' + id)
    }
  }
}
</script>

<style lang="css">
  .title{
    position: absolute;
    bottom: 50px;
    background-color: rgba(0,0,0,0.5);
    color: white;
    font-size: 2em;
  }
</style>
