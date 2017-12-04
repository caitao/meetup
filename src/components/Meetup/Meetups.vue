<template lang="html">
  <v-container>
    <v-layout row wrap v-for="meetup in meetups" :key="meetup.objectId" class="mb-2">
      <v-flex xs12 sm6 offset-sm3>
        <v-card style="cursor: pointer" @click="onLoadMeetup(meetup.objectId)">
          <v-card-media
            :src="meetup.imageLink"
            height="200px">
          </v-card-media>
          <v-card-title primary-title>
            <div>
              <div class="headline">{{ meetup.title }}</div>
              <span class="grey--text">{{ meetup.date | dateFilter }}</span>
            </div>
          </v-card-title>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  computed: {
    meetups () {
      return this.$store.getters.loadedMeetups
    }
  },
  methods: {
    onLoadMeetup (objectId) {
      this.$router.push('/meetups/' + objectId)
    }
  }
}
</script>

<style lang="css">
</style>
