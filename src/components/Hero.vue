<template>
  <!-- Introduction -->
  <section class="mb-8 py-20 text-white text-center relative">
    <div
      class="absolute inset-0 w-full h-full bg-contain introduction-bg"
      style="background-image: url(assets/img/header.png)"
    />

    <div class="container mx-auto">
      <div class="text-white main-header-content">
        <slot name="title"></slot>
        <slot name="description"></slot>
      </div>
    </div>

    <img
      draggable="false"
      class="relative block mx-auto mt-5 -mb-20 w-auto max-w-full"
      src="/assets/img/introduction-music.png"
    />
  </section>
</template>

<script lang="ts">
export default {
  name: "HeroComponent",
};
</script>
