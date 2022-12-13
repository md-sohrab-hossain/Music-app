<template>
  <!-- Form -->
  <section class="container mx-auto mt-6">
    <div class="bg-white rounded border border-gray-200 relative flex flex-col">
      <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
        <!-- Comment Count -->
        <span class="card-title">Comments ({{ commentsCount }})</span>
        <i class="fa fa-comments float-right text-green-400 text-2xl"></i>
      </div>
      <div class="p-6">
        <div
          class="text-white text-center font-bold p-4 mb-4"
          v-if="comment_show_alert"
          :class="comment_alert_variant"
        >
          {{ comment_alert_message }}
        </div>

        <vee-form
          v-if="userLoggedIn"
          :validation-schema="schema"
          @submit="$emit('addComment', $event)"
        >
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
        <!-- Sort Comments -->
        <select
          class="block mt-4 py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
          @click="$emit('sortComments', $event)"
        >
          <option value="1">Latest</option>
          <option value="2">Oldest</option>
        </select>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import useUserStore from "@/stores/user";
import { mapState } from "pinia";
import { ErrorMessage } from "vee-validate";

export default {
  name: "CommentsForm",
  emits: ["addComment", "sortComments"],
  props: [
    "commentsCount",
    "comment_show_alert",
    "comment_in_submission",
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
  components: { ErrorMessage },
};
</script>
