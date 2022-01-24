import formatCurrency from "./functions/formatCurrency";
import queryStringToJSON from "./functions/queryStringToJSON";
import setFormValues from "./functions/setFormValues";
import { ProductItem } from "./types/productItem";
import { getFirestore, onSnapshot, collection } from "firebase/firestore";
import criaSidebarUser from "./functions/criaSidebarUser";

const page = document.querySelector("#products") as HTMLElement;
const modais = document.querySelector("#modais") as HTMLDivElement;

// if(modais){
//   criaSidebarUser(modais);
// }

if (page) {
  const db = getFirestore();
  let productsSelected: number[] = [];
  let breads: ProductItem[] = [];
  let ingredients: ProductItem[] = [];
  let subTotal = 0;

  const breadsLi = page.querySelector(".breads") as HTMLDivElement;
  const ingredientsLi = page.querySelector(".ingredients") as HTMLElement;
  const values = queryStringToJSON();
  const form = page.querySelector("form") as HTMLFormElement;
  const buttonSaveHamburger = document.querySelector(
    "#saveHamburger"
  ) as HTMLButtonElement;

  setFormValues(form, values);

  const renderBreads = () => {
    breadsLi.innerHTML = "";

    breads.forEach((item) => {
      const label = document.createElement("label");

      label.innerHTML = `
        <input type="radio" name="breads" class="inputBreads" value="${
          item.price
        }" checked />
        <span></span>
        <h3>${item.description}</h3>
        <div class="priceBreads">${formatCurrency(item.price)}</div>
      `;

      breadsLi.appendChild(label);
    });
  };

  const renderIngredients = () => {
    ingredientsLi.innerHTML = "";

    ingredients.forEach((item) => {
      const label = document.createElement("label");

      label.innerHTML = `
        <input type="radio" name="ingredients" class="inputIngredients" value="${
          item.price
        }" checked />
        <span></span>
        <h3>${item.description}</h3>
        <div class="priceIngredients">${formatCurrency(item.price)}</div>
      `;

      ingredientsLi.appendChild(label);
    });
  };

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

  //Cria o hamburguer quando clica no botão salvar hamburguer
  const createHamburger = (e: Event) => {
    const inputBreads = document.querySelectorAll<HTMLInputElement>(
      "input[type=radio]:checked"
    );

    const quantHamburgers = document.querySelector(
      "#quantHamburgers"
    ) as HTMLElement;

    const shoppingCart = document.querySelector("#shoppingCart") as HTMLUListElement;

    let priceHamburger = 0;
    inputBreads.forEach((e) => (priceHamburger += Number(e.value)));
    productsSelected.push(Number(priceHamburger));
    quantHamburgers.innerText = `${productsSelected.length} hamburguers`;
    subTotal += priceHamburger;
    const totalPedido = document.querySelector("#sub-total") as HTMLSpanElement;
    totalPedido.innerText = "R$ " + formatCurrency(subTotal).toString();
    console.log(productsSelected);

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

    //renderShoppingCart();
  };

  //Adiciona o hamburguer criado a lista de itens de pedido
  
  // const renderShoppingCart = () => {
  //   const inputBreads = document.querySelectorAll<HTMLInputElement>(
  //     "input[type=radio]:checked"
  //   );
  //   const shoppingCart = document.querySelector("#shoppingCart") as HTMLUListElement;
  //   shoppingCart.innerHTML = "";

  //   let priceHamburger = 0;
  //   inputBreads.forEach((e) => {
  //     priceHamburger += Number(e.value)
      
  //   });
  //   const li = document.createElement("li");

  //   li.innerHTML = `
  //     <div>Hamburguer 1</div>
  //     <div>${formatCurrency(priceHamburger)}</div>
  //     <button type="button" aria-label="Remover Hamburguer 1">
  //       <svg
  //         width="24"
  //         height="24"
  //         viewBox="0 0 24 24"
  //         fill="none"
  //         xmlns="http://www.w3.org/2000/svg"
  //       >
  //         <path
  //           d="M6 19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19V7H6V19ZM19 4H15.5L14.5 3H9.5L8.5 4H5V6H19V4Z"
  //           fill="black"
  //         />
  //       </svg>
  //     </button>
  //   `;

  //   shoppingCart.appendChild(li);
  // };

  buttonSaveHamburger.addEventListener("click", createHamburger);
}
