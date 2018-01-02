<template lang="html">
 <v-dialog width="350px" persistent v-model="editDialogShow">
    <v-btn fab dark small slot="activator" class="red darken-2">
      <v-icon>date_range</v-icon>
    </v-btn>
   <v-card>
     <v-container>
       <v-layout row wrap>
         <v-flex xs12>
           <v-card-title>
             <span class="headline">Edit Meetup Date</span>
           </v-card-title>
         </v-flex>
      </v-layout>
      <v-divider></v-divider>
      <v-layout row wrap>
        <v-flex xs12>
          <v-date-picker v-model="editableDate" style="width: 100%" actions>
           <template scope="{save, cancle}">
            <v-btn  class="blue--text darken-1" flat @click="editDialogShow = false">Close</v-btn>
            <v-btn  class="blue--text darken-1" flat @click="onSaveChanges">Save</v-btn>
          </template>
         </v-date-picker>
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
        editableDate: null
      }
    },
    methods: {
      onSaveChanges () {
        const newDate = new Date(this.meetup.date)
        const newDay = new Date(this.editableDate).getUTCDate() - 1
        const newMonth = new Date(this.editableDate).getUTCMonth()
        const newYear = new Date(this.editableDate).getFullYear()
        newDate.setUTCDate(newDay)
        newDate.setUTCMonth(newMonth)
        newDate.setUTCFullYear(newYear)
        this.$store.dispatch('updateMeetupData', {
          objectId: this.meetup.objectId,
          date: newDate
        })
      },
      createdDate () {
        this.editableDate = new Date(this.meetup.date)
      }
    }
  }
</script>

<style lang="css">
</style>
