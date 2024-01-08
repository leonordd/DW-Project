let eyes = document.querySelector("#eyes");
let fullscreen = document.querySelector(".fullscreen-menu");
let header = document.querySelector("header");
let p = document.querySelectorAll("header p");

eyes.addEventListener("click", function () {
    fullscreen.classList.toggle('show');

    for (let i = 0; i < p.length; i++) {
        if (p[i].style.opacity === "0") {
            p[i].style.opacity = "1";
        } else {
            p[i].style.opacity = "0";
        }
    }
});