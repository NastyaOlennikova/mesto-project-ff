import { deleteCard } from "./api.js";
// Функция удаления карточки
export function handleCardDelete(cardId, cardElement) {
  deleteCard(cardId)
    .then(() => {
      cardElement.remove();
    })
    .catch((err) => {
      console.error("Ошибка при удалении карточки:", err);
    });
}

// Функция лайка карточки
export function handleCardLike(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}

// Функция создания карточки
export function createCard(
  cardData,
  handleLike,
  handleImageClick,
  handleDelete
) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const likeButton = cardElement.querySelector(".card__like-button");
  const likeCounter = cardElement.querySelector(".card__like-counter");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  cardElement.querySelector(".card__title").textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;

  if (cardData.ownerId === "bba393d2f55dee117eb1eb37") {
    deleteButton.addEventListener("click", () =>
      handleDelete(cardData.id, cardElement)
    );
  } else {
    deleteButton.remove();
  }

  if (cardData.likes) {
    likeCounter.textContent = cardData.likes.length;
  }

  cardImage.addEventListener("click", () => handleImageClick(cardData));

  likeButton.addEventListener("click", handleLike);

  return cardElement;
}
