import "../pages/index.css";
import { createCard, handleCardDelete, handleCardLike } from "./card.js";
import { openModal, closeModal } from "./modal.js";
import { enableValidation } from "./validation.js";
import { getCards, getUserData, patchUserData, postCard } from "./api.js";
// DOM-элементы
const placesList = document.querySelector(".places__list");
const editProfileButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");

const popupEdit = document.querySelector(".popup_type_edit");
const popupCard = document.querySelector(".popup_type_new-card");
const popupImage = document.querySelector(".popup_type_image");
const popupImageElement = popupImage.querySelector(".popup__image");
const popupImageCaption = popupImage.querySelector(".popup__caption");

const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const profileFormElement = document.forms.formEdit;
const nameInput = profileFormElement.elements.name;
const jobInput = profileFormElement.elements.description;

const formImageElement = document.forms.formImage;
const nameImageInput = formImageElement.elements.placeName;
const linkImageInput = formImageElement.elements.link;

// Добавляем класс анимации и слушатели всем попапам
document.querySelectorAll(".popup").forEach((popup) => {
  popup.classList.add("popup_is-animated");
  addPopupListeners(popup);
});

// Функция добавления слушателей закрытия попапов
function addPopupListeners(popup) {
  const popupCloseButton = popup.querySelector(".popup__close");

  popupCloseButton.addEventListener("click", () => closeModal(popup));

  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup")) {
      closeModal(popup);
    }
  });
}

// Обработчик отправки формы редактирования профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  const userData = {
    name: nameInput.value,
    about: jobInput.value,
  };

  patchUserData(userData) 
  .then((data) => {
    profileName.textContent = data.name;
    profileDescription.textContent = data.about;
  })
  closeModal(popupEdit);
}

// Обработчик отправки формы добавления карточки
function handleFormImageSubmit(evt) {
  evt.preventDefault();

  const cardData = {
    name: nameImageInput.value,
    link: linkImageInput.value,
  };

  postCard(cardData)

  const cardElement = createCard(
    cardData,
    handleCardLike,
    handleCardImageClick,
    handleCardDelete
  );
  placesList.prepend(cardElement);

  closeModal(popupCard);
  formImageElement.reset();
}

//Функция открытия попапа с картинкой
export function handleCardImageClick(cardData) {
  popupImageElement.src = cardData.link;
  popupImageElement.alt = cardData.name;

  if (popupImageCaption) {
    popupImageCaption.textContent = cardData.name;
  }
  openModal(popupImage);
}

// Функция рендеринга карточек
function renderCards(cards) {
  cards.forEach((cardData) => {
    const cardElement = createCard(
      cardData,
      handleCardLike,
      handleCardImageClick,
      handleCardDelete
    );
    placesList.appendChild(cardElement);
  });
}

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  inputErrorClass: ".popup__input_type_error",
  errorClass: "popup__input-error_active",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
});

editProfileButton.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(popupEdit);
});

addCardButton.addEventListener("click", () => {
  formImageElement.reset();
  openModal(popupCard);
});

// Cлушатели на формы
profileFormElement.addEventListener("submit", handleProfileFormSubmit);
formImageElement.addEventListener("submit", handleFormImageSubmit);

// Рендеринг карточек
getUserData();

getCards()
  .then((cards) => {
    renderCards(cards);
  })
  .catch((err) => {
    console.error(err);
  });
