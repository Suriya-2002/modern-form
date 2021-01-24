document.addEventListener('mousemove', event => {
    document.querySelectorAll('.parallax').forEach(element => {
        const speed = parseFloat(element.getAttribute('data-depth'));

        const x = (event.pageX - window.innerWidth / 2) / speed;
        const y = (event.pageY - window.innerHeight / 2) / speed;

        element.style.transform = `translate(${x}px, ${y}px)`;
    });
});
