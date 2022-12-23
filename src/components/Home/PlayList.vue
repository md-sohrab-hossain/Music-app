<template>
  <!-- Main Content -->
  <section class="container mx-auto">
    <div class="bg-white rounded border border-gray-200 relative flex flex-col">
      <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
        <span class="card-title">Songs</span>
        <!-- Icon -->
        <i class="fa fa-headphones-alt float-right text-indigo-400 text-xl"></i>
      </div>

      <!-- Playlist -->
      <ol id="playlist">
        <li v-for="song in songs" :key="song.docId">
          <div
            class="flex justify-between items-center gap-4 p-3 pl-6 cursor-pointer transition duration-300 hover:bg-gray-50"
          >
            <div>
              <router-link
                :to="{ name: 'song', params: { id: song.docId } }"
                class="font-bold block text-gray-600"
                >{{ song.modified_name }}</router-link
              >
              <span class="text-gray-500 text-sm">{{ song.display_name }}</span>
            </div>

            <router-link
              :to="{ name: 'song', params: { id: song.docId } }"
              class="text-gray-600 text-lg w-12"
            >
              <span class="comments">
                <i class="fa fa-comments text-gray-600"></i>
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
import { defineComponent } from "vue";
import "animate.css";

export default defineComponent({
  name: "PlayList",
  props: ["songs", "isLoading", "isEmpty"],
});
</script>
