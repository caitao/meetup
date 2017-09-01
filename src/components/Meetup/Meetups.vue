<template lang="html">
    <v-container>
      <v-layout row wrap>
        <v-flex xs12 sm10 md8 offset-sm1 offset-md2>
          <v-card class="info" style="cursor: pointer"
          v-for="meetup in meetups"
          :key="meetup.id"
          @click="onLoadMeetup(meetup.id)">
            <v-container fluid>
              <v-layout row>
                <v-flex xs5 sm4 md3>
                  <v-card-media
                    v-bind:src="meetup.src"
                    height="120px"
                  ></v-card-media>
                </v-flex>
                <v-flex xs7 sm8 md9>
                  <v-card-title primary-title>
                    <div>
                      <h5 class="white--text mb-0">{{ meetup.title }}</h5>
                      <div>{{ meetup.date }}</div>
                    </div>
                  </v-card-title>
                  <v-card-action>
                    <v-btn flat class="white--text" to="''/meetups/' + meetup.id" >
                     <v-icon right dark>arrow_forward</v-icon>View Meetup
                   </v-btn>
                  </v-card-action>
                </v-flex>
              </v-layout>
            </v-container>
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
    onLoadMeetup (id) {
      this.$router.push('/meetups/' + id)
    }
  }
}
</script>

<style lang="css">
</style>
