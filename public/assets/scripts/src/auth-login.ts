import getFormValues from "./functions/getFormValues";
import {
    getAuth,
    signInWithEmailAndPassword,
} from "firebase/auth";

const auth = getAuth();
const form = document.querySelector<HTMLFormElement>("#form-login");

if (form) {
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const { email, password } = getFormValues(form);

        //aqui camada de validação de campo vazio

        signInWithEmailAndPassword(auth, email, password)
            .then(() => {location.href = "/";})
            .catch((error) => {alert(error.message);
            });
    });
}
