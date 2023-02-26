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


///////////// ПЕРЕМЕННЫЕ ЮЗЕР //////////////////
const popup = document.querySelector('.popup'); //переменная попапа USER
const userInput = popup.querySelector('.popup__input_type_user'); //переменная в инпуте имени 
const jobInput = popup.querySelector('.popup__input_type_job'); //переменная в инпуте профессии
const profileName = document.querySelector('.profile__user'); //переменная в Имени профиля
const profileJob = document.querySelector('.profile__job'); //переменная в Профессии профиля
const formUser = popup.querySelector('.popup__form'); //переменная блока формы
const profileEdit = document.querySelector('.profile__edit-button'); //кнопка открытия попапа 1
const popupClose = popup.querySelector('.popup__close-button'); //кнопка закрытия попапа 1
//////////////////////////////////////////////////////////////


////////////  ФУНКЦИИ ЮЗЕР   //////////////////
function togglePopupUser () {                            
    userInput.value = profileName.textContent;     
    jobInput.value = profileJob.textContent;       
    popup.classList.toggle('popup_opened');           
  }

profileEdit.addEventListener('click', togglePopupUser);  
popupClose.addEventListener('click', togglePopupUser);  

function handleFormSubmitUser (evt) {              
  evt.preventDefault();                            
  profileName.textContent = userInput.value;       
  profileJob.textContent = jobInput.value;         
  togglePopupUser ();                                   
}

formUser.addEventListener('submit', handleFormSubmitUser);
/////////////////////////////////////////////////////////////


// ПЕРЕМЕННЫЕ МЕСТО   //////////////////////////////
const popupMesto = document.querySelector('.popup-mesto'); //переменная попап-место
const nameMestoInput = popupMesto.querySelector('.popup__input_type_mesto'); //переменная в инпуте место
const linkMestoInput = popupMesto.querySelector('.popup__input_type_link'); //переменная в инпуте ссылка на картинку

const mestoEdit = document.querySelector('.profile__add-button'); //кнопка открытия место
const mestoClose = popupMesto.querySelector('.close-button-mesto'); //кнопка закрытия место

const elements = document.querySelector('.elements')  // переменная секции с местами
///////////////////////////////////////////////////////////////////


/////////////  ФУНКЦИИ МЕСТО   ///////////
function toggleMesto () {
    popupMesto.classList.toggle('popup_opened');
  }

mestoEdit.addEventListener('click', toggleMesto);
mestoClose.addEventListener('click', toggleMesto);
////////////////////////////////////////////////


///////////// СЧИТЫВАНИЕ МАССИВА И РАСПРЕДЕЛЕНИЕ КАРТОЧКЕ В СЕКЦИИ ELEMENTS ////////////////
function createCard(card) {
  const cardTemplate = document.querySelector('#card-template').content.cloneNode(true) // Переменная шаблона template
  const cardName = cardTemplate.querySelector('.element__name') // переменная названия карточки
  const cardLink = cardTemplate.querySelector('.element__image') // переменная ссылки на картинку
  const deleteButtonCard = cardTemplate.querySelector('.element__trash') // ПЕРЕМЕННАЯ УДАЛЕНИЯ КАРТОЧКИ (картинка мусорки)
  
  cardName.textContent = card.name          
  
  cardLink.setAttribute('src', card.link)   // атрибут картинке (здесь - ссылка)
  cardLink.setAttribute('alt', 'Пейзаж ' + card.name)  // атрибут картинке (здесь - альт)
  cardLink.setAttribute('title', 'Пейзаж ' + card.name)  // атрибут картинке (здесь - всплывающее название)
  
  deleteButtonCard.addEventListener('click', handleDeleteButtonClick)  //АКТИВИЗАЦИЯ ФУНКЦИИ ПРИ НАЖАТИИ, ФУНКЦИЯ НИЖЕ
  elements.prepend(cardTemplate)  // расположить элемент(в начале? в конце?)
}

initialCards.forEach(createCard)   //РАСПОЛОЖЕНИЕ КАРТОЧЕК ПО СЕКЦИИ ИЗ МАССИВА (???)

function handleDeleteButtonClick(event) {  //ФУНКЦИЯ УДАЛЕНИЯ КАРТОЧКИ ПО КЛИКУ
  const button = event.target     // КОРРЕКТНОСТЬ НАЗВАНИЯ ПЕРЕМЕННОЙ (!!!)
  const card = button.closest('.element') // КОРРЕКТНОСТЬ НАЗВАНИЯ ПЕРЕМЕННОЙ (!!!)
  card.remove()
}
/////////////////////////////////////////////////////////////////////////


///////////////////// СОХРАНЕНИЕ КАРТИНКИ И НАЗВАНИЯ /////////////////////////////////
const formMesto = document.querySelector('.form-mesto')  // переменная формы Место
formMesto.addEventListener('submit', handleFormSubmitMesto)

function handleFormSubmitMesto(event) {
  event.preventDefault()
  const link = linkMestoInput.value
  const name = nameMestoInput.value
  const card = { link, name }
  createCard(card)
  toggleMesto ();
}

///// ВСЕ ПОМЕТКИ В ФАЙЛЕ ТОЛЬКО ДЛЯ ЛИЧНОГО ПОЛЬЗОВАНИЯ ////////////////////////////////////////

///// ИНФА ОБ АЙДИ ДЛЯ ЛАЙКОВ НА ВИДЕО С 1.01  ////
///// ИНФА О ДОБАВЛЕНИИ КАРТОЧКИ НА ВИДЕО С 1.06 ///
///// УДАЛЕНИЕ КАРТОЧКИ НА ВИДЕО С 1.12 ///