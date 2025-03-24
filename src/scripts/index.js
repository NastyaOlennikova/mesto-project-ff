import "../pages/index.css";
import { initialCards, createCard } from "./cards.js";
import avatar from "../images/avatar.jpg";
import { openModal, closeModal } from "./modal.js";

// DOM-элементы
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

// Устанавливаем изображение профиля
document.querySelector(".profile__image").style.backgroundImage = `url(${avatar})`;

// Добавляем класс анимации всем попапам
document.querySelectorAll(".popup").forEach((popup) => popup.classList.add("popup_is-animated"));

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

// Добавляем слушатели к каждому попапу
[popupEdit, popupCard, popupImage].forEach(addPopupListeners);

// Слушатели на кнопки открытия попапов
editProfileButton.addEventListener("click", () => openModal(popupEdit));
addCardButton.addEventListener("click", () => openModal(popupCard));

// Рендеринг карточек
renderCards(initialCards);

// Обработчик отправки формы редактирования профиля
function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(popupEdit);
}

// Обработчик отправки формы добавления карточки
function handleFormImageSubmit(evt) {
  evt.preventDefault();

  const name = nameImageInput.value;
  const link = linkImageInput.value;

  const cardElement = createCard({ name, link });
  placesList.prepend(cardElement);

  closeModal(popupCard);
  formImageElement.reset();
}

// Лайк карточек
function handleLike(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}

// Добавляем слушатели на формы
formElement.addEventListener("submit", handleFormSubmit);
formImageElement.addEventListener("submit", handleFormImageSubmit);

// Слушатели на лайки
placesList.addEventListener("click", (evt) => {
  if (evt.target.classList.contains("card__like-button")) {
    handleLike(evt);
  }
});

// Закрытие модалки по клику на Escape
export function handleEscKeyUp(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    if (openedPopup) {
      closeModal(openedPopup);
    }
  }
}

// Функция рендеринга карточек
export function renderCards(cards) {
  const placesList = document.querySelector(".places__list");

  cards.forEach((cardData) => {
    const cardElement = createCard(cardData);
    placesList.appendChild(cardElement);
  });
}

