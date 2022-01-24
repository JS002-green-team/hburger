export default function criaSidebarUser(modais:HTMLDivElement){
    
    const modal = document.createElement("div");
    modal.innerHTML = 
    `<div id="user-modal" class="user-modal-container">
            <div class="user-modal">
                <button class="fechar-profile" id="fechar-modal">x</button>
                <img src="https://i.pravatar.cc/50" alt="Avatar" id="avatar-modal" />
                <h3>Dados do usuário</h3>
                <strong>Usuário</strong>
                <small>usuario@email.com.br</small>
                <p>Pedidos<br>                
                <button type="button" id="logout">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        >
                        <path d="M0,0H24V24H0Z" fill="none" />
                        <path
                        d="M10.09,15.59,11.5,17l5-5-5-5L10.09,8.41,12.67,11H3v2h9.67ZM19,3H5A2,2,0,0,0,3,5V9H5V5H19V19H5V15H3v4a2,2,0,0,0,2,2H19a2.006,2.006,0,0,0,2-2V5A2.006,2.006,0,0,0,19,3Z"
                        fill="#333"
                        />
                    </svg>
                </button>
            </div>
        </div>`;
       modais.appendChild(modal);
}