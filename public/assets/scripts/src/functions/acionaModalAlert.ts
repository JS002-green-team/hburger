export default function acionaModalDangerAlert(msg: string){
    const modal = document.querySelector("modal-alert") as HTMLDivElement;
    if (modal) {
        let alerta = modal.querySelector("h3") as HTMLHeadingElement;
        alerta.innerText = msg;
        modal.classList.add('mostrar');
        modal.addEventListener('click', (e: Event) => {
            const objClik = e.target as HTMLElement;
            if (objClik.id == "fechar" || objClik.id == "modal-alert") {
                console.log(objClik.id);
                modal.classList.remove('mostrar');
            }

        });
    }
}