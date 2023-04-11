////////  БАЗОВЫЕ ФУНКЦИИ ОТКРЫТИЯ И ЗАКРЫТИЯ ПОПАПов  //////////////////////
export function openPopup (popup) {                      // общая функция Открыть попап
    popup.classList.add('popup_opened')
    document.addEventListener('keydown', closePressEsc);  //добавление слушателя функции закрытия на ескейп
    document.addEventListener('mousedown', closeClickOverlay);
  }
export function closePopup (popup) {                     // общая функция Закрыть попап
    popup.classList.remove('popup_opened')
    document.removeEventListener('keydown', closePressEsc);  //удаление слушателя функции закрытия на ескейп
    document.removeEventListener('mousedown', closeClickOverlay);
  }
  
/////// ЗАКРЫТИЕ НА КЛАВИШУ ESC   ////////////
export function closePressEsc (evt) {
    if (evt.key === 'Escape') {
      evt.target.blur();                          //  убрать выделение с кнопки
      const popupElement = document.querySelector('.popup_opened');
      closePopup(popupElement);
    }
  }
  
////// ЗАКРЫТИЕ ПО КЛИКУ ПО ПУСТОМУ МЕСТУ ///////////
export function closeClickOverlay (evt) {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(evt.target);
    }
  }

