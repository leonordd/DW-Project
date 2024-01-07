/*JS GERAL -----------------------------------------------------------------------*/
/* Reference code: https://codepen.io/whipcat/pen/ExKPQqZ  */
let a = document.querySelector("#fullscreen");
let boolean = false;

$("html").mousemove(function (event) {
    var eye = $(".eye");
    //console.log('eye', eye)
    var x = (eye.offset().left) + (eye.width() / 2);
    var y = (eye.offset().top) + (eye.height() / 2);
    var rad = Math.atan2(event.pageX - x, event.pageY - y);
    var rot = (rad * (180 / Math.PI) * -1) + 180;
    eye.css({
        '-webkit-transform': 'rotate(' + rot + 'deg)',
        '-moz-transform': 'rotate(' + rot + 'deg)',
        '-ms-transform': 'rotate(' + rot + 'deg)',
        'transform': 'rotate(' + rot + 'deg)'
    });
});







let eyes = document.querySelector("#eyes");
let fullscreen = document.querySelector(".fullscreen-menu");
let header = document.querySelector("header");
let p = document.querySelectorAll("header p");

eyes.addEventListener("click", function () {
    //console.log(header);
    fullscreen.classList.toggle('show');

    /*header.style.backgroundColor = "none";*/

    for (let i = 0; i < p.length; i++) {
        if (p[i].style.opacity === "0") {
            p[i].style.opacity = "1";
            /*p[i].style.transition = "opacity 1s ease-in-out";*/
            /*justify-content: center;*/
        } else {
            p[i].style.opacity = "0";
        }
    }
});