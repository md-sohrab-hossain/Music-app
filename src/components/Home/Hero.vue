<template>
  <!-- Introduction -->
  <section class="mb-8 py-20 text-white text-center relative">
    <div
      class="absolute inset-0 w-full h-full bg-contain introduction-bg"
      style="background-image: url(assets/img/header-8.png)"
    />

    <div class="container mx-auto">
      <div class="text-white main-header-content">
        <h1 class="mb-5 text-5xl font-bold text-cyan-400 cursor-default">
          Listen to Great Music!
        </h1>
        <p class="w-full mx-auto md:w-8/12 text-lime-400 cursor-default">
          The perfect music gift from one of the most trusted names in
          continuing education. Learn how to better appreciate music in this
          guide that will unlock the knowledge you need to understand “the most
          abstract and sublime of all the arts.
        </p>
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
