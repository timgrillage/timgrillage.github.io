jQuery('document').ready(function($) {
    
    // Add FastClick plugin for touch screen devices
    FastClick.attach(document.body);


    // Add 'js' class to body if JavaScript enabled
    $(document.body).addClass('js');


    // Set media query variables
    var mqw = window.matchMedia('(min-width: 48rem)'); // 768px
    var mqo = window.matchMedia('(orientation: landscape)');


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

    var $menu   = $('#main-menu');
    var $header = $('#page-header');

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
            $(document.body).addClass('scrolling');

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
            $(document.body).removeClass('scrolling');
        });

        return false;
    });

    // Active link underline for tablet/desktop menu
    function underline() {
        var $winTop = $(window).scrollTop();

        $('section').each(function() {
            var $secTop = $(this).offset().top - $header.outerHeight();
            var $secBot = $secTop + $(this).outerHeight();

            // Only do this for current section
            if ( $winTop >= $secTop && $winTop < $secBot ) {

                // Get details of menu link for current section
                var $link  = $menu.find('a[href="#' + this.id + '"]');
                var $width = $link.outerWidth() + 'px';
                var $left  = ($link.offset().left - $menu.offset().left) + 'px';

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
            if ( !$(document.body).hasClass('scrolling') ) {
                underline();
            }
        }); 
    });


    // ==================================================
    // Reveal elements on scroll
    // ==================================================

    // Set distance into window before animated elements are revealed
    var $window    = $(window);
    var $distance  = mqo.matches ? 0.85 : 0.9; // 15% for landscape / 10% for portrait
    var $winHeight = $window.height() * $distance;
    var $animated  = $('section').find('.animated, header');

    function reveal(event) {
        var $scrolled = $window.scrollTop();

        // If initial page load then reveal elements without animation
        var $animClass = (event === 'init') ? 'show' : 'revealed';

        $animated.each(function() {
            var $this = $(this);

            // If element far enough into view
            if ( ($scrolled + $winHeight) > $this.offset().top ) {

                // If it hasn't already been revealed on load or scroll
                if ( !$this.hasClass('show') && !$this.hasClass('revealed') )  {
                    $this.addClass($animClass);
                }
            }
        });
    }

    // Reveal elements already in viewport on page load
    reveal('init');

    // Reveal elements when scrolled into viewport
    $window.on('scroll', reveal);


    // ==================================================
    // Show / hide project details
    // ==================================================

    $('#work h3 span').on('click', function() {
        var $this    = $(this);
        var $svg     = $this.find('svg');
        var $use     = $svg.find('use');
        var $details = $this.closest('.project').find('.details');
        
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
    $('#work .details').on('click', 'a[href="#"]', function() {
        return false;
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