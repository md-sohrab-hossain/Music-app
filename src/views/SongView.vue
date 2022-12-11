<template>
  <music-header :songInfo="songInfo" />
  <comments-form
    @addComment="addComment"
    :comment_show_alert="comment_show_alert"
    :comment_in_submission="comment_in_submission"
    :comment_alert_variant="comment_alert_variant"
    :comment_alert_message="comment_alert_message"
  />
  <comments-list />
</template>

<script lang="ts">
import { useRoute, useRouter } from "vue-router";
import { defineComponent, onMounted, ref } from "vue";
import type { DocumentData } from "firebase/firestore";

import MusicHeader from "@/components/Songs/MusicHeader.vue";
import CommentsForm from "@/components/Songs/CommentsForm.vue";
import CommentsList from "@/components/Songs/CommentsList.vue";
import { useGetDocById, useAddComment } from "@/utility/firebaseUtility";
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
    const comment_in_submission = ref<boolean>(false);
    const comment_show_alert = ref<boolean>(false);
    const comment_alert_variant = ref<string>("bg-blue-500");
    const comment_alert_message = ref<string>(
      "Please wait! Your comment is being submitted"
    );

    onMounted(async () => {
      const docSnapshot: any = await useGetDocById(route.params.id);

      if (!docSnapshot.exists()) router.push({ name: "home" });
      else songInfo.value = docSnapshot.data();
    });

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

        setTimeout(() => {
          comment_show_alert.value = false;
        }, 2000);
      }
    };

    return {
      songInfo,
      addComment,
      comment_show_alert,
      comment_in_submission,
      comment_alert_variant,
      comment_alert_message,
    };
  },
});
</script>
