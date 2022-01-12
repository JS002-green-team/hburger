import queryStringToJSON from "./functions/queryStringToJSON";
import setFormValues from "./functions/setFormValues";
import { HTMLInputField } from "./types/HTMLInputField";

const page = document.querySelector("#app") as HTMLElement;

if(page){

    const form = page.querySelector("form") as HTMLFormElement;
    const name = page.querySelector("#name") as HTMLInputField;
    const number = page.querySelector("#number") as HTMLInputField;
    const expiry = page.querySelector("#expiry") as HTMLInputField;
    const InputCvv = page.querySelector("#name") as HTMLInputField;
    
    console.log("entrou no pay");
}