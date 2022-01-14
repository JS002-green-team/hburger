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
        alert(error.message);
      });
  });
}
