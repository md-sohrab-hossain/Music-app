<template>
  <main>
    <hero />
    <play-list :songs="songsList" :isLoading="isLoading" />
  </main>
</template>

<script lang="ts">
import { defineComponent, onMounted, onBeforeUnmount, ref } from "vue";
import {
  useGetDocById,
  useGetAllSongs,
  useGetSongListLength,
  useGetPaginatedSongs,
  useGetComments,
} from "@/utility/firebaseUtility";
import type { DocumentData } from "firebase/firestore";

import Hero from "@/components/Home/Hero.vue";
import PlayList from "@/components/Home/PlayList.vue";

export default defineComponent({
  name: "HomePage",
  components: {
    Hero,
    PlayList,
  },

  setup() {
    const maxPerPage: number = 5;
    const isLoading = ref<boolean>(false);
    const songsList = ref<DocumentData>([]);
    const songsListLength = ref<number>(0);

    onMounted(async () => {
      songsList.value = [];
      songsListLength.value = (await useGetSongListLength()) || 0;
      window.addEventListener("scroll", handleScroll);
      getSongs();
    });

    onBeforeUnmount(() => {
      window.removeEventListener("scroll", handleScroll);
    });

    //infinite scroll
    const handleScroll = () => {
      const { scrollTop, offsetHeight } = document.documentElement;
      const { innerHeight } = window;

      const bottomOfWindow =
        Math.round(scrollTop) + innerHeight === offsetHeight;

      if (bottomOfWindow) {
        setTimeout(() => getSongs(), 500);
      }
    };

    // Pagination
    const getSongs = async () => {
      if (isLoading.value) return;
      isLoading.value = true;

      let snapshots = null;
      if (songsList.value.length < songsListLength.value) {
        if (songsList.value.length) {
          const docId = songsList.value[songsList.value.length - 1].docId;
          const lastDoc: any = await useGetDocById(docId);
          snapshots = await useGetPaginatedSongs(maxPerPage, lastDoc);
        } else {
          snapshots = await useGetAllSongs(maxPerPage);
        }
      }

      snapshots?.forEach(async (doc: any) => {
        const comment_count = await useGetComments(doc.docId);
        songsList.value.push({
          ...doc,
          comment_count: comment_count?.length,
        });
      });

      isLoading.value = false;
    };

    return {
      songsList,
      isLoading,
    };
  },
});
</script>
