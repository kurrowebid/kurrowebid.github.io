(function( $ ) {
    'use strict';
    var VisualRingsAnimation = {
        initRings: function () {
            madxartworkFrontend.hooks.addAction('frontend/element_ready/section', VisualRingsAnimation.initRingsWidget);
        },
        initRingsWidget: function ($scope) {
            var sectionId = $scope.data('id');
            var target = '.madxartwork-element-' + sectionId;
            var settings = {};
            if (window.isEditMode || window.madxartworkFrontend.isEditMode()) {
                var editorElements = null;
                var ringsAnimationArgs = {};

                if (!window.madxartwork.hasOwnProperty('elements')) {
                    return false;
                }

                editorElements = window.madxartwork.elements;

                if (!editorElements.models) {
                    return false;
                }

                $.each(editorElements.models, function (i, el) {
                    if (sectionId === el.id) {
                        ringsAnimationArgs = el.attributes.settings.attributes;
                    } else if (el.id === $scope.closest('.madxartwork-top-section').data('id')) {
                        $.each(el.attributes.elements.models, function (i, col) {
                            $.each(col.attributes.elements.models, function (i, subSec) {
                                ringsAnimationArgs = subSec.attributes.settings.attributes;
                            });
                        });
                    }
                    settings.switch = ringsAnimationArgs.marvy_enable_rings_animation;
                    settings.ringsRandomColor = ringsAnimationArgs.marvy_rings_animation_rings_random_color;
                    settings.bgColor = ringsAnimationArgs.marvy_rings_animation_background_color;
                    settings.bgOpacity = ringsAnimationArgs.marvy_rings_animation_background_opacity;
                });

            } else {
                settings.switch = $scope.data("marvy_enable_rings_animation");
                settings.ringsRandomColor = $scope.data("marvy_rings_animation_rings_random_color");
                settings.bgColor = $scope.data("marvy_rings_animation_background_color");
                settings.bgOpacity = $scope.data("marvy_rings_animation_background_opacity");
            }

            if (settings.switch) {
                ringsAnimation(target, settings, sectionId);
            }
        }
    };

    function ringsAnimation(target,settings,sectionId) {
        var checkElement = document.getElementsByClassName("marvy-rings-section-" + sectionId);
        if (checkElement.length >= 0) {

            var rings_div = document.createElement('div');
            rings_div.classList.add("marvy-rings-section-" + sectionId);

            document.querySelector(target).appendChild(rings_div);
            document.querySelector(target).classList.add("marvy-custom-rings-animation-section-" + sectionId);

            // Set Z-index for section container
            var ringsZindex = document.querySelector('.marvy-custom-rings-animation-section-'+sectionId+' .madxartwork-container');
            ringsZindex.style.zIndex = '99';

            // Set min height
            var ringsMinHeight = document.querySelector(".madxartwork-element-"+sectionId);
            ringsMinHeight.style.minHeight = "200px";

            var ringAnimation = VANTA.RINGS({
                el: ".marvy-rings-section-" + sectionId,
                mouseControls: true,
                touchControls: true,
                gyroControls: false,
                minHeight: 200.00,
                scale: 1.00,
                scaleMobile: 1.00,
                color: settings.ringsRandomColor,
                backgroundColor: settings.bgColor,
                backgroundAlpha: settings.bgOpacity
            });

            render(ringAnimation,sectionId);

        }
        return true;
    }

    function render(animation,sectionId) {
        document.querySelector(".madxartwork-element-"+sectionId).addEventListener('DOMAttrModified', function(e){
            animation.resize();
        }, false);
    }

    $( window ).on('madxartwork/frontend/init', VisualRingsAnimation.initRings);
})( jQuery );
