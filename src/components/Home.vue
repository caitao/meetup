<template lang="html">
        <video id="video-bg-elem" autoplay="true" loop="loop" muted="muted" width="">
          <source src="../../static/doc-images/carousel/video.ogg" type="video/ogg" />
          Your browser does not support the video tag.
        </video>
        <!-- <h1 class="white--text">Vuetify.js</h1>
        <h4 class="white--text">Build your application today!</h4> -->
</template>

<script>
export default {
  data () {
    return {
    }
  }
}
</script>

<style lang="css">
#video-bg-elem {
  position: fixed;
  left: 0;
  width: 100%;
  background-color: black;
  background-image: /* our video */;
  background-position: center center;
  background-size: contain;
}
</style>
