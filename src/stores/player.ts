import { Howl, Howler } from "howler";
import { computed, ref } from "vue";
import { defineStore } from "pinia";
import { formatTime } from "@/utility/helper";
import type { DocumentData } from "firebase/firestore";

export const usePlayerStore = defineStore("player", () => {
  //** --- state ---- *//
  const sound = ref();
  const volume = ref<string>("30");
  const current_song = ref<DocumentData>({});
  const seek = ref<string | number>("00:00");
  const duration = ref<string | number>("00:00");
  const playerProgress = ref<string>("0%");
  //** --- state ---- *//

  //** --- Action ---- *//
  function playAudio(song: any) {
    current_song.value = song;
    // if we click twice to playButton it will unload audio
    if (sound.value instanceof Howl) sound.value?.unload();

    sound.value = new Howl({
      src: [song.url],
      html5: true,
      loop: false,
      onplay: () => {
        requestAnimationFrame(progress);
      },
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

  function updateAudioVolume(volume: any) {
    const sound = volume.target.value;
    volume.value = String(sound);
    Howler.volume(sound / 100);
  }

  function progress() {
    seek.value = formatTime(sound.value?.seek());
    duration.value = formatTime(sound.value?.duration());
    playerProgress.value = `${
      (sound.value?.seek() / sound.value?.duration()) * 100
    }%`;

    if (sound.value?.playing()) {
      requestAnimationFrame(progress);
    }
  }

  function updateSeek(event: any) {
    if (!sound.value?.playing) return;

    const { x, width } = event.currentTarget.getBoundingClientRect();
    // Document = 2000, Timeline = 1000, clientX = 1000, Distance = 500
    const clickX = event.clientX - x;
    const percentage = clickX / width;
    const seconds = sound.value?.duration() * percentage;

    sound.value?.seek(seconds);
    sound.value?.once("seek", progress);
  }
  //** --- Action ---- *//

  //** --- Getters ---- *//
  const isPlaying = computed(() =>
    sound.value?.playing ? sound.value.playing() : false
  );
  //** --- Getters ---- *//

  return {
    seek,
    volume,
    duration,
    isPlaying,
    playAudio,
    toggleAudio,
    updateSeek,
    current_song,
    playerProgress,
    updateAudioVolume,
  };
});
