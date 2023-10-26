(function($, madxartwork) {

    'use strict';

    var widgetFluent = function($scope, $) {

        var $fluentSlider = $scope.find('.bdt-prime-slider-fluent'),
            $thumbNav = $($fluentSlider).find('.bdt-thumbnav-wrapper > .bdt-thumbnav-scroller');

        if (!$fluentSlider.length) {
            return;
        }

        $($thumbNav).mThumbnailScroller({
            axis: 'y',
            type: 'hover-precise'
        });

    };


    jQuery(window).on('madxartwork/frontend/init', function() {
        madxartworkFrontend.hooks.addAction('frontend/element_ready/prime-slider-fluent.default', widgetFluent);
    });

}(jQuery, window.madxartworkFrontend));