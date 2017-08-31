<template lang="html">
  <v-container>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>
          <v-card-title>
            <h6 class="primary--text">My Meetup</h6>
          </v-card-title>
          <v-card-media
          src="../../static/doc-images/carousel/beijing.jpg"
          height="200px"
          >
          </v-card-media>
          <v-card-text>
            <div class="info--text">22 August 2017 Location:BeiJing</div>
            <div>Some fun and interest meetup in here, do you like it .I cant say more ,dont push me.What am I doing? Where we want to go?</div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="primary">Rigster</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>

</template>

<script>
export default {
}
</script>

<style lang="css">
</style>
