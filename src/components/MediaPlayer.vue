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
        <!-- Stop Button -->
        <button type="button" @click.prevent="stopAudio">
          <i class="fas fa-stop-circle text-xl text-gray-500" />
        </button>

        <!-- Previous Button -->
        <button
          type="button"
          @click.prevent="playPreviousSong"
          :disabled="!getAllSongs.length"
        >
          <i
            class="fas fa-angle-left text-2xl text-gray-500"
            :class="{ 'text-gray-700': !getAllSongs.length }"
          />
        </button>

        <!-- Play/Pause Button -->
        <button type="button" @click.prevent="toggleAudio">
          <i
            class="text-xl text-gray-500 fa"
            :class="{
              'fa-play': isSongPlaying !== 'play',
              'fa-pause': isSongPlaying === 'play',
            }"
          ></i>
        </button>

        <!-- Next Button -->
        <button
          type="button"
          @click.prevent="playNextSong"
          :disabled="!getAllSongs.length"
        >
          <i
            class="fas fa-angle-right text-2xl text-gray-500"
            :class="{ 'text-gray-700': !getAllSongs.length }"
          />
        </button>
        <!-- Current Position -->
        <div class="text-white player-currenttime">{{ seek }}</div>

        <!-- Scrub Container  -->
        <input
          class="w-5/6 h-1.5 cursor-pointer accent-green-400 rounded-2xl"
          type="range"
          min="0"
          max="100"
          :value="playerProgress"
          @input.prevent="updateSeek"
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

    const {
      seek,
      volume,
      duration,
      current_song,
      isSongPlaying,
      playerProgress,
    } = storeToRefs(store);

    const {
      stopAudio,
      updateSeek,
      toggleAudio,
      getAllSongs,
      playNextSong,
      playPreviousSong,
      updateAudioVolume,
    } = store;

    return {
      seek,
      volume,
      duration,
      stopAudio,
      updateSeek,
      getAllSongs,
      toggleAudio,
      current_song,
      playNextSong,
      isSongPlaying,
      playPreviousSong,
      playerProgress,
      updateAudioVolume,
    };
  },
});
</script>
