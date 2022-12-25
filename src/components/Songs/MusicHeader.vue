<template>
  <!-- Music Header -->
  <section class="relative w-full mb-8 text-center text-white py-14">
    <div
      class="box-border absolute inset-0 w-full h-full bg-repeat-x bg-contain"
      :class="{ 'music-bg': isSongPlaying === 'play' }"
      style="background-image: url(/assets/img/header-12.png)"
    ></div>
    <div class="container flex items-center mx-auto -mt-8">
      <!-- Play/Pause Button -->
      <div
        class="ml-2 playButton md:ml-0"
        :class="{ 'button-active': isSongPlaying !== 'stop' }"
        @click="$emit('playMusic')"
      >
        <i class="fas fa-play"></i>
      </div>
      <div class="z-50 ml-8 -mt-12 text-left md:-mt-0">
        <!-- Song Info -->
        <div class="text-xl font-bold text-green-400 md:text-2xl">
          {{ songInfo?.modified_name }}
        </div>
        <div class="font-bold text-red-600 capitalize">
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
    const { isSongPlaying } = storeToRefs(store);

    return {
      isSongPlaying,
    };
  },
});
</script>

<style>
.playButton {
  display: grid;
  place-items: center;
  cursor: pointer;
  padding: 2.5rem;
  z-index: 10;
  background: #efeeee;
  border-radius: 50%;
  transition: all 0.3s ease-in;
  box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.1),
    -10px -10px 10px rgba(255, 255, 255, 0.6);
}

.playButton .fas {
  display: grid;
  place-items: center;
  font-size: 2.5rem;
  color: gray;
}
.playButton:active {
  box-shadow: inset 10px 10px 10px rgba(0, 0, 0, 0.1),
    inset -10px -10px 10px rgba(255, 255, 255, 0.6);
}
.playButton:active .fas {
  color: #721efa;
}

.playButton:hover,
.button-active {
  background: radial-gradient(circle, #0ff 0%, #e0e5ec 60%);

  color: rgba(102, 102, 102, 0.5);
  animation: colorChange 2s linear infinite;
}

@keyframes colorChange {
  to {
    filter: hue-rotate(360deg);
  }
}
</style>
