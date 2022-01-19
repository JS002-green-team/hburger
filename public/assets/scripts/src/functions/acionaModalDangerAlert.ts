export default function acionaModalDangerAlert(msg: string, idPedido: string){
    const modal = document.querySelector("#danger-modal") as HTMLDivElement;
    if (modal) {
        let alerta = modal.querySelector("h3") as HTMLHeadingElement;
        alerta.innerText = msg + " " + idPedido;
        modal.classList.add('mostrar');
        modal.addEventListener('click', (e: Event) => {
            const objClik = e.target as HTMLElement;
            if (objClik.id == "fechar" || objClik.id == "danger-modal" || objClik.id == "btn-nega") {
                console.log(objClik.id);
                modal.classList.remove('mostrar');
            }else if(objClik.id == "btn-confirma"){
                console.log("confirmou a exclusão do pedido: " + idPedido );
            }

        });
    }
}