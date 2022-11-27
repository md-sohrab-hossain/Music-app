<template>
  <nav-bar />
  <hero>
    <template #title>
      <h1 class="mb-5 text-5xl font-bold">Listen to Great Music!</h1>
    </template>

    <template #description>
      <p class="w-full mx-auto md:w-8/12">
        The perfect music gift from one of the most trusted names in continuing
        education. Learn how to better appreciate music in this guide that will
        unlock the knowledge you need to understand “the most abstract and
        sublime of all the arts.
      </p>
    </template>
  </hero>

  <!-- include router-view for routing -->
  <router-view></router-view>

  <!-- modal -->
  <auth-modal />
</template>

<script lang="ts">
import NavBar from "@/components/NavBar.vue";
import Hero from "@/components/Hero.vue";
import AuthModal from "@/components/AuthModal.vue";

import useUserStore from "@/stores/user";
import { mapWritableState } from "pinia";
import { auth } from "@/utility/firebaseConfig";

export default {
  name: "App",
  components: {
    NavBar,
    Hero,
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
