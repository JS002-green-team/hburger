import iniciaModal from "./acionaModal";

export default function showSidebarUser() {
  const avatar = document.querySelector("#avatar") as HTMLImageElement;

  if (avatar) {
    avatar.addEventListener("click", (e) => {
      iniciaModal("user-modal");
    });
  }
}
