<template>
  <nav-bar />
  <error-boundary>
    <!-- include router-view for routing -->
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component"></component>
      </transition>
    </router-view>
  </error-boundary>

  <!-- music player -->
  <media-player
    :class="[
      isSongPlaying ? 'translate-y-0 ease-in duration-700' : 'translate-y-40',
      isSongEnd ? 'translate-y-40 ease-in duration-700' : '',
    ]"
  />
  <!-- modal -->
  <auth-modal />
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
    const { isSongPlaying, isSongEnd } = storeToRefs(store);

    return {
      isSongPlaying,
      isSongEnd,
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
