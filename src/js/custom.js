jQuery('document').ready(function($) { // Start


// Add 'js' class to body tag if js enabled
$(document.body).addClass('js');


// Add FastClick for touch screen devices
FastClick.attach(document.body);


// Set media query variables
var mqw = window.matchMedia('(min-width: 48rem)'), // 768px
    mqo = window.matchMedia('(orientation: portrait)');


// Add class to 'layers' div when images have loaded
$('.layers').waitForImages({
    finished: function() {
        $(this).addClass('ready');
    },
    waitForAll: true
});


// ==================================================
// Reveal elements on scroll
// ==================================================

function reveal() {
    $('.animated:not(.revealed), section header:not(.revealed)').each(function () {
        
        // Set distance before animated elements are revealed
        if (mqo.matches) {
            var $distance = 0.9; // 10%
        } else {
            var $distance = 0.85; // 15%
        }

        var $scrolled = $(window).scrollTop(),
            $height = $(window).height() * $distance;

        if ( ($scrolled + $height) > $(this).offset().top ) {
            $(this).addClass('revealed');
        }
    });
}

// Reveal elements already in viewport on load
reveal();

// Reveal elements when scrolled into viewport
$(window).on('scroll', reveal);


// ==================================================
// Menu
// ==================================================

var $menu = $('#main-menu');

// Append <hr> to menu
var aHomeWidth = $menu.find('a:first').outerWidth();
var hr = $('<hr>').css('width', aHomeWidth + 'px');
$menu.find('ul').append(hr);

// Menu icon
$('#menu-icon').on('click', function() {
    $(this).toggleClass('open');
    if ( !$menu.hasClass('open') ) {
        $menu.slideDown(300, function() {
            $(this).addClass('open');
        });
    } else {
        $menu.removeClass('open').slideUp(300, function() {
            $menu.css('display', '');
        });
    }
});

// Menu links - click action
$('#main-menu a, #logo a').on('click', function(e) {

    // If less than 768px wide (essentially if mobile)
    if (!mqw.matches) {
        // Close menu and remove inline "display: none"
        $('#menu-icon, #main-menu').removeClass('open');
        $menu.css('display', '');
    }

    // If Tablet / Desktop
    else {
        // Add class to body while it's scrolling
        $(document.body).addClass('scrolling');

        if ( $(this).parent().attr('id') == 'logo' ) {
            $clicked = $('#main-menu a[href="#home"]');
        } else {
            $clicked = $(this);
        }

        // Move underline to clicked item
        $('#main-menu hr').css({
            width: $clicked.outerWidth() + 'px',
            left: ( $clicked.offset().left - $menu.offset().left ) + 'px'
        });

        // Add 'active' class to clicked item
        $('#main-menu a').removeClass('active');
        $clicked.addClass('active');
    }

    // Scroll to target
    var $targetOffset = $( $.attr(this, 'href') ).offset().top,
        $headerHeight = $('#page-header').outerHeight();

    $('html, body').animate({
        scrollTop: $targetOffset - $headerHeight
    }, 600, function() {
        $(document.body).removeClass('scrolling');
    });

    e.preventDefault();
});

/*
// Move underline to hovered link
$menu.on('mouseenter', 'a', function () {
    $('#main-menu ul hr').css({
        width: $(this).outerWidth() + 'px',
        left: ( $(this).offset().left - $menu.offset().left ) + 'px'
    });
}).on('mouseleave', function () {
    var $active = $menu.find('.active');
    $('#main-menu ul hr').css({
        width: $active.outerWidth() + 'px',
        left: ( $active.offset().left - $menu.offset().left ) + 'px'
    });
})
*/

// Move menu underline on manual page scroll
$(window).on('scroll', function() {

    // Only do this if page is not auto scrolling
    if ( !$(document.body).hasClass('scrolling') ) {
        $('section').each(function() {

            // Only do this for current section
            var $top = $(this).offset().top - $('#page-header').outerHeight(),
                $bottom = $top + $(this).outerHeight();

            if ( $(window).scrollTop() > $top && $(window).scrollTop() < $bottom ) {

                // Only do this if scrolled to new section
                var $id = $(this).attr('id'),
                    $link = $('#main-menu a[href="#' + $id + '"]');

                if ( !$link.hasClass('active') ) {

                    // Move underline to menu link for current section
                    $('#main-menu hr').css({
                        width: $link.outerWidth() + 'px',
                        left: ($link.offset().left - $menu.offset().left) + 'px'
                    });

                    // Add 'active' class to menu link for current section
                    $('#main-menu a').removeClass('active');
                    $('#main-menu a[href="#' + $id + '"]').addClass('active');
                } 
            }
        });
    }
});


// ==================================================
// Show / hide project details
// ==================================================

$('.project h3 span').on('click', function() {
    var $svg = $(this).find('svg'),
        $use = $svg.find('use'),
        $details = $(this).closest('.project').find('.details');
    
    if ( !$details.hasClass('open') ) {
        $details.slideDown(300, function() {
            var $icon = $use.attr('xlink:href').replace('icon-info', 'icon-cancel');
            $use.attr('xlink:href', $icon);
            $svg.addClass('small');
            $(this).addClass('open');
        });
    } else {
        $details.removeClass('open').slideUp(300, function() {
            var $icon = $use.attr('xlink:href').replace('icon-cancel', 'icon-info');
            $use.attr('xlink:href', $icon);
            $svg.removeClass('small');
        });
    }
});

// Prevent sticky hover on touch screen devices
$('.project h3 span').on('touchstart', function() {
    $(this).addClass('touch');
}).on('touchend', function() {
    $(this).removeClass('touch');        
});


}); // End