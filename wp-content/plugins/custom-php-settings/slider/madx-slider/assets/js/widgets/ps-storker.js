(function ($, madxartwork) {

    'use strict';

    var widgetStorker = function ($scope, $) {

        var $storker = $scope.find('.bdt-prime-slider-storker');
        if (!$storker.length) {
            return;
        }
        var $storkerContainer = $storker.find('.swiper-container'),
            $settings = $storker.data('settings');
        var swiper = new Swiper($storkerContainer, $settings);
        if ($settings.pauseOnHover) {
            $($storkerContainer).hover(function () {
                (this).swiper.autoplay.stop();
            }, function () {
                (this).swiper.autoplay.start();
            });
        }

        var $mainWrapper = $scope.find('.bdt-prime-slider'),
            $thumbs      = $mainWrapper.find('.bdt-storker-thumbs');

        var sliderThumbs = new Swiper($thumbs, {
            direction: "vertical",
            slidesPerView: 3,
            centeredSlides: true,
            loop: ($settings.loop) ? $settings.loop : false,
            speed: ($settings.speed) ? $settings.speed : 500,
            spaceBetween: 10,
            touchRatio: 0.2,
            slideToClickedSlide: true,
            loopedSlides: 4,
        });

        swiper.controller.control = sliderThumbs;
        sliderThumbs.controller.control = swiper;

    };


    jQuery(window).on('madxartwork/frontend/init', function () {
        madxartworkFrontend.hooks.addAction('frontend/element_ready/prime-slider-storker.default', widgetStorker);
    });

}(jQuery, window.madxartworkFrontend));