import iniciaModal from "./functions/acionaModal";
import acionaModalDangerAlert from "./functions/acionaModalDangerAlert";
import acionaModalPadrao from "./functions/acionaModalPadrao";
import criaModalDangerAlert from "./functions/criaModalDangerAlert";
import criaSidebarUser from "./functions/criaSidebarUser";

const orders = document.querySelector("#orders") as HTMLElement;
interface isOrder {
  date: string;
  price: string;
  itens: string;
  id: string;
}

// Obtém os dados da sessionStorage
let dataPedido = sessionStorage.getItem("dataPedido");
let valorPedido = sessionStorage.getItem("valorPedido");
let numItens = sessionStorage.getItem("numItens");
let numPedido = sessionStorage.getItem("numItens");

// const ordersDb = [
//   { date: "17/01/2022", price: "49,50", itens: 2, id: 11111111 },
//   { date: "17/01/2022", price: "49,50", itens: 2, id: 22222222 },
//   { date: "17/01/2022", price: "49,50", itens: 2, id: 33333333 },
//   { date: "18/01/2022", price: "149,50", itens: 2, id: 44444444 },
//   { date: "19/01/2022", price: "49,50", itens: 2, id: 55555555 },
//   { date: "20/01/2022", price: "249,50", itens: 2, id: 6666666 },
//   { date: "21/01/2022", price: "149,50", itens: 2, id: 77777777 },
//   { date: "22/01/2022", price: "349,50", itens: 2, id: 8888888 },
// ];

const ordersDb = [
  {
    date: dataPedido
      ? new Date(dataPedido).toLocaleString("pt-BR").toString()
      : "",
    price: valorPedido ? valorPedido : "0",
    itens: numItens ? numItens : "0",
    id: numPedido ? numPedido : "0",
  },
];

console.log(ordersDb);

if (ordersDb.length != 0) {
  if (ordersDb) {
    const modais = orders.querySelector("#modais") as HTMLDivElement;
    // criaSidebarUser(modais);
    criaModalDangerAlert(modais);
    const ulOrders = orders.querySelector("#list-orders") as HTMLUListElement;

    cleanEl(ulOrders);
    let cont = 0;
    ordersDb.forEach((el) => {
      let li = createOrderTicket(el, cont);
      cont++;
      showContent(ulOrders, li);
    });
    const orderDetails = orders.querySelectorAll(".details");
    const excluir = orders.querySelectorAll(".exclude");

    orderDetails.forEach((el) => {
      let btnDetails = el as HTMLButtonElement;
      el.addEventListener("click", (e) => {
        if (btnDetails.dataset.pedido) {
          let pedido: number = +btnDetails.dataset.pedido;
          let cabecalho = orders?.querySelector(
            "#modal-padrao h3"
          ) as HTMLHeadingElement;
          let data = orders.querySelector(
            "#modal-padrao #data"
          ) as HTMLButtonElement;
          let valor = orders.querySelector(
            "#modal-padrao #valor"
          ) as HTMLButtonElement;
          let item = orders.querySelector(
            "#modal-padrao #item"
          ) as HTMLButtonElement;

          cabecalho.innerText = "Pedido: " + ordersDb[pedido].id;
          data.innerText = "Dia" + ordersDb[pedido].date;
          valor.innerText = "R$ " + ordersDb[pedido].price;
          item.innerText = ordersDb[pedido].itens.toString();
        }
        acionaModalPadrao("modal-padrao");
        console.log(btnDetails.dataset.pedido);
      });
    });

    excluir.forEach((el) => {
      let btnExcluir = el as HTMLButtonElement;
      el.addEventListener("click", (e) => {
        console.log(ordersDb);
        if (btnExcluir.dataset.excluir) {
          let objPosition: number = +btnExcluir.dataset.excluir;
          console.dir(ordersDb[objPosition].id);
          acionaModalDangerAlert(
            "Tem certeza que deseja excluir o pedido: ",
            ordersDb[objPosition].id.toString()
          );
          ordersDb.splice(objPosition, 1);
          console.log(ordersDb);
        }
      });
    });
  }
}

function cleanEl(el: HTMLUListElement) {
  el.innerHTML = "";
}

function showContent(el: HTMLUListElement, content: string) {
  el.innerHTML += content;
}

function createOrderTicket(el: isOrder, cont: number) {
  let li = `<li>
        <div class="id">#${el.id}</div>
        <div class="content">
            <div class="title">Detalhes do Pedido</div>
            <ul>
                <li>
                    <span>Data:</span>
                    <span>${el.date}</span>
                </li>
                <li>
                    <span>Valor:</span>
                    <span>R$ ${el.price}</span>
                </li>
                <li>
                    <span>Itens:</span>
                    <span>${el.itens}</span>
                </li>
                <li>
                    <span>N°:</span>
                    <span>${el.id}</span>
                </li>
            </ul>
        </div>
        <div class="actions">
            <button type="button" aria-label="Compartilhar">
                <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 14.08C14.24 14.08 13.56 14.38 13.04 14.85L5.91 10.7C5.96 10.47 6 10.24 6 10C6 9.76 5.96 9.53 5.91 9.3L12.96 5.19C13.5 5.69 14.21 6 15 6C16.66 6 18 4.66 18 3C18 1.34 16.66 0 15 0C13.34 0 12 1.34 12 3C12 3.24 12.04 3.47 12.09 3.7L5.04 7.81C4.5 7.31 3.79 7 3 7C1.34 7 0 8.34 0 10C0 11.66 1.34 13 3 13C3.79 13 4.5 12.69 5.04 12.19L12.16 16.35C12.11 16.56 12.08 16.78 12.08 17C12.08 18.61 13.39 19.92 15 19.92C16.61 19.92 17.92 18.61 17.92 17C17.92 15.39 16.61 14.08 15 14.08Z" fill="#070D0D"/>
                </svg>                            
        </button>
            <button type="button" aria-label="Detalhes" class="details" data-pedido="${cont}">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 2V16H2V2H16ZM17.1 0H0.9C0.4 0 0 0.4 0 0.9V17.1C0 17.5 0.4 18 0.9 18H17.1C17.5 18 18 17.5 18 17.1V0.9C18 0.4 17.5 0 17.1 0ZM8 4H14V6H8V4ZM8 8H14V10H8V8ZM8 12H14V14H8V12ZM4 4H6V6H4V4ZM4 8H6V10H4V8ZM4 12H6V14H4V12Z" fill="#070D0D"/>
                </svg>                            
        </button>
            <button type="button" aria-label="Excluir" class="exclude" data-excluir="${cont}">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19V7H6V19ZM19 4H15.5L14.5 3H9.5L8.5 4H5V6H19V4Z" fill="#070D0D"/>
                </svg>                            
        </button>
        </div>
    </li>`;
  return li;
}
