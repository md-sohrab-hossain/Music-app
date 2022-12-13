import { ref } from "vue";
import { Howl } from "howler";
import { defineStore } from "pinia";

export const usePlayerStore = defineStore("player", () => {
  const current_song = ref({});

  function playSound(song: any) {
    current_song.value = song;
    const sound = new Howl({
      src: [song.url],
      html5: true,
    });
    sound.play();
  }

  return { current_song, playSound };
});
