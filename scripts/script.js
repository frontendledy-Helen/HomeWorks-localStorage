window.onload = function () {

    const form = document.querySelector('form');
    let isLoginMode = false;
    console.log(form)
    console.log('helen-vv@yandex.ru')
    console.log('Apel0220@sin')

    const formName = document.getElementById('name');
    const formUsername = document.getElementById('username');
    const formEmail = document.getElementById('e-mail');
    const formPassword = document.getElementById('password');
    const formConfirmPassword = document.getElementById('password-confirm');
    const formCheckbox = document.getElementById('checkbox');
    const formButton = document.getElementById('button-form');

    const errorInputs = document.getElementsByClassName('error-input'); // div
    const getCheck = document.getElementsByClassName('check');
    const checkBoxDelete = document.getElementsByClassName('action')[0];

    formName.addEventListener('blur', (event) => {
        const text = event.target.value;
        const regex = /^(?=.*[А-Яа-яЁёA-Za-z])(?=.*\s)?[А-Яа-яЁёA-Za-z\s]+$/;
        if (text.match(regex) === null || text === '') {
            formName.nextElementSibling.classList.add('show');
            formName.nextElementSibling.innerHTML = 'The name entered is invalid. Please check it and try again.';
            formName.classList.add('border_red');
        } else {
            formName.nextElementSibling.classList.remove('show');
            formName.nextElementSibling.innerHTML = '';
            formName.classList.remove('border_red');
            formName.classList.add('green');
        }
    });

    formUsername.addEventListener('blur', (event) => {
        const text = event.target.value;
        const regex = /^[а-яёА-ЯЁ\-\w]+$/;
        if (text.match(regex) === null || text === '') {
            formUsername.nextElementSibling.classList.add('show');
            formUsername.nextElementSibling.innerHTML = 'The username entered is invalid. Please check it and try again.';
            formUsername.classList.add('border_red');
        } else {
            formUsername.nextElementSibling.classList.remove('show');
            formUsername.nextElementSibling.innerHTML = '';
            formUsername.classList.remove('border_red');
            formUsername.classList.add('green');
        }
    });

    formEmail.addEventListener('blur', (event) => {
        const text = event.target.value;
        const regex = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
        if (text.match(regex) === null || text === '') {
            formEmail.nextElementSibling.classList.add('show');
            formEmail.nextElementSibling.innerHTML = 'The email address you entered is invalid. Please check it and try again.';
            formEmail.classList.add('border_red');
        } else {
            formEmail.nextElementSibling.classList.remove('show');
            formEmail.nextElementSibling.innerHTML = '';
            formEmail.classList.remove('border_red');
            formEmail.classList.add('green');
        }
    });

    formPassword.addEventListener('blur', (event) => {
        const text = event.target.value;
        const regex = /^(?=.*[A-ZА-ЯЁ])(?=.*\d)(?=.*[!@#$%^&*()_+=;':\"\\|,.<>\?]).{8,}$/;
        if (text.match(regex) === null || text === '') {
            formPassword.nextElementSibling.classList.add('show');
            formPassword.nextElementSibling.innerHTML = 'The password must contain at least one uppercase letter,\n' +
                ' at least one digit,\n' +
                ' and at least one special character.';
            formPassword.classList.add('border_red');
        } else {
            formPassword.nextElementSibling.classList.remove('show');
            formPassword.nextElementSibling.innerHTML = '';
            formPassword.classList.remove('border_red');
            formPassword.classList.add('green');
        }
    });

    formConfirmPassword.addEventListener('blur', function () {
        if (formPassword.value.length >= 8) {
            if (formConfirmPassword.value !== formPassword.value) {
                formConfirmPassword.nextElementSibling.classList.add('show');
                formConfirmPassword.classList.add('border_red');
                formConfirmPassword.value = "";

            } else {
                console.log('пароль совпал');
                formConfirmPassword.nextElementSibling.classList.remove('show');
                formConfirmPassword.classList.remove('border_red');
                formConfirmPassword.classList.add('green');
            }
        }
    });

    formCheckbox.addEventListener('change', (event) => {
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


    formButton.addEventListener('click', function (event) {
        isLoginMode ? handleLoginSubmit(event) : handleRegisterSubmit(event);
    });

    function handleRegisterSubmit(event) {
        for (let i = 0; i < 5; i++) {
            if (!form[i].classList.contains('green')) {
                errorInputs[i].classList.add('show');
                getCheck[i].classList.add('border_red');
                return;
            }
        }
        if (!formCheckbox.checked) {
            document.getElementsByClassName('action')[0].style.color = 'red';
            return;
        } else {
            document.getElementsByClassName('action')[0].style.color = '#323232';
        }

        //создание объекта
        const user = {
            name: formName.value,
            username: formUsername.value,
            email: formEmail.value,
            password: formPassword.value,
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
        console.log(JSON.parse(savedUser));


        const popupOpen = document.getElementById('popup');
        popupOpen.style.display = 'block';

        popupClose.addEventListener('click', function () {
            popupOpen.style.display = 'none';
            form.reset();
        })
    }

    const toChangeInput = document.querySelectorAll('.remove');
    const toChangeHeading = document.getElementsByTagName('h1')[0];
    const transitionToAnAccount = document.getElementById('an-account');
    const getRegistration = document.getElementById('registration');

    const switchToLoginMode = function () {
        isLoginMode = true;

        toChangeHeading.innerHTML = 'Log in to the system';

        formName.parentElement.classList.add('hide');
        formEmail.parentElement.classList.add('hide');
        formConfirmPassword.parentElement.classList.add('hide');
        formCheckbox.parentElement.classList.add('hide');

        formButton.innerHTML = 'Sign in';

        transitionToAnAccount.classList.add('hide');
        getRegistration.classList.add('show');
    };

    function validationLoginForm(event) {
        event.preventDefault();

        let userArray = JSON.parse(localStorage.getItem('clients'));
        console.log(userArray)
        let enteredUsername = formUsername.value;
        let enteredPassword = formPassword.value;

        let user = userArray.find(user => user.username === enteredUsername && user.password === enteredPassword);

        if (!enteredUsername) {
            formUsername.nextElementSibling.classList.add('show');
            formUsername.nextElementSibling.innerHTML = 'Еnter your username';
            formUsername.classList.add('border_red');
        } else {
            formUsername.nextElementSibling.classList.remove('show');
            formUsername.classList.remove('border_red');
        }

        if (!enteredPassword) {
            formPassword.nextElementSibling.classList.add('show');
            formPassword.nextElementSibling.innerHTML = 'Еnter your password';
            formPassword.classList.add('border_red');
        } else {
            formPassword.nextElementSibling.classList.remove('show');
            formPassword.classList.remove('border_red');
        }

        if (!user) {
            formUsername.nextElementSibling.classList.add('show');
            formUsername.nextElementSibling.innerHTML = 'Such a user is not registered';
            formUsername.classList.add('border_red');
            formPassword.classList.add('border_red');
            formPassword.nextElementSibling.classList.add('show');
            formPassword.nextElementSibling.innerHTML = 'invalid password';
            return;
        }

        return user;
    }


    // вход в личный кабинет
    function successfulLogin (user) {
        form.reset();

        let fullNameArray = user.name
        console.log(fullNameArray)
        toChangeHeading.innerHTML = `Welcome, ${fullNameArray}!`;
        toChangeHeading.style.marginBottom = '60px';
        formButton.innerHTML = 'Exit';
        getRegistration.classList.remove('show');
        document.getElementsByClassName('text')[0].classList.add('hide');
        formUsername.parentElement.classList.add('hide');
        formPassword.parentElement.classList.add('hide');

        formButton.addEventListener('click', function (event) {
            event.preventDefault();
            location.reload();
        });
    }

    function handleLoginSubmit (event) {
        let user = validationLoginForm(event);
        if (user) {
            successfulLogin(user);
        }
    }

    popupClose.addEventListener('click', switchToLoginMode);
    transitionToAnAccount.addEventListener('click', switchToLoginMode);


    getRegistration.addEventListener('click', function (event) {
        event.preventDefault();
        location.reload();
    });


}
