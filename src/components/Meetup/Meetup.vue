<template lang="html">
  <v-container>
    <v-layout row wrap v-if="loading">
      <v-flex xs12 class="text-xs-center">
        <v-progress-circular
          indeterminate
          class="primary--text"
          :width="7"
          :size="70"></v-progress-circular>
      </v-flex>
    </v-layout>
    <v-layout row wrap v-else>
      <v-flex xs12>
        <v-card>
          <v-card-title>
            <h6 class="primary--text">{{meetup.title}}
             <template v-if="userIsCreator">
              <app-edit-meetup-details-dialog v-bind:meetup="meetup">
              </app-edit-meetup-details-dialog>
             </template>
            </h6>
          </v-card-title>
          <v-card-media
          :src="meetup.imageLink"
          height="200px">
          </v-card-media>
          <v-card-text>
            <div class="info--text">{{ meetup.location }} {{ meetup.date | dateFilter }}
                <add-edit-meetup-date-dialog v-bind:meetup="meetup" v-if="userIsCreator">
                </add-edit-meetup-date-dialog>
                <add-edit-meetup-time-dialog v-bind:meetup="meetup" v-if="userIsCreator">
                </add-edit-meetup-time-dialog>
            </div>

            <div>{{ meetup.description }}</div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <add-meetup-register-dialog :objectId = "meetup.id"></add-meetup-register-dialog>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>

</template>

<script>
export default {
  props: ['id'],
  computed: {
    meetup () {
      return this.$store.getters.loadedMeetup(this.id)
    },
    loading () {
      return this.$store.getters.loading
    },
    userIsAuthenticated () {
      return this.$store.getters.user !== null && this.$store.getters.user !== undefined
    },
    userIsCreator () {
      if (!this.userIsAuthenticated) {
        return false
      }
      return this.$store.getters.user.id === this.meetup.creatorId
    }
  }
}
</script>

<style lang="css">
</style>
