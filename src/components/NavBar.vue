<template>
  <!-- Header -->
  <header id="header" class="bg-gray-700">
    <nav class="container flex items-center justify-start px-4 py-5 mx-auto">
      <!-- App Name -->
      <router-link
        to="/"
        exact-active-class="no-active"
        class="mr-4 text-2xl font-bold text-white uppercase"
        href="#"
        >Music</router-link
      >

      <div class="flex items-center flex-grow">
        <!-- Primary Navigation -->
        <ul class="flex flex-row mt-1">
          <li>
            <router-link class="px-2 text-white" to="/about">About</router-link>
          </li>

          <!-- Navigation Links -->
          <li v-if="!userStore.userLoggedIn">
            <a
              class="px-2 text-white"
              href="#"
              @click.prevent="isOpen = !isOpen"
              >Login / Register</a
            >
          </li>

          <template v-else>
            <li>
              <router-link class="px-2 text-white" to="/manage"
                >Manage</router-link
              >
            </li>
            <li>
              <a
                class="px-2 text-white"
                href="#"
                @click.prevent="userStore.signOut"
                >Logout</a
              >
            </li>
          </template>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script lang="ts">
import { mapStores, mapWritableState } from "pinia";
import useModalStore from "@/stores/modal";
import useUserStore from "@/stores/user";

export default {
  name: "NavBar",
  computed: {
    ...mapStores(useModalStore, useUserStore),
    ...mapWritableState(useModalStore, ["isOpen"]),
  },
};
</script>
