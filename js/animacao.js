const animacao = document.querySelector('.animacao');
const zoomImage = document.querySelector('.zoom-effect');

window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;

    // Adjust these values to control the zoom and transparency effect
    const zoomFactor = 1 + scrollPosition / 500; // Adjust as needed
    const opacityFactor = 1 - scrollPosition / 1500; // Adjust as needed

    // Check if the image is not visible
    if (opacityFactor <= 0) {
        // Set a lower z-index to move the image behind everything
        zoomImage.style.zIndex = '-10';
    } else {
        // Restore the original z-index when the image is visible
        zoomImage.style.zIndex = '7';
    }

    // Apply the zoom and transparency effects to the image
    zoomImage.style.transform = `scale(${zoomFactor})`;
    zoomImage.style.opacity = opacityFactor;
});
