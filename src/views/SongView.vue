<template>
  <music-header :songInfo="songInfo" @playMusic="playMusic" />
  <comments-form
    @addComment="addComment"
    @sortComments="sortComments"
    :commentsCount="commentsCount"
    :comment_show_alert="comment_show_alert"
    :comment_in_submission="comment_in_submission"
    :comment_alert_variant="comment_alert_variant"
    :comment_alert_message="comment_alert_message"
  />
  <comments-list :comments="commentsList" />
</template>

<script lang="ts">
import { useRoute, useRouter } from "vue-router";
import { defineComponent, onMounted, watch, ref } from "vue";
import type { DocumentData } from "firebase/firestore";
import { usePlayerStore } from "@/stores/player";

import MusicHeader from "@/components/Songs/MusicHeader.vue";
import CommentsForm from "@/components/Songs/CommentsForm.vue";
import CommentsList from "@/components/Songs/CommentsList.vue";
import {
  useGetDocById,
  useAddComment,
  useGetComments,
} from "@/utility/firebaseUtility";
import { auth } from "@/utility/firebaseConfig";

export default defineComponent({
  name: "SongPage",
  components: {
    MusicHeader,
    CommentsForm,
    CommentsList,
  },
  setup() {
    const route: any = useRoute();
    const router: any = useRouter();
    const songInfo = ref<DocumentData>([]);
    const commentsCount = ref<number>(0);
    const commentsList = ref<DocumentData | undefined>([]);
    const comment_in_submission = ref<boolean>(false);
    const comment_show_alert = ref<boolean>(false);
    const comment_alert_variant = ref<string>("bg-blue-500");
    const comment_alert_message = ref<string>(
      "Please wait! Your comment is being submitted"
    );

    const { newSong } = usePlayerStore();

    onMounted(async () => {
      const docSnapshot: any = await useGetDocById(route.params.id);

      if (!docSnapshot.exists()) router.push({ name: "home" });

      songInfo.value = docSnapshot.data();
      commentsList.value = await getComment();
    });

    watch(
      () => commentsList.value,
      (currentValue) => {
        commentsCount.value = currentValue?.length | 0;
      }
    );

    const playMusic = () => newSong(songInfo.value);

    const getComment = async () => await useGetComments(route.params.id);
    const addComment = async (event: any) => {
      comment_show_alert.value = true;
      comment_in_submission.value = true;
      comment_alert_variant.value = "bg-blue-500";
      comment_alert_message.value =
        "Please wait! Your Comment is being submitted";

      const comment = {
        content: event.comment,
        datePosted: new Date().toString(),
        sid: route.params.id,
        name: auth.currentUser?.displayName,
        uid: auth.currentUser?.uid,
      };

      const isCommentAdded = await useAddComment(comment);

      if (isCommentAdded == "Comment Added!") {
        comment_in_submission.value = false;
        comment_alert_variant.value = "bg-green-500";
        comment_alert_message.value = "Comment added!";
        commentsList.value = await getComment();

        setTimeout(() => {
          comment_show_alert.value = false;
        }, 2000);
      }
    };

    const sortComments = (event: any) => {
      console.log("comments -- ", event.target.value);
    };

    return {
      songInfo,
      playMusic,
      addComment,
      sortComments,
      commentsList,
      commentsCount,
      comment_show_alert,
      comment_in_submission,
      comment_alert_variant,
      comment_alert_message,
    };
  },
});
</script>
