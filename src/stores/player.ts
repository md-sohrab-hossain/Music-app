import { Howl, Howler } from "howler";
import { computed, ref } from "vue";
import { defineStore } from "pinia";
import { formatTime } from "@/utility/helper";
import type { DocumentData } from "firebase/firestore";

export const usePlayerStore = defineStore("player", () => {
  //** --- state ---- *//
  const sound = ref();
  const songs = ref<DocumentData>([]);
  const volume = ref<string>("100");
  const songInfo = ref<DocumentData>([]);
  const current_song = ref<DocumentData>({});
  const seek = ref<string | number>("00:00");
  const duration = ref<string | number>("00:00");
  const isSongPlaying = ref<string>("stop");
  const playerProgress = ref<string>("0");
  const isSongEnd = ref<boolean>(false);
  const hasPressPrevNextButton = ref<boolean>(false);
  //** --- state ---- *//

  //** --- Action ---- *//
  function playAudio(song: any) {
    current_song.value = song;
    songInfo.value = song;
    // if we click twice to playButton it will unload audio
    if (sound.value instanceof Howl) sound.value?.unload();

    sound.value = new Howl({
      src: [song.url],
      html5: true,
      loop: false,
      onplay: () => {
        hasPressPrevNextButton.value = false;
        requestAnimationFrame(progress);
      },
      onend: () => {
        isSongEnd.value = true;
        isSongPlaying.value = "stop";
        current_song.value = {};
      },
    });

    sound.value.play();
  }

  function playNextSong() {
    let songIndx: number = 0;
    hasPressPrevNextButton.value = true;
    const currentSongId: string = current_song.value.docId;
    const playListLength: number = getAllSongs.value.length - 1;

    for (const item of Object.values(getAllSongs.value)) {
      if (item.docId === currentSongId && songIndx < playListLength) {
        playAudio(getAllSongs.value[songIndx + 1]);
        break;
      } else if (item.docId === currentSongId && songIndx == playListLength) {
        playAudio(getAllSongs.value[0]);
      }
      songIndx++;
    }
  }

  function playPreviousSong() {
    let songIndx: number = 0;
    hasPressPrevNextButton.value = true;
    const currentSongId: string = current_song.value.docId;
    const playListLength: number = getAllSongs.value.length - 1;

    for (const item of Object.values(getAllSongs.value)) {
      if (item.docId === currentSongId && songIndx) {
        playAudio(getAllSongs.value[songIndx - 1]);
        break;
      } else if (item.docId === currentSongId && songIndx == 0) {
        playAudio(getAllSongs.value[playListLength]);
      }
      songIndx++;
    }
  }

  function toggleAudio() {
    if (!sound.value?.playing) return;
    if (sound.value.playing()) {
      sound.value.pause();
      isSongPlaying.value = "pause";
    } else {
      sound.value.play();
      isSongPlaying.value = "play";
    }
  }

  function stopAudio() {
    if (!sound.value?.playing) return;
    isSongPlaying.value = "stop";
    current_song.value = {};
    isSongEnd.value = true;
    sound.value.stop();
  }

  function progress() {
    seek.value = formatTime(sound.value?.seek());
    duration.value = formatTime(sound.value?.duration());

    if (!hasPressPrevNextButton.value) {
      playerProgress.value = String(
        (sound.value?.seek() / sound.value?.duration()) * 100
      );
    }

    if (sound.value?.playing()) {
      isSongEnd.value = false;
      isSongPlaying.value = "play";
      requestAnimationFrame(progress);
    }
  }

  function updateAudioVolume(event: Event) {
    const newVolume = (event.target as HTMLInputElement).value;
    volume.value = String(newVolume);
    Howler.volume(Number(newVolume) / 100);
  }

  function updateSeek(event: Event) {
    if (!sound.value?.playing) return;
    const percentage = (event.target as HTMLInputElement).value;
    const seconds = (sound.value?.duration() / 100) * Number(percentage);

    sound.value?.seek(seconds);
    sound.value?.once("seek", () => requestAnimationFrame(progress));
  }
  //** --- Action ---- *//

  //** --- Getters ---- *//
  const isPlaying = computed(() =>
    sound.value?.playing ? sound.value.playing() : false
  );

  const getAllSongs = computed(() => songs.value);
  //** --- Getters ---- *//

  return {
    seek,
    songs,
    volume,
    songInfo,
    duration,
    getAllSongs,
    isSongPlaying,
    isPlaying,
    isSongEnd,
    playAudio,
    stopAudio,
    toggleAudio,
    current_song,
    playNextSong,
    playPreviousSong,
    updateSeek,
    playerProgress,
    updateAudioVolume,
  };
});
