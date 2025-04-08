export const getUserData = () => {
  const profileName = document.querySelector(".profile__title");
  const profileDescription = document.querySelector(".profile__description");
  const profileAvatar = document.querySelector(".profile__image");
  
  return fetch("https://nomoreparties.co/v1/wff-cohort-36/users/me", {
    headers: {
      authorization: "5648edd2-97cd-4c73-bb98-6063d9d54aba",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      profileName.textContent = data.name;
      profileDescription.textContent = data.about;
      profileAvatar.style.backgroundImage = `url(${data.avatar})`;
    });
};
