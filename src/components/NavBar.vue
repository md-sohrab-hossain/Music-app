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
          <li v-if="!userLoggedIn">
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
              <a class="px-2 text-white" href="#" @click.prevent="signOut"
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
import { defineComponent } from "vue";
import useModalStore from "@/stores/modal";
import { useUserStore } from "@/stores/user";
import { useRoute, useRouter } from "vue-router";
import { storeToRefs } from "pinia";

export default defineComponent({
  name: "NavBar",

  setup() {
    const route: any = useRoute();
    const router: any = useRouter();
    const userStore = useUserStore();
    const modalStore = useModalStore();

    const { signOut } = userStore;
    const { userLoggedIn } = storeToRefs(userStore);
    const { isOpen } = storeToRefs(modalStore);

    if (route.meta.requiresAuth) {
      router.push({ name: "home" });
    }

    return {
      isOpen,
      signOut,
      userLoggedIn,
    };
  },
});
</script>
