import { openPopup, closePopup, closePressEsc, closeClickOverlay } from './utils.js'; //  импорт базовых функций

import Card from "./Card.js";

import FormValidator from "./FormValidator.js";


/////////////   ПЕРЕМЕННЫЕ ПРОФИЛЯ  //////////////////
const popupProfile = document.querySelector('.popup_type_profile'); //переменная попапа profile
const userInput = popupProfile.querySelector('.popup__input_type_user'); //переменная в инпуте имени 
const jobInput = popupProfile.querySelector('.popup__input_type_job'); //переменная в инпуте профессии
const profileName = document.querySelector('.profile__user'); //переменная в Имени профиля
const profileJob = document.querySelector('.profile__job'); //переменная в Профессии профиля
const formUser = popupProfile.querySelector('.popup__form'); //переменная блока формы
const buttonEditProfile = document.querySelector('.profile__edit-button'); //кнопка открытия попапа 1
const buttonClosePopupProfile = popupProfile.querySelector('.close-button-profile'); //кнопка закрытия попапа 1

//////////////////// ПЕРЕМЕННЫЕ КАРТОЧЕК  ////////////////////////////////
const popupCreateCard = document.querySelector('.popup_type_create-card'); //переменная попап-место
const formCreateCard = document.querySelector('.form-mesto')  // переменная формы Место
const nameCardInput = popupCreateCard.querySelector('.popup__input_type_place'); //переменная в инпуте место
const linkCardInput = popupCreateCard.querySelector('.popup__input_type_link'); //переменная в инпуте ссылка на картинку
const buttonOpenCreateCard = document.querySelector('.profile__add-button'); //кнопка открытия место
const buttonCloseCreateCard = popupCreateCard.querySelector('.close-button-mesto'); //кнопка закрытия место
const cardsContainer = document.querySelector('.elements')  // переменная секции с карточками

////////////////////////   ПЕРЕМЕННЫЕ ПОПАП ИМЕЙДЖ    ////////////////////////////////
const popupTypeFullImage = document.querySelector('.popup_type_full-image') // переменная попапа-имейдж
const fullImage = document.querySelector('.popup__fullimage') //переменная полноразмерной картинки попапа-имейдж //
const buttonCloseFullImage = document.querySelector('.close-button-fullimage') // переменная закрытия попапа-имейдж
const imageCaption = document.querySelector('.popup__caption-fullimage')  // переменная каптион

////////////// ПЕРЕМЕННАЯ КНОПКИ "СОХРАНИТЬ" СОЗДАНИЯ КАРТОЧКИ ///////////////////
const submitFormButton = formCreateCard.querySelector('.popup__submit-button');


//---------------------------------------------------------------------------//
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  errorClassTemplate: '.popup__input-error_type_',
  inputErrorClass: 'popup__input_border_error',
  errorClass: 'popup__input-error_visible',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_inactive',
};

const profileFormValidation = new FormValidator(validationConfig, formUser); 
profileFormValidation.enableValidation(); 
const placeFormValidation = new FormValidator(validationConfig, formCreateCard); 
placeFormValidation.enableValidation();
//--------------------------------------------------------------------------------------------//

