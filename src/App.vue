<template>
  <nav-bar />
  <!-- include router-view for routing -->
  <router-view />
  <!-- modal -->
  <auth-modal />
</template>

<script lang="ts">
import NavBar from "@/components/NavBar.vue";
import AuthModal from "@/components/AuthModal.vue";

import { useUserStore } from "@/stores/user";
import { mapWritableState } from "pinia";
import { auth } from "@/utility/firebaseConfig";

export default {
  name: "App",
  components: {
    NavBar,
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
