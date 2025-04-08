import { clearValidation } from "./validation";

export const openedPopupClass = "popup_is-opened";

//Открытие модалки
export function openModal(popup) {
  // clearValidation(popup, {
  //   formSelector: ".popup__form",
  //   inputSelector: ".popup__input",
  //   inputErrorClass: "popup__input_type_error",
  //   errorClass: "popup__input-error_active",
  //   submitButtonSelector: ".popup__button",
  //   inactiveButtonClass: "popup__button_disabled",
  // });
  popup.classList.add(openedPopupClass);
  document.addEventListener("keydown", handleEscKeyUp);
}

//Закрытие модалки
export function closeModal(popup) {
  popup.classList.remove(openedPopupClass);
  document.removeEventListener("keydown", handleEscKeyUp);
}

// Закрытие модалки по клику на Escape
function handleEscKeyUp(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(`.${openedPopupClass}`);
    if (openedPopup) {
      closeModal(openedPopup);
    }
  }
}
