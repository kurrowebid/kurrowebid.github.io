(function( $ ) {
    'use strict';

    var MarvyPureAnimation = {
        initPure: function () {
            madxartworkFrontend.hooks.addAction('frontend/element_ready/section', MarvyPureAnimation.initRipplesWidget);
        },
        initRipplesWidget: function ($scope) {
            var sectionId = $scope.data('id');
            var target = '.madxartwork-element-'+ sectionId;
            var settings = {};

            if (window.isEditMode || window.madxartworkFrontend.isEditMode()) {
                var editorElements = null;
                var pureAnimationArgs = {};
                if (!window.madxartwork.hasOwnProperty('elements')) {
                    return false;
                }

                editorElements = window.madxartwork.elements;
                if (!editorElements.models) {
                    return false;
                }

                $.each(editorElements.models, function (i, el) {
                    if (sectionId === el.id) {
                        pureAnimationArgs = el.attributes.settings.attributes;
                    } else if (el.id === $scope.closest('.madxartwork-top-section').data('id')) {
                        $.each(el.attributes.elements.models, function (i, col) {
                            $.each(col.attributes.elements.models, function (i, subSec) {
                                pureAnimationArgs = subSec.attributes.settings.attributes;
                            });
                        });
                    }
                    settings.switch = pureAnimationArgs.marvy_enable_flying_object;
                    settings.shape = pureAnimationArgs.marvy_flying_object_shape;
                    settings.shapeColor = pureAnimationArgs.marvy_flying_object_shape_color;
                });

            }  else {
                settings.switch = $scope.data("marvy_enable_flying_object");
                settings.shape = $scope.data("marvy_flying_object_shape");
                settings.shapeColor = $scope.data("marvy_flying_object_shape_color");
            }
            if (settings.switch) {
                pureAnimation(target, settings, sectionId);
            }
        }
    };

    $( window ).on('madxartwork/frontend/init', MarvyPureAnimation.initPure);

    function pureAnimation(target,settings,sectionId) {
        var checkElement = document.getElementsByClassName("marvy-pure-animation-shape-"+sectionId);
        if (checkElement.length <= 0 ) {
            var i;
            var pure_ul_el = document.createElement('ul');
            pure_ul_el.classList.add("marvy-pure-animation-shape-"+sectionId);

            document.querySelector(target).appendChild(pure_ul_el);
            document.querySelector(target).classList.add('marvy-custom-pure-animation-section-'+sectionId);

            var zIndex = document.querySelector('.marvy-custom-pure-animation-section-'+sectionId+' .madxartwork-container');
            zIndex.style.zIndex = '99';

            var pureMinHeight = document.querySelector(".madxartwork-element-"+sectionId);
            pureMinHeight.closest('.madxartwork-top-section').style.minHeight = "100px";

            for(i=1; i <= 15; i++) {
                var pure_li_el = document.createElement('li');
                document.querySelector('.marvy-pure-animation-shape-'+sectionId).appendChild(pure_li_el);
            }

            var pureShapeColor = document.querySelectorAll('.marvy-pure-animation-shape-'+sectionId+' li');
            var purePercentage = '5px' ;

            if (settings.shape === 'circle' ) {
                purePercentage = '50%';
            } else {
                purePercentage = '5px';
            }

            for (i = 0; i < pureShapeColor.length; i++) {
                pureShapeColor[i].style.backgroundColor = settings.shapeColor;
                pureShapeColor[i].style.borderRadius = purePercentage;
            }
        }
    }
})( jQuery );

