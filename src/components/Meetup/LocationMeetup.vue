<template lang="html">
  <v-carousel style="cursor: pointer" >
    <v-carousel-item
    v-for="item in items"
    v-bind:src="item.src"
    :key="item.id"
    @click="onLoadMeetup(item.id)">
      <div class="title">
        {{item.title}}
      </div>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
  computed: {
    items () {
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
