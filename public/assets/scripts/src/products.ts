import appendChild from "./functions/appendChild";
import formatCurrency from "./functions/formatCurrency";
import queryStringToJSON from "./functions/queryStringToJSON";
import setFormValues from "./functions/setFormValues";
import { ProductItem } from "./types/productItem";
import { getFirestore, onSnapshot, collection } from "firebase/firestore";

const page = document.querySelector("#products") as HTMLElement;

if (page) {
  const db = getFirestore();
  let productsSelected: number[] = [];
  let breads: ProductItem[] = [];
  let ingredients: ProductItem[] = [];

  const calcTotal = () => {
    const totalElement = document.querySelector(
      "#app > aside > footer > div.price"
    ) as HTMLSpanElement;

    const selected = breads.filter((product) =>
      productsSelected.find((id) => product.id === id)
    );

    const total = selected
      .map((product) => product.price)
      .reduce((a, b) => a + b, 0);

    totalElement.innerHTML = formatCurrency(total);
  };

  const renderCart = () => {
    const tbody = page.querySelector("tbody") as HTMLTableSectionElement;

    tbody.innerHTML = "";

    productsSelected.forEach((id) => {
      const linha = document.createElement("tr");
      const product = breads.find((s) => s.id === id);

      if (product) {
        linha.innerHTML = `
                    <tr>
                        <td>${product.name}</td>
                        <td class="price">${formatCurrency(product.price)}</td>
                    </tr>
                `;
      }

      tbody.appendChild(linha);
    });
  };

  const productSelectedChange = (e: Event) => {
    const input = e.target as HTMLInputElement;
    const button = document.querySelector("[type=submit]") as HTMLButtonElement;

    if (input.checked) {
      productsSelected.push(Number(input.value));
    } else {
      productsSelected = productsSelected.filter(
        (id) => id !== Number(input.value)
      );
    }

    if (productsSelected.length) {
      button.disabled = false;
    } else {
      button.disabled = true;
    }

    //calcTotal();
    //renderCart();
  };

  const items = document.querySelector("#items") as HTMLElement;
  const breadsLi = page.querySelector(".breads") as HTMLDivElement;
  const ingredientsLi = page.querySelector(".ingredients") as HTMLDivElement;
  const values = queryStringToJSON();
  const form = page.querySelector("form") as HTMLFormElement;

  setFormValues(form, values);

  const renderBreads = () => {
    breadsLi.innerHTML = "";

    breads.forEach((item) => {
      const label = document.createElement("label");

      label.innerHTML = `
        <input type="radio" name="breads" value="${item.id}" checked />
        <span></span>
        <h3>${item.description}</h3>
        <div>${formatCurrency(item.price)}</div>
      `;

      breadsLi.appendChild(label);
      //const labelInput = label.querySelector("input") as HTMLInputElement;
      //labelInput.addEventListener("change", productSelectedChange);
    });
  };

  const renderIngredients = () => {
    ingredientsLi.innerHTML = "";

    ingredients.forEach((item) => {
      const label = document.createElement("label");

      label.innerHTML = `
        <input type="radio" name="ingredients" value="${item.id}" checked />
        <span></span>
        <h3>${item.description}</h3>
        <div>${formatCurrency(item.price)}</div>
      `;

      ingredientsLi.appendChild(label);
      //const labelInput = label.querySelector("input") as HTMLInputElement;
      //labelInput.addEventListener("change", productSelectedChange);
    });
  };

  //renderCart();

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
}
