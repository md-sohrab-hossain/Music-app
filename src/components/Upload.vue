<template>
  <div class="bg-white rounded border border-gray-200 relative flex flex-col">
    <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
      <span class="card-title">Upload</span>
      <i class="fas fa-upload float-right text-green-400 text-2xl"></i>
    </div>
    <div class="p-6">
      <!-- Upload Dropbox -->
      <div
        class="w-full px-10 py-20 rounded text-center cursor-pointer border border-dashed border-gray-400 text-gray-400 transition duration-500 hover:text-white hover:bg-green-400 hover:border-green-400 hover:border-solid"
        :class="{ 'bg-green-400 border-green-400 border-solid': is_dragover }"
        @drag.prevent.stop=""
        @dragstart.prevent.stop=""
        @dragend.prevent.stop="is_dragover = false"
        @dragleave.prevent.stop="is_dragover = false"
        @dragover.prevent.stop="is_dragover = true"
        @dragenter.prevent.stop="is_dragover = true"
        @drop.prevent.stop="uploadFile($event)"
      >
        <h5>Drop your files here</h5>
      </div>

      <input type="file" multiple @change="uploadFile($event)" />
      <hr class="my-6" />

      <!-- Progress Bars -->
      <template v-for="upload in uploads" :key="upload.name">
        <ProgressBar
          :fileName="upload.name"
          :width="upload.current_progress"
          :text_class="upload.text_class"
          :variant="upload.variant"
          :icon="upload.icon"
        />
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { uploadSongs } from "@/utility/uploadMedia";
import type { uploadFileType } from "@/utility/uploadMedia";
import ProgressBar from "@/components/ProgressBar.vue";

export default defineComponent({
  name: "UploadFile",
  components: {
    ProgressBar,
  },
  setup() {
    const is_dragover = ref<boolean>(false);
    const uploads = ref<uploadFileType[]>([]);

    const uploadFile = (event: any) => {
      uploadSongs(event, is_dragover, uploads);
    };

    return {
      uploads,
      is_dragover,
      uploadFile,
    };
  },
  beforeUnmount() {
    // suppose I moved from upload page to another page and that time if any file is on going to upload then cancel it
    this.uploads.forEach((upload) => {
      upload.task.cancel();
    });
  },
});
</script>
