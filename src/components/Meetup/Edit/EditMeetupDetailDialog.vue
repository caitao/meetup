<template lang="html">
 <v-dialog width="350px" persistent v-model="editDialogShow">
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
              <v-btn  class="blue--text darken-1" flat @click="editDialogShow = false">Close</v-btn>
              <v-btn  class="blue--text darken-1" flat @click="onSaveChanges">Save</v-btn>
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
        editDialogShow: false,
        editedTitle: this.meetup.title,
        editedDescription: this.meetup.description
      }
    },
    methods: {
      onSaveChanges () {
        if (this.editedTitle.trim() === '' || this.editedDescription.trim() === '') {
          return
        }
        this.editDialogShow = false
        this.$store.dispatch('updateMeetupData', {
          objectId: this.meetup.objectId,
          title: this.editedTitle,
          description: this.editedDescription
        })
        console.log(this.meetup.objectId)
      }
    }
  }
</script>

<style lang="css">
</style>
