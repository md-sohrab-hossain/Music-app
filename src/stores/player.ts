import { computed, ref } from "vue";
import { Howl } from "howler";
import { defineStore } from "pinia";
import { formatTime } from "@/utility/helper";

export const usePlayerStore = defineStore("player", () => {
  //** --- state ---- *//
  const sound = ref();
  const current_song = ref<object>({});
  const seek = ref<string | number>("00:00");
  const duration = ref<string | number>("00:00");
  //** --- state ---- *//

  //** --- Action ---- *//
  function playAudio(song: any) {
    current_song.value = song;

    if (!sound.value?.playing) {
      sound.value = new Howl({
        src: [song.url],
        html5: true,
        loop: false,
        volume: 0.3,
        onplay: () => {
          requestAnimationFrame(progress);
        },
      });

      sound.value.play();
    }
  }

  function toggleAudio() {
    if (!sound.value?.playing) return;
    if (sound.value.playing()) {
      sound.value.pause();
    } else {
      sound.value.play();
    }
  }

  function progress() {
    seek.value = formatTime(sound.value?.seek());
    duration.value = formatTime(sound.value?.duration());

    if (sound.value?.playing()) {
      requestAnimationFrame(progress);
    }
  }
  //** --- Action ---- *//

  //** --- Getters ---- *//
  const isPlaying = computed(() =>
    sound.value?.playing ? sound.value.playing() : false
  );
  //** --- Getters ---- *//

  return { current_song, playAudio, toggleAudio, isPlaying, seek, duration };
});
