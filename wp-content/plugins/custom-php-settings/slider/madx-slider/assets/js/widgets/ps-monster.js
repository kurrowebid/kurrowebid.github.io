(function($, madxartwork) {

    'use strict';

    var widgetMonster = function($scope, $) {

        var $monster = $scope.find('.bdt-prime-slider-monster');
        if (!$monster.length) {
            return;
        }

        var $monsterContainer = $monster.find('.swiper-container'),
            $settings = $monster.data('settings');


        var swiper = new Swiper($monsterContainer, $settings);


        if ($settings.pauseOnHover) {
            $($monsterContainer).hover(function() {
                (this).swiper.autoplay.stop();
            }, function() {
                (this).swiper.autoplay.start();
            });
        }

    };


    jQuery(window).on('madxartwork/frontend/init', function() {
        madxartworkFrontend.hooks.addAction('frontend/element_ready/prime-slider-monster.default', widgetMonster);
    });

}(jQuery, window.madxartworkFrontend));