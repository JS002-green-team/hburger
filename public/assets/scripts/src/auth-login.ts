import getFormValues from "./functions/getFormValues";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();
const form = document.querySelector<HTMLFormElement>("#form-login");

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const { email, password } = getFormValues(form);

    //aqui camada de validação de campo vazio

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        location.href = "/";
      })
      .catch((error) => {
        switch (error.message) {
          case "Firebase: Error (auth/user-not-found).":
            alert(
              "Erro: Esta conta de Usuario não existe. Insira uma conta diferente ou obtenha uma nova em 'CADASTRO'."
            );
            break;
          case "Firebase: Error (auth/wrong-password).":
            alert(
              "Erro: Sua conta ou senha está incorreta. Se você não se lembra de sua senha, clique em 'Esqueceu a senha?' !"
            );
            break;
          default:
            alert(error.message);
        }
      });
  });
}
