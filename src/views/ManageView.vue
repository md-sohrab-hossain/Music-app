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
              :show_alert="show_alert"
              :in_submission="in_submission"
              :alert_variant="alert_variant"
              :alert_message="alert_message"
              :key="song.docId"
              :song="song"
              @editSong="editSong"
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
import { useUpdateSongs } from "@/utility/firebaseUtility";
/**----- Modify Songs List ----- */

export default defineComponent({
  name: "ManageView",
  components: {
    UploadFile,
    CompositionItem,
  },
  setup() {
    //**----- Upload File ------------ */
    const uploads = ref<uploadFileType[]>([]);
    const uploadFile = (event: any) => {
      uploadSongs(event, uploads);
    };
    //**----- Upload File ------------ */

    //**----- Edit Songs List ------------ */
    const songsList = ref<DocumentData>([]);
    const show_alert = ref<boolean>(false);
    const in_submission = ref<boolean>(false);
    const alert_variant = ref<string>("bg-blue-500");
    const alert_message = ref<string>("Please wait! Updating song info.");

    onMounted(async () => {
      const data = await useGetSongList();
      data ? (songsList.value = data) : null;
    });

    const editSong = async (song: Object, docId: string) => {
      show_alert.value = true;
      in_submission.value = true;
      alert_variant.value = "bg-blue-500";
      alert_message.value = "Please wait! Updating song info.";

      try {
        const data = await useUpdateSongs(song, docId);
        if (data === "updated") {
          const UpdatedList = songsList.value.map((item: any) => {
            if (item.docId === docId) {
              return (item = song);
            }
            return item;
          });
          songsList.value = UpdatedList;
        }
      } catch (error) {
        in_submission.value = false;
        alert_variant.value = "bg-red-500";
        alert_message.value = "Something went wrong! Try agin later";
        return;
      }

      in_submission.value = false;
      alert_variant.value = "bg-green-500";
      alert_message.value = "Success!";

      setTimeout(() => {
        show_alert.value = false;
      }, 2000);
    };
    //**----- Edit Songs List ------------ */

    return {
      uploads,
      uploadFile,
      songsList,
      editSong,
      show_alert,
      in_submission,
      alert_variant,
      alert_message,
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
