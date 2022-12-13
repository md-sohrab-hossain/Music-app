import { defineStore } from "pinia";
import { updateProfile } from "firebase/auth";
import {
  useRegisterUser,
  useSignInUser,
  useSignOutUser,
  useCreateNewUser,
} from "@/utility/firebaseUtility";

export const useUserStore = defineStore("user", {
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
      await updateProfile(userCredential.user, {
        displayName: values.name,
      });

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
