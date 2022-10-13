// Получаю элементы формы со страницы
const form = document.getElementById('form');
const form2 = document.querySelector('#form');
const formInputEmail = document.getElementById('email');
const formInputPassword = document.getElementById('password');
const formBtn = document.querySelector('.form__btn');
const formInputs = document.querySelectorAll('.form__input');

// Получаю элементы модального окна со страницы
const modal = document.querySelector('.modal');
const modalCancel = document.querySelector('.modal__cancel');
const modalConfirm = document.querySelector('.modal__confirm');

// Получаю элементы окна, в cлучае успешной отравки формы со страницы
const alertMessage = document.querySelector('.alert');
const alertCloseBtn = document.querySelector('.alert__close-btn');

formBtn.addEventListener('click', (e) => {
  e.preventDefault();

  let emailVal = formInputEmail.value;
  let emptyInputs = Array.from(formInputs).filter(input => input.value === '');

  formInputs.forEach(function (input) {
    if (input.value === '') {
      input.classList.add('error');

    } else {
      input.classList.remove('error');
    }
  });

  if (emptyInputs.length !== 0) {
    alert('Fields cannot be empty!');
    return false;
  }

  if (!validateEmail(emailVal)) {
    alert('Email not valid!');
    formInputEmail.classList.add('error');
    return false;
  } else {
    formInputEmail.classList.remove('error');
  }

  toggleLoader();
  toggleClassModal();
  renderModalTitle();
})

// Функция на валидность email
function validateEmail(email) {
  let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

// Отображаю email, введенный пользователем, в модальном окне
function renderModalTitle() {
  const wrapper = document.querySelector('.modal__title')

  wrapper.innerHTML = '';

  // Перебираю полученный массив с элементами для их отображения на странице

  wrapper.insertAdjacentHTML('beforeend', `
    <span>
      Please confirm account creation for <a class="link-title" href="mailto:${formInputEmail.value}">${formInputEmail.value}</a>!
    </span>
  `)
}

// Отображаю email, введенный пользователем, во вспомогательном окне
function renderAlertTitle() {
  const wrapper = document.querySelector('.alert__title')

  wrapper.innerHTML = '';

  // Перебираю полученный массив с элементами для их отображения на странице

  wrapper.insertAdjacentHTML('beforeend', `
    <span>
      Hello, user with email <a class="link-title" href="mailto:${formInputEmail.value}">${formInputEmail.value}</a>!
    </span>
  `)
}

// Вешаю событие клик на кнопку закрыть вспомогательное окно
alertCloseBtn.addEventListener('click', () => {
  toggleClassAlert();

  // Показываю форму на странице
  form.classList.remove('inactive');

  form.reset();
})

// Вешаю событие клик на кнопку закрыть модальное окно
modalCancel.addEventListener('click', () => {
  toggleClassModal();

  form.reset();
})

// Вешаю событие клик на кнопку принять и отправить данные формы через модальное окно
modalConfirm.addEventListener('click', (e) => {
  e.preventDefault();

  // Отправляю данные с формы
  sendForm();

  // Включаю лоадер
  toggleLoader();

  // Закрываю модальное окно
  toggleClassModal();

  // Включаю лоадер
  toggleLoader();

  // Устанавливаю уведомление об успешной регистрации
  onSuccess();
})

// Функция отправки формы
const sendForm = () => {
  // Отслеживаю событие отправки формы
  form2.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(form);

    const data = {};

    for (const [key, value] of formData) {
      data[key] = value;
    }

    console.log(data);

    sendData('https://jsonplaceholder.typicode.com/todos/1', formData)
      .then(() => {
        form.reset();
      })
      .catch((err) => {
        console.log(err);
      })
  })
}

// Функция для отправки данных формы с помощью fetch
const sendData = async (url, data) => {
  console.log(data);
  const response = await fetch(url, {
    method: 'POST',
    body: data,
  });

  if (!response.ok) {
    throw new Error(`Ошибка по адресу ${url}, статус ошибки ${response.status}`);
  }

  return await response.json();
}

// Функция отображения вспомогательного окна, если данные формы успешно отправились
function onSuccess() {
  // Скрываю форму на странице
  form.classList.add('inactive');

  // Отображаю вспомогательное окно
  toggleClassAlert();
  renderAlertTitle();
}

// Функция закрытия-открытия модального окна
function toggleClassModal() {
  modal.classList.toggle('is-open');
}

// Функция закрытия-открытия модального окна
function toggleClassAlert() {
  alertMessage.classList.toggle('is-open');
}

// Функция включения-отключения окна временной загрузки
function toggleLoader() {
  // Получаю элемент предзагрузки
  const preloader = document.getElementById('preloder');

  // Подключаем класс активности к элементу предзагрузки
  preloader.classList.add('active');

  // Устанавливаю время работы элемента предзагрузки
  setTimeout(() => {
    preloader.classList.remove('active');
  }, 700);
}


