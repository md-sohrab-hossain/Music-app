<template>
  <!-- Main Content -->
  <section class="container mx-auto mt-6">
    <div class="md:grid md:grid-cols-3 md:gap-4">
      <!-- Upload Songs-->
      <div class="col-span-1">
        <upload-file :uploads="uploads" @uploadSong="uploadFile" />
      </div>

      <!-- Edit Songs-->
      <div class="col-span-2">
        <div
          class="bg-white rounded border border-gray-200 relative flex flex-col"
        >
          <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
            <span class="card-title">My Songs</span>
            <i
              class="fa fa-compact-disc float-right text-green-400 text-2xl"
            ></i>
          </div>
          <div class="p-6">
            <!-- Composition Items -->
            <composition-item
              v-for="song in songsList"
              :key="song.docId"
              :song="song"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import type { DocumentData } from "@firebase/firestore";

/**----- Upload File Components ----- */
import UploadFile from "@/components/Upload.vue";
import { uploadSongs } from "@/utility/uploadMedia";
import type { uploadFileType } from "@/utility/uploadMedia";
/**----- Upload File Components ----- */

/**----- Modify Songs List ----- */
import CompositionItem from "@/components/CompositionItem.vue";
import { useGetSongList } from "@/utility/firebaseUtility";
/**----- Modify Songs List ----- */

export default defineComponent({
  name: "ManageView",
  components: {
    UploadFile,
    CompositionItem,
  },
  setup() {
    const uploads = ref<uploadFileType[]>([]);
    const uploadFile = (event: any) => {
      uploadSongs(event, uploads);
    };

    const songsList = ref<DocumentData | undefined>([]);
    onMounted(async () => {
      songsList.value = await useGetSongList();
    });

    return {
      uploads,
      uploadFile,
      songsList,
    };
  },
});
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
