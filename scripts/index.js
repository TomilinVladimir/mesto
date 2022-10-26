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
const popupList = document.querySelectorAll('.popup');
const cardButtonAdd = cardForm.querySelector('.popup__input-save');

// ESC закрытие
const ESC_KEYCODE = 27;

function closePopup(form) {
  document.removeEventListener('keydown', handleEscUp); // удаляем слушатель ESC перед закрытием!
  form.classList.remove('popup_visible');
}

function handleEscUp(evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    const openedPopup = document.querySelector('.popup_visible');
    closePopup(openedPopup);
  }
}

function openPopup(form) {
  form.classList.add('popup_visible');
  document.addEventListener('keydown', handleEscUp);
}

function handleSubmitProfil(evt) {
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

function createCardFunc(name, src) {
  const newElement = template.cloneNode(true);
  const cardName = newElement.querySelector(cardSelectors.text);
  const cardImg = newElement.querySelector(cardSelectors.img);
  const btnDel = newElement.querySelector(cardSelectors.buttonDel);
  const likeButton = newElement.querySelector(cardSelectors.likeButton);

  cardName.textContent = name;
  cardImg.alt = name;
  cardImg.src = src;

  likeButton.addEventListener('click', function (like) {
    like.target.classList.toggle('like-button_active');
  });

  cardImg.addEventListener('click', function () {
    urlImg.setAttribute('src', cardImg.src);
    urlImg.setAttribute('alt', name);
    imgText.textContent = name;
    openPopup(popupZoom);
  });

  btnDel.addEventListener('click', function () {
    newElement.remove();
  });

  return newElement;
}

function renderCards(name, src) {
  const newCard = createCardFunc(name, src);
  cardsContainer.prepend(newCard);
}

function submitCardListner() {
  cardForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    renderCards(newCardName.value, newCardSrc.value);
    newCardName.value="";
    newCardSrc.value="";
    closePopup(popupCard);
  });
}

function createInitialCards() {
  initialCards.forEach(function (item) {
    const cardName = item.name;
    const cardSrc = item.link;
    renderCards(cardName, cardSrc);
  })
}

function openProfilPopup() {
  eraseForm(popupProfil);
  setInitialValues();
  handleButtonState(popupProfil, validationOptions);
  openPopup(popupProfil);

}

function openCardForm() {
  openPopup(popupCard);
  eraseForm(popupCard);
  handleButtonState(popupCard, validationOptions);
}

function setInitialValues() {
  nameInput.value = oldName.textContent;
  jobInput.value = oldJob.textContent;
}

// // // Прикрепляем обработчик к форме:
// // // он будет следить за событием “submit” - «отправка»
profilForm.addEventListener('submit', handleSubmitProfil);

profilBtnEdit.addEventListener('click', function () { openProfilPopup() });
profilBtnClose.addEventListener('click', function () { closePopup(popupProfil) });

cardBtnAdd.addEventListener('click', function () { openCardForm(cardButtonAdd) });
cardBtnClose.addEventListener('click', function () { closePopup(popupCard) });

zoomBtnClose.addEventListener('click', function () { closePopup(popupZoom) });

popupList.forEach(popup => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
      closePopup(popup);
    }
  })
});

setInitialValues();
submitCardListner();
createInitialCards();
