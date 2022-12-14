<!-- TODO: https://medium.com/js-dojo/error-exception-handling-in-vue-js-application-6c26eeb6b3e4 -->
<template>
  <div>
    <slot
      v-if="err"
      name="error"
      v-bind:err="err"
      v-bind:vm="vm"
      v-bind:info="info"
      >Something went wrong</slot
    >
    <slot v-else></slot>
  </div>
</template>

<script lang="ts">
export default {
  name: "error-boundary",
  props: {
    stopPropagation: Boolean,
  },
  data() {
    return {
      err: false,
      vm: null,
      info: null,
    };
  },
  errorCaptured(err: any, vm: any, info: any) {
    this.err = err;
    this.vm = vm;
    this.info = info;
    return !this.stopPropagation;
  },
};
</script>

<style lang="scss" scoped></style>
