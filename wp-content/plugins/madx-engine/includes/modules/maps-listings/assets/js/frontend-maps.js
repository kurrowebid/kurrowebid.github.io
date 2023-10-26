( function( $ ) {

	"use strict";

	var mapProvider = new window.madxEngineMapsProvider();

	var madxEngineMaps = {

		markersData:    {},
		clusterersData: {},
		mapProvider: mapProvider,

		preventPanToMarker: false,

		init: function() {

			var widgets = {
				'madx-engine-maps-listing.default' : madxEngineMaps.widgetMap,
			};

			$.each( widgets, function( widget, callback ) {
				window.madxartworkFrontend.hooks.addAction( 'frontend/element_ready/' + widget, callback );
			});

		},

		initBlocks: function( $scope ) {

			$scope = $scope || $( 'body' );

			window.madxPlugins.init( $scope, [
				{
					block: 'madx-engine/maps-listing',
					callback: madxEngineMaps.widgetMap
				}
			] );

		},

		initBricks: function( $scope ) {

			$scope = $scope || $( 'body' );

			window.madxPlugins.init( $scope, [
				{
					block: 'madx-engine/bricks-maps-listing',
					callback: madxEngineMaps.bricksWidgetMap
				}
			] );

		},

		commonInit: function() {
			// Register URL Action.
			if ( undefined === window.madxEngine ) {
				$( window ).on( 'madx-engine/frontend/loaded', madxEngineMaps.registerUrlAction );
			} else {
				madxEngineMaps.registerUrlAction();
			}
		},

		bricksWidgetMap: function( $scope ) {

			if (madxEngineMaps.isBricksHiddenWrap($scope)) {
				madxEngineMaps.initMapAfterDisplayingWidgets($scope[0]);
				return;
			}

			madxEngineMaps.widgetMap($scope);
		},

		widgetMap: function( $scope ) {

			var $container = $scope.find( '.madx-map-listing' ),
				mapID = $scope.data( 'id' ),
				map,
				init,
				markers,
				bounds,
				general,
				gmMarkers = [],
				activeInfoWindow,
				width,
				offset,
				mapSettings,
				autoCenter,
				customCenter,
				markerCluster;

			if ( ! $container.length || $container.attr( 'id' ) ) {
				return;
			}

			$container.attr( 'id', 'map_' + mapID + '_' + Math.floor( Math.random() * Math.floor( 999 ) ) );

			var initMarker = function( markerData ) {
				var marker,
					infowindow,
					popup,
					popupOpenOn = undefined !== general.popupOpenOn ? general.popupOpenOn : 'click',
					pinData = {
						position: { lat: markerData.latLang.lat, lng: markerData.latLang.lng },
						map: map,
						shadow: false,
					};

				if ( markerData.custom_marker ) {
					pinData.content = markerData.custom_marker;
				} else if ( general.marker && 'image' === general.marker.type ) {
					pinData.content = '<img src="' + general.marker.url + '" class="madx-map-marker-image" alt="" style="cursor: pointer;">';
				} else if ( general.marker && 'text' === general.marker.type ) {
					pinData.content = general.marker.html.replace( '_marker_label_', markerData.label );
				} else if ( general.marker && 'icon' === general.marker.type ) {
					pinData.content = general.marker.html;
				}

				pinData.markerClustering = markerData.markerClustering;

				marker = mapProvider.addMarker( pinData );

				gmMarkers.push( marker );

				madxEngineMaps.addMarkerData( markerData.id, marker, mapID );

				if ( bounds && marker ) {
					bounds.extend( mapProvider.getMarkerPosition( marker ) );
				}

				infowindow = mapProvider.addPopup( {
					position: { lat: markerData.latLang.lat, lng: markerData.latLang.lng },
					width: width,
					offset: offset,
					map: map,
				} );

				mapProvider.closePopup( infowindow, function() {
					activeInfoWindow = false;
				}, map );

				mapProvider.openPopup( marker, function() {

					if ( infowindow.contentIsSet() ) {

						if ( activeInfoWindow === infowindow ) {
							return;
						}

						if ( activeInfoWindow ) {
							activeInfoWindow.close();
						}

						infowindow.setMap( map );
						infowindow.draw();
						infowindow.open( map, marker );

						madxEngineMaps.initHandlers( $container.find( '.madx-map-box' ) );

						activeInfoWindow = infowindow;

						setCenterByMarker( marker );

						return;

					} else if ( general.popupPreloader ) {

						if ( activeInfoWindow ) {
							activeInfoWindow.close();
							activeInfoWindow = false;
						}

						infowindow.setMap( map );
						infowindow.draw();

						infowindow.setContent( '<div class="madx-map-preloader is-active"><div class="madx-map-loader"></div></div>', false );

						infowindow.open( map, marker );

					}

					var querySeparator = general.querySeparator || '?';
					var api = general.api + querySeparator + 'listing_id=' + general.listingID + '&post_id=' + markerData.id + '&source=' + general.source;

					jQuery.ajax({
						url: api,
						type: 'GET',
						dataType: 'json',
						beforeSend: function( jqXHR ) {
							var nonce = window.madxEngineSettings ? window.madxEngineSettings.restNonce : general.restNonce;
							jqXHR.setRequestHeader( 'X-WP-Nonce', nonce );
						},
					}).done( function( response ) {

						if ( activeInfoWindow ) {
							activeInfoWindow.close();
						}

						infowindow.setMap( map );
						infowindow.draw();

						infowindow.setContent( response.html, false );

						infowindow.open( map, marker );

						madxEngineMaps.initHandlers( $container.find( '.madx-map-box' ) );

						activeInfoWindow = infowindow;

					}).fail( function( error ) {

						if ( activeInfoWindow ) {
							activeInfoWindow.close();
						}

						infowindow.setContent( error, true );
						infowindow.open( map, marker );

						activeInfoWindow = infowindow;

					});

					setCenterByMarker( marker );

				}, infowindow, map, popupOpenOn );

			};

			var setCenterByMarker = function( marker ) {

				if ( madxEngineMaps.preventPanToMarker ) {
					return;
				}

				if ( ! general.centeringOnOpen ) {
					return;
				}

				mapProvider.panTo( {
					map: map,
					position: mapProvider.getMarkerPosition( marker ),
					zoom: general.zoomOnOpen ? +general.zoomOnOpen : false,
				} );
			};

			var setAutoCenter = function() {

				if ( ! bounds ) {
					return;
				}

				if ( bounds.isEmpty && bounds.isEmpty() ) {
					return;
				}

				mapProvider.setAutoCenter( {
					map: map,
					settings: general,
					bounds: bounds,
				} );

			};

			init       = $container.data( 'init' );
			markers    = $container.data( 'markers' );
			general    = $container.data( 'general' );
			autoCenter = general.autoCenter;

			if ( ! autoCenter ) {
				customCenter = general.customCenter;
			}

			mapSettings = {
				zoomControl: true,
				fullscreenControl: true,
				streetViewControl: true,
				mapTypeControl: true,
			};

			mapSettings = $.extend( {}, mapSettings, init );

			if ( ! autoCenter && customCenter ) {
				mapSettings.center = customCenter;
				mapSettings.zoom   = general.customZoom;
			}

			if ( general.maxZoom ) {
				mapSettings.maxZoom = general.maxZoom;
			}

			if ( general.minZoom ) {
				mapSettings.minZoom = general.minZoom;
			}

			if ( general.styles ) {
				mapSettings.styles = general.styles;
			}

			if ( general.advanced ) {
				
				if ( general.advanced.zoom_control ) {
					mapSettings.gestureHandling = general.advanced.zoom_control;
				} else {
					mapSettings.scrollwheel = false;
				}

				if ( undefined !== general.advanced.scrollwheel ) {
					mapSettings.scrollwheel = general.advanced.scrollwheel;
				}

			}

			map    = mapProvider.initMap( $container[0], mapSettings );
			bounds = mapProvider.initBounds();
			width  = parseInt( general.width, 10 );
			offset = parseInt( general.offset, 10 );

			if ( markers ) {
				$.each( markers, function( index, markerData ) {
					markerData.markerClustering = general.markerClustering;
					initMarker( markerData );
				});
			}

			if ( autoCenter || ! customCenter ) {
				setAutoCenter();
			}

			if ( general.markerClustering ) {
				
				markerCluster = mapProvider.getMarkerCluster( {
					map: map,
					markers: gmMarkers,
					clustererImg: general.clustererImg
				} );

				madxEngineMaps.clusterersData[ mapID ] = markerCluster;
			}

			$scope.on( 'madx-filter-custom-content-render', function( event, response ) {

				if ( activeInfoWindow ) {
					activeInfoWindow.close();
				}

				if ( markerCluster ) {
					mapProvider.removeMarkers( markerCluster, gmMarkers );
				}

				gmMarkers.forEach( function( marker ) {
					mapProvider.removeMarker( marker );
				} );

				gmMarkers.splice( 0, gmMarkers.length );
				madxEngineMaps.restoreMarkerData();

				bounds = mapProvider.initBounds();

				if ( response.markers.length ) {

					for ( var i = 0; i < response.markers.length; i++ ) {
						let marker = response.markers[ i ];
						marker.markerClustering = general.markerClustering;
						initMarker( marker );
					}

					if ( markerCluster ) {
						mapProvider.addMarkers( markerCluster, gmMarkers );
					}

				}

				if ( autoCenter || ! customCenter ) {
					setAutoCenter();
				}

			} );

		},

		addMarkerData: function( id, marker, mapID ) {

			if ( ! this.markersData[id] ) {
				this.markersData[id] = [];
			}

			this.markersData[id].push( {
				marker: marker,
				clustererIndex: mapID
			} );
		},
		restoreMarkerData: function() {
			this.markersData = {};
		},

		registerUrlAction: function() {
			window.madxEngine.customUrlActions.addAction(
				'open_map_listing_popup',
				madxEngineMaps.openMapListingPopup
			);
		},

		openMapListingPopup: function( settings ) {

			if ( ! settings.id ) {
				return;
			}

			var popupID = settings.id,
				zoom = settings.zoom ? +settings.zoom : false;

			if ( undefined === madxEngineMaps.markersData[ popupID ] ) {
				return;
			}

			if ( zoom ) {
				madxEngineMaps.preventPanToMarker = true;
			}

			for ( var i = 0; i < madxEngineMaps.markersData[ popupID ].length; i++ ) {

				var marker = madxEngineMaps.markersData[ popupID ][i].marker,
					map = mapProvider.getMarkerMap( marker );

				if ( !map ) {
					// A marker inside a cluster
					var clustererIndex   = madxEngineMaps.markersData[ popupID ][i].clustererIndex,
						markersClusterer = madxEngineMaps.clusterersData[ clustererIndex ];

					mapProvider.fitMapToMarker( marker, markersClusterer, zoom );
				} else {
					// Centering the map
					mapProvider.panTo( {
						map: map,
						position: mapProvider.getMarkerPosition( marker ),
						zoom: zoom,
					} );
				}

				mapProvider.triggerOpenPopup( marker );
			}

			madxEngineMaps.preventPanToMarker = false;
		},

		customInitMapBySelector: function( $selector ) {
			var $mapBlock = $selector.closest( '[data-is-block="madx-engine/maps-listing"]' ),
				$mapElWidget = $selector.closest( '.madxartwork-widget-madx-engine-maps-listing' );

			if ( $mapBlock.length ) {
				madxEngineMaps.widgetMap( $mapBlock );
			}

			if ( $mapElWidget.length ) {
				window.madxartworkFrontend.hooks.doAction( 'frontend/element_ready/widget', $mapElWidget, $ );
				window.madxartworkFrontend.hooks.doAction( 'frontend/element_ready/global', $mapElWidget, $ );
				window.madxartworkFrontend.hooks.doAction( 'frontend/element_ready/' + $mapElWidget.data( 'widget_type' ), $mapElWidget, $ );
			}
		},

		initHandlers: function( $selector ) {

			// Actual init
			window.madxPlugins.init( $selector );

			// Legacy madxartwork-only init
			$selector.find( '[data-element_type]' ).each( function() {
				var $this       = $( this ),
					elementType = $this.data( 'element_type' );

				if ( !elementType ) {
					return;
				}

				if ( 'widget' === elementType ) {
					elementType = $this.data( 'widget_type' );
					window.madxartworkFrontend.hooks.doAction( 'frontend/element_ready/widget', $this, $ );
				}

				window.madxartworkFrontend.hooks.doAction( 'frontend/element_ready/global', $this, $ );
				window.madxartworkFrontend.hooks.doAction( 'frontend/element_ready/' + elementType, $this, $ );

			} );

			if ( window.madxPopupFrontend && window.madxPopupFrontend.initAttachedPopups ) {
				window.madxPopupFrontend.initAttachedPopups( $selector );
			}

		},

		// Restart the map when it is displayed
		initMapAfterDisplayingWidgets: function( node ) {
			const observer = new IntersectionObserver((entries, observer) => {
				entries.forEach(entry => {
					if (entry.isIntersecting) {
						observer.unobserve(entry.target);

						madxEngineMaps.widgetMap($(entry.target));
					}
				});
			});

			observer.observe(node);
		},

		// Check the Bricks parent node. Is it hidden or not?
		// The problem was the accordion and tabs
		isBricksHiddenWrap: function( $scope ) {
			const generalWrapper = $scope[0].closest('.brxe-accordion-nested, .brxe-tabs-nested');
			const wrapHidden = $scope[0].closest('.listening, .tab-pane');

			if (generalWrapper && wrapHidden && !wrapHidden.classList.contains('brx-open')) {
				return true;
			}

			return false;
		},

	};

	$( window ).on( 'madxartwork/frontend/init', madxEngineMaps.init );

	window.addEventListener( 'DOMContentLoaded', function() {
		madxEngineMaps.initBlocks();
		madxEngineMaps.initBricks();
	} );

	window.madxEngineMapsBricks = function() {
		madxEngineMaps.initBricks();
	}

	window.madxEngineMaps = madxEngineMaps;

	madxEngineMaps.commonInit();

	$( window ).trigger( 'madx-engine/frontend-maps/loaded' );

}( jQuery ) );
