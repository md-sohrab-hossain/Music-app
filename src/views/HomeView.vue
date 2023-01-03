<template>
  <main>
    <hero />
    <play-list
      :songs="songs"
      :isLoading="isLoading"
      :isEmpty="songsListLength"
    />
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
import { storeToRefs } from "pinia";
import { useSongsStore } from "@/stores/songs";
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
    const maxPerPage: number = 10;
    const isLoading = ref<boolean>(false);
    const songsListLength = ref<number>(-1);

    const store = useSongsStore();
    const { songs } = storeToRefs(store);

    onMounted(async () => {
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
        setTimeout(() => getSongs(), 1000);
      }
    };

    // Pagination
    const getSongs = async () => {
      if (isLoading.value || !songsListLength.value) return;
      isLoading.value = true;

      let snapshots = null;
      if (songs.value.length < songsListLength.value) {
        if (songs.value.length) {
          const docId = songs.value[songs.value.length - 1].docId;
          const lastDoc: any = await useGetDocById(docId);
          snapshots = await useGetPaginatedSongs(maxPerPage, lastDoc);
        } else {
          snapshots = await useGetAllSongs(maxPerPage);
        }
      }

      snapshots?.forEach(async (doc: any) => {
        const comment_count = await useGetComments(doc.docId);
        songs.value.push({
          ...doc,
          comment_count: comment_count?.length,
        });
      });

      isLoading.value = false;
    };

    return {
      songs,
      isLoading,
      songsListLength,
    };
  },
});
</script>
