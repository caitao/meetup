<template lang="html">
 <v-dialog width="350px" persistent v-model="editDialogShow">
    <v-btn fab dark small slot="activator" class="red darken-2">
      <v-icon>schedule</v-icon>
    </v-btn>
   <v-card>
     <v-container>
       <v-layout row wrap>
         <v-flex xs12>
           <v-card-title>
             <span class="headline">Edit Meetup time</span>
           </v-card-title>
         </v-flex>
      </v-layout>
      <v-divider></v-divider>
      <v-layout row wrap>
        <v-flex xs12>
          <v-time-picker v-model="editableTime" style="width: 100%" actions format="24hr">
           <template scope="{save, cancle}">
            <v-btn  class="blue--text darken-1" flat @click="editDialogShow = false">Close</v-btn>
            <v-btn  class="blue--text darken-1" flat @click="onSaveChanges">Save</v-btn>
          </template>
        </v-time-picker>
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
        editableTime: null
      }
    },
    methods: {
      onSaveChanges () {
        const newDate = new Date(this.meetup.date)
        const hours = this.editableTime.match(/^(\d+)/)[1]
        const minutes = this.editableTime.match(/:(\d+)/)[1]
        newDate.setHours(hours)
        newDate.setMinutes(minutes)
        this.$store.dispatch('updateMeetupData', {
          objectId: this.meetup.objectId,
          date: newDate
        })
      },
      createdDate () {
        this.editableTime = new Date(this.meetup.date).toTimeString()
      }
    }
  }
</script>

<style lang="css">
</style>
