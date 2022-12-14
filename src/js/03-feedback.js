
import throttle from 'lodash.throttle';

const FEEDBACK_DATA = "feedback-form-state";

const refs = {
    form: document.querySelector('.feedback-form'),
    input: document.querySelector('.feedback-form  input'),
    textarea: document.querySelector('.feedback-form  textarea'),
};

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onFormInput, 500));

populateForm()

function onFormInput(e) {
    const formData = new FormData(refs.form);
    const values = Object.fromEntries(formData.entries());

    localStorage.setItem(FEEDBACK_DATA, JSON.stringify(values));
};

function onFormSubmit(e) {
    e.preventDefault();

    const savedFormData = localStorage.getItem(FEEDBACK_DATA);

    if (refs.form.email.value === '' || refs.form.message.value === '') {
        alert('Please fill in all the fields!');
    } else if (savedFormData) {
        console.log(JSON.parse(savedFormData));
    };

    localStorage.removeItem(FEEDBACK_DATA);
    e.currentTarget.reset();
};

function populateForm() {
    const savedFormData = JSON.parse(localStorage.getItem(FEEDBACK_DATA));
    
    if (savedFormData) {
        refs.input.value = savedFormData.email;
        refs.textarea.value = savedFormData.message;
    }
};