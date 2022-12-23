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
      <div
        @click="$emit('playMusic')"
        class="playButton"
        :class="{ buttonActive: isPlaying }"
      >
        <i class="fas fa-play"></i>
      </div>
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

<style>
.playButton {
  display: grid;
  place-items: center;
  cursor: pointer;
  padding: 3rem;
  z-index: 999999;
  background: #efeeee;
  border-radius: 50%;
  transition: all 0.3s ease-in;
  box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.1),
    -10px -10px 10px rgba(255, 255, 255, 0.6);
}
.playButton .fas {
  display: grid;
  place-items: center;
  font-size: 3rem;
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
.buttonActive {
  background: radial-gradient(circle, #0ff 0%, #e0e5ec 60%);

  color: rgba(102, 102, 102, 0.5);
  animation: colorChange 3s linear infinite;
}

@keyframes colorChange {
  to {
    filter: hue-rotate(360deg);
  }
}
</style>
