import { deleteCard, putLike, deleteLike } from "./api.js";

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

export function handleCardLike(evt, cardId) {
  const likeButton = evt.target;
  const cardElement = likeButton.closest(".card");
  const likeCounter = cardElement.querySelector(".card__like-counter");

  const isLiked = likeButton.classList.contains("card__like-button_is-active");

  const likeAction = isLiked ? deleteLike : putLike;

  likeAction(cardId)
    .then((data) => {
      likeButton.classList.toggle("card__like-button_is-active");
      likeCounter.textContent = data.likes.length;
    })
    .catch((err) => {
      console.error("Ошибка при обработке лайка:", err);
    });
}

// Функция создания карточки
export function createCard(
  cardData,
  handleLike,
  handleImageClick,
  handleDelete,
  currentUserId
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

  if (cardData.owner._id === currentUserId) {
    deleteButton.addEventListener("click", () =>
      handleDelete(cardData._id, cardElement)
    );
  } else {
    deleteButton.remove();
  }

  if (cardData.likes) {
    likeCounter.textContent = cardData.likes.length;
  }

  if(cardData.likes.some((like) => like._id === currentUserId)) {
    likeButton.classList.add("card__like-button_is-active");
  }

  cardImage.addEventListener("click", () => handleImageClick(cardData));

  likeButton.addEventListener("click", () => handleLike(event, cardData._id));

  return cardElement;
}
