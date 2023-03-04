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
profileEdit.addEventListener('click', openPopupUser);  
popupClose.addEventListener('click', closePopupUser);  
formUser.addEventListener('submit', handleFormSubmitUser);


function openPopupUser () {                  // открытие попапа юзер с сотображением профиля в инпутах          
    userInput.value = profileName.textContent;     
    jobInput.value = profileJob.textContent;       
    popup.classList.toggle('popup_opened');           
  }

function closePopupUser () {                 // закрытие попапа юзер
  popup.classList.remove('popup_opened');
}

function handleFormSubmitUser (evt) {        // отправка данных из инпутов в профиль и закрытие попапа юзер     
  evt.preventDefault();                            
  profileName.textContent = userInput.value;       
  profileJob.textContent = jobInput.value;         
  closePopupUser ();                                   
}
/////////////////////////////////////////////////////////////


/////////////////   ПЕРЕМЕННЫЕ МЕСТО   //////////////////////////////
const popupMesto = document.querySelector('.popup-mesto'); //переменная попап-место
const formMesto = document.querySelector('.form-mesto')  // переменная формы Место
const nameMestoInput = popupMesto.querySelector('.popup__input_type_mesto'); //переменная в инпуте место
const linkMestoInput = popupMesto.querySelector('.popup__input_type_link'); //переменная в инпуте ссылка на картинку
const mestoEdit = document.querySelector('.profile__add-button'); //кнопка открытия место
const mestoClose = popupMesto.querySelector('.close-button-mesto'); //кнопка закрытия место
const elements = document.querySelector('.elements')  // переменная секции с местами
///////////////////////////////////////////////////////////////////


/////////////  ФУНКЦИИ МЕСТО   ///////////
function toggleMesto () {            // функция переключения класса открытия попапа
    popupMesto.classList.toggle('popup_opened');
    formMesto.reset();              // сброс содержимого формы Место при переключении попапа
  }

mestoEdit.addEventListener('click', toggleMesto);
mestoClose.addEventListener('click', toggleMesto);
////////////////////////////////////////////////


///////////// СЧИТЫВАНИЕ МАССИВА И РАСПРЕДЕЛЕНИЕ КАРТОЧКЕ В СЕКЦИИ ELEMENTS ////////////////
function createCard(card) {
  const cardTemplate = document.querySelector('#card-template').content.cloneNode(true) // Переменная шаблона template

  const cardName = cardTemplate.querySelector('.element__name') // переменная названия карточки
  cardName.textContent = card.name 

  const cardLink = cardTemplate.querySelector('.element__image') // переменная ссылки на картинку   
  cardLink.setAttribute('src', card.link)                // атрибут картинке (здесь - ссылка)
  cardLink.setAttribute('alt', 'Пейзаж ' + card.name)    // атрибут картинке (здесь - альт)
  cardLink.setAttribute('title', 'Пейзаж ' + card.name)  // атрибут картинке (здесь - всплывающее название) 
  
  const deleteButtonCard = cardTemplate.querySelector('.element__trash') // ПЕРЕМЕННАЯ УДАЛЕНИЯ КАРТОЧКИ (картинка мусорки)
  deleteButtonCard.addEventListener('click', handleDeleteButtonClick)    //АКТИВИЗАЦИЯ ФУНКЦИИ ПРИ НАЖАТИИ, ФУНКЦИЯ НИЖЕ
  
  const likeButtonCard = cardTemplate.querySelector('.element__like')    // постановка лайка на карточку
  likeButtonCard.addEventListener('click', getLike);

  cardLink.addEventListener('click', () =>    //открытие полной картинки при клике на карточку
    handleFullImageClick(card)
  );


  elements.prepend(cardTemplate)  // располагает новую карточку в начале блока // РАБОТАЕТ ТОЛЬКО НАХОДЯСЬ В ЭТОМ МЕСТЕ!!! РАЗОБРАТЬСЯ
};


