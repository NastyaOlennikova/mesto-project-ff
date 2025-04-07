const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add("popup__input_type_error");
    errorElement.textContent = errorMessage;
    errorElement.classList.add('popup__input-error_active');

  };
  
  const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove("popup__input_type_error");
    errorElement.textContent = '';
    errorElement.classList.remove('popup__input-error_active');
  };

  export const isValid = (formElement, inputElement, errorMessage) => {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, errorMessage);
    } else {
      hideInputError(formElement, inputElement);
    }
  };