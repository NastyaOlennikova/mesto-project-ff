import { handleEscKeyUp } from "./index.js";


//Открытие модалки
export function openModal(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", handleEscKeyUp);
}

//Закрытие модалки
export function closeModal(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handleEscKeyUp);
}
