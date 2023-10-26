const madxLeafletPopup = function( data ) {
	
	this.popup = data.popup;
	this.popupContent = null;
	this.map = data.map || null;

	this.contentIsSet = function() {
		return null !== this.popupContent;
	}

	this.close = function() {
		// runs automatically
		return;
	}

	this.setMap = function( map ) {
		this.map = map;
	}

	this.draw = function() {
		// runs automatically
		return;
	}

	this.open = function( map, marker ) {
		// runs automatically
		return;
	}

	this.setContent = function( content ) {
		this.popupContent = content;
		this.popup.setContent( content );
	}

	return this;

};

window.madxEngineMapsProvider = function() {

	this.initMap = function( container, settings ) {

		settings = settings || {};

		let settingsMap = {
			zoom: 'zoom',
			center: 'center',
			scrollWheelZoom: 'scrollwheel',
			zoomControl: 'zoomControl',
			maxZoom: 'maxZoom',
			minZoom: 'minZoom',
		};
		
		let parsedSettings = {}

		for ( const [ lKey, settingsKey ] of Object.entries( settingsMap ) ) {
			if ( undefined !== settings[ settingsKey ] ) {
				parsedSettings[ lKey ] = settings[ settingsKey ];
			}
		}

		if ( parsedSettings.center ) {
			parsedSettings.center = L.latLng( parsedSettings.center.lat, parsedSettings.center.lng );
		}

		const map = L.map( container, parsedSettings );

		const tileURL = window.madxPlugins.hooks.applyFilters( 'madx-engine.maps-listings.leaflet.tileURL', 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' );
		const tileOptions = window.madxPlugins.hooks.applyFilters( 'madx-engine.maps-listings.leaflet.tileOptions', {
			attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
		} );

		L.tileLayer( tileURL, tileOptions ).addTo( map );

		return map;
	}

	this.initBounds = function() {
		const bounds = L.latLngBounds( [] );
		return bounds;
	}

	this.getMarkerPosition = function( marker ) {
		return marker.getLatLng();
	}

	this.fitMapBounds = function( data ) {
		
		let center = null;
		
		try {
			center = data.bounds.getCenter();
		} catch ( e ) {
			console.log( 'Can`t define new map center without markers.' );
		}
		
		if ( center ) {
			data.map.fitBounds( data.bounds );
			return true;
		} else {
			return false;
		}
	}

	this.addMarker = function( data ) {
		
		var myIcon = L.divIcon( { html: data.content, iconSize: [ 32, 32 ] } );
		var marker = L.marker( [ data.position.lat, data.position.lng ], { icon: myIcon } );

		if ( ! data.markerClustering ) {
			marker.addTo( data.map );
		}
		
		return marker;
	}

	this.removeMarker = function( marker ) {
		marker.remove();
	}

	this.closePopup = function( infoBox, callback, map ) {
		map.on( 'popupclose', ( e ) => {
			if ( e.popup === infoBox.popup ) {
				callback();
			}
		} );
	}

	this.openPopup = function( trigger, callback, infobox, map, openOn ) {

		map.on( 'popupopen', ( e ) => {
			if ( e.popup === infobox.popup ) {
				callback();
			}
		} );

		trigger.bindPopup( infobox.popup );

		if ( 'hover' === openOn ) {
			trigger.on( 'mouseover', function () {
				if ( ! trigger.isPopupOpen() ) {
					trigger.openPopup();
				}
			} );
		}
	}

	this.triggerOpenPopup = function( trigger ) {
		trigger.openPopup();
	}

	this.getMarkerCluster = function( data ) {
		var markersGrpup = L.markerClusterGroup();
		markersGrpup.addLayers( data.markers );
		data.map.addLayer( markersGrpup );
		return markersGrpup;
	}

	this.addMarkers = function( markerCluster, markers ) {
		markerCluster.addLayers( markers );
	}

	this.removeMarkers = function( markerCluster, markers ) {
		markerCluster.removeLayers( markers );
	}

	this.markerOnClick = function( map, data, callback ) {

		data = data || {};

		data.map    = map;
		data.shadow = false;

		map.on( "click", ( event ) => {

			data.position = {
				lat: event.latlng.lat,
				lng: event.latlng.lng,
			};

			if ( callback ) {
				callback( this.addMarker( data ) );
			}

		} );
	}

	this.setCenterByPosition = function( data ) {
		data.map.setView( data.position, data.zoom );
	}

	this.setAutoCenter = function( data ) {
		if ( ! this.fitMapBounds( data ) ) {
			if ( window.madxEngineMapData && window.madxEngineMapData.mapCenter ) {
				data.map.setView( window.madxEngineMapData.mapCenter, 10 );
			} else {
				data.map.fitWorld();
			}
			
		}
	}

	this.addPopup = function( data ) {
		
		const popup = L.popup( {
			maxWidth: data.width,
			minWidth: data.width,
			keepInView: true,
			className: 'madx-map-box',
		} );

		return new madxLeafletPopup( {
			popup: popup
		} );
	}

	this.getMarkerMap = function( marker ) {
		return marker._map;
	}

	this.fitMapToMarker = function( marker, markersClusterer, zoom ) {
		markersClusterer.zoomToShowLayer( marker, () => {
			this.panTo( {
				map: markersClusterer._map,
				position: this.getMarkerPosition( marker ),
				zoom: zoom
			} );

			this.triggerOpenPopup( marker );
		} );
	}

	this.panTo = function( data ) {
		var zoom = ( data.zoom && data.zoom > data.map.getZoom() ) ? data.zoom : data.map.getZoom();
		data.map.flyTo( data.position, zoom );
	}

}
