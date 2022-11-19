import { defineStore } from "pinia";
import { useRegisterUser, useCreateNewUser } from "@/includes/firebaseUtility";

export default defineStore("user", {
  state: () => ({
    userLoggedIn: false,
  }),
  actions: {
    async register(values: any) {
      await useRegisterUser(values.email, values.password);

      await useCreateNewUser({
        name: values.name,
        email: values.email,
        age: values.age,
        country: values.country,
      });
    },
  },
});
