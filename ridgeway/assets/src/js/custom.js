(function($) {
    'use strict';


    // Add FastClick plugin for touch screen devices
    FastClick.attach(document.body);


    // Add custom styling to form select boxes
    $('select').customSelect();

    
    /**
     * Separate slideUp and slideDown actions used rather than slideToggle
     * in order to add "open" class only after opening animation is complete
     * and remove "open" class before closing animation begins.
     */
    $('.toggle-nav').on('click', function() {
        var nav = $(this).parent('nav').find('.nav-wrapper');
        if (!nav.hasClass('open')) {
            nav.slideDown(300, function() {
                nav.addClass('open');
            });
        } else {
            nav.removeClass('open').slideUp(300, function() {
                /** 
                 * Remove inline "display: none" to prevent menu from being hidden
                 * if screen size changes after menu has been toggled to closed.
                 */
                nav.css('display', '');
            });
        }
        return false;
    });

})(jQuery);