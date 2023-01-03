import { ref } from "vue";
import { defineStore } from "pinia";
import type { DocumentData } from "firebase/firestore";

export const useSongsStore = defineStore("songs", () => {
  const songs = ref<DocumentData>([]);

  return {
    songs,
  };
});
