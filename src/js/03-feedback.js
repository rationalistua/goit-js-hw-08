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
    
    if (savedMassage) {
        const parsedMassage = JSON.parse(savedMassage);
        email.value = parsedMassage.email;
        textarea.value = parsedMassage.message;
    }
}

function onFormSubmit(event) {
    event.preventDefault();

    event.target.reset();
    localStorage.removeItem(STORAGE_KEY);
    console.log(formData)
}