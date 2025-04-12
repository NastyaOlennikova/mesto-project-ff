const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-36",
  headers: {
    authorization: "5648edd2-97cd-4c73-bb98-6063d9d54aba",
    "Content-Type": "application/json",
  },
};

export const getUserData = () => {
  const profileName = document.querySelector(".profile__title");
  const profileDescription = document.querySelector(".profile__description");
  const profileAvatar = document.querySelector(".profile__image");

  return fetch(`${config.baseUrl}/users/me`, {
    headers: {
      authorization: config.headers.authorization,
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
  return fetch(`${config.baseUrl}/cards`, {
    headers: {
      authorization: config.headers.authorization,
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
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      authorization: config.headers.authorization,
      "Content-Type": config.headers["Content-Type"],
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
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: {
      authorization: config.headers.authorization,
      "Content-Type": config.headers["Content-Type"],
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
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: {
      authorization: config.headers.authorization,
      "Content-Type": config.headers["Content-Type"],
    },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

export const putLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: {
      authorization: config.headers.authorization,
      "Content-Type": config.headers["Content-Type"],
    },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

export const deleteLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: {
      authorization: config.headers.authorization,
      "Content-Type": config.headers["Content-Type"],
    },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

export const patchAvatar = (avatarUrl) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: {
      authorization: config.headers.authorization,
      "Content-Type": config.headers["Content-Type"],
    },
    body: JSON.stringify({
      avatar: avatarUrl,
    }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};
