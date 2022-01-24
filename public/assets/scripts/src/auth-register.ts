import getFormValues from "./functions/getFormValues";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

const auth = getAuth();
const formRegister = document.querySelector<HTMLFormElement>("#form-register");

if (formRegister) {
  formRegister.addEventListener("submit", (e) => {
    e.preventDefault();

    const { email, password, name } = getFormValues(formRegister);

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const { user } = userCredential;

        updateProfile(user, {
          displayName: name,
        })
          .then(() => {
            location.href = "/";
          })
          .catch((error) => {
            alert(error.message);
          });
      })
      .catch((error) => {
        switch (error.message) {
          case "Firebase: Error (auth/invalid-email).":
            alert("Erro: E-mail inválido");
            break;
          case "Firebase: Password should be at least 6 characters (auth/weak-password).":
            alert("Erro: A senha deve ter pelo menos 6 caracteres.");
            break;
          case "Firebase: Error (auth/email-already-in-use).":
            alert("Erro: O email fornecido já está em uso.");
            break;
          default:
            alert(error.message);
        }
      });
  });
}
