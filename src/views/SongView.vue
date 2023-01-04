<template>
  <main>
    <music-header :songInfo="songInfo" @playMusic="playMusic" />
    <comments-form
      @addComment="addComment"
      @sortComments="sortComments"
      :commentsCount="commentsCount"
      :comment_show_alert="comment_show_alert"
      :comment_alert_variant="comment_alert_variant"
      :comment_alert_message="comment_alert_message"
    >
      <template #comments-form>
        <vee-form :validation-schema="schema" @submit="addComment">
          <vee-field
            as="textarea"
            name="comment"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded mb-4"
            placeholder="Your comment here..."
          />
          <ErrorMessage class="text-red-600" name="comment" />
          <button
            type="submit"
            :disabled="comment_in_submission"
            class="py-1.5 px-3 rounded text-white bg-green-600 block"
          >
            Submit
          </button>
        </vee-form>
      </template>
    </comments-form>

    <comments-list :comments="commentsList" />
  </main>
</template>

<script lang="ts">
import type { DocumentData } from "firebase/firestore";
import { useRoute, useRouter } from "vue-router";
import { defineComponent, onMounted, watch, ref } from "vue";
import { usePlayerStore } from "@/stores/player";
import { storeToRefs } from "pinia";

import MusicHeader from "@/components/Songs/MusicHeader.vue";
import CommentsForm from "@/components/Songs/CommentsForm.vue";
import CommentsList from "@/components/Songs/CommentsList.vue";
import { formatDate } from "@/utility/helper";
import { ErrorMessage } from "vee-validate";

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
    ErrorMessage,
  },
  setup() {
    const route: any = useRoute();
    const router: any = useRouter();
    const commentsCount = ref<number>(0);
    const commentsList = ref<DocumentData | undefined>([]);
    const comment_in_submission = ref<boolean>(false);
    const comment_show_alert = ref<boolean>(false);
    const comment_alert_variant = ref<string>("bg-blue-500");
    const comment_alert_message = ref<string>(
      "Please wait! Your comment is being submitted"
    );

    const store = usePlayerStore();
    const { songInfo } = storeToRefs(store);
    const { playAudio } = usePlayerStore();

    onMounted(async () => {
      const docSnapshot: any = await useGetDocById(route.params.id);
      if (!docSnapshot.exists()) router.push({ name: "home" });

      songInfo.value = docSnapshot.data();
      commentsList.value = await getComment();
    });

    watch(
      () => commentsList.value,
      (currentValue, oldValue) => {
        if (currentValue !== oldValue) {
          commentsCount.value = currentValue?.length;
        }
      }
    );

    const playMusic = () => playAudio(songInfo.value);

    const getComment = async () => await useGetComments(route.params.id);
    const addComment = async (event: any, { resetForm }: any) => {
      comment_show_alert.value = true;
      comment_in_submission.value = true;
      comment_alert_variant.value = "bg-blue-500";
      comment_alert_message.value =
        "Please wait! Your Comment is being submitted";

      const comment = {
        content: event.comment,
        datePosted: formatDate(new Date()),
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
        }, 1000);
      }

      resetForm();
    };

    const sortComments = (event: any) => {
      let sortComments = commentsList.value;

      sortComments = sortComments?.sort((a: any, b: any) => {
        const items1 = formatDate(a.datePosted);
        const items2 = formatDate(b.datePosted);

        if (event.target.value == "latest") {
          return items1 > items2 ? -1 : items1 < items2 ? 1 : 0; // sort desc
        } else {
          return items1 < items2 ? -1 : items1 > items2 ? 1 : 0; // sort asc
        }
      });

      if (sortComments?.length) commentsList.value = sortComments;
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
      schema: {
        comment: "required|min:3",
      },
    };
  },
});
</script>
