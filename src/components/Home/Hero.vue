<template>
  <!-- Introduction -->
  <section class="mb-8 py-20 text-white text-center relative">
    <div
      class="absolute inset-0 w-full h-full bg-contain introduction-bg"
      style="background-image: url(assets/img/header-8.png)"
    />

    <div class="container mx-auto">
      <div class="text-white main-header-content">
        <h1
          class="animate__animated animate__jackInTheBox italic mb-5 text-5xl font-bold font-serif text-cyan-400 cursor-default"
        >
          Listen To Music Together!
        </h1>
        <p
          class="w-full mx-auto md:w-8/12 text-sm italic text-lime-400 cursor-default"
        >
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
import "animate.css";
export default {
  name: "HeroComponent",
};
</script>
