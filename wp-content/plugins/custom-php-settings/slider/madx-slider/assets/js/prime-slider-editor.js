( function( $ ) {

	'use strict';

	var ElementPackEditor = {

		init: function() {
			madxartwork.channels.editor.on( 'section:activated', ElementPackEditor.onAnimatedBoxSectionActivated );

			window.madxartwork.on( 'preview:loaded', function() {
				madxartwork.$preview[0].contentWindow.ElementPackEditor = ElementPackEditor;

				ElementPackEditor.onPreviewLoaded();
			});
		},

		onPreviewLoaded: function() {
			var madxartworkFrontend = $('#madxartwork-preview-iframe')[0].contentWindow.madxartworkFrontend;

			madxartworkFrontend.hooks.addAction( 'frontend/element_ready/widget', function( $scope ){

				$scope.find( '.bdt-madxartwork-template-edit-link' ).on( 'click', function( event ){
					window.open( $( this ).attr( 'href' ) );
				});
			});
		}
	};

	$( window ).on( 'madxartwork:init', ElementPackEditor.init );

	window.ElementPackEditor = ElementPackEditor;

}( jQuery ) );
