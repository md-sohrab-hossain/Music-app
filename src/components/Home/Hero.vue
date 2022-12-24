<template>
  <!-- Introduction -->
  <section class="relative py-20 md:mb-8 text-center text-white">
    <div
      class="absolute inset-0 w-full h-full bg-black bg-repeat-x bg-contain md:bg-transparent introduction-bg"
      style="background-image: url(assets/img/header-8.png)"
    />

    <div class="container mx-auto">
      <div class="text-white main-header-content">
        <h1
          class="mb-5 mt-16 md:mt-0 font-serif text-xl italic font-bold cursor-default animate__animated animate__jackInTheBox md:text-3xl text-cyan-400"
        >
          Listen To Music Together!
        </h1>
        <p
          class="invisible w-full mx-auto text-sm italic cursor-default md:w-8/12 md:visible text-lime-400"
        >
          The perfect music gift from one of the most trusted names in
          continuing education. Learn how to better appreciate music in this
          guide that will unlock the knowledge you need to understand “the most
          abstract and sublime of all the arts.
        </p>

        <p
          class="visible w-full mx-auto -mt-20 text-sm italic cursor-default md:w-8/12 md:invisible text-lime-400"
        >
          Music is like a dream. Without music, life would be a mistake ―
          Friedrich Nietzsche
        </p>
      </div>
    </div>

    <img
      draggable="false"
      class="relative invisible block w-auto max-w-full mx-auto mt-5 -mb-20 lg:visible"
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
