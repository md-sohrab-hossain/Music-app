<template>
  <music-header />
  <comments-form />
  <comments-list />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MusicHeader from "@/components/Songs/MusicHeader.vue";
import CommentsForm from "@/components/Songs/CommentsForm.vue";
import CommentsList from "@/components/Songs/CommentsList.vue";

export default defineComponent({
  name: "SongPage",
  components: {
    MusicHeader,
    CommentsForm,
    CommentsList,
  },
});
</script>
