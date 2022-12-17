<template>
  <!-- Music Header -->
  <section class="w-full mb-8 py-14 text-center text-white relative">
    <div
      class="absolute inset-0 w-full h-full box-border bg-contain"
      :class="[isPlaying ? 'music-bg' : '']"
      style="background-image: url(/assets/img/header-12.png)"
    ></div>
    <div class="container -mt-8 mx-auto flex items-center">
      <!-- Play/Pause Button -->
      <button
        type="button"
        @click="$emit('playMusic')"
        class="z-50 h-24 w-24 text-3xl bg-purple-500 text-black rounded-full focus:outline-none"
      >
        <i class="fas fa-play"></i>
      </button>
      <div class="z-50 text-left ml-8">
        <!-- Song Info -->
        <div class="text-3xl font-bold text-green-400">
          {{ songInfo?.modified_name }}
        </div>
        <div class="text-red-600 font-bold capitalize">
          {{ songInfo?.genre }}
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { usePlayerStore } from "@/stores/player";
import { defineComponent } from "vue";
import { storeToRefs } from "pinia";

export default defineComponent({
  name: "MusicHeader",
  props: ["songInfo"],
  emits: ["playMusic"],

  setup() {
    const store = usePlayerStore();
    const { isPlaying } = storeToRefs(store);

    return {
      isPlaying,
    };
  },
});
</script>
