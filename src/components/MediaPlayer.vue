<template>
  <!-- Player -->
  <div class="fixed bottom-0 left-0 bg-gray-900 px-4 py-2 w-full">
    <!-- Track Info -->
    <div class="text-center" v-if="current_song.modified_name">
      <span class="song-title font-bold text-white">{{
        current_song.modified_name
      }}</span>
      <span class="song-artist text-white"
        >{{ " " }}by {{ current_song.display_name }}</span
      >
    </div>

    <!-- control volume -->
    <div class="w-80 h-8 flex flex-row items-center">
      <i class="fa fa-volume-down text-gray-500 mr-2"></i>
      <input
        class="h-1 w-48 form-range accent-blue-400 bg-gray-300 rounded-2xl cursor-pointer"
        type="range"
        min="0"
        max="100"
        @input.prevent="updateAudioVolume"
        @change.prevent="updateAudioVolume"
      />
      <i class="fa fa-volume-up text-gray-500 ml-2"></i>
    </div>

    <div class="flex flex-nowrap gap-4 items-center">
      <!-- Play/Pause Button -->
      <button type="button" @click.prevent="toggleAudio">
        <i
          class="fa text-gray-500 text-xl"
          :class="{ 'fa-play': !isPlaying, 'fa-pause': isPlaying }"
        ></i>
      </button>
      <!-- Current Position -->
      <div class="player-currenttime text-white">{{ seek }}</div>
      <!-- Scrub Container  -->
      <div
        @click.prevent="updateSeek"
        class="w-full h-2 rounded bg-gray-200 relative cursor-pointer"
      >
        <!-- Player Ball -->
        <span
          class="absolute -top-2.5 -ml-2.5 text-blue-400 text-lg"
          :style="{
            left: playerProgress,
          }"
        >
          <i class="fas fa-circle"></i>
        </span>
        <!-- Player Progress Bar-->
        <span
          class="block h-2 rounded bg-gradient-to-r from-green-500 to-green-400"
          :style="{
            width: playerProgress,
          }"
        ></span>
      </div>
      <!-- Duration -->
      <div class="player-duration text-white">{{ duration }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { usePlayerStore } from "@/stores/player";
import { storeToRefs } from "pinia";

export default defineComponent({
  name: "MediaPlayer",

  setup() {
    const store = usePlayerStore();
    const { volume, current_song, isPlaying, seek, duration, playerProgress } =
      storeToRefs(store);
    const { toggleAudio, updateSeek, updateAudioVolume } = store;

    return {
      seek,
      volume,
      duration,
      isPlaying,
      updateSeek,
      toggleAudio,
      current_song,
      playerProgress,
      updateAudioVolume,
    };
  },
});
</script>
