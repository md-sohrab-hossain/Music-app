import { computed, ref } from "vue";
import { Howl } from "howler";
import { defineStore } from "pinia";

export const usePlayerStore = defineStore("player", () => {
  //** --- state ---- *//
  const current_song = ref({});
  const sound = ref();
  //** --- state ---- *//

  //** --- Action ---- *//
  function playAudio(song: any) {
    current_song.value = song;
    sound.value = new Howl({
      src: [song.url],
      html5: true,
    });

    sound.value.play();
  }

  function toggleAudio() {
    if (!sound.value?.playing) return;
    if (sound.value.playing()) {
      sound.value.pause();
    } else {
      sound.value.play();
    }
  }
  //** --- Action ---- *//

  //** --- Getters ---- *//
  const isPlaying = computed(() =>
    sound.value?.playing ? sound.value.playing() : false
  );
  //** --- Getters ---- *//

  return { current_song, playAudio, toggleAudio, isPlaying };
});
