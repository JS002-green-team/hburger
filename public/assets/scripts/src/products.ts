import appendChild from "./functions/appendChild";
import formatCurrency from "./functions/formatCurrency";
import queryStringToJSON from "./functions/queryStringToJSON";
import setFormValues from "./functions/setFormValues";
import { ProductItem } from "./types/productItem";
import { getFirestore, onSnapshot, collection } from "firebase/firestore";
import criaSidebarUser from "./functions/criaSidebarUser";

const page = document.querySelector("#products") as HTMLElement;

console.dir(page);

if (page) {
  const modais = page.querySelector("#modais") as HTMLDivElement;
  criaSidebarUser(modais);
  const db = getFirestore();
  let productsSelected: number[] = [];
  let products: ProductItem[] = [];

  const calcTotal = () => {
    const totalElement = document.querySelector(".total") as HTMLSpanElement;

    const selected = products.filter((product) =>
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
      const product = products.find((s) => s.id === id);

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

    calcTotal();
    renderCart();
  };

  const tpl = document.querySelector("#tpl-label") as HTMLScriptElement;
  const options = page.querySelector(".options") as HTMLDivElement;
  const values = queryStringToJSON();
  const form = page.querySelector("form") as HTMLFormElement;

  setFormValues(form, values);

  options.innerHTML = "";

  const renderProducts = () => {
    options.innerHTML = "";

    products.forEach((item) => {
      item.priceFormated = formatCurrency(item.price);

      const label = appendChild(
        "label",
        eval("`" + tpl.innerText + "`"),
        options
      );

      const labelInput = label.querySelector("input") as HTMLInputElement;

      labelInput.addEventListener("change", productSelectedChange);
    });
  };

  renderCart();

  onSnapshot(collection(db, "products"), (collection) => {
    products = [];

    collection.forEach((doc) => {
      products.push(doc.data() as ProductItem);
    });

    renderProducts();
  });
}