(function($) {

    // Add 'js' class to body if JavaScript enabled
    $(document.body).addClass('js');


    // Add FastClick plugin for touch screen devices
    FastClick.attach(document.body);


    // Prevent sticky hover on touch screen devices
    $('#logo a, #work h3 span').on('touchend touchcancel', function() {
        $(this).addClass('no-hover');
    }).on('touchstart mouseover', function() {
        $(this).removeClass('no-hover');        
    });


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

    (function() {
        var $menu   = $('#main-menu');
        var $header = $('#page-header');
        var mqw     = window.matchMedia('(min-width: 48rem)'); // 768px

        // Events
        $('#menu-icon').on('click', toggleMenu);
        $('#main-menu, #logo').on('click', 'a', clicked);
        $(window).load(getSection);

        // If tablet/desktop
        if (mqw.matches) {
            $(window).on('scroll', function() {
                // Only do this if the page is not auto scrolling from a menu click
                if ( !$(document.body).hasClass('scrolling') ) {
                    getSection();
                }
            });
        }
        
        // Toggle mobile menu
        function toggleMenu() {
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
        }

        // Menu item click action
        function clicked() {
            // Mobile
            if (!mqw.matches) {
                // Close menu
                $('#menu-icon, #main-menu').removeClass('open');
                $menu.css('display', '');
            }

            // Tablet/desktop
            else {
                var link;
                if ( $(this).parent().attr('id') == 'logo' ) { // Logo clicked
                    link = $menu.find('a[href="#home"]');
                } else { // Menu item clicked
                    link = $(this);
                }
                var linkWidth = link.outerWidth() + 'px';
                var linkPos  = (link.offset().left - $menu.offset().left) + 'px';

                // Move underline to clicked item
                moveUnderline(link, linkWidth, linkPos);
            }

            // Add class to body while it's scrolling
            $(document.body).addClass('scrolling');

            // Scroll to target
            var targetOffset = Math.round($( $.attr(this, 'href') ).offset().top);
            var headerHeight = $header.outerHeight();
            
            $('html, body').addClass('scrolling').animate({
                scrollTop: targetOffset - headerHeight
            }, 600, function() {
                $(document.body).removeClass('scrolling');
            });

            return false;
        }

        // Get current section
        function getSection() {
            var winTop = $(window).scrollTop();

            $('section').each(function() {
                var secTop = $(this).offset().top - $header.outerHeight();
                var secBot = secTop + $(this).outerHeight();

                if ( winTop >= secTop && winTop < secBot ) {
                    // Get details of menu link for current section
                    var link      = $menu.find('a[href="#' + this.id + '"]');
                    var linkWidth = link.outerWidth() + 'px';
                    var linkPos   = (link.offset().left - $menu.offset().left) + 'px';

                    // Append <hr> to tablet/desktop menu on page load
                    if (mqw.matches && !$menu.find('hr').length ) {
                        var hr = $('<hr>').css({
                            width: linkWidth,
                            left: linkPos
                        });
                        $menu.find('ul').append(hr);
                    }

                    // Move menu underline if scrolled to new section
                    if ( !link.hasClass('active') ) {
                        moveUnderline(link, linkWidth, linkPos);
                    }
                }
            });
        }

        // Move menu underline to link for current section
        function moveUnderline(link, linkWidth, linkPos) {
            $menu.find('hr').css({
                width: linkWidth,
                left: linkPos
            });

            $menu.find('a.active').removeClass('active');
            link.addClass('active');
        }
    })();


    // ==================================================
    // Reveal elements on scroll
    // ==================================================

    (function() {
        // Set distance into viewport before animated elements are revealed
        var $window   = $(window);
        var mqo       = window.matchMedia('(orientation: landscape)');
        var distance  = mqo.matches ? 0.85 : 0.9; // 15% for landscape / 10% for portrait
        var winHeight = $window.height() * distance;

        // Assign animated elements to an array
        var $animated = $('section').not('#home').find('> *');

        // Check for elements in viewport on load
        reveal('init');

        // Reveal elements when scrolled into viewport
        $window.on('scroll', reveal);

        function reveal(event) {
            var scrolled = $window.scrollTop();
            
            $animated.each(function() {
                var $this = $(this);

                // If element far enough into view
                if ( (scrolled + winHeight) > $this.offset().top ) {

                    // If initial page load
                    if (event === 'init') {
                        $this.addClass('no-anim');
                    }

                    // If element hasn't already been revealed
                    if ( !$this.hasClass('no-anim') && !$this.hasClass('revealed') )  {
                        $this.addClass('revealed');
                    }

                }
            });
        }
    })();


    // ==================================================
    // Show / hide project details
    // ==================================================

    $('#work h3 span').on('click', toggleDetails);

    // Temporarily disable dead project links
    $('#work .details').on('click', 'a[href="#"]', function() {
        return false;
    });

    function toggleDetails() {
        var $this    = $(this);
        var $svg     = $this.find('svg');
        var $use     = $svg.find('use');
        var $details = $this.closest('.project').find('.details');
        
        // Show details
        if ( !$details.hasClass('open') ) {
            $details.slideDown(300, function() {
                var $icon = $use.attr('xlink:href').replace('icon-info', 'icon-cancel');
                $use.attr('xlink:href', $icon);
                $svg.addClass('small');
                $(this).addClass('open');
            });
        }
        
        // Hide details
        else {
            $details.removeClass('open').slideUp(300, function() {
                var $icon = $use.attr('xlink:href').replace('icon-cancel', 'icon-info');
                $use.attr('xlink:href', $icon);
                $svg.removeClass('small');
            });
        }
    }

})(jQuery);