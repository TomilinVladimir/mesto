const initialCards = [
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

const cardSelectors = {
  form: '.popup__input-card',
  addCard: '.profile__add-button',
  list: '.elements__list',
  template: '#card-item-template',
  img: '.element__img',
  text: '.element__tittle',
  inputName: '.popup__input_card_name',
  inputSrc: '.popup__input_card_src',
  buttonDel: '.element__del',
  likeButton: '.like-button',
  imgBtn: '.element__img',
}


let editProfilBtn = document.querySelector('.profile__edit-button');
let popupProfil = document.querySelector('.popup__profil');
let profilForm = document.querySelector('.popup__input-profil');
let closeProfilBtn = document.querySelector('.popup__close_form-profil');

let nameInput = profilForm.querySelector('.popup__input_val_name');
let jobInput = profilForm.querySelector('.popup__input_val_job');

let oldName = document.querySelector('.profile__name');
let oldJob = document.querySelector('.profile__job');

let addCardBtn = document.querySelector(cardSelectors.addCard);
let popupCard = document.querySelector('.popup__card');
let cardForm = document.querySelector(cardSelectors.form);
let closeCardBtn = document.querySelector('.popup__close_form-card');
let cardsList =  document.querySelector(cardSelectors.list);

const template = document.querySelector(cardSelectors.template).content.querySelector('.element');

const popupZoom = document.querySelector('.popup__image');
const closeZoomBtn = popupZoom.querySelector('.popup__close_form_zoom');

const popupProfilOwerlay = popupProfil.querySelector('.popup__overlay');

const popupCardOwerlay = popupCard.querySelector('.popup__overlay');

const popupZoomOwerlay = popupZoom.querySelector('.popup__overlay');

function openProfilForm(){
  popupProfil.classList.add('popup_visible');
  nameInput.value = oldName.textContent;
  jobInput.value = oldJob.textContent;
}

function closeProfilForm(){
  popupProfil.classList.remove('popup_visible');
}

function openCardForm(){
  popupCard.classList.add('popup_visible');
}

function closeCardForm(){
  popupCard.classList.remove('popup_visible');
}

function closeZoomForm(){
  popupZoom.classList.remove('popup_visible');
}


function profilSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.
      oldJob.textContent = jobInput.value;
      oldName.textContent = nameInput.value;
    // Получите значение полей jobInput и nameInput из свойства value
    // Выберите элементы, куда должны быть вставлены значения полей
    // Вставьте новые значения с помощью textContent
    closeProfilForm();
}

function addCardFunc (name, src) {
  const newElement = template.cloneNode(true);
  const cardName = newElement.querySelector(cardSelectors.text);
  const cardImg = newElement.querySelector(cardSelectors.img);
  const delBtn = newElement.querySelector(cardSelectors.buttonDel);
  const likeButton = newElement.querySelector(cardSelectors.likeButton);
  const imgBtn = newElement.querySelector(cardSelectors.imgBtn);

  cardName.textContent = name;
  cardImg.alt = name;
  cardImg.src = src;
  cardsList.prepend(newElement);

  likeButton.addEventListener('click', function (like) {
    like.target.classList.toggle('like-button_active');
    console.log('like');
  });

  imgBtn.addEventListener('click', function(){
    popupZoom.classList.add('popup_visible');
    const urlImg = document.querySelector('.popup__img');
    const imgText = document.querySelector('.popup__img-text');
    closeZoomBtn.addEventListener('click', closeZoomForm);
    urlImg.setAttribute('src',cardImg.src);
    urlImg.setAttribute('alt', name);
    imgText.textContent = name;

    // console.dir(urlImg);
  })

  delBtn.addEventListener('click', function(){
    newElement.remove();
  })
}

function cardSubmitListner () {
  const newCardName = cardForm.querySelector(cardSelectors.inputName);
  const newCardSrc = cardForm.querySelector(cardSelectors.inputSrc);
  cardForm.addEventListener('submit', function(evt){
    evt.preventDefault();
    addCardFunc(newCardName.value, newCardSrc.value);
    closeCardForm();
    newCardName.value = 'Название';
    newCardSrc.value = 'Ссылка на картинку';
  });
}

function createInitialCards (){
  initialCards.forEach(function (item){
    const cardName = item.name;
    const cardSrc = item.link;
    addCardFunc(cardName, cardSrc);
  })
}

// // // Прикрепляем обработчик к форме:
// // // он будет следить за событием “submit” - «отправка»
profilForm.addEventListener('submit', profilSubmitHandler);

editProfilBtn.addEventListener('click', openProfilForm);
closeProfilBtn.addEventListener('click', closeProfilForm);


addCardBtn.addEventListener('click', openCardForm);
closeCardBtn.addEventListener('click', closeCardForm);

popupProfilOwerlay.addEventListener('click', closeProfilForm);
popupCardOwerlay.addEventListener('click', closeCardForm);
popupZoomOwerlay.addEventListener('click', closeZoomForm);



cardSubmitListner();
createInitialCards();
