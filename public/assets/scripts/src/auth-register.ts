import getFormValues from "./functions/getFormValues";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();
const formRegister = document.querySelector<HTMLFormElement>("#form-register");

if (formRegister) {
  formRegister.addEventListener("submit", (e) => {
    e.preventDefault();

    const { email, password } = getFormValues(formRegister);

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        //const user = userCredential.user;
        console.log(userCredential);
      })
      .catch((error) => {
        //const errorCode = error.code;
        //const errorMessage = error.message;
        console.error(error.message);
      });
  });
}
