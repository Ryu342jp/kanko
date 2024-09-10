
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

function changeBackgroundImage() {
    const backgroundImage = document.getElementById('background-image');
    currentIndex = (currentIndex + 1) % backgroundImages.length;

    backgroundImage.style.opacity = 0;
    setTimeout(() => {
        loadBackgroundImage();
    }, 500);
}

// 最初の実行
loadBackgroundImage();


// ナビゲーションの設定
document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.querySelector(".menu-toggle");
    const navbarMenu = document.querySelector(".navbar-menu");

    menuToggle.addEventListener("click", function () {
        navbarMenu.classList.toggle("active");
        menuToggle.classList.toggle("active");
    });
});
