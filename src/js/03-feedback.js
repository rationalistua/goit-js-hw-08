import throttle from "lodash.throttle";

const form = document.querySelector('.feedback-form');
const textarea = document.querySelector('.feedback-form textarea');
const email = document.querySelector('.feedback-form input');

const STORAGE_KEY = 'feedback-form-state';
const formData = {};

form.addEventListener('input', throttle(onFormInput, 500));
form.addEventListener('submit', onFormSubmit);

populateForm();

function onFormInput(event) {
    formData[event.target.name] = event.target.value;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function populateForm() {
    const savedMassage = localStorage.getItem(STORAGE_KEY);

    try {
      const serState = localStorage.getItem(savedMassage);
      return serState === null ? undefined : JSON.parse(serState);
    } catch (error) {
      console.error('Get state error: ', error.message);
    }

    if (serState) {
        email.value = parsedMassage.email;
        textarea.value = parsedMassage.message;
    }
}

function onFormSubmit(event) {
    event.preventDefault();

    if (event.target.email.value === "" || event.target.message.value === "") {
      return alert("Усі поля мають бути заповнені!");
    };

    console.log(formData);
    event.target.reset();
    localStorage.removeItem(STORAGE_KEY);
}