(function ($, madxartwork) {

    'use strict';

    var widgetFiestar = function ($scope, $) {

        var $fiestar = $scope.find('.bdt-fiestar-slider');
        if (!$fiestar.length) {
            return;
        }
        var $fiestarContainer = $fiestar.find('.bdt-center-slider'),
            $settings = $fiestar.data('settings');
        var swiper = new Swiper($fiestarContainer, $settings);
        if ($settings.pauseOnHover) {
            $($fiestarContainer).hover(function () {
                (this).swiper.autoplay.stop();
            }, function () {
                (this).swiper.autoplay.start();
            });
        }

    };


    jQuery(window).on('madxartwork/frontend/init', function () {
        madxartworkFrontend.hooks.addAction('frontend/element_ready/prime-slider-fiestar.default', widgetFiestar);
    });

}(jQuery, window.madxartworkFrontend));