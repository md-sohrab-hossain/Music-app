<template>
  <play-list />
  <player />
</template>

<script lang="ts">
import Player from "@/components/MediaPlayer.vue";
import PlayList from "@/components/PlayList.vue";

export default {
  name: "App",
  components: {
    Player,
    PlayList,
  },
};
</script>
