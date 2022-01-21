/**
 * modais: HTMLDivElement - Div onde os modais serão armazenados
 * msg:string - Mensagem que vai aparecer no modal
 */
export default function criaModalAlert(modais: HTMLDivElement) {

    const modal = document.createElement("div");
    modal.innerHTML =
        `<div id="modal-alert" class="modal-alert-container">
            <div class="modal">
                <button class="fechar" id="fechar">x</button>
                <h3 class="subtitulo"></h3>
                <div class="linha">
                    <button type="button" id="fechar" class="btn-ok">OK</button>
                </div>
            </div>
        </div>`;
    modais.appendChild(modal);
}