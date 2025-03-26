import "../pages/index.css";
import { initialCards } from "./cards.js";
import { createCard, handleCardDelete, handleCardLike } from "./card.js";
import avatar from "../images/avatar.jpg";
import { openModal, closeModal } from "./modal.js";

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

// Устанавливаем изображение профиля
document.querySelector(
  ".profile__image"
).style.backgroundImage = `url(${avatar})`;

// Добавляем класс анимации и слушатели всем попапам
  document
  .querySelectorAll(".popup")
  .forEach((popup) => {
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
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(popupEdit);
}

// Обработчик отправки формы добавления карточки
function handleFormImageSubmit(evt) {
  evt.preventDefault();

  const cardData = {
    name: nameImageInput.value,
    link: linkImageInput.value,
  };

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

// Слушатели на кнопки открытия попапов
editProfileButton.addEventListener("click", () => {
  nameInput.value = profileName.textContent;      
  jobInput.value = profileDescription.textContent; 
  openModal(popupEdit);
});
addCardButton.addEventListener("click", () => openModal(popupCard));

// Cлушатели на формы
profileFormElement.addEventListener("submit", handleProfileFormSubmit);
formImageElement.addEventListener("submit", handleFormImageSubmit);

// Рендеринг карточек
renderCards(initialCards);
