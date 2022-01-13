import queryStringToJSON from "./functions/queryStringToJSON";
import setFormValues from "./functions/setFormValues";
import { HTMLInputField } from "./types/HTMLInputField";
import IMask from "imask";

const page = document.querySelector("#form-credicard") as HTMLElement;

if (page) {
  const form = page.querySelector("form") as HTMLFormElement;
  const name = page.querySelector("#name") as HTMLInputField;
  const number = page.querySelector("#number") as HTMLInputField;
  const expiry = page.querySelector("#expiry") as HTMLInputField;
  const InputCvv = page.querySelector("#cvv") as HTMLInputField;
  const parcelas = page.querySelector("#parcelas") as HTMLSelectElement;

  const values = queryStringToJSON();
  const year = new Date().getFullYear();
  const month = new Date("2022/02/02").getMonth();

  IMask(number, {
    mask: "0000 0000 0000 0000",
  });

  //parcelas.innerHTML = "";

  //parcelas.appendChild(`<option value="1">1 parcela de R$ ${values.valor} (R$ ${values.valor})</option>`)

  parcelas.innerHTML = `<option value="1">1 parcela de R$ ${values.valor} (R$ ${values.valor})</option>`;

  IMask(expiry, {
    mask: "MM/YY",
    blocks: {
      YY: {
        mask: IMask.MaskedRange,
        from: year.toString().substring(2, 4),
        to: (year + 10).toString().substring(2, 4),
      },
      MM: {
        mask: IMask.MaskedRange,
        from: 1,
        to: 12,
      },
    },
  });

  IMask(InputCvv, {
    mask: "000",
  });

  expiry.addEventListener("blur", (e) => {
    if (expiry.value.toString().length > 0) {
      const currentMonth: number = +expiry.value.substring(0, 2);
      const yearCard: number = +expiry.value.substring(3, 5);
      if (
        currentMonth < month + 1 ||
        yearCard < +year.toString().substring(2, 4)
      ) {
        alert("Verifique a data de validade");
      }
    }
  });
}
