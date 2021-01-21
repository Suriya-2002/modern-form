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

    document.querySelectorAll('.icon-next').forEach(arrowNext => {
        arrowNext.addEventListener('click', () => {
            const currentParent = document.querySelector('.form__group--active');
            const nextParent = currentParent.nextElementSibling;

            const input = nextParent.querySelector('.form__input');
            input.focus();

            nextSlide(currentParent, nextParent);
        });
    });
};

const nextSlide = (currentParent, nextParent) => {
    currentParent.classList.remove('form__group--active');
    currentParent.classList.add('form__group--inactive');
    nextParent.classList.remove('form__group--inactive');
    nextParent.classList.add('form__group--active');
};

init();
