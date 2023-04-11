export default class Card {
    constructor (name, link, cardTemplate, handleFullImageClick) {
        this._name = name;
        this._link = link;
        this._cardTemplate = cardTemplate;
        this._handleFullImageClick = handleFullImageClick;
    }
  
    _getTemplate() {
        const cardElement = document
        .querySelector(this._cardTemplate) //класс шаблона
        .content
        .querySelector('.element')  // класс артикля внутри шаблона
        .cloneNode(true);
        return cardElement;
    }


    // constructor (name, link, cardElement, handleFullImageClick) {
    //     this._name = name;
    //     this._link = link;
    //     this._cardElement = cardElement;
    //     this._handleFullImageClick = handleFullImageClick;
    // }
  
    // _getTemplate() {
    //     const cardElement = document
    //     .querySelector(this._cardElement) //класс шаблона
    //     .content
    //     .querySelector('.element')  // класс артикля внутри шаблона
    //     .cloneNode(true);
    //     return cardElement;
    // }

    

    _handleLikeClick(targetButton) {
        targetButton.target.classList.toggle('element__like_active');
      }


    generateCard() {
        this._element = this._getTemplate();
        this._element.querySelector('.element__name').textContent = this._name; //
        this._elementImage = this._element.querySelector('.element__image');
        this._elementImage.alt = this._name;
        this._elementImage.src = this._link;
        this._elementLike = this._element.querySelector('.element__like');
        this._elementTrash = this._element.querySelector('.element__trash');
        this._setEventListeners();
        return this._element;
    }
  
    _setEventListeners() {   
        this._elementLike.addEventListener('click', evt => this._handleLikeClick(evt));
        this._elementTrash.addEventListener('click', () => this._element.remove());
        this._elementImage.addEventListener('click', () => {
        this._handleFullImageClick(this._name, this._link);
        });
    }
  
};
