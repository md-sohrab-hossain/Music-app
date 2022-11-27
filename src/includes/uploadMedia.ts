import type { Ref } from "vue";
import { uploadFile, useSaveFile } from "@/includes/firebaseUtility";
import { auth, getDownloadURL } from "@/includes/firebaseConfig";

export interface uploadFileType {
  task: any;
  current_progress: Number;
  name: String;
  variant?: String;
  icon?: String;
  text_class?: String;
}

export const uploadSongs = (
  event: any,
  is_dragover: Ref<boolean>,
  uploads: Ref<uploadFileType[]>
) => {
  is_dragover.value = false;

  // check is it drag event or inputFile event
  const files = event.dataTransfer
    ? [...event.dataTransfer.files]
    : [...event.target.files];

  files.forEach((file) => {
    if (file.type !== "audio/mpeg") return;

    const uploadMedia = uploadFile(file, file.name);

    const uploadIndex =
      uploads.value.push({
        task: uploadMedia,
        current_progress: 0,
        name: file.name,
        variant: "bg-blue-400",
        icon: "fas fa-spinner fa-spin",
        text_class: "",
      }) - 1;

    //Progress bar
    uploadMedia.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        uploads.value[uploadIndex].current_progress = progress;
      },
      (error) => {
        uploads.value[uploadIndex].variant = "bg-red-400";
        uploads.value[uploadIndex].icon = "fas fa-times";
        uploads.value[uploadIndex].text_class = "text-red-400";
        console.log("upload error ", error);
      },
      async () => {
        // after successfully done storing the file data in the database
        const song = {
          uid: auth.currentUser?.uid,
          display_name: auth.currentUser?.displayName,
          original_name: uploadMedia.snapshot.ref.name,
          modified_name: uploadMedia.snapshot.ref.name,
          genre: "",
          url: "",
          comment_count: 0,
        };

        song.url = await getDownloadURL(uploadMedia.snapshot.ref).then(
          (url) => url
        );

        await useSaveFile(song);

        uploads.value[uploadIndex].variant = "bg-green-400";
        uploads.value[uploadIndex].icon = "fas fa-check";
        uploads.value[uploadIndex].text_class = "text-green-400";
      }
    );
  });
};
