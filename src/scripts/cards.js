import { openModal } from "./modal.js";

export const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

// Функция создания карточки
export function createCard(cardData, handleLike) {
  const cardTemplate = document.querySelector("#card-template").content;
  const popupImage = document.querySelector(".popup_type_image");

  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const likeButton = cardElement.querySelector(".card__like-button");

  const popupImageElement = popupImage.querySelector(".popup__image"); // сохраняем ссылку на изображение один раз
  const popupImageCaption = popupImage.querySelector(".popup__caption");

  cardElement.querySelector(".card__title").textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => cardElement.remove());

  cardImage.addEventListener("click", () => {
    popupImageElement.src = cardData.link;
    popupImageElement.alt = cardData.name;

    if (popupImageCaption) {
      popupImageCaption.textContent = cardData.name; // обновляем подпись, если она есть
    }
    openModal(popupImage);
  });

  likeButton.addEventListener("click", handleLike);

  return cardElement;
}
