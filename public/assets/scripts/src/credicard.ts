import queryStringToJSON from "./functions/queryStringToJSON";
import setFormValues from "./functions/setFormValues";
import { HTMLInputField } from "./types/HTMLInputField";
import IMask from "imask";
import iniciaModal from "./functions/acionaModal";
import showSidebarUser from "./functions/showSidebarUser";

const page = document.querySelector("#credicard") as HTMLFormElement;

if (page) {
  const name = page.querySelector("#name") as HTMLInputField;
  const number = page.querySelector("#number") as HTMLInputField;
  const expiry = page.querySelector("#expiry") as HTMLInputField;
  const InputCvv = page.querySelector("#cvv") as HTMLInputField;
  const selectParcelas = page.querySelector("#parcelas") as HTMLSelectElement;
  const selectBanco = page.querySelector("#bank") as HTMLSelectElement;
  const btnEfetuaPagamento = page.querySelector("#efetua-pagamento") as HTMLButtonElement;
  const avatar = page.querySelector("#avatar") as HTMLImageElement;

  const values = queryStringToJSON();
  const year = new Date().getFullYear();
  const month = new Date().getMonth();
  const valorPedido: number = +values.valor;

  IMask(number, {
    mask: "0000 0000 0000 0000",
  });


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
        iniciaModal("modal-promocao");
      }
    }
  });

  const calculaParcelas = (() => {
    selectParcelas.innerHTML = `<option value="0">Slecione o número de parcelas</option>`;
    
    if (valorPedido >= 100) {
      const numParcelas = Math.trunc((valorPedido / 50));
      if (numParcelas <= 4) {
        for (let i = 1; i <= numParcelas; i++) {
          let option = document.createElement("option");
          option.innerHTML = `<option value="${i}">${i} parcela de R$ ${valorPedido / i} (R$ ${valorPedido / i})</option>`;
          selectParcelas.appendChild(option);
        }
      } else {
        for (let i = 1; i <= 4; i++) {
          let option = document.createElement("option");
          option.innerHTML = `<option value="${i}">${i} parcela de R$ ${valorPedido / i} (R$ ${valorPedido / i})</option>`;
          selectParcelas.appendChild(option);
        }
      }
    } else if (valorPedido) {
      let option = document.createElement("option");
      option.innerHTML = `<option value="1">1 parcela de R$ ${valorPedido} (R$ ${valorPedido})</option>`;
      selectParcelas.appendChild(option);
    }
  });
  calculaParcelas();

  const acionaModal = (() =>{
    const modal = document.getElementById("modal-promocao");
    if (modal) {
      modal.classList.add('mostrar');
      modal.addEventListener('click', (e) => {
          modal.classList.remove('mostrar');
          localStorage.fechaModal = "modal-promocao";        
      });
    }
  })

  btnEfetuaPagamento.addEventListener("click", (e) => {

    const dados = {
      "nome": name.value,
      "numero": number.value,
      "dtExpiracao": expiry.value,
      "cvv": InputCvv.value,
      "numParcelas": selectParcelas.selectedIndex,
      "valorParcela": valorPedido / +selectParcelas.selectedIndex,
      "banco": selectBanco.options[selectBanco.selectedIndex].text
    };
    console.log(dados);
    if (name.value == "" || number.value == "" || expiry.value == "" || InputCvv.value == "") {
      iniciaModal("modal-promocao");
    } else {
      const dados = {
        "nome": name.value,
        "numero": number.value,
        "dtExpiracao": expiry.value,
        "cvv": InputCvv.value,
        "numParcelas": selectParcelas.selectedIndex,
        "valorParcela": valorPedido / +selectBanco.options[selectBanco.selectedIndex].value,
        "banco": selectBanco.options[selectBanco.selectedIndex].text
      };
      console.log(dados);
    }
  });
}
