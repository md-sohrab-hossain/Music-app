<template>
  <!-- Form -->
  <section class="container mx-auto mt-6">
    <div class="bg-white rounded border border-gray-200 relative flex flex-col">
      <!-- Comment Count -->
      <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
        <span class="card-title">Comments ({{ commentsCount }})</span>
        <i class="fa fa-comments float-right text-green-400 text-2xl"></i>
      </div>

      <!-- Comment Form -->
      <div class="p-6">
        <div
          class="text-white text-center font-bold p-4 mb-4"
          v-if="comment_show_alert"
          :class="comment_alert_variant"
        >
          {{ comment_alert_message }}
        </div>

        <slot name="comments-form" v-if="userLoggedIn"></slot>

        <!-- Sort Comments -->
        <select
          class="block mt-4 py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
          @change="$emit('sortComments', $event)"
        >
          <option value="latest">Latest</option>
          <option value="oldest">Oldest</option>
        </select>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { useUserStore } from "@/stores/user";
import { mapState } from "pinia";

export default {
  name: "CommentsForm",
  emits: ["addComment", "sortComments"],
  props: [
    "commentsCount",
    "comment_show_alert",
    "comment_alert_variant",
    "comment_alert_message",
  ],
  data() {
    return {
      schema: {
        comment: "required|min:3",
      },
    };
  },
  computed: {
    ...mapState(useUserStore, ["userLoggedIn"]),
  },
};
</script>
