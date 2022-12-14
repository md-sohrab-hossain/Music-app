<template>
  <error-boundary>
    <nav-bar />
    <!-- include router-view for routing -->
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component"></component>
      </transition>
    </router-view>
    <!-- music player -->
    <media-player />
    <!-- modal -->
    <auth-modal />
  </error-boundary>
</template>

<script lang="ts">
import NavBar from "@/components/NavBar.vue";
import AuthModal from "@/components/AuthModal.vue";
import MediaPlayer from "@/components/MediaPlayer.vue";
import ErrorBoundary from "@/components/ErrorBoundary.vue";

import { useUserStore } from "@/stores/user";
import { mapWritableState } from "pinia";
import { auth } from "@/utility/firebaseConfig";

export default {
  name: "App",
  components: {
    NavBar,
    MediaPlayer,
    AuthModal,
    ErrorBoundary,
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

<style>
.fade-enter-from {
  opacity: 0;
}

.fade-enter-active {
  transition: all 0.5s linear;
  opacity: 0;
}

.fade-leave-to {
  transition: all 0.5s linear;
  opacity: 0;
}
</style>
