let popup = document.querySelector('.popup'); //переменная попапа
let usernameInput = document.querySelector('.popup__admin-username'); //переменная в инпуте имени
let profInput = document.querySelector('.popup__admin-profession'); //переменная в инпуте профессии
let profileName = document.querySelector('.profile__info-username'); //переменная в Имени профиля
let profileProf = document.querySelector('.profile__info-profession'); //переменная в Профессии профиля
let formElement = document.querySelector('.popup__form'); //переменная блока формы

const profileEdit = document.querySelector('.profile__edit'); //кнопка открытия попапа
profileEdit.addEventListener('click', function() {
  usernameInput.value = profileName.textContent;
  profInput.value = profileProf.textContent;
  popup.classList.add('popup_open');
});

const popupClose = document.querySelector('.popup__close-img'); //кнопка закрытия попапа
popupClose.addEventListener('click', function() {
  popup.classList.remove('popup_open');
});

const saveform = document.querySelector('.popup__submit-button'); //кнопка сохранения профиля
saveform.addEventListener('click', function(evt) {
  evt.preventDefault();
  profileName.textContent = usernameInput.value;   
  profileProf.textContent = profInput.value;
  popup.classList.remove('popup_open');
});

formElement.addEventListener('submit', handleFormSubmit);

