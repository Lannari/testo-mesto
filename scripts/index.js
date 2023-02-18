let popup = document.querySelector('.popup'); //переменная попапа
let userInput = document.querySelector('.popup__input_type_user'); //переменная в инпуте имени
let jobInput = document.querySelector('.popup__input_type_job'); //переменная в инпуте профессии
let profileName = document.querySelector('.profile__user'); //переменная в Имени профиля
let profileJob = document.querySelector('.profile__job'); //переменная в Профессии профиля
let formElement = document.querySelector('.popup__form'); //переменная блока формы
const profileEdit = document.querySelector('.profile__edit-button'); //кнопка открытия попапа
const popupClose = document.querySelector('.popup__close-button'); //кнопка закрытия попапа

///////////////////////////////////////////////////////////////////////////////////////////////////

  function openpopup () {
    userInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    popup.classList.add('popup_opened');
  }

  function closepopup () {
    popup.classList.remove('popup_opened');
  }

//////////////////////////////////////////////////////////////////////////////////////////////////

profileEdit.addEventListener('click', openpopup);

popupClose.addEventListener('click', closepopup);

//////////////////////////////////////////////////////////////////////////////////////////////////

function handleFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = userInput.value;   
  profileJob.textContent = jobInput.value;
  closepopup ();
}

formElement.addEventListener('submit', handleFormSubmit);

/* const saveform = document.querySelector('.popup__submit-button'); //кнопка сохранения профиля // Ранний код
saveform.addEventListener('click', function(evt) {
  evt.preventDefault();
  profileName.textContent = usernameInput.value;   
  profileJob.textContent = profInput.value;
  popup.classList.remove('popup_opened');
});

formElement.addEventListener('submit', handleFormSubmit); */

