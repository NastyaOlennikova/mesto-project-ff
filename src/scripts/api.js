export const getUserData = () => {
  const profileName = document.querySelector(".profile__title");
  const profileDescription = document.querySelector(".profile__description");
  const profileAvatar = document.querySelector(".profile__image");

  return fetch("https://nomoreparties.co/v1/wff-cohort-36/users/me", {
    headers: {
      authorization: "5648edd2-97cd-4c73-bb98-6063d9d54aba",
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((data) => {
      profileName.textContent = data.name;
      profileDescription.textContent = data.about;
      profileAvatar.style.backgroundImage = `url(${data.avatar})`;
      return data;
    });
};

export const getCards = () => {
  return fetch("https://nomoreparties.co/v1/wff-cohort-36/cards", {
    headers: {
      authorization: "5648edd2-97cd-4c73-bb98-6063d9d54aba",
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((data) => {
      return data.map((item) => ({
        name: item.name,
        link: item.link,
        likes: item.likes,
        owner: item.owner,
        id: item._id,
        ownerId: item.owner._id,
        ownerName: item.owner.name,
      }));
    });
};

export const patchUserData = (userData) => {
  return fetch("https://nomoreparties.co/v1/wff-cohort-36/users/me", {
    method: "PATCH",
    headers: {
      authorization: "5648edd2-97cd-4c73-bb98-6063d9d54aba",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: userData.name,
      about: userData.about,
    }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

export const postCard = (cardData) => {
  return fetch("https://nomoreparties.co/v1/wff-cohort-36/cards", {
    method: "POST",
    headers: {
      authorization: "5648edd2-97cd-4c73-bb98-6063d9d54aba",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: cardData.name,
      link: cardData.link,
    }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

export const deleteCard = (cardId) => {
  return fetch(`https://nomoreparties.co/v1/wff-cohort-36/cards/${cardId}`, {
    method: "DELETE",
    headers: {
      authorization: "5648edd2-97cd-4c73-bb98-6063d9d54aba",
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};
