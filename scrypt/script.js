let editFormBtn = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let formElement = document.querySelector('.popup__input-container');
let closeFormBtn = document.querySelector('.popup__close');


let nameInput = formElement.querySelector('.popup__name-input');
let jobInput = formElement.querySelector('.popup__job-input');

let oldName = document.querySelector('.profile__name');
let oldJob = document.querySelector('.profile__job');

function openEditForm(){
  popup.classList.toggle('popup__visible');
  oldJob.textContent = jobInput.value;
  oldName.textContent = nameInput.value;
}

function closeEditForm(){
  popup.classList.toggle('popup__visible');
}

function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.
    oldJob.textContent = jobInput.value;
    oldName.textContent = nameInput.value;

    // Получите значение полей jobInput и nameInput из свойства value

    // Выберите элементы, куда должны быть вставлены значения полей

    // Вставьте новые значения с помощью textContent
    closeEditForm();
}

// // // Прикрепляем обработчик к форме:
// // // он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);

editFormBtn.addEventListener('click', openEditForm);
closeFormBtn.addEventListener('click', closeEditForm);
