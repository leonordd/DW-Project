document.addEventListener('DOMContentLoaded', function () {
    const eyesContainer = document.querySelector('.eyes-container');
    const leftPupil = document.getElementById('leftPupil');
    const rightPupil = document.getElementById('rightPupil');

    eyesContainer.addEventListener('mousemove', (event) => {
        const { clientX: mouseX, clientY: mouseY } = event;

        movePupil(leftPupil, mouseX, mouseY);
        movePupil(rightPupil, mouseX, mouseY);
    });

    function movePupil(pupil, mouseX, mouseY) {
        const boundingBox = eyesContainer.getBoundingClientRect();
        const containerX = boundingBox.left + boundingBox.width / 2;
        const containerY = boundingBox.top + boundingBox.height / 2;

        const angle = Math.atan2(mouseY - containerY, mouseX - containerX);
        const distance = Math.min(boundingBox.width / 4, boundingBox.height / 4);

        const offsetX = Math.cos(angle) * distance;
        const offsetY = Math.sin(angle) * distance;

        pupil.style.transform = `translate(-50%, -50%) translate(${offsetX}px, ${offsetY}px)`;
    }
});
