export default function iniciaModal(modalID: string) {

    const modal = document.getElementById(modalID);
    if (modal) {
        modal.classList.add('mostrar');
        modal.addEventListener('click', (e: Event) => {
            const objClik = e.target as HTMLElement;
            if (objClik.id == "fechar-modal" || objClik.id == "user-modal") {
                console.log(objClik.id);
                modal.classList.remove('mostrar');
                localStorage.fechaModal = modalID;
            }

        });
    }

}