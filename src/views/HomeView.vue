<template>
  <main>
    <hero />
    <play-list :songs="songsList" />
  </main>
</template>

<script lang="ts">
import { defineComponent, onMounted, onBeforeUnmount, ref } from "vue";
import {
  useGetDocById,
  useGetAllSongs,
  useGetPaginatedSongs,
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
    const songsList = ref<DocumentData>([]);
    const pendingRequest = ref<boolean>(false);
    const maxPerPage: number = 5;

    onMounted(() => {
      getSongs();
      window.addEventListener("scroll", handleScroll);
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
        getSongs();
      }
    };

    // Pagination
    const getSongs = async () => {
      if (pendingRequest.value) return;
      pendingRequest.value = true;

      let snapshots = null;
      if (songsList.value.length) {
        const docId: string = songsList.value[songsList.value.length - 1].docId;
        const lastDoc: any = await useGetDocById(docId);
        snapshots = await useGetPaginatedSongs(maxPerPage, lastDoc);
      } else {
        snapshots = await useGetAllSongs(maxPerPage);
      }

      snapshots?.forEach((doc: any) => {
        songsList.value.push({
          ...doc,
        });
      });

      pendingRequest.value = false;
    };

    return {
      songsList,
    };
  },
});
</script>
