<template>
  <music-header :songInfo="songInfo" />
  <comments-form />
  <comments-list />
</template>

<script lang="ts">
import { useRoute } from "vue-router";
import { defineComponent, onMounted, ref } from "vue";
import type { DocumentData } from "firebase/firestore";

import MusicHeader from "@/components/Songs/MusicHeader.vue";
import CommentsForm from "@/components/Songs/CommentsForm.vue";
import CommentsList from "@/components/Songs/CommentsList.vue";
import { useGetDocById } from "@/utility/firebaseUtility";

export default defineComponent({
  name: "SongPage",
  components: {
    MusicHeader,
    CommentsForm,
    CommentsList,
  },
  setup() {
    const route: any = useRoute();
    const songInfo = ref<DocumentData | undefined>([]);

    onMounted(async () => {
      const docSnapshot = await useGetDocById(route.params.id);

      if (!docSnapshot?.exists) route.push({ name: "home" });
      songInfo.value = docSnapshot?.data();
    });

    return {
      songInfo,
    };
  },
});
</script>
