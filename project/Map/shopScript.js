const backgroundImages = [];
const imgElements = document.querySelectorAll('.section img');

imgElements.forEach(img => {
    backgroundImages.push(img.src);
});

let currentIndex = 0;

function loadBackgroundImage() {
    const backgroundImage = document.getElementById('background-image');
    const imageUrl = backgroundImages[currentIndex];

    const img = new Image();
    img.onload = function () {
        backgroundImage.style.backgroundImage = `url(${imageUrl})`;
        backgroundImage.style.opacity = 1;
    };
    img.src = imageUrl;
}

