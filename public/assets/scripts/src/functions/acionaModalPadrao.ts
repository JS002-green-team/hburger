export default function acionaModalPadrao(modalID: string) {

    const modal = document.getElementById(modalID);
    if (modal) {
        modal.classList.add('mostrar');
        modal.addEventListener('click', (e: Event) => {
            const objClik = e.target as HTMLElement;
            console.log("Modal padrão evento")
            if (objClik.id == "fechar-modal-padrao" || objClik.id == "modal-padrao") {
                console.log(objClik.id);
                modal.classList.remove('mostrar');
                localStorage.fechaModal = modalID;
            }

        });
    }

}