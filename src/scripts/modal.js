//Открытие модалки
export function openModal(popup) {
  popup.classList.add("popup_is-opened");
  if (popup.classList.contains("popup_type_edit")) {
    const nameInput = document.querySelector(".popup__input_type_name");
    const jobInput = document.querySelector(".popup__input_type_description");
    const profileName = document.querySelector(".profile__title");
    const profileDescription = document.querySelector(".profile__description");
    nameInput.value = profileName.textContent;
    jobInput.value = profileDescription.textContent;
  }
  document.addEventListener("keydown", handleEscKeyUp);
}

//Закрытие модалки
export function closeModal(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handleEscKeyUp);
}

// Закрытие модалки по клику на Escape
function handleEscKeyUp(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    if (openedPopup) {
      closeModal(openedPopup);
    }
  }
}
