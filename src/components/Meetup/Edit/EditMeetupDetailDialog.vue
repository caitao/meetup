<template lang="html">
 <v-dialog width="350px" persistent>
   <v-btn fab dark small accent slot="activator" class="primary">
     <v-icon>edit</v-icon>
   </v-btn>
   <v-card>
     <v-container>
       <v-layout row wrap>
         <v-flex xs12>
           <v-card-title>
             <span class="headline">Edit Meetup</span>
           </v-card-title>
         </v-flex>
      </v-layout>
      <v-divider></v-divider>
      <v-layout row wrap>
        <v-flex xs12>
          <v-card-text>
            <v-text-field
              name="title"
              label="Title"
              id="title"
              v-model="editedTitle"
              required>
            </v-text-field>
            <v-text-field
              name="description"
              label="Description"
              id="description"
              v-model="editedDescription"
              multi-line>
            </v-text-field>
          </v-card-text>
        </v-flex>
      </v-layout>
      <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn  class="blue--text darken-1" flat @click.native="dialog = false">Close</v-btn>
              <v-btn  class="blue--text darken-1" flat @click.native="dialog = false">Save</v-btn>
            </v-card-actions>
          </v-flex>
        </v-layout>
     </v-container>
   </v-card>
 </v-dialog>
</template>

<script>
export default {
  props: ['meetup'],
  data () {
    return {
      editedTitle: this.meetup.title,
      editedDescription: this.meetup.description
    }
  }
}
</script>

<style lang="css">
</style>
