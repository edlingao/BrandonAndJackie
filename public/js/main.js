(function ($) {
    "use strict";

    // Navbar on scrolling
    $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
            $('.navbar').fadeIn('slow').css('display', 'flex');
        } else {
            $('.navbar').fadeOut('slow').css('display', 'none');
        }
    });


    // Smooth scrolling on the navbar links
    $(".navbar-nav a").on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();
            
            $('html, body').animate({
                scrollTop: $(this.hash).offset().top - 45
            }, 1500, 'easeInOutExpo');
            
            if ($(this).parents('.navbar-nav').length) {
                $('.navbar-nav .active').removeClass('active');
                $(this).closest('a').addClass('active');
            }
        }
    });


    // Modal Video
    $(document).ready(function () {
        var $videoSrc;
        $('.btn-play').click(function () {
            $videoSrc = $(this).data("src");
        });
        console.log($videoSrc);

        $('#videoModal').on('shown.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
        })

        $('#videoModal').on('hide.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc);
        })
    });


    // Scroll to Bottom
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.scroll-to-bottom').fadeOut('slow');
        } else {
            $('.scroll-to-bottom').fadeIn('slow');
        }
    });


    // Portfolio isotope and filter
    var portfolioIsotope = $('.portfolio-container').isotope({
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
    });
    $('#portfolio-flters li').on('click', function () {
        $("#portfolio-flters li").removeClass('active');
        $(this).addClass('active');

        portfolioIsotope.isotope({filter: $(this).data('filter')});
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Gallery carousel
    $(".gallery-carousel").owlCarousel({
        autoplay: false,
        smartSpeed: 1500,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="fa fa-angle-left" aria-hidden="true"></i>',
            '<i class="fa fa-angle-right" aria-hidden="true"></i>'
        ],
        responsive: {
            0:{
                items:1
            },
            576:{
                items:2
            },
            768:{
                items:3
            },
            992:{
                items:4
            },
            1200:{
                items:5
            }
        }
    });
    
})(jQuery);

async function SendConfirmation(name, email, people, confirmation, message) {
  const messageEncoded = encodeURIComponent(message);
  const confirmationEncoded = encodeURIComponent(confirmation);
  const URL = `https://docs.google.com/forms/d/e/1FAIpQLSekxesO92B6rgv_kOmFpGCVow1kCD3BrhxsWc0kBpCRAYr4yg/formResponse?&submit=Submit?usp=pp_url&entry.726296052=${name}&entry.1320597596=${email}&entry.472587385=${people}&entry.1168336178=${confirmationEncoded}&entry.903956989=${messageEncoded}`;
  
  try {
    const response = await fetch(URL, {
      method: 'GET',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })

    return {
      success: true,
      response,
    }
  } catch (error) {
    return {
      success: false,
      error,
    }
  }
}

const RSVPForm = document.getElementById('rsvp-form');

RSVPForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const { name, email, people, confirmation, message} = Object.fromEntries(new FormData(RSVPForm));
  
  const { error } = await SendConfirmation(name, email, people, confirmation, message);

  if (error) {
    console.error(error);
    alert('Something went wrong, please try again later');
  } else {
    alert('Thank you for your RSVP!');
    RSVPForm.reset();
  }
});

const clocks = document.querySelectorAll('.clock');

const targetDate = new Date('2025-04-26T00:00:00');

const calculateTimeLeft = () => {
  const now = new Date();
  const difference = targetDate - now;

  if (difference > 0) {
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    drawTimer({ days, hours, minutes, seconds });
  }
};

const drawTimer = ({ days, hours, minutes, seconds }) => {
  clocks.forEach((clock) => {
    const daysSpan = clock.querySelector('.days');
    const hoursSpan = clock.querySelector('.hours');
    const minutesSpan = clock.querySelector('.minutes');
    const secondsSpan = clock.querySelector('.seconds');

    daysSpan.innerText = days;
    hoursSpan.innerText = hours;
    minutesSpan.innerText = minutes;
    secondsSpan.innerText = seconds;
  });
}

// Calculate immediately
calculateTimeLeft();

// Update every second
const timer = setInterval(calculateTimeLeft, 1000);

// Music
const musicBtn = document.getElementById('musicBtn');
const bgMusic = document.getElementById('bgMusic');
let isPlaying = false;

musicBtn.addEventListener('click', () => {
  if (isPlaying) {
    bgMusic.pause();
    musicBtn.classList.remove('playing');
  } else {
    bgMusic.play();
    musicBtn.classList.add('playing');
  }
  isPlaying = !isPlaying;
});

