( function( $ ) {

	'use strict';

	var madxMenuEditor = {

		activeSection: false,

		currentElement: false,

		currentSection: false,

		prevSection: false,

		isMobileRender: false,

		init: function() {
			madxartwork.channels.editor.on( 'section:activated', madxMenuEditor.sectionActivated );
		},

		sectionActivated: function( sectionName, editor ) {
			let mainSections = [
				'section_main_menu_styles',
				'section_dropdown_menu_styles',
			],
			mobileSections = [
				'mobile_device_render',
				'mobile_device_render_styles',
			];

			let currentElement = madxMenuEditor.currentElement = editor.getOption( 'editedElementView' ) || false;

			if ( ! currentElement ) {
				return;
			}

			if ( 'madx-mega-menu' == currentElement.model.get( 'widgetType' ) ) {

				let widgetId = currentElement.model.get( 'id' );

				madxMenuEditor.prevSection = madxMenuEditor.currentSection;
				madxMenuEditor.currentSection = sectionName;

				if ( 'section_layout' === sectionName && madxMenuEditor.isMobileRender ) {
					currentElement.model.setSetting( 'force-mobile-render', false );
					currentElement.model.renderRemoteServer();
				}

				if ( mainSections.includes( sectionName ) && madxMenuEditor.isMobileRender ) {
					madxMenuEditor.isMobileRender = false;
					currentElement.model.setSetting( 'force-mobile-render', false );
					currentElement.model.renderRemoteServer();
					currentElement.model.setSetting( 'force-mobile-render', false );
				}

				if ( mobileSections.includes( sectionName ) && ! madxMenuEditor.isMobileRender ) {
					madxMenuEditor.isMobileRender = true;
					currentElement.model.setSetting( 'force-mobile-render', true );
					currentElement.model.renderRemoteServer();
					currentElement.model.setSetting( 'force-mobile-render', false );
				}
			}

		}

	};

	$( window ).on( 'madxartwork:init', madxMenuEditor.init );

	window.madxMenuEditor = madxMenuEditor;

}( jQuery ) );
