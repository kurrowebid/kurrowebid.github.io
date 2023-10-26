( function( $ ) {

	"use strict";

	const initGeolocationFilter = function() {

		window.madxSmartFilters.filtersList.madxEngineUserGeolocation = 'madx-smart-filters-user-geolocation';
		window.madxSmartFilters.filters.madxEngineUserGeolocation = class madxEngineUserGeolocation extends window.madxSmartFilters.filters.Search {

			name = 'user-geolocation';

			constructor( $container ) {
				
				const $filter = $container.find( '.geolocation-data' );
				
				super( $container, $filter );

				if ( navigator.geolocation ) {
					
					navigator.geolocation.getCurrentPosition( ( position ) => {
						
						this.dataValue = {
							latitude: position.coords.latitude,
							longitude: position.coords.longitude,
						}

						this.emitFitersApply();

					} );
				}

			}

			processData() {
			}

		};

	}

	if ( window.madxMapListingGeolocationFilterData && 'madx-smart-filters/before-init' === window.madxMapListingGeolocationFilterData.initEvent ) {
		document.addEventListener( 'madx-smart-filters/before-init', ( e ) => {
			initGeolocationFilter();
		});
	} else {
		window.addEventListener( 'DOMContentLoaded', ( e ) => {
			initGeolocationFilter();
		});
	}

}( jQuery ) );
