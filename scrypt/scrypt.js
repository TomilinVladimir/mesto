// // Находим форму в DOM
// let formElement = document.querySelector('.popup__input-container');// Воспользуйтесь методом querySelector()
// // Находим поля формы в DOM
// let nameInput = formElement.querySelector('name');// Воспользуйтесь инструментом .querySelector()
// console.log(nameInput);
// // let jobInput = // Воспользуйтесь инструментом .querySelector()

// // // Обработчик «отправки» формы, хотя пока
// // // она никуда отправляться не будет
// // function formSubmitHandler (evt) {
// //     evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
// //                                                 // Так мы можем определить свою логику отправки.
// //                                                 // О том, как это делать, расскажем позже.

// //     // Получите значение полей jobInput и nameInput из свойства value

// //     // Выберите элементы, куда должны быть вставлены значения полей

// //     // Вставьте новые значения с помощью textContent
// // }

// // // Прикрепляем обработчик к форме:
// // // он будет следить за событием “submit” - «отправка»
// // formElement.addEventListener('submit', formSubmitHandler);



let editFormBtn = document.querySelector('.profile__edit-button');
let editFormIsOpend = document.querySelector('.popup');
let closeFormBtn = document.querySelector('.popup__close');

// console.log(editFormIsOpend);

function openEditForm(){
  editFormIsOpend.classList.toggle('popup__visible');
}

function closeEditForm(){
  editFormIsOpend.classList.toggle('popup__visible');
}


editFormBtn.addEventListener('click', openEditForm);
closeFormBtn.addEventListener('click', closeEditForm);

let oldName = document.querySelector('.profile__name');
let oldJob = document.querySelector('.profile__job');

// console.log(oldName.textContent);
// console.log(oldJob.textContent);

let newNamePlaceholder = document.querySelector('.popup__name-input');
let newJobPlaceholder = document.querySelector('.popup__job-input');

newNamePlaceholder.setAttribute('placeholder', oldName.textContent);
newJobPlaceholder.setAttribute('placeholder', oldJob.textContent);

let formElement = document.querySelector('.popup__input-container');
let nameInput = formElement.querySelector('.popup__name-input');
let jobInput = formElement.querySelector('.popup__job-input');

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

let submitBtm = document.querySelector('.popup__input-save');
// // // Прикрепляем обработчик к форме:
// // // он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);

console.log(jobInput.value);

