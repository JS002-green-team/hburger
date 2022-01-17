import iniciaModal from "./acionaModal";

export default function showSidebarUser(){
    const avatar = document.querySelector("#avatar") as HTMLImageElement;
    avatar.addEventListener("click", (e) => {
        iniciaModal("user-modal");
    })
}