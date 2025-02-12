import { defineStore } from "pinia";

export default defineStore("modal", {
  state: () => ({
    isOpen: false,
    isLoading: false,
  }),
  actions: {
    handleLoading(value: boolean) {
      this.isLoading = value;
    },
    handleModal(value: boolean) {
      this.isOpen = value;
    },
  },
  getters: {
    hiddenClass(state) {
      return !state.isOpen ? "hidden" : "";
    },
  },
});
