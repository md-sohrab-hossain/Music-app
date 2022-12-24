import { Howl, Howler } from "howler";
import { computed, ref } from "vue";
import { defineStore } from "pinia";
import { formatTime } from "@/utility/helper";
import type { DocumentData } from "firebase/firestore";

export const usePlayerStore = defineStore("player", () => {
  //** --- state ---- *//
  const sound = ref();
  const volume = ref<string>("80");
  const current_song = ref<DocumentData>({});
  const seek = ref<string | number>("00:00");
  const duration = ref<string | number>("00:00");
  const playerProgress = ref<string>("0");
  const isSongPlaying = ref<boolean>(false);
  const isSongEnd = ref<boolean>(false);
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
      onend: () => {
        isSongEnd.value = true;
        isSongPlaying.value = false;
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

  function stopAudio() {
    if (!sound.value?.playing) return;
    isSongPlaying.value = false;
    isSongEnd.value = true;
    sound.value.stop();
  }

  function updateAudioVolume(event: Event) {
    const newVolume = (event.target as HTMLInputElement).value;
    volume.value = String(newVolume);
    Howler.volume(Number(newVolume) / 100);
  }

  function progress() {
    seek.value = formatTime(sound.value?.seek());
    duration.value = formatTime(sound.value?.duration());
    playerProgress.value = String(
      (sound.value?.seek() / sound.value?.duration()) * 100
    );

    if (sound.value?.playing()) {
      isSongEnd.value = false;
      isSongPlaying.value = true;
      requestAnimationFrame(progress);
    }
  }

  function updateSeek(event: any) {
    if (!sound.value?.playing) return;
    const percentage = event.target.value;
    const seconds = (sound.value?.duration() / 100) * percentage;

    sound.value?.seek(seconds);
    sound.value?.once("seek", () => requestAnimationFrame(progress));
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
    isSongPlaying,
    isPlaying,
    isSongEnd,
    playAudio,
    stopAudio,
    toggleAudio,
    updateSeek,
    current_song,
    playerProgress,
    updateAudioVolume,
  };
});
