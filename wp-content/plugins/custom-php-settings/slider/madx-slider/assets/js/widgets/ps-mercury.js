(function($, madxartwork) {

    'use strict';

    var widgetMercury = function($scope, $) {

        var $mercury = $scope.find('.bdt-mercury-slider');
        if (!$mercury.length) {
            return;
        }
        var $mercuryContainer = $mercury.find('.bdt-image-slider'),
            $settings = $mercury.data('settings');
        var swiper = new Swiper($mercuryContainer, $settings);
        if ($settings.pauseOnHover) {
            $($mercuryContainer).hover(function() {
                (this).swiper.autoplay.stop();
            }, function() {
                (this).swiper.autoplay.start();
            });
        }

        var $mainWrapper = $scope.find('.bdt-mercury-slider'),
            $thumbs = $mainWrapper.find('.bdt-content-slider');

        var sliderThumbs = new Swiper($thumbs, {
            loop: ($settings.loop) ? $settings.loop : false,
            speed: ($settings.speed) ? $settings.speed : 500,
            parallax: true,
            loopedSlides: 4,
        });

        swiper.controller.control = sliderThumbs;
        sliderThumbs.controller.control = swiper;

    };


    jQuery(window).on('madxartwork/frontend/init', function() {
        madxartworkFrontend.hooks.addAction('frontend/element_ready/prime-slider-mercury.default', widgetMercury);
    });

}(jQuery, window.madxartworkFrontend));