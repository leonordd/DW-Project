const animacao = document.querySelector('.animacao');
const zoomImage = document.querySelector('.zoom-effect');
const intro = document.querySelector('.intro');

window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;

    // Adjust these values to control the zoom and transparency effect
    const zoomFactor = 1 + scrollPosition / 1000;
    const opacityFactor = 1 - scrollPosition / 500;

    // Apply the zoom and transparency effects to the image
    zoomImage.style.transform = `scale(${zoomFactor})`;
    zoomImage.style.opacity = opacityFactor;

    // Only move the intro when the image is more zoomed
    if (zoomFactor > 2) {
        const introTranslateY = Math.min(0, scrollPosition - animacao.offsetTop);
        intro.style.transform = `translateY(${introTranslateY}px)`;
    }
});