const initialCards = [  // МАССИВ С КАРТИНКАМИ
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
//----------------------------------------------------------------------------------------------//




///////////  ФУНКЦИИ ОТКРЫТИЯ/ЗАКРЫТИЯ ПОПАП ПРОФИЛЬ  /////////////
function openPopupProfile () {
  openPopup(popupProfile);
  userInput.value = profileName.textContent;     
  jobInput.value = profileJob.textContent; 
}
function closePopupProfile () {
  closePopup(popupProfile);
}


////////////// ОТКРЫТИЕ/ЗАКРЫТИЕ ВТОРОГО ПОПАПА С ЗАБЛОКИРОВАННОЙ ПО УМОЛЧАНИЮ КНОПКОЙ СОХРАНИТЬ ///////////////////
function disableSubmitButton(submitFormButton, config) {    //функция деактивации кнопки по умолчанию у второго попапа
  submitFormButton.classList.add(config.inactiveButtonClass);
  submitFormButton.disabled = true;
}

function openCreateCard () {
  openPopup(popupCreateCard);
  formCreateCard.reset();
  disableSubmitButton(submitFormButton, validationConfig);
}

function closeCreateCard () {
  closePopup(popupCreateCard);
}


////////////////// ОТПРАВКА ДАННЫХ ИЗ ПОЛЕЙ ВВОДА В ПРОФИЛЬ  /////////////////////////
function handleFormSubmitUser (evt) { 
  console.log(evt)
  evt.preventDefault();                            
  profileName.textContent = userInput.value;       
  profileJob.textContent = jobInput.value;         
  closePopupProfile ();                                  
}

//---------

// function submitAddCardForm(evt) {
//   evt.preventDefault();
//   element.prepend(
//     createCard({ name: nameCardInput.value, link: linkCardInput.value })
//   );
//   evt.target.reset();
//   closeCreateCard();
// }




/////////////// СОХРАНЕНИЕ КАРТИНКИ И НАЗВАНИЯ ///////////////
function submitAddCardForm(evt) {
  evt.preventDefault()
  const link = linkCardInput.value
  const name = nameCardInput.value
  cardsContainer.prepend(createCard(name, link));
  closeCreateCard ();
}

function createCard(name, link) {
  const card = new Card(name, link, '#card-template', handleFullImageClick);
  const cardElement = card.generateCard();
  return cardElement;
}
/////////////////////////////////////////////////////////////
initialCards.forEach((cardData) => {                  
  const cardElement = createCard(cardData.name, cardData.link);
  cardsContainer.append(cardElement);
});








/*
/////////////// СОХРАНЕНИЕ КАРТИНКИ И НАЗВАНИЯ ///////////////
function submitAddCardForm(evt) {
  evt.preventDefault()
  const link = linkCardInput.value
  const name = nameCardInput.value
  cardsContainer.prepend(createCard({ link, name }));
  closeCreateCard ();
}

function createCard(cardData) {
  const card = new Card(cardData, cardTemplate, handleFullImageClick);
  const cardElement = card.generateCard();
  return cardElement;
}
/////////////////////////////////////////////////////////////
initialCards.forEach((item) => {
  const card = new Card(item.name, item.link, handleFullImageClick);
  const cardElement = card.generateCard();

  cardsContainer.append(cardElement);
});

*/

// initialCards.forEach((cardData) => {                  //предыдущая версия фор ич
//   const cardElement = createCard(cardData);
//   element.append(cardElement);
// });

/*

function createCard(card) {
  const newCard = cardTemplate.content.cloneNode(true) // Переменная шаблона template

  const cardName = newCard.querySelector('.element__name') // переменная названия карточки
  cardName.textContent = card.name 

  const cardLink = newCard.querySelector('.element__image') // переменная ссылки на картинку   
  cardLink.src = card.link;               // атрибут картинке (здесь - ссылка)
  cardLink.alt = 'Пейзаж ' + card.name;   // атрибут картинке (здесь - альт)
  cardLink.title = 'Пейзаж ' + card.name; // атрибут картинке (здесь - всплывающее название)
  
  const buttonDeleteCard = newCard.querySelector('.element__trash') // ПЕРЕМЕННАЯ УДАЛЕНИЯ КАРТОЧКИ (картинка мусорки)
  buttonDeleteCard.addEventListener('click', handleDeleteButtonClick)    
  
  const buttonLikeCard = newCard.querySelector('.element__like')    // постановка лайка на карточку
  buttonLikeCard.addEventListener('click',  handleLikeClick);

  cardLink.addEventListener('click', () =>    //открытие полной картинки при клике на карточку
    handleFullImageClick(card)
  );

  return newCard;
};


//////////  СОЗДАНИЕ СЕКЦИИ КАРТОЧЕК ИЗ МАССИВА  ////////////
initialCards.forEach(function (card) {     
  cardsContainer.append(createCard(card));
}); 
*/

/*
///////////// ФУНКЦИЯ ПОСТАНОВКИ ЛАЙКА ////////////////
function handleLikeClick (evt) {
  evt.target.classList.toggle('element__like_active');
}
*/
/*
///////////// ФУНКЦИЯ УДАЛЕНИЯ КАРТОЧКИ ПО КЛИКУ //////////////
function handleDeleteButtonClick(evt) {  
  const card = evt.target.closest('.element')
  card.remove()
}
*/


////////  ФУНКЦИИ ПОПАП ИМЕЙДЖ /////////
function handleFullImageClick (name, link) { //очередность в скобках имеет значение
  fullImage.alt = name;                     // другой вариант записи  - fullImage.setAttribute('alt', card.name);
  fullImage.src = link;                     // другой вариант записи  - fullImage.setAttribute('src', card.link);
  imageCaption.textContent = name;
  openPopup(popupTypeFullImage);
} 
 

function closeFullImage () {
  closePopup(popupTypeFullImage);
};


///////////// СЛУШАТЕЛИ ПРОФИЛя  //////////////////
buttonEditProfile.addEventListener('click', openPopupProfile);  
buttonClosePopupProfile.addEventListener('click', closePopupProfile);  
formUser.addEventListener('submit', handleFormSubmitUser);

//////////////////// СЛУШАТЕЛИ КАРТОЧЕК  ////////////////////////////////
buttonOpenCreateCard.addEventListener('click', openCreateCard,);
buttonCloseCreateCard.addEventListener('click', closeCreateCard);
formCreateCard.addEventListener('submit', submitAddCardForm);

////////////////////////  СЛУШАТЕЛИ ПОПАП ИМЕЙДЖ    ////////////////////////////////
buttonCloseFullImage.addEventListener('click', closeFullImage);