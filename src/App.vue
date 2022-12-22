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
    <media-player v-show="isPlaying || isPaused" />
    <!-- modal -->
    <auth-modal />
  </error-boundary>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import NavBar from "@/components/NavBar.vue";
import AuthModal from "@/components/AuthModal.vue";
import MediaPlayer from "@/components/MediaPlayer.vue";
import ErrorBoundary from "@/components/ErrorBoundary.vue";

import { useUserStore } from "@/stores/user";
import { usePlayerStore } from "@/stores/player";
import { mapWritableState, storeToRefs } from "pinia";
import { auth } from "@/utility/firebaseConfig";

export default defineComponent({
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
  setup() {
    const store = usePlayerStore();
    const { isPlaying, isPaused } = storeToRefs(store);

    return {
      isPaused,
      isPlaying,
    };
  },
});
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
