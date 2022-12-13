<template>
  <!-- Comments -->
  <ul
    class="container mx-auto"
    v-for="comment in comments"
    :key="comment.docId"
  >
    <li class="p-6 bg-gray-50 border border-gray-200">
      <!-- Comment Author -->
      <div class="mb-5">
        <div class="font-bold">{{ comment.name }}</div>
        <time>{{ comment.datePosted }}</time>
      </div>

      <p>
        {{ comment.content }}
      </p>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from "vue";
// import { formatDate } from "@/utility/formatDate";
// import type { DocumentData } from "@firebase/firestore";

export default defineComponent({
  name: "CommentsList",
  props: ["comments"],

  // setup(props) {
  //   const commentsList = ref<DocumentData | undefined>([]);

  //   // if props value comments is changed then update dateFormate
  //   watch(
  //     () => props.comments,
  //     () => {
  //       commentsList.value = props.comments.map((item: any) => {
  //         return {
  //           ...item,
  //           datePosted: formatDate(item.datePosted), // formate date
  //         };
  //       });
  //     }
  //   );

  //   return {
  //     commentsList,
  //   };
  // },
});
</script>
