// Функция удаления карточки
export function handleCardDelete(cardElement) {
  cardElement.remove();
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

  cardElement.querySelector(".card__title").textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => handleDelete(cardElement));

  cardImage.addEventListener("click", () => handleImageClick(cardData)); // Используем переданный обработчик

  likeButton.addEventListener("click", handleLike);

  return cardElement;
}
