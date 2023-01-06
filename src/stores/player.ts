import { Howl, Howler } from "howler";
import { computed, ref } from "vue";
import { defineStore } from "pinia";
import { debounce } from "@/utility/debounce";
import { formatTime } from "@/utility/helper";
import type { DocumentData } from "firebase/firestore";

export const usePlayerStore = defineStore("player", () => {
  //** --- state ---- *//
  const audio = ref();
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
    if (audio.value instanceof Howl) audio.value?.unload();

    audio.value = new Howl({
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

    audio.value.play();
  }

  const NextSong = () => {
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
  };

  const PreviousSong = () => {
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
  };

  const playNextSong = debounce(() => NextSong());
  const playPreviousSong = debounce(() => PreviousSong());

  function toggleAudio() {
    if (!audio.value?.playing) return;
    if (audio.value.playing()) {
      audio.value.pause();
      isSongPlaying.value = "pause";
    } else {
      audio.value.play();
      isSongPlaying.value = "play";
    }
  }

  function stopAudio() {
    if (!audio.value?.playing) return;
    isSongPlaying.value = "stop";
    current_song.value = {};
    isSongEnd.value = true;
    audio.value.stop();
  }

  function progress() {
    seek.value = formatTime(audio.value?.seek());
    duration.value = formatTime(audio.value?.duration());

    if (!hasPressPrevNextButton.value) {
      playerProgress.value = String(
        (audio.value?.seek() / audio.value?.duration()) * 100
      );
    }

    if (audio.value?.playing()) {
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
    if (!audio.value?.playing) return;
    const percentage = (event.target as HTMLInputElement).value;
    const seconds = (audio.value?.duration() / 100) * Number(percentage);

    audio.value?.seek(seconds);
    audio.value?.once(
      "seek",
      debounce(() => requestAnimationFrame(progress))
    );
  }
  //** --- Action ---- *//

  //** --- Getters ---- *//
  const isPlaying = computed(() =>
    audio.value?.playing ? audio.value.playing() : false
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
