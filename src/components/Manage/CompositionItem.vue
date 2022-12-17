<template>
  <div class="border border-gray-200 p-3 mb-4 rounded">
    <div v-show="!showForm">
      <h4 class="inline-block text-2xl font-bold truncate w-10/12 text-left">
        {{ song.modified_name }}
      </h4>
      <button
        @click.prevent="$emit('deleteSong', song.original_name, song.docId)"
        class="ml-1 py-1 px-2 text-sm rounded text-white bg-red-600 float-right"
      >
        <i class="fa fa-times"></i>
      </button>
      <button
        @click.prevent="showForm = !showForm"
        class="ml-1 py-1 px-2 text-sm rounded text-white bg-blue-600 float-right"
      >
        <i class="fa fa-pencil-alt"></i>
      </button>
    </div>

    <vee-form
      v-show="showForm"
      :initial-values="song"
      :validation-schema="schema"
      @submit="$emit('editSong', $event, song.docId)"
    >
      <div
        v-if="show_alert"
        :class="alert_variant"
        class="text-white text-center font-bold p-4 mb-4"
      >
        {{ alert_message }}
      </div>

      <div class="mb-3">
        <label class="inline-block mb-2">Song Title</label>
        <vee-field
          type="text"
          name="modified_name"
          class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
          placeholder="Enter Song Title"
        />
        <ErrorMessage class="text-red-600" name="modified_name" />
      </div>

      <div class="mb-3">
        <label class="inline-block mb-2">Genre</label>
        <vee-field
          type="text"
          name="genre"
          class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
          placeholder="Enter Genre"
        />
        <ErrorMessage class="text-red-600" name="genre" />
      </div>

      <button
        type="submit"
        :disabled="in_submission"
        class="py-1.5 px-3 mx-1 rounded text-white bg-green-600"
      >
        Submit
      </button>

      <button
        type="button"
        :disabled="in_submission"
        class="py-1.5 px-3 rounded text-white bg-gray-600"
        @click.prevent="showForm = false"
      >
        Go Back
      </button>
    </vee-form>
  </div>
</template>

<script lang="ts">
import { ErrorMessage } from "vee-validate";
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "CompositionItem",
  emits: ["editSong", "deleteSong"],
  props: [
    "song",
    "show_alert",
    "in_submission",
    "alert_variant",
    "alert_message",
  ],
  setup() {
    const showForm = ref<boolean>(false);

    return {
      schema: {
        modified_name: "required",
        genre: "alpha_spaces",
      },
      showForm,
    };
  },
  components: { ErrorMessage },
});
</script>
