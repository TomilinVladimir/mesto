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
  // imgBtn: '.element__img',
}


const profilBtnEdit = document.querySelector('.profile__edit-button');
const popupProfil = document.querySelector('.popup_profil');
const profilForm = document.querySelector('.popup__input-profil');
const profilBtnClose = document.querySelector('.popup__close_form-profil');

const nameInput = profilForm.querySelector('.popup__input_val_name');
const jobInput = profilForm.querySelector('.popup__input_val_job');

const oldName = document.querySelector('.profile__name');
const oldJob = document.querySelector('.profile__job');

const cardBtnAdd = document.querySelector(cardSelectors.addCard);
const popupCard = document.querySelector('.popup_card');
const cardForm = document.querySelector(cardSelectors.form);
const cardBtnClose = document.querySelector('.popup__close_form-card');
const cardsContainer = document.querySelector(cardSelectors.list);

const template = document.querySelector(cardSelectors.template).content.querySelector('.element');

const popupZoom = document.querySelector('.popup_image');
const zoomBtnClose = document.querySelector('.popup__close_form-zoom');

const urlImg = document.querySelector('.popup__img');
const imgText = document.querySelector('.popup__img-text');

const newCardName = cardForm.querySelector(cardSelectors.inputName);
const newCardSrc = cardForm.querySelector(cardSelectors.inputSrc);

// const popupProfilOwerlay = popupProfil.querySelector('.popup__overlay');

// const popupCardOwerlay = popupCard.querySelector('.popup__overlay');

// const popupZoomOwerlay = popupZoom.querySelector('.popup__overlay');

function openPopup(form) {
  form.classList.add('popup_visible');
}

function closePopup(form) {
  form.classList.remove('popup_visible');
}

// function openProfilForm() {
//   popupProfil.classList.add('popup_visible');
//   nameInput.value = oldName.textContent;
//   jobInput.value = oldJob.textContent;
// }

// function closeProfilForm() {
//   popupProfil.classList.remove('popup_visible');
// }

// function openCardForm() {
//   popupCard.classList.add('popup_visible');
// }

// function closeCardForm() {
//   popupCard.classList.remove('popup_visible');
// }

// function closeZoomForm() {
//   popupZoom.classList.remove('popup_visible');
// }


function profilSubmitHandler(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки.
  // О том, как это делать, расскажем позже.
  oldJob.textContent = jobInput.value;
  oldName.textContent = nameInput.value;
  // Получите значение полей jobInput и nameInput из свойства value
  // Выберите элементы, куда должны быть вставлены значения полей
  // Вставьте новые значения с помощью textContent
  closePopup(popupProfil);
}

function addCardFunc(name, src) {
  const newElement = template.cloneNode(true);
  const cardName = newElement.querySelector(cardSelectors.text);
  const cardImg = newElement.querySelector(cardSelectors.img);
  const btnDel = newElement.querySelector(cardSelectors.buttonDel);
  const likeButton = newElement.querySelector(cardSelectors.likeButton);
  // const imgBtn = newElement.querySelector(cardSelectors.imgBtn);

  cardName.textContent = name;
  cardImg.alt = name;
  cardImg.src = src;
  // cardsContainer.prepend(newElement);

  likeButton.addEventListener('click', function (like) {
    like.target.classList.toggle('like-button_active');
  });

  cardImg.addEventListener('click', function () {
    openPopup(popupZoom);
    // popupZoom.classList.add('popup_visible');
    urlImg.setAttribute('src', cardImg.src);
    urlImg.setAttribute('alt', name);
    imgText.textContent = name;
  });

  btnDel.addEventListener('click', function () {
    newElement.remove();
  });

  return newElement;

}

function renderCards(name, src) {
  const todo = addCardFunc(name, src);
  cardsContainer.prepend(todo);
}

function cardSubmitListner() {
  cardForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    // addCardFunc(newCardName.value, newCardSrc.value);
    renderCards(newCardName.value, newCardSrc.value);
    closePopup(popupCard);
    cardForm.reset();
  });
}

function createInitialCards() {
  initialCards.forEach(function (item) {
    const cardName = item.name;
    const cardSrc = item.link;
    // addCardFunc(cardName, cardSrc);
    renderCards(cardName, cardSrc);
  })
}


function openProfilPopup() {
  openPopup(popupProfil);
  nameInput.value = oldName.textContent;
  jobInput.value = oldJob.textContent;
}

// // // Прикрепляем обработчик к форме:
// // // он будет следить за событием “submit” - «отправка»
profilForm.addEventListener('submit', profilSubmitHandler);

profilBtnEdit.addEventListener('click', function () { openPopup(popupProfil) });
profilBtnClose.addEventListener('click', function () { closePopup(popupProfil) });


cardBtnAdd.addEventListener('click', function () { openPopup(popupCard) });
cardBtnClose.addEventListener('click', function () { closePopup(popupCard) });

zoomBtnClose.addEventListener('click', function () { closePopup(popupZoom) });


// popupProfilOwerlay.addEventListener('click', closeProfilForm);
// popupCardOwerlay.addEventListener('click', closeCardForm);
// popupZoomOwerlay.addEventListener('click', closeZoomForm);

const popupList = document.querySelectorAll('.popup');
popupList.forEach(popup => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
      closePopup(popup);
    }
  })
});


cardSubmitListner();
createInitialCards();
