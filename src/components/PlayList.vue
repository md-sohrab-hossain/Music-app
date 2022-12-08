<template>
  <!-- Main Content -->
  <section class="container mx-auto">
    <div class="bg-white rounded border border-gray-200 relative flex flex-col">
      <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
        <span class="card-title">Songs</span>
        <!-- Icon -->
        <i class="fa fa-headphones-alt float-right text-green-400 text-xl"></i>
      </div>
      <!-- Playlist -->
      <ol id="playlist">
        <li
          v-for="song in songs"
          :key="song.docId"
          class="flex justify-between items-center p-3 pl-6 cursor-pointer transition duration-300 hover:bg-gray-50"
        >
          <div>
            <a href="#" class="font-bold block text-gray-600">{{
              song.modified_name
            }}</a>
            <span class="text-gray-500 text-sm">{{ song.display_name }}</span>
          </div>

          <div class="text-gray-600 text-lg">
            <span class="comments">
              <i class="fa fa-comments text-gray-600"></i>
              {{ song.comment_count }}
            </span>
          </div>
        </li>
      </ol>
      <!-- .. end Playlist -->
    </div>
  </section>
</template>

<script lang="ts">
export default {
  name: "PlayList",
  props: ["songs"],
};
</script>
