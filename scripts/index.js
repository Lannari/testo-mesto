/////////////   ПЕРЕМЕННЫЕ   ПРОФИЛЬ        //////////////////
const popupProfile = document.querySelector('.popup_type_profile'); //переменная попапа profile
const userInput = popupProfile.querySelector('.popup__input_type_user'); //переменная в инпуте имени 
const jobInput = popupProfile.querySelector('.popup__input_type_job'); //переменная в инпуте профессии
const profileName = document.querySelector('.profile__user'); //переменная в Имени профиля
const profileJob = document.querySelector('.profile__job'); //переменная в Профессии профиля
const formUser = popupProfile.querySelector('.popup__form'); //переменная блока формы
const buttonEditProfile = document.querySelector('.profile__edit-button'); //кнопка открытия попапа 1
const buttonClosePopupProfile = popupProfile.querySelector('.close-button-profile'); //кнопка закрытия попапа 1

buttonEditProfile.addEventListener('click', openPopupProfile);  
buttonClosePopupProfile.addEventListener('click', closePopupProfile);  
formUser.addEventListener('submit', handleFormSubmitUser);

//////////////////// ПЕРЕМЕННЫЕ КАРТОЧЕК  ////////////////////////////////
const popupCreateCard = document.querySelector('.popup_type_create-card'); //переменная попап-место
const formCreateCard = document.querySelector('.form-mesto')  // переменная формы Место
const nameCardInput = popupCreateCard.querySelector('.popup__input_type_place'); //переменная в инпуте место
const linkCardInput = popupCreateCard.querySelector('.popup__input_type_link'); //переменная в инпуте ссылка на картинку
const buttonOpenCreateCard = document.querySelector('.profile__add-button'); //кнопка открытия место
const buttonCloseCreateCard = popupCreateCard.querySelector('.close-button-mesto'); //кнопка закрытия место
const cardsContainer = document.querySelector('.elements')  // переменная секции с местами
const cardTemplate = document.querySelector('#card-template'); // переменная шаблона карточки

buttonOpenCreateCard.addEventListener('click', openCreateCard,);
buttonCloseCreateCard.addEventListener('click', closeCreateCard);
formCreateCard.addEventListener('submit', submitAddCardForm);

////////////////////////   ПЕРЕМЕННЫЕ ПОПАП ИМЕЙДЖ    ////////////////////////////////
const popupTypeFullImage = document.querySelector('.popup_type_full-image') // переменная попапа-имейдж
const fullImage = document.querySelector('.popup__fullimage') //переменная полноразмерной картинки попапа-имейдж //
const buttonCloseFullImage = document.querySelector('.close-button-fullimage') // переменная закрытия попапа-имейдж
const imageCaption = document.querySelector('.popup__caption-fullimage')  // переменная каптион

buttonCloseFullImage.addEventListener('click', closeFullImage);

////////  БАЗОВЫЕ ФУНКЦИИ ОТКРЫТИЯ И ЗАКРЫТИЯ ПОПАПов  //////////////////////
function openPopup (popup) {                      // общая функция Открыть попап
  popup.classList.add('popup_opened')
  document.addEventListener('keydown', closePressEsc);  //добавление слушателя функции закрытия на ескейп
  document.addEventListener('mousedown', closeClickOverlay);
}
function closePopup (popup) {                     // общая функция Закрыть попап
  popup.classList.remove('popup_opened')
  document.removeEventListener('keydown', closePressEsc);  //удаление слушателя функции закрытия на ескейп
  document.removeEventListener('mousedown', closeClickOverlay);
}

/////// ЗАКРЫТИЕ НА КЛАВИШУ ESC   ////////////
function closePressEsc(evt) {
  if (evt.key === 'Escape') {
    evt.target.blur();                          //  убрать выделение с кнопки
    const popupElement = document.querySelector('.popup_opened');
    closePopup(popupElement);
  }
}

////// ЗАКРЫТИЕ ПО КЛИКУ ПО ПУСТОМУ МЕСТУ ///////////
function closeClickOverlay(evt) {
  if (evt.target.classList.contains('popup_opened')) {
    closePopup(evt.target);
  }
}

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
const submitFormButton = formCreateCard.querySelector('.popup__submit-button');

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

///////////// СЧИТЫВАНИЕ МАССИВА И РАСПРЕДЕЛЕНИЕ КАРТОЧКЕ В СЕКЦИИ ELEMENTS ////////////////
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

///////////// ФУНКЦИЯ ПОСТАНОВКИ ЛАЙКА ////////////////
function handleLikeClick (evt) {
  evt.target.classList.toggle('element__like_active');
}

///////////// ФУНКЦИЯ УДАЛЕНИЯ КАРТОЧКИ ПО КЛИКУ //////////////
function handleDeleteButtonClick(evt) {  
  const card = evt.target.closest('.element')
  card.remove()
}

/////////////// СОХРАНЕНИЕ КАРТИНКИ И НАЗВАНИЯ ///////////////
function submitAddCardForm(evt) {
  evt.preventDefault()
  const link = linkCardInput.value
  const name = nameCardInput.value
  cardsContainer.prepend(createCard({ link, name }));
  closeCreateCard ();
}

////////  ФУНКЦИИ ПОПАП ИМЕЙДЖ /////////
function handleFullImageClick (card) {
  openPopup(popupTypeFullImage);
  fullImage.src = card.link;                     // другой вариант записи  - fullImage.setAttribute('src', card.link);
  fullImage.alt = card.name;                     // другой вариант записи  - fullImage.setAttribute('alt', card.name);
  imageCaption.textContent = card.name;
}
function closeFullImage () {
  closePopup(popupTypeFullImage);
}