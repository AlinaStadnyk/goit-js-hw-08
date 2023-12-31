import throttle from 'lodash.throttle';
const KEY = 'feedback-form-state';
const form = document.querySelector('.feedback-form');
form.addEventListener('submit', handlerSubmit);
form.addEventListener(
  'input',
  throttle(() => {
    localStorage.setItem(KEY, JSON.stringify(inputResult()));
  }, 500)
);
autoFill();

function inputResult(event) {
  const result = {};
  const email = form.elements.email.value;
  const message = form.elements.message.value;
  if (email.length || message.length) {
    (result.email = email), (result.message = message);
    return result;
  }
}
function autoFill() {
  const storage = localStorage.getItem(KEY);
  if (storage !== null) {
    const text = JSON.parse(storage);
    form.elements.email.value = text.email;
    form.elements.message.value = text.message;
  }
}
function handlerSubmit(event) {
  event.preventDefault();
  const email = form.elements.email.value;
  const message = form.elements.message.value;
  if (email.length && message.length) {
    console.log(inputResult());
    form.reset();
    localStorage.removeItem(KEY);
  }
}
