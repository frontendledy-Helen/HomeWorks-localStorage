window.onload = function () {

    const form = document.querySelector('form');
    let isLoginMode = false;
    console.log(form)


    form[0].addEventListener('keydown', (event) => {
        let res = parseInt(event.key);
        if (!isNaN(res)) {
            return false;
        }
    });

    form[1].addEventListener('keydown', (event) => {
        if (event.key === '.' || event.key === ',') {
            return false;
        }
    });

    form[2].addEventListener('blur', (event) => {
        const value = event.target.value;
        if (!value.includes('@') && !value.includes(".")) {
            alert("Некорректный адрес электронной почты!");
            form[2].value = "";
        }
    });

    form[4].addEventListener('blur', function () {
        if (form[3].value.length >= 8) {
            if (form[4].value !== form[3].value) {
                alert(`Ошибка, пароли не совпадают`);
                form[3].value = "";
                form[4].value = "";

            } else {
                console.log('пароль совпал');
            }
        } else if (form[3].value.length <= 7) {
            alert('Пароль должен содержать не менее 8 символов');
            form[3].value = "";
            form[4].value = "";
        }
    });

    form[5].addEventListener('change', (event) => {
        if (event.currentTarget.checked) {
            console.log("Согласен");
        } else {
            console.log("Не согласен");
            alert('Ошибка: Вы должны согласиться с правилами и условиями');
        }
    });

    const popupClose = document.getElementById('popup-close');

    form[6].addEventListener('click', function (event) {
        isLoginMode ? handleLoginSubmit(event) : handleRegisterSubmit(event)
    });

    function handleRegisterSubmit(event) {
        for (let i = 0; i < form.length - 1; i++) {
            if (!form[i].value) {
                alert(`Заполните форму ${form[i].name}`);
                return;
            }
        }
        if (!form[5].checked) {
            alert('Ошибка: Вы должны согласиться с правилами и условиями');
            return;
        }

        const popupOpen = document.getElementById('popup');
        popupOpen.style.display = 'block';

        popupClose.addEventListener('click', function () {
            popupOpen.style.display = 'none';
            form.reset();
        })
    }

    function handleLoginSubmit(event) {
        event.preventDefault();

        if (!form['username'].value) {
            alert(`Заполните поле ${form[1].name}`);
            return;
        }
        if (!form['password'].value) {
            alert(`Заполните поле ${form['password'].name}`);
            return;
        } else if (form['password'].value.length <= 7) {
            alert('Пароль должен содержать не менее 8 символов');
            form['password'].value = "";
            return;
        }
        alert(`Добро пожаловать, ${form[1].value}!`);
        form.reset();
    }

    const transitionToAnAccount = document.getElementById('an-account');

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

    };

    popupClose.addEventListener('click', switchToLoginMode);
    transitionToAnAccount.addEventListener('click', switchToLoginMode);

};

