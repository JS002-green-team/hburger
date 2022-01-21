import { onAuthStateChanged, getAuth, signOut } from "firebase/auth";

const auth = getAuth();
const menu = document.querySelector("#user-modal") as HTMLElement;
const profile = document.querySelector("#avatar") as HTMLElement;

if (menu) {
  const userName = menu.querySelector("strong") as HTMLElement;
  const userEmail = menu.querySelector("small") as HTMLElement;
  const userPhoto = menu.querySelector("#avatar-modal") as HTMLImageElement;
  const buttonLogout = menu.querySelector(
    "#user-modal > div > button:nth-child(5)"
  ) as HTMLButtonElement;

  buttonLogout.addEventListener("click", (e) => {
    e.preventDefault();
    signOut(auth);
    window.location.assign("login.html");
  });

  onAuthStateChanged(auth, (user) => {
    if (user) {
      profile.style.display = "block";
      userName.innerText = user.displayName ?? "Sem nome";
      userEmail.innerText = user.email ?? "";
      userPhoto.src = user.photoURL ?? "./assets/images/default-user-image.png";
    } else {
      profile.style.display = "none";
      window.location.assign("login.html");
    }
  });
}
