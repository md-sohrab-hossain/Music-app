<template>
  <!-- Player -->
  <div class="fixed bottom-0 left-0 w-full px-4 py-2 bg-gray-900">
    <!-- Track Info -->
    <div class="text-center" v-if="current_song.modified_name">
      <span class="text-sm font-bold text-white song-title">{{
        current_song.modified_name
      }}</span>
      <span class="text-white song-artist"
        >{{ " " }}by {{ current_song.display_name }}</span
      >
    </div>

    <div class="flex flex-col-reverse gap-4 md:flex-row">
      <!-- Player -->
      <div
        class="flex flex-row items-center w-full gap-4 mb-2 md:w-5/6 md:mb-0 flex-nowrap"
      >
        <!-- Play/Pause Button -->
        <button type="button" @click.prevent="stopAudio">
          <i class="fas fa-stop-circle text-xl text-gray-500" />
        </button>
        <button type="button" @click.prevent="toggleAudio">
          <i
            class="text-xl text-gray-500 fa"
            :class="{ 'fa-play': !isPlaying, 'fa-pause': isPlaying }"
          ></i>
        </button>
        <!-- Current Position -->
        <div class="text-white player-currenttime">{{ seek }}</div>
        <!-- Scrub Container  -->
        <input
          class="w-5/6 h-1.5 appearance-none bg-orange-100 cursor-pointer accent-lime-400 rounded-2xl"
          type="range"
          min="0"
          max="100"
          :value="playerProgress"
          @input.prevent="updateSeek"
          @change.prevent="updateSeek"
        />
        <!-- Duration -->
        <div class="text-white player-duration">{{ duration }}</div>
      </div>

      <!-- control volume -->
      <div class="flex flex-row items-center w-auto h-2 mt-4 md:h-8 md:mt-0">
        <i class="mr-2 text-gray-500 fa fa-volume-down"></i>
        <input
          class="h-1 bg-gray-300 cursor-pointer w-fit form-range accent-blue-400 rounded-2xl"
          type="range"
          min="0"
          max="100"
          :value="volume"
          @input.prevent="updateAudioVolume"
          @change.prevent="updateAudioVolume"
        />
        <i class="ml-2 text-gray-500 fa fa-volume-up"></i>
      </div>
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
    const { toggleAudio, stopAudio, updateSeek, updateAudioVolume } = store;

    return {
      seek,
      volume,
      duration,
      isPlaying,
      updateSeek,
      stopAudio,
      toggleAudio,
      current_song,
      playerProgress,
      updateAudioVolume,
    };
  },
});
</script>
