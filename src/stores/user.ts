import { defineStore } from "pinia";
import { useRegisterUser, useCreateNewUser } from "@/includes/firebaseUtility";

export default defineStore("user", {
  state: () => ({
    userLoggedIn: false,
  }),
  actions: {
    async register(values: any) {
      const userCredential = await useRegisterUser(
        values.email,
        values.password
      );

      const data = {
        name: values.name,
        email: values.email,
        age: values.age,
        country: values.country,
      };
      await useCreateNewUser(data, userCredential.user.uid);

      this.userLoggedIn = true;
    },
  },
});
