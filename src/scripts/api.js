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

export const patchUserData = (name, about) => {
  fetch("https://nomoreparties.co/v1/wff-cohort-36/users/me", {
    method: "PATCH",
    headers: {
      authorization: "5648edd2-97cd-4c73-bb98-6063d9d54aba",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      about,
    }),
  });
};
