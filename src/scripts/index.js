import "../pages/index.css";
import { createCard, handleCardDelete, handleCardLike } from "./card.js";
import { openModal, closeModal } from "./modal.js";
import { enableValidation } from "./validation.js";
import {
  getCards,
  getUserData,
  patchAvatar,
  patchUserData,
  postCard,
} from "./api.js";
// DOM-элементы
const placesList = document.querySelector(".places__list");
const editProfileButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");

const popupEdit = document.querySelector(".popup_type_edit");
const popupCard = document.querySelector(".popup_type_new-card");
const popupImage = document.querySelector(".popup_type_image");
const popupAvatar = document.querySelector(".popup_type_avatar");
const popupImageElement = popupImage.querySelector(".popup__image");
const popupImageCaption = popupImage.querySelector(".popup__caption");

const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileImage = document.querySelector(".profile__image");

const profileFormElement = document.forms.formEdit;
const nameInput = profileFormElement.elements.name;
const jobInput = profileFormElement.elements.description;

const avatarFormElement = document.forms.formAvatar;
const avatarInput = avatarFormElement.elements.avatarLink;
const avatarButton = document.querySelector(".profile__avatar-button");

const formImageElement = document.forms.formImage;
const nameImageInput = formImageElement.elements.placeName;
const linkImageInput = formImageElement.elements.link;

let currentUserId;

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

  patchUserData(userData).then((data) => {
    profileName.textContent = data.name;
    profileDescription.textContent = data.about;
  });
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
    .then((newCardData) => {
      return getUserData().then((userData) => {
        const cardElement = createCard(
          {
            ...newCardData,
            ownerId: newCardData.owner._id, // передаём владельца карточки
          },
          handleCardLike,
          handleCardImageClick,
          handleCardDelete,
          currentUserId
        );

        placesList.prepend(cardElement);
        closeModal(popupCard);
        formImageElement.reset();
      });
    })
    .catch((err) => {
      console.error("Ошибка при добавлении карточки:", err);
    });
}

function handleAvatarFormSubmit(evt) {
  evt.preventDefault();
  const avatarUrl = avatarInput.value;

  patchAvatar(avatarUrl)
    .then((data) => {
      profileImage.style.backgroundImage = `url(${data.avatar})`;
      closeModal(popupAvatar);
      // Сброс формы после успешного обновления аватара
      avatarFormElement.reset();
    })
    .catch((err) => {
      console.error("Ошибка при обновлении аватара:", err);
    });
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
function renderCards() {
  Promise.all([getUserData(), getCards()])
    .then(([userData, cards]) => {
      currentUserId = userData._id; // сохраняем ID пользователя

      cards.forEach((cardData) => {
        const cardElement = createCard(
          cardData,
          handleCardLike,
          handleCardImageClick,
          handleCardDelete,
          currentUserId
        );
        placesList.appendChild(cardElement);
      });
    })
    .catch((err) => {
      console.error("Ошибка при загрузке данных:", err);
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

avatarButton.addEventListener("click", () => {
  avatarFormElement.reset();
  openModal(popupAvatar);
});

addCardButton.addEventListener("click", () => {
  formImageElement.reset();
  openModal(popupCard);
});

// Cлушатели на формы
profileFormElement.addEventListener("submit", handleProfileFormSubmit);
formImageElement.addEventListener("submit", handleFormImageSubmit);
avatarFormElement.addEventListener("submit", handleAvatarFormSubmit);

renderCards();
