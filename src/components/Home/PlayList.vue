<template>
  <!-- Main Content -->
  <section class="container mx-auto">
    <div class="relative flex flex-col bg-white border border-gray-200 rounded">
      <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
        <span class="card-title">Songs</span>
        <!-- Icon -->
        <i class="float-right text-xl text-indigo-400 fa fa-headphones-alt"></i>
      </div>

      <!-- Playlist -->
      <ol id="playlist">
        <li v-for="song in songs" :key="song.docId">
          <div
            class="flex items-center justify-between gap-2 p-3 pl-6 transition duration-300 cursor-pointer hover:bg-gray-50"
            :class="{
              'bg-gradient-to-r from-indigo-500':
                current_song.docId === song.docId,
            }"
          >
            <div class="w-5/6 md:w-auto">
              <router-link
                :to="{ name: 'song', params: { id: song.docId } }"
                class="block font-bold text-gray-600"
                >{{ song.modified_name }}</router-link
              >
              <span class="text-sm text-gray-500">{{ song.display_name }}</span>
            </div>

            <router-link
              :to="{ name: 'song', params: { id: song.docId } }"
              class="text-lg text-gray-600 w-14 md:w-12"
            >
              <span class="comments">
                <i class="text-gray-600 fa fa-comments"></i>
                {{ song.comment_count }}
              </span>
            </router-link>
          </div>
        </li>

        <li v-if="!isEmpty" class="p-3 text-center text-amber-300">
          Songs List Is Empty..!
        </li>

        <li v-if="isLoading" class="p-3 text-center text-orange-600">
          <p class="animate__animated animate__tada animate__infinite">
            Loading...
          </p>
        </li>
      </ol>
      <!-------- end Playlist ------->
    </div>
  </section>
</template>

<script lang="ts">
import "animate.css";
import { defineComponent } from "vue";
import { storeToRefs } from "pinia";
import { usePlayerStore } from "@/stores/player";

export default defineComponent({
  name: "PlayList",
  props: ["songs", "isLoading", "isEmpty"],

  setup() {
    const store = usePlayerStore();
    const { current_song } = storeToRefs(store);

    return {
      current_song,
    };
  },
});
</script>
