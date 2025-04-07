const showInputError = (
  form,
  inputElement,
  errorMessage,
  inputErrorClass,
  errorClass
) => {
  const errorElement = form.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};

export const hideInputError = (
  form,
  inputElement,
  inputErrorClass,
  errorClass
) => {
  const errorElement = form.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.textContent = "";
  errorElement.classList.remove(errorClass);
};

const isValid = (form, inputElement, inputErrorClass, errorClass) => {
  inputElement.setCustomValidity("");

  if (inputElement.validity.valueMissing) {
    inputElement.setCustomValidity("Вы пропустили это поле");
  } else if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  }

  if (!inputElement.validity.valid) {
    showInputError(
      form,
      inputElement,
      inputElement.validationMessage,
      inputErrorClass,
      errorClass
    );
  } else {
    hideInputError(form, inputElement, inputErrorClass, errorClass);
  }
};

const setEventListeners = (
  form,
  inputSelector,
  inputErrorClass,
  errorClass
) => {
  const inputList = Array.from(form.querySelectorAll(inputSelector));
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(form, inputElement, inputErrorClass, errorClass);
    });
  });
};

export const enableValidation = ({
  formSelector,
  inputSelector,
  inputErrorClass,
  errorClass,
}) => {
  const formList = Array.from(document.querySelectorAll(formSelector));

  formList.forEach((form) => {
    form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    setEventListeners(form, inputSelector, inputErrorClass, errorClass);
  });
};