initialCards.forEach(createCard);   //СОЗДАНИЕ СЕКЦИИ КАРТОЧЕК ИЗ МАССИВА
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


///////////// ФУНКЦИЯ ПОСТАНОВКИ ЛАЙКА ///////////////////////////////
function getLike (evt) {
  const likebutton = evt.target
  likebutton.classList.toggle('element__like_active');
}
/////////////////////////////////////////////////////////////////////


///////////// ФУНКЦИЯ УДАЛЕНИЯ КАРТОЧКИ ПО КЛИКУ ////////////////////////
function handleDeleteButtonClick(evt) {  //ФУНКЦИЯ УДАЛЕНИЯ КАРТОЧКИ ПО КЛИКУ
  const button = evt.target     // КОРРЕКТНОСТЬ НАЗВАНИЯ ПЕРЕМЕННОЙ (!!!)
  const card = button.closest('.element') // КОРРЕКТНОСТЬ НАЗВАНИЯ ПЕРЕМЕННОЙ (!!!)
  card.remove()
}
/////////////////////////////////////////////////////////////////////////


///////////////////// СОХРАНЕНИЕ КАРТИНКИ И НАЗВАНИЯ /////////////////////////////////
formMesto.addEventListener('submit', handleFormSubmitMesto)

function handleFormSubmitMesto(evt) {
  evt.preventDefault()
  const link = linkMestoInput.value
  const name = nameMestoInput.value
  const card = { link, name }
  createCard(card)
  toggleMesto ();
}
////////////////////////////////////////////////////////////////////////////////////


////////////////////////ПЕРЕМЕННЫЕ ПОПАП ИМЕЙДЖ ////////////////////////////////
const popupTypeFullImage = document.querySelector('.popup_type_fullimage') // переменная попапа-имейдж
const fullimage = document.querySelector('.popup__fullimage') //переменная полноразмерной картинки попапа-имейдж //
const closeButtonFullImage = document.querySelector('.close-button-fullimage') // переменная закрытия попапа-имейдж
const imageCaption = document.querySelector('.popup__caption-fullimage')  // переменная каптион
/////////////////////////////////////////////////////////////////////////////////


//////////////////// ФУНКЦИИ ПОПАП ИМЕЙДЖ ///////////////////////////////////
  function handleFullImageClick (card) {
  fullimage.src = card.link;                                  // другой вариант записи  - fullimage.setAttribute('src', card.link);
  fullimage.alt = card.name;                                  // другой вариант записи  - fullimage.setAttribute('alt', card.name);
  imageCaption.textContent = card.name;                   
  popupTypeFullImage.classList.toggle('popup_opened');
}

function toggleFullImage () {       // функция переключения класса открытия попапа имейдж 
  popupTypeFullImage.classList.toggle('popup_opened');
}

fullimage.addEventListener('click', toggleFullImage);                 // открытие попапа имейдж
closeButtonFullImage.addEventListener('click', toggleFullImage);  // закрытие попапа имейдж
//////////////////////////////////////////////////////////////////////////
















/*       
///////// ПОСТАНОВКА ЛАЙКА. РАСПОЛАГАЕТСЯ ВНУТРИ ФУНКЦИИ КРЕАТЕ КАРД/////////

const elementLike = cardTemplate.querySelector('.element__like');    
  elementLike.addEventListener('click', function (event) {             
  const likeButton = event.target;                                     
  likeButton.classList.toggle('element__like_active');             
  });
*/
///// ВСЕ ПОМЕТКИ В ФАЙЛЕ ТОЛЬКО ДЛЯ ЛИЧНОГО ПОЛЬЗОВАНИЯ ////////////////////////////////////////

///// ИНФА ОБ АЙДИ ДЛЯ ЛАЙКОВ НА ВИДЕО С 1.01  ////
///// ИНФА О ДОБАВЛЕНИИ КАРТОЧКИ НА ВИДЕО С 1.06 ///
///// УДАЛЕНИЕ КАРТОЧКИ НА ВИДЕО С 1.12 ///