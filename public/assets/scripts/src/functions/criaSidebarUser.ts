export default function criaSidebarUser(modais:HTMLDivElement){
    
    const modal = document.createElement("div");
    modal.innerHTML = 
    `<div id="user-modal" class="user-modal-container">
            <div class="user-modal">
                <button class="fechar-profile" id="fechar-modal">x</button>
                <img src="https://i.pravatar.cc/50" alt="Avatar" id="avatar-modal" />
                <h3>Dados do usuário</h3>
                <ul>Conta</ul>
                <ul>Pedidos</ul>
                <ul>Logout</ul>
            </div>
        </div>`;
       modais.appendChild(modal);
}