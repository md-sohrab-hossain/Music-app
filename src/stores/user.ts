import { defineStore } from "pinia";
import {
  useRegisterUser,
  useSignInUser,
  useSignOutUser,
  useCreateNewUser,
} from "@/includes/firebaseUtility";

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
    async authenticate(values: any) {
      await useSignInUser(values.email, values.password);
      this.userLoggedIn = true;
    },
    async signOut() {
      await useSignOutUser();
      this.userLoggedIn = false;
    },
  },
});
