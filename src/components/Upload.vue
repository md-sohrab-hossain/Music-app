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
        @drop.prevent.stop="upload($event)"
      >
        <h5>Drop your files here</h5>
      </div>
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
type Uploading = {
  task: Object;
  current_progress: Number;
  name: String;
  variant?: String;
  icon?: String;
  text_class?: String;
};

import { uploadFile, useSaveFile } from "@/includes/firebaseUtility";
import { auth, getDownloadURL } from "@/includes/firebaseConfig";
import ProgressBar from "@/components/ProgressBar.vue";

export default {
  name: "UploadFile",
  components: {
    ProgressBar,
  },
  data() {
    return {
      is_dragover: false,
      uploads: [] as Uploading[],
    };
  },
  methods: {
    upload(event: any) {
      this.is_dragover = false;

      const files = [...event.dataTransfer.files];
      files.forEach((file) => {
        if (file.type !== "audio/mpeg") return;

        const uploadMedia = uploadFile(file, file.name);

        const uploadIndex =
          this.uploads.push({
            task: uploadMedia,
            current_progress: 0,
            name: file.name,
            variant: "bg-blue-400",
            icon: "fas fa-spinner fa-spin",
            text_class: "",
          }) - 1;

        //Progress bar
        uploadMedia.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            this.uploads[uploadIndex].current_progress = progress;
          },
          (error) => {
            this.uploads[uploadIndex].variant = "bg-red-400";
            this.uploads[uploadIndex].icon = "fas fa-times";
            this.uploads[uploadIndex].text_class = "text-red-400";
            console.log("upload error ", error);
          },
          async () => {
            // storing the file data in the database
            const song = {
              uid: auth.currentUser?.uid,
              display_name: auth.currentUser?.displayName,
              original_name: uploadMedia.snapshot.ref.name,
              modified_name: uploadMedia.snapshot.ref.name,
              genre: "",
              url: "",
              comment_count: 0,
            };

            song.url = await getDownloadURL(uploadMedia.snapshot.ref).then(
              (url) => url
            );

            useSaveFile(song);

            this.uploads[uploadIndex].variant = "bg-green-400";
            this.uploads[uploadIndex].icon = "fas fa-check";
            this.uploads[uploadIndex].text_class = "text-green-400";
          }
        );
      });
    },
  },
};
</script>
