<template>
  <nav-bar />
  <hero>
    <template #title>
      <h1 class="font-bold text-5xl mb-5">Listen to Great Music!</h1>
    </template>

    <template #description>
      <p class="w-full md:w-8/12 mx-auto">
        The perfect music gift from one of the most trusted names in continuing
        education. Learn how to better appreciate music in this guide that will
        unlock the knowledge you need to understand “the most abstract and
        sublime of all the arts.
      </p>
    </template>
  </hero>

  <!-- content -->
  <play-list />
  <player />
  <!-- content -->

  <!-- modal -->
  <auth-modal />
</template>

<script lang="ts">
import NavBar from "@/components/NavBar.vue";
import Hero from "@/components/Hero.vue";
import AuthModal from "@/components/AuthModal.vue";
import Player from "@/components/MediaPlayer.vue";
import PlayList from "@/components/PlayList.vue";

import useUserStore from "@/stores/user";
import { mapWritableState } from "pinia";
import { auth } from "./includes/firebaseConfig";

export default {
  name: "App",
  components: {
    NavBar,
    Hero,
    PlayList,
    Player,
    AuthModal,
  },
  computed: {
    ...mapWritableState(useUserStore, ["userLoggedIn"]),
  },
  created() {
    if (auth.currentUser) {
      this.userLoggedIn = true;
    }
  },
};
</script>
