export default class FormValidator { 
    constructor(validationConfig, formSelector) { 
      this._inputSelector = validationConfig.inputSelector; 
      this._submitButtonSelector = validationConfig.submitButtonSelector; 
      this._errorClassTemplate = validationConfig.errorClassTemplate; 
      this._inactiveButtonClass = validationConfig.inactiveButtonClass; 
      this._inputErrorClass = validationConfig.inputErrorClass; 
      this._errorClass = validationConfig.errorClass; 
      this._form = formSelector; 
    } 
   
    _showInputError = (input, validationMessage) => { 
      const errorElement = this._form.querySelector( 
        `${this._errorClassTemplate}${input.name}` 
      ); 
      errorElement.textContent = validationMessage; 
      input.classList.add(this._inputErrorClass); 
      errorElement.classList.add(this._errorClass); 
    }; 
   
    _hideInputError = (input) => { 
      const errorElement = this._form.querySelector( 
        `${this._errorClassTemplate}${input.name}`
      ); 
      errorElement.textContent = ''; 
      input.classList.remove(this._inputErrorClass); 
      errorElement.classList.remove(this._errorClass); 
    }; 
   
    disableButton = () => { 
      this._submitButton.classList.add(this._inactiveButtonClass); 
      this._submitButton.disabled = true; 
    }; 
   
    _enableButton = () => { 
      this._submitButton.classList.remove(this._inactiveButtonClass); 
      this._submitButton.disabled = false; 
    }; 
   
    _checkInputValidity = (input) => { 
      if (input.validity.valid) { 
        this._hideInputError(input); 
      } else { 
        this._showInputError(input, input.validationMessage); 
      } 
    }; 
   
    _hasInvalidInput = () => { 
      return this._inputList.some((input) => !input.validity.valid); 
    }; 
   
    _toggleButtonState = () => { 
      if (!this._hasInvalidInput()) { 
        this._enableButton(); 
      } else { 
        this.disableButton(); 
      } 
    }; 
   
    _setEventListeners = () => { 
      this._inputList = Array.from( 
        this._form.querySelectorAll(this._inputSelector) 
      ); 
   
      this._submitButton = this._form.querySelector(this._submitButtonSelector); 
      this._inputList.forEach((input) => { 
        input.addEventListener('input', () => { 
          this._checkInputValidity(input); 
          this._toggleButtonState(); 
        }); 
      }); 
    }; 
   
    enableValidation() { 
      this._setEventListeners(); 
    } 
   
    hideFormErrors() { 
      this._inputList.forEach((input) => { 
        this._hideInputError(input); 
        this._toggleButtonState(); 
      }); 
    } 
   
   
  }