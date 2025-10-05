// Smooth Scrolling
const smoothScroll = (target) => {
    document.querySelector(target).scrollIntoView({
        behavior: 'smooth'
    });
};

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        smoothScroll(this.getAttribute('href'));
    });
});

// Hero Section Animation
const heroSection = document.querySelector('.parallax');
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    heroSection.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
});

// Long-Term Goals Section Interactivity
const longTermGoalsSection = document.getElementById('long-term-goals');
window.addEventListener('scroll', () => {
    const sectionTop = longTermGoalsSection.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (sectionTop < windowHeight && sectionTop > 0) {
        longTermGoalsSection.style.transform = 'scale(1.05)';
        longTermGoalsSection.style.transition = 'transform 0.3s ease-in-out';
    } else {
        longTermGoalsSection.style.transform = 'scale(1)';
    }
});

// connecting lines
var canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d"),
    $1 = $('#start'),
    $2 = $('#end');


var drawThatShit = function() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  var ramp = ctx.createLinearGradient(0, 0, canvas.width / 1.5, 0);
  ramp.addColorStop("0", "blue");
  ramp.addColorStop("0.8" ,"magenta");
  ramp.addColorStop("1", "red");
  
  ctx.setLineDash([20, 10]);
  ctx.strokeStyle = ramp;
  ctx.lineWidth = 5;
  
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  var $1_left = $1.offset().left,
      $1_top =  $1.offset().top,
      $2_left = $2.offset().left,
      $2_top =  $2.offset().top;
  
  ctx.beginPath();
  ctx.moveTo($1_left + $1.width() / 2, $1_top + $1.height() / 2);
  ctx.quadraticCurveTo($1.width() * 2, $1.height() * 2, $2_left, $2_top + $2.height() / 2);
  ctx.stroke();
}

drawThatShit();


$( window ).resize(function() {
  drawThatShit();
});

$(document).ready(function() {
    var $dragging = null;
    $('body').on("mousedown", "div", function(e) {
        $(this).attr('unselectable', 'on').addClass('draggable');
        var el_w = $('.draggable').outerWidth(),
            el_h = $('.draggable').outerHeight();
        $('body').on("mousemove", function(e) {
            if ($dragging) {
                drawThatShit();
                $dragging.offset({
                    top: e.pageY - el_h / 2,
                    left: e.pageX - el_w / 2
                });
            }
        });
        $dragging = $(e.target);
    }).on("mouseup", ".draggable", function(e) {
        $dragging = null;
        $(this).removeAttr('unselectable').removeClass('draggable');
    });
});
