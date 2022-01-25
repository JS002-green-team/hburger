import formatCurrency from "./functions/formatCurrency";
import queryStringToJSON from "./functions/queryStringToJSON";
import setFormValues from "./functions/setFormValues";
import { ProductItem } from "./types/productItem";
import { getFirestore, onSnapshot, collection } from "firebase/firestore";
import { format } from "date-fns";

const page = document.querySelector("#products") as HTMLElement;

if (page) {
  const form = page.querySelector("form") as HTMLFormElement;
  const btnPagar = document.querySelector("#pagar-pedido") as HTMLButtonElement;

  let subTotal = 0;
  let productsSelected: number[] = [];
  let itens = new Array();

  const db = getFirestore();

  let breads: ProductItem[] = [];
  let ingredients: ProductItem[] = [];

  const breadsLi = page.querySelector(".breads") as HTMLDivElement;
  const ingredientsLi = page.querySelector(".ingredients") as HTMLElement;
  const values = queryStringToJSON();
  const buttonSaveHamburger = document.querySelector(
    "#saveHamburger"
  ) as HTMLButtonElement;

  setFormValues(form, values);

  /*****************************Cria as li's dos pães************************ */
  const renderBreads = () => {
    breadsLi.innerHTML = "";

    breads.forEach((item) => {
      const label = document.createElement("label");

      label.innerHTML = `
        <input type="radio" name="breads" class="inputBreads" data-pao="${
          item.description
        }" value="${item.price}" checked />
        <span></span>
        <h3>${item.description}</h3>
        <div class="priceBreads">${formatCurrency(item.price)}</div>
      `;

      breadsLi.appendChild(label);
    });
  };
  /*************************************************************************** */

  /************************cira as li's dos ingredietes***********************/
  const renderIngredients = () => {
    ingredientsLi.innerHTML = "";

    ingredients.forEach((item) => {
      const label = document.createElement("label");

      label.innerHTML = `
        <input type="radio" name="ingredients" class="inputIngredients" data-ing="${
          item.description
        }" value="${item.price}" checked />
        <span></span>
        <h3>${item.description}</h3>
        <div class="priceIngredients">${formatCurrency(item.price)}</div>
      `;

      ingredientsLi.appendChild(label);
    });
  };
  /************************************************************************* */

  onSnapshot(collection(db, "products"), (collection) => {
    breads = [];
    ingredients = [];

    collection.forEach((doc) => {
      doc.data().name === "Pão"
        ? breads.push(doc.data() as ProductItem)
        : ingredients.push(doc.data() as ProductItem);
    });

    renderBreads();
    renderIngredients();
  });

  /*********Cria o hamburguer quando clica no botão salvar hamburguer******** */
  const createHamburger = (e: Event) => {
    const inputBreads = document.querySelectorAll<HTMLInputElement>(
      "input[type=radio]:checked"
    );

    const quantHamburgers = document.querySelector(
      "#quantHamburgers"
    ) as HTMLElement;

    //************************teste Marcelo********************************
    let objIngrediente = {};
    let tipoDePao;
    let valorPao;
    let tipoDeIngrediente;
    let valorIngrediente;
    const tipoPao = document.querySelectorAll(".inputBreads");
    tipoPao.forEach((e) => {
      let itemPao = e as HTMLInputElement;
      if (itemPao.checked) {
        tipoDePao = itemPao.dataset.pao;
        valorPao = itemPao.value;
      }
    });

    const tipoIngrediente = document.querySelectorAll(".inputIngredients");
    tipoIngrediente.forEach((e) => {
      let itemIngrediente = e as HTMLInputElement;
      if (itemIngrediente.checked) {
        tipoDeIngrediente = itemIngrediente.dataset.ing;
        valorIngrediente = itemIngrediente.value;
      }
    });
    /********************************************************************* */

    const shoppingCart = document.querySelector(
      "#shoppingCart"
    ) as HTMLUListElement;

    let priceHamburger = 0;
    let pao = "";
    inputBreads.forEach((e) => {
      priceHamburger += Number(e.value);
    });
    productsSelected.push(Number(priceHamburger));
    quantHamburgers.innerText = `${productsSelected.length} hamburguers`;
    subTotal += priceHamburger;
    const totalPedido = document.querySelector("#sub-total") as HTMLSpanElement;
    totalPedido.innerText = "R$ " + formatCurrency(subTotal).toString();

    const li = document.createElement("li");

    li.innerHTML = `
      <div>Hamburguer ${productsSelected.length}</div>
      <div>${formatCurrency(priceHamburger)}</div>
      <button type="button" aria-label="Remover Hamburguer 1">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6 19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19V7H6V19ZM19 4H15.5L14.5 3H9.5L8.5 4H5V6H19V4Z"
            fill="black"
          />
        </svg>
      </button>
    `;

    shoppingCart.appendChild(li);
    let item = {
      item: "Hamburger " + productsSelected.length,
      pao: tipoDePao,
      valorPao: valorPao,
      ingrediente: tipoDeIngrediente,
      valorIngrediente: valorIngrediente,
    };

    itens.push(item);
  };

  buttonSaveHamburger.addEventListener("click", createHamburger);

  if (btnPagar) {
    btnPagar.addEventListener("click", (e) => {
      e.preventDefault();

      let pedido = {
        numPedido: Math.floor(Math.random() * (99995 - 10000 + 1)) + 10000,
        dataPedido: format(new Date(), "yyyy-MM-dd"),
        valorPedido: subTotal,
        numItens: productsSelected.length,
        itensPedido: itens,
      };
      console.log(JSON.stringify(pedido));
      // Salva os dados na sessionStorage
      sessionStorage.setItem("numPedido", pedido.numPedido.toString());
      sessionStorage.setItem("dataPedido", pedido.dataPedido);
      sessionStorage.setItem("valorPedido", pedido.valorPedido.toString());
      sessionStorage.setItem("numItens", pedido.numItens.toString());
      sessionStorage.setItem("itensPedido", pedido.itensPedido.toString());

      window.location.assign(`pay.html?valor=${subTotal}`);
    });
  }
}
