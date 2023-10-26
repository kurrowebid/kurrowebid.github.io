/**
 * Start image accordion widget script
 */

(function($, madxartwork) {

    'use strict';

    var widgetWooexpand = function($scope, $) {

        var $imageExpand = $scope.find('.bdt-wooexpand'),
        $settings = $imageExpand.data('settings');

        // var accordionItem = document.querySelectorAll('#' + $settings.tabs_id + ' .bdt-wooexpand-item');
        var accordionItem = $($imageExpand).find('.bdt-wooexpand-item');

        $(accordionItem).on($settings.mouse_event, function() {
            $(this).siblings().removeClass('active');
            $(this).addClass('active');
            $(this).parent().addClass('active');
        });
        
        $("body").on($settings.mouse_event, function(e) {
            if (e.target.$imageExpand == "bdt-wooexpand" || $(e.target).closest(".bdt-wooexpand").length) {
            } else {
              $('.bdt-wooexpand-item').removeClass('active');
              $('.bdt-wooexpand-item').parent().removeClass('active');
            }
        });

    };

    jQuery(window).on('madxartwork/frontend/init', function() {
        madxartworkFrontend.hooks.addAction('frontend/element_ready/prime-slider-wooexpand.default', widgetWooexpand);
    });

}(jQuery, window.madxartworkFrontend));

/**
 * End image accordion widget script
 */

