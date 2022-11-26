<template>
  <div class="mb-4">
    <!-- File Name -->
    <div class="font-bold text-sm">{{ fileName }}</div>
    <div class="flex h-4 overflow-hidden bg-gray-200 rounded">
      <!-- Inner Progress Bar -->
      <div
        class="transition-all progress-bar bg-blue-400"
        :class="'bg-blue-400'"
        :style="{ width: width + '%' }"
      ></div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "ProgressBar",
  props: ["fileName", "width"],
};
</script>
