import "../pages/index.css";
import { initialCards, createCard, renderCards } from "./cards.js";
import avatar from "../images/avatar.jpg";
import { openModal, closeModal } from "./modal.js";

const placesList = document.querySelector(".places__list");
const editProfileButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");

const popupEdit = document.querySelector(".popup_type_edit");
const popupCard = document.querySelector(".popup_type_new-card");
const popupImage = document.querySelector(".popup_type_image");

const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const formElement = document.forms.formEdit;
const nameInput = formElement.elements.name;
const jobInput = formElement.elements.description;

const formImageElement = document.forms.formImage;
const nameImageInput = formImageElement.elements.placeName;
const linkImageInput = formImageElement.elements.link;

document.querySelector(
  ".profile__image"
).style.backgroundImage = `url(${avatar})`;

document.querySelectorAll(".popup").forEach((popup) => {
  popup.classList.add("popup_is-animated");
});

function addPopupListeners(popup) {
  const popupCloseButton = popup.querySelector(".popup__close");

  popupCloseButton.addEventListener("click", () => closeModal(popup));

  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup")) {
      closeModal(popup);
    }
  });
}

addPopupListeners(popupEdit);
addPopupListeners(popupCard);
addPopupListeners(popupImage);

editProfileButton.addEventListener("click", () => openModal(popupEdit));
addCardButton.addEventListener("click", () => openModal(popupCard));

renderCards(initialCards);

function handleFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  closeModal(popupEdit);
}

function handleFormImageSubmit(evt) {
  evt.preventDefault();

  const name = nameImageInput.value;
  const link = linkImageInput.value;

  const cardElement = createCard({ name, link });
  placesList.prepend(cardElement);

  closeModal(popupCard);

  formImageElement.reset();
}

function handleLike(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}

formElement.addEventListener("submit", handleFormSubmit);
formImageElement.addEventListener("submit", handleFormImageSubmit);

placesList.addEventListener("click", (evt) => {
  if (evt.target.classList.contains("card__like-button")) {
    handleLike(evt);
  }
});

export function handleEscKeyUp(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    if (openedPopup) {
      closeModal(openedPopup);
    }
  }
}
