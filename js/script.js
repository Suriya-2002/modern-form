const form = document.querySelector('.form');
const backButton = document.querySelector('.btn--back');
const progressIndicators = document.querySelectorAll('.progress__indicator');
const background1 = document.querySelector('.background--1');
const background2 = document.querySelector('.background--2');
const errorMessage = document.querySelector('.error-message');
const dropdownInput = document.querySelector('.form__input--dropdown');
const dropdownItem = document.querySelectorAll('.dropdown__item');
const dateOfBirthInput = document.querySelector('.form__input--date-of-birth');

let progress = 0;

if (window.innerWidth > 1200) {
    document.addEventListener('mousemove', event => {
        document.querySelectorAll('.parallax').forEach(element => {
            const speed = parseFloat(element.getAttribute('data-depth'));

            const x = (event.pageX - window.innerWidth / 2) / speed;
            const y = (event.pageY - window.innerHeight / 2) / speed;

            element.style.transform = `translate(calc(-50% - ${x}px), calc(-50% - ${y}px))`;
        });
    });
}

if (window.innerWidth <= 900) {
    document.querySelector(
        '.loading__container',
    ).innerHTML = `<div class="loading__element loading__element--1"></div>
                <div class="loading__element loading__element--2"></div>
                <div class="loading__element loading__element--3"></div>
                <div class="loading__element loading__element--4"></div>`;
}

const init = () => {
    document.querySelectorAll('.form__input')[0].focus();

    displayBackbutton();

    document.querySelectorAll('.icon-next').forEach(arrowNext => {
        arrowNext.addEventListener('click', nextArrowClicked);
    });

    backButton.addEventListener('click', () => {
        const currentInputGroup = document.querySelector('.form__group--active');

        if (currentInputGroup.previousElementSibling != null) {
            const previousInputGroup = currentInputGroup.previousElementSibling;

            previousInputGroup.classList.remove('form__group--inactive');
            previousInputGroup.classList.add('form__group--active');

            currentInputGroup.classList.remove('form__group--active');
            currentInputGroup.classList.add('form__group--inactive');

            previousInputGroup.querySelector('.form__input').focus();

            validData();
            displayBackbutton();
        }

        progressIndicator(--progress);
    });

    dropdownItem.forEach(item => {
        item.addEventListener('click', () => {
            dropdownInput.innerHTML = item.innerHTML;
        });
    });

    dateOfBirthInput.addEventListener('keyup', event => {
        if (event.key !== 'Backspace') {
            if (dateOfBirthInput.value.length === 2 || dateOfBirthInput.value.length === 5) {
                dateOfBirthInput.value += '-';
            }
        }
    });
};

document.addEventListener('keydown', event => {
    if (
        event.key === 'Enter' &&
        document.querySelector('.form__group--active .form__input').getAttribute('data-input') !== 'submit'
    ) {
        event.preventDefault();
        nextArrowClicked();
    } else if (
        event.key === 'Enter' &&
        document.querySelector('.form__group--active .form__input').getAttribute('data-input') === 'submit'
    ) {
        document.querySelector('#form').submit();
    }
});

const nextArrowClicked = () => {
    const currentParent = document.querySelector('.form__group--active');
    const nextParent = currentParent.nextElementSibling;

    const input = currentParent.querySelector('.form__input');

    nextParent.querySelector('.form__input').focus();

    if (input.getAttribute('data-input') === 'first-name' && validateFirstName(input)) {
        nextSlide(currentParent, nextParent);
        progress = 1;
    } else if (input.getAttribute('data-input') === 'last-name') {
        nextSlide(currentParent, nextParent);
        progress = 2;
    } else if (input.getAttribute('data-input') === 'email-address' && validateEmail(input)) {
        nextSlide(currentParent, nextParent);
        progress = 3;
    } else if (input.getAttribute('data-input') === 'age' && validateAge(input)) {
        nextSlide(currentParent, nextParent);
        progress = 4;
    } else if (input.getAttribute('data-input') === 'gender' && validateGender(input)) {
        nextSlide(currentParent, nextParent);
        progress = 5;
    } else if (input.getAttribute('data-input') === 'date-of-birth' && validateDateOfBirth(input)) {
        nextSlide(currentParent, nextParent);
        progress = 6;
    } else {
        currentParent.style.animation = 'shake 0.4s ease';
    }

    currentParent.addEventListener('animationend', () => {
        currentParent.style.animation = '';
    });

    progressIndicator(progress);
};

