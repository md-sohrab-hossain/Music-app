<template>
  <div class="mb-4">
    <!-- File Name -->
    <div class="font-bold text-sm" :class="text_class">
      <i :class="icon" class="mx-1"></i>
      {{ fileName }}
    </div>

    <div class="flex h-4 overflow-hidden bg-gray-200 rounded">
      <!-- Inner Progress Bar -->
      <div
        class="transition-all progress-bar"
        :class="variant"
        :style="{ width: width + '%' }"
      />
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "ProgressBar",
  props: ["fileName", "width", "variant", "icon", "text_class"],
};
</script>
