<template lang="html">
 <v-dialog persistent v-model="registerDialogShow">
    <v-btn round flat dark small slot="activator" class="red darken-2">
      {{ userIsRegistered ? 'Unregister' : 'Register' }}
    </v-btn>
   <v-card>
     <v-container>
       <v-layout row wrap>
         <v-flex xs12>
           <v-card-title v-if="userIsRegistered">
             <span class="headline">Are U sure to Unregister this meetup?</span>
           </v-card-title>
           <v-card-title v-else>
             <span class="headline">Thanks U register this meetup!</span>
           </v-card-title>
         </v-flex>
      </v-layout>
      <v-divider></v-divider>
      <v-layout row wrap>
        <v-flex xs12>
          <v-card-text>U can change your desicion anytime till this meetup end!</v-card-text>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs12>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn  class="blue--text darken-1" flat @click="registerDialogShow = false">Close</v-btn>
            <v-btn  class="blue--text darken-1" flat @click="onAgree">Comfirm</v-btn>
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
      registerDialogShow: false
    }
  },
  computed: {
    userIsRegistered () {
      return this.meetup.registerId.findIndex(userId => {
        return userId === this.$store.getters.user.id
      }) >= 0
    }
  },
  methods: {
    onAgree () {
      if (this.userIsRegistered) {
        this.$store.dispatch('unRegister', {
          objectId: this.meetup.objectId,
          userId: this.$store.getters.user.id,
          registerId: this.meetup.registerId
        })
      } else {
        this.$store.dispatch('register', {
          objectId: this.meetup.objectId,
          userId: this.$store.getters.user.id,
          registerId: this.meetup.registerId
        })
      }
    }
  }
}
</script>

<style lang="css">
</style>