const nextSlide = (currentParent, nextParent) => {
    currentParent.classList.remove('form__group--active');
    currentParent.classList.add('form__group--inactive');
    nextParent.classList.remove('form__group--inactive');
    nextParent.classList.add('form__group--active');

    displayBackbutton();
};

const displayBackbutton = () => {
    backButton.classList.remove('btn--disable');
    if (
        document.querySelector('.form__group--active .form__input').getAttribute('data-input') ===
        'first-name'
    ) {
        backButton.classList.add('btn--disable');
    }
};

const progressIndicator = progress => {
    for (let i = 1; i <= progress; i++) {
        document.querySelector(`.progress__indicator--${i}`).classList.add('progress__indicator--checked');
    }

    for (let i = progress + 1; i <= progressIndicators.length; i++) {
        document.querySelector(`.progress__indicator--${i}`).classList.remove('progress__indicator--checked');
    }
};

const validateFirstName = input => {
    if (input.value.length === 0) {
        invalidData();
        errorMessage.innerHTML = `First name can't be blank`;
    } else {
        validData();
        return true;
    }
};

const validateEmail = input => {
    const validEmailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (validEmailRegex.test(input.value)) {
        validData();
        return true;
    } else if (input.value.length === 0) {
        invalidData();
        errorMessage.innerHTML = `Email address can't be blank`;
    } else {
        invalidData();
        errorMessage.innerHTML = 'Invalid Email address';
    }
};

const validateAge = input => {
    if (!input.value) {
        invalidData();
        errorMessage.innerHTML = `Age can't be blank`;
    } else if (parseInt(input.value) < 1 || parseInt(input.value) > 150) {
        invalidData();
        errorMessage.innerHTML = `Invalid Age`;
    } else {
        validData();
        return true;
    }
};

const validateGender = input => {
    if (!input.textContent.trim()) {
        invalidData();
        errorMessage.textContent = `Please select a gender`;
    } else if (input.textContent.trim() === 'Select gender') {
        invalidData();
        errorMessage.textContent = `Please select a gender`;
    } else {
        validData();
        return true;
    }
};

const validateDateOfBirth = input => {
    let flag = false;

    if (!input.value) {
        invalidData();
        errorMessage.innerHTML = `Date of birth can't be blank`;
    } else if (input.value.length !== 10 || input.value[2] !== '-' || input.value[5] !== '-') {
        invalidData();
        errorMessage.innerHTML = `Date of birth format should be DD-MM-YYYY`;
    } else {
        const dateOfBirth = input.value.split('-').map(component => parseInt(component));
        const date = new Date(dateOfBirth[2], dateOfBirth[1] - 1, dateOfBirth[0]);
        let dummyDate = new Date();

        for (let i = 0; i < input.value.length; i++) {
            if (!parseInt(input.value[i]) && parseInt(input.value[i]) !== 0 && i !== 2 && i !== 5)
                flag = true;
        }

        if (flag) {
            invalidData();
            errorMessage.innerHTML = `Invalid Date of birth (format DD-MM-YYYY)`;
        } else if (date >= Date.now()) {
            invalidData();
            errorMessage.innerHTML = `Date of birth can't be in future`;
        } else if (dummyDate.getFullYear() - parseInt(dateOfBirth[2]) > 150) {
            invalidData();
            errorMessage.innerHTML = `Invalid Date of birth`;
        } else {
            validData();
            return true;
        }
    }
};

const validData = () => {
    form.style.animation = `gradient-green 2s both`;
    background1.style.animation = `gradient-green 1s 1s both`;
    background2.style.animation = `gradient-green 1.5s 1s both`;

    dropdownItem.forEach(item => {
        item.addEventListener('mouseover', () => {
            item.classList.remove('dropdown__item--error');
        });
    });

    errorMessage.classList.add('error-message--disable');
};

const invalidData = () => {
    form.style.animation = `gradient-red 2s both`;
    background1.style.animation = `gradient-red 0.5s 1s both`;
    background2.style.animation = `gradient-red 1s 1s both`;

    dropdownItem.forEach(item => {
        item.addEventListener('mouseover', () => {
            item.classList.add('dropdown__item--error');
        });

        item.addEventListener('mouseleave', () => {
            item.classList.remove('dropdown__item--error');
        });
    });

    document.querySelector('.form__group--active .form__input').focus();

    errorMessage.classList.remove('error-message--disable');
};

setTimeout(() => {
    document.querySelector('.loading').classList.add('loading--disable');
}, 8 * 1000);

init();
