window.onload = function () {

    const form = document.querySelector('form');
    let isLoginMode = false;
    console.log(form)
    console.log('helen-vv@yandex.ru')
    console.log('Apel0220@sin')

    const errorInputs = document.getElementsByClassName('error-input'); // div
    const getCheck = document.getElementsByClassName('check'); // input
    const checkBoxDelete = document.getElementsByClassName('action')[0];

    form[0].addEventListener('blur', (event) => {
        const text = event.target.value;
        const regex = /^(?=.*[А-Яа-яЁёA-Za-z])(?=.*\s)?[А-Яа-яЁёA-Za-z\s]+$/;
        if (text.match(regex) === null || text === '') {
            errorInputs[0].style.display = 'block';
            errorInputs[0].innerHTML = 'The name entered is invalid. Please check it and try again.';
            getCheck[0].style.borderBottom = '1px solid red';
        } else {
            errorInputs[0].style.display = 'none';
            errorInputs[0].innerHTML = '';
            getCheck[0].style.borderBottom = '1px solid #C6C6C4';
            form[0].classList.add('green');
        }
    });

    form[1].addEventListener('blur', (event) => {
        const text = event.target.value;
        const regex = /^[а-яёА-ЯЁ\-\w]+$/;
        if (text.match(regex) === null || text === '') {
            errorInputs[1].style.display = 'block';
            errorInputs[1].innerHTML = 'The username entered is invalid. Please check it and try again.';
            getCheck[1].style.borderBottom = '1px solid red';
        } else {
            errorInputs[1].style.display = 'none';
            errorInputs[1].innerHTML = '';
            getCheck[1].style.borderBottom = '1px solid #C6C6C4';
            form[1].classList.add('green');
        }
    });

    form[2].addEventListener('blur', (event) => {
        const text = event.target.value;
        const regex = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
        if (text.match(regex) === null || text === '') {
            console.log(text)
            errorInputs[2].style.display = 'block';
            errorInputs[2].innerHTML = 'The email address you entered is invalid. Please check it and try again.';
            getCheck[2].style.borderBottom = '1px solid red';
        } else {
            errorInputs[2].style.display = 'none';
            errorInputs[2].innerHTML = '';
            getCheck[2].style.borderBottom = '1px solid #C6C6C4';
            form[2].classList.add('green');
        }
    });

    form[3].addEventListener('blur', (event) => {
        const text = event.target.value;
        const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+=;':\"\\|,.<>\?]).{8,}$/;
        if (text.match(regex) === null || text === '') {
            console.log(text)
            errorInputs[3].style.display = 'block';
            errorInputs[3].innerHTML = 'The password must contain at least one uppercase letter,\n' +
                ' at least one digit,\n' +
                ' and at least one special character.';
            getCheck[3].style.borderBottom = '1px solid red';
        } else {
            errorInputs[3].style.display = 'none';
            errorInputs[3].innerHTML = '';
            getCheck[3].style.borderBottom = '1px solid #C6C6C4';
            form[3].classList.add('green');
        }
    });

    form[4].addEventListener('blur', function () {
        if (form[3].value.length >= 8) {
            if (form[4].value !== form[3].value) {
                errorInputs[4].style.display = 'block';
                getCheck[4].style.borderBottom = '1px solid red';
                form[4].value = "";

            } else {
                console.log('пароль совпал');
                errorInputs[4].style.display = 'none';
                getCheck[4].style.borderBottom = '1px solid #C6C6C4';
                form[4].classList.add('green');
            }
        }
    });

    form[5].addEventListener('change', (event) => {
        if (event.currentTarget.checked) {
            console.log("Согласен");
            checkBoxDelete.classList.remove('red');
        }
        if (!event.currentTarget.checked) {
            console.log("Не согласен");
            checkBoxDelete.classList.add('red');
        }
    });

    const popupClose = document.getElementById('popup-close');


    form[6].addEventListener('click', function (event) {
        isLoginMode ? handleLoginSubmit(event) : handleRegisterSubmit(event)
    });

    function handleRegisterSubmit(event) {
        for (let i = 0; i < 5; i++) {
            if (!form[i].classList.contains('green')) {
                errorInputs[i].style.display = 'block';
                getCheck[i].style.borderBottom = '1px solid red';
                return;
            }
        }
        if (!form[5].checked) {
            document.getElementsByClassName('action')[0].style.color = 'red';
            return;
        } else {
            document.getElementsByClassName('action')[0].style.color = '#323232';
        }

        //создание объекта
        const user = {
            name: form[0].value,
            username: form[1].value,
            email: form[2].value,
            password: form[3].value,
        }
        console.log(user);

        let clients = [];

        let savedUser = localStorage.getItem('clients');
        if (savedUser) {
            clients = JSON.parse(savedUser);
        }
        clients.push(user);
        localStorage.setItem('clients', JSON.stringify(clients));
        console.log(localStorage)
        console.log(JSON.parse(localStorage.getItem('clients')))


        const popupOpen = document.getElementById('popup');
        popupOpen.style.display = 'block';

        popupClose.addEventListener('click', function () {
            popupOpen.style.display = 'none';
            form.reset();
        })
    }

    const transitionToAnAccount = document.getElementById('an-account');
    const getRegistration = document.getElementById('registration');

    const switchToLoginMode = function () {
        isLoginMode = true;

        const toChangeHeading = document.getElementsByTagName('h1')[0];
        toChangeHeading.innerHTML = 'Log in to the system';

        const toChangeInput = document.querySelectorAll('.remove');
        for (let i = 0; i < toChangeInput.length; i++) {
            if ([i] % 2 !== 1) {
                toChangeInput[i].style.display = 'none';
            }
        }

        const checkBoxDelete = document.getElementsByClassName('action')[0];
        checkBoxDelete.style.display = 'none';


        const button = document.getElementsByTagName('button')[0];
        button.innerHTML = 'Sign in';

        transitionToAnAccount.style.display = 'none';
        getRegistration.style.display = 'block';
    };

    function handleLoginSubmit(event) {
        event.preventDefault();

        if (!form['username'].value) {
            errorInputs[1].style.display = 'block';
            getCheck[1].style.borderBottom = '1px solid red';
        } else {
            errorInputs[1].style.display = 'none';
            getCheck[1].style.borderBottom = '1px solid #C6C6C4';
        }


        if (!form['password'].value) {
            errorInputs[3].style.display = 'block';
            getCheck[3].style.borderBottom = '1px solid red';
        } else if (form['password'].value.length <= 7) {
            errorInputs[3].style.display = 'block';
            getCheck[3].style.borderBottom = '1px solid red';
        }
        alert(`Добро пожаловать, ${form[1].value}!`);
        form.reset();
    }

    popupClose.addEventListener('click', switchToLoginMode);
    transitionToAnAccount.addEventListener('click', switchToLoginMode);


    getRegistration.addEventListener('click', function (event) {
        event.preventDefault();
        location.reload();
    });

};

