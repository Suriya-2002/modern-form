const form = document.querySelector('.form');
const backButton = document.querySelector('.btn--back');
const progressIndicators = document.querySelectorAll('.progress__indicator');
const background1 = document.querySelector('.background--1');
const background2 = document.querySelector('.background--2');
const errorMessage = document.querySelector('.error-message');
const dropdownInput = document.querySelector('.form__input--dropdown');
const dropdownItem = document.querySelectorAll('.dropdown__item');

document.addEventListener('mousemove', event => {
    document.querySelectorAll('.parallax').forEach(element => {
        const speed = parseFloat(element.getAttribute('data-depth'));

        const x = (event.pageX - window.innerWidth / 2) / speed;
        const y = (event.pageY - window.innerHeight / 2) / speed;

        element.style.transform = `translate(calc(-50% - ${x}px), calc(-50% - ${y}px))`;
    });
});

const init = () => {
    document.querySelectorAll('.form__input')[0].focus();
    let progress = 0;

    displayBackbutton();

    document.querySelectorAll('.icon-next').forEach(arrowNext => {
        arrowNext.addEventListener('click', () => {
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
            } else {
                currentParent.style.animation = 'shake 0.4s ease';
            }

            currentParent.addEventListener('animationend', () => {
                currentParent.style.animation = '';
            });

            progressIndicator(progress);
        });
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

    errorMessage.classList.remove('error-message--disable');
};

init();
