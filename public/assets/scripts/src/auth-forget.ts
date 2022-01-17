import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const auth = getAuth();
const form = document.querySelector<HTMLFormElement>("form#form-forget");

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = form.querySelector("#email") as HTMLInputElement;

    if (email) {
      sendPasswordResetEmail(auth, email.value)
        .then(() => {
          alert(
            `e-mail enviado. caso exista uma conta com o ${email.value} que você digitou,
            vamos enviar um e-mail para ${email.value} com as instruções e o link para você trocar a senha.
            se você não receber o e-mail em alguns minutos, verifique a sua caixa de spam ou tente novamente`
          );
          window.location.assign("login.html");
        })
        .catch((error) => alert("E-mail inválido"));
    }
  });
}
