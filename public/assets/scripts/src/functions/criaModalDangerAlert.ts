/**
 * modais: HTMLDivElement - Div onde os modais serão armazenados
 * msg:string - Mensagem que vai aparecer no modal
 */
export default function criaModalDangerAlert(modais: HTMLDivElement) {

    const modal = document.createElement("div");
    modal.innerHTML =
        `<div id="danger-modal" class="danger-modal-container">
                <div class="danger-modal">
                    <button class="fechar" id="fechar">x</button>
                    <h3></h3>
                    <div class="linha">
                        <button type="button" id="btn-confirma">Sim</button>
                        <button type="button" id="btn-nega">Não</button>
                    </div>

                </div>
            </div>`;
    modais.appendChild(modal);
}