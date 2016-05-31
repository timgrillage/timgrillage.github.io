jQuery('document').ready(function($) {


    var $body = $(document.body).addClass('js');


    // Add FastClick plugin for touch screen devices
    FastClick.attach($body);


    // Set media query variables
    var mqw = window.matchMedia('(min-width: 48rem)'), // 768px
        mqo = window.matchMedia('(orientation: portrait)');


    // Add class to 'layers' div when images have loaded
    $('#home .layers').waitForImages({
        finished: function() {
            $(this).addClass('ready');
        },
        waitForAll: true
    });


    // ==================================================
    // Navigation menu
    // ==================================================

    var $menu   = $('#main-menu'),
        $header = $('#page-header');

    // Mobile menu icon
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
    $('#main-menu, #logo').on('click', 'a', function() {

        // If < 768px wide (if mobile)
        if (!mqw.matches) {
            $('#menu-icon, #main-menu').removeClass('open');
            $menu.css('display', '');
        }

        // If >= 768px wide (if tablet / desktop)
        else {
            // Add class to body while it's auto scrolling
            $body.addClass('scrolling');

            if ( $(this).parent().attr('id') == 'logo' ) {
                $clicked = $menu.find('a[href="#home"]');
            } else {
                $clicked = $(this);
            }

            // Move underline to clicked item
            $menu.find('hr').css({
                width: $clicked.outerWidth() + 'px',
                left: ( $clicked.offset().left - $menu.offset().left ) + 'px'
            });

            // Add 'active' class to clicked item
            $menu.find('a').removeClass('active');
            $clicked.addClass('active');
        }

        // Scroll to target
        var $targetOffset = $( $.attr(this, 'href') ).offset().top,
            $headerHeight = $header.outerHeight();

        $('html, body').animate({
            scrollTop: $targetOffset - $headerHeight
        }, 600, function() {
            $body.removeClass('scrolling');
        });

        return false;
    });

    // Active link underline for tablet/desktop menu
    function underline() {
        var $winTop = $(window).scrollTop();

        $('section').each(function() {
            var $secTop = $(this).offset().top - $header.outerHeight(),
                $secBot = $secTop + $(this).outerHeight();

            // Only do this for current section
            if ( $winTop >= $secTop && $winTop < $secBot ) {

                // Get details of menu link for current section
                var $link  = $menu.find('a[href="#' + this.id + '"]'),
                    $width = $link.outerWidth() + 'px',
                    $left  = ($link.offset().left - $menu.offset().left) + 'px';

                if( !$menu.find('hr').length ) { // If page loaded

                    // Add 'active' class to menu link for current section
                    $link.addClass('active');

                    // Append <hr> to tablet/desktop menu
                    var $hr = $('<hr>').css({
                        width: $width,
                        left: $left
                    });
                    $menu.find('ul').append($hr);

                } else { // If page scrolled

                    if ( !$link.hasClass('active') ) {
                        // Move underline to menu link for current section
                        $menu.find('hr').css({
                            width: $width,
                            left: $left
                        });

                        // Add 'active' class to menu link for current section
                        $menu.find('a.active').removeClass('active');
                        $link.addClass('active');
                    }

                }
 
            }
        });
    }
    
    $(window).load(function() {
        // Run on load to append <hr> to menu link for current section
        underline();

        // Move menu underline to current section on manual page scroll
        $(window).on('scroll', function() {
            // Only do this if the page is not auto scrolling from a menu click
            if ( !$body.hasClass('scrolling') ) {
                underline();
            }
        }); 
    });


    // ==================================================
    // Reveal elements on scroll
    // ==================================================

    function reveal() {
        // Set distance before animated elements are revealed
        if (mqo.matches) {
            var $distance = 0.9; // Portrait - 10%
        } else {
            var $distance = 0.85; // Landscape - 15%
        }

        var $scrolled = $(window).scrollTop(),
            $height = $(window).height() * $distance;

        $('section').find('.animated:not(.revealed), header:not(.revealed)').each(function () {
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
    // Show / hide project details
    // ==================================================

    $('#work h3 span').on('click', function() {
        var $svg     = $(this).find('svg'),
            $use     = $svg.find('use'),
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

    // Temporarily disable dead project links
    $('#work .details a').on('click', function(e) {
        e.preventDefault();
    });


    // ==================================================
    // Prevent sticky hover on touch screen devices
    // ==================================================

    $('#logo a, #work h3 span').on('touchend touchcancel', function() {
        $(this).addClass('no-hover');
    }).on('touchstart mouseover', function() {
        $(this).removeClass('no-hover');        
    });


});