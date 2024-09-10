

// ナビゲーションの設定
document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.querySelector(".menu-toggle");
    const navbarMenu = document.querySelector(".navbar-menu");

    menuToggle.addEventListener("click", function () {
        navbarMenu.classList.toggle("active");
        menuToggle.classList.toggle("active");
    });
});
