
const backgroundImages = [];
const imgElements = document.querySelectorAll('.section img');

imgElements.forEach(img => {
    backgroundImages.push(img.src);
});

let currentIndex = 0;


