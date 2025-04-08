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

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (
  form,
  inputList,
  submitButtonSelector,
  inactiveButtonClass
) => {
  const submitButton = form.querySelector(submitButtonSelector);
  if (!submitButton) return;

  if (hasInvalidInput(inputList)) {
    submitButton.disabled = true;
    submitButton.classList.add(inactiveButtonClass);
  } else {
    submitButton.disabled = false;
    submitButton.classList.remove(inactiveButtonClass);
  }
};

const setEventListeners = (
  form,
  inputSelector,
  inputErrorClass,
  errorClass,
  submitButtonSelector,
  inactiveButtonClass
) => {
  const inputList = Array.from(form.querySelectorAll(inputSelector));
  toggleButtonState(form, inputList, submitButtonSelector, inactiveButtonClass);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(form, inputElement, inputErrorClass, errorClass);
      toggleButtonState(
        form,
        inputList,
        submitButtonSelector,
        inactiveButtonClass
      );
    });
  });
};

export const enableValidation = ({
  formSelector,
  inputSelector,
  inputErrorClass,
  errorClass,
  submitButtonSelector,
  inactiveButtonClass,
}) => {
  const formList = Array.from(document.querySelectorAll(formSelector));

  formList.forEach((form) => {
    form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    setEventListeners(
      form,
      inputSelector,
      inputErrorClass,
      errorClass,
      submitButtonSelector,
      inactiveButtonClass
    );
  });
};

export const clearValidation = (form, validationConfig) => {
  const inputList = Array.from(
    form.querySelectorAll(validationConfig.inputSelector)
  );
  const errorList = Array.from(
    form.querySelectorAll(`.${validationConfig.inputErrorClass}`)
  );

  inputList.forEach((inputElement) => {
    hideInputError(
      form,
      inputElement,
      validationConfig.inputErrorClass,
      validationConfig.errorClass
    )
  });

  errorList.forEach((errorElement) => {
    errorElement.textContent = "";
    errorElement.classList.remove(validationConfig.errorClass);
  });
};
