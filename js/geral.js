/*JS GERAL -----------------------------------------------------------------------*/

// Reference code: https://codepen.io/whipcat/pen/ExKPQqZ 
$("html").mousemove(function (event) {
    var eye = $(".eye");
    var div = $(".eye div");

    //Verifica se a div #fullscreen contém a class show
    if ($("#fullscreen").hasClass("show")) {
        // Se a class 'show' estiver presente altera o CSS da div
        div.addClass("static-eye");
    } else {
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

        //Remove a class static-eye
        div.removeClass("static-eye");
    }
});


/*-------------------------------------------------LOADING SCREEN HOMEPAGE----------------------------------------- */
document.addEventListener('DOMContentLoaded', function () {
    window.addEventListener('load', function () {
        setTimeout(function () {
            zoomOut();
        }, 800);
    });
});

function zoomOut() {
    var image = document.querySelector('.zoom-image');
    document.body.classList.add('no-scroll');

    // Adiciona a classe para iniciar a animação
    image.classList.add('zoom-out-animation');

    image.addEventListener('transitionend', function () {
        image.classList.add('scale-zero'); //dar reset na scale
        setTimeout(function () {
            document.body.classList.remove('no-scroll');
        }, 1000);
    });
}



