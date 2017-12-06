<template lang="html">
  <v-carousel style="cursor: pointer" >
    <v-carousel-item
    v-for="meetup in meetups"
    v-bind:src="meetup.imageLink"
    :key="meetup.objectId"
    @click="onLoadMeetup(meetup.objectId)">
      <div class="title">
        {{ meetup.title }}
      </div>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
  computed: {
    meetups () {
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
