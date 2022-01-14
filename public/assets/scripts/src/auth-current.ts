import { onAuthStateChanged, getAuth, signOut } from "firebase/auth";

const auth = getAuth();
const userPhoto = document.querySelector("img#avatar") as HTMLImageElement;

if (userPhoto) {
  userPhoto.addEventListener("click", () => {
    signOut(auth);
  });

  onAuthStateChanged(getAuth(), () => {
    if (auth.currentUser) {
      userPhoto.src =
        auth.currentUser.photoURL ?? "./assets/images/default-user-image.png";
    } else {
      //window.location.assign("login.html");
    }
  });
}
