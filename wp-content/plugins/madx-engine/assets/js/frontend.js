( function( $ ) {

	"use strict";

	var madxEngineRegisteredStores = window.madxEngineRegisteredStores || {};
	var madxEngineStores           = window.madxEngineStores || {};

	var madxEngine = {

		currentMonth: null,
		currentRequest: {},
		activeCalendarDay: null,
		lazyLoading: false,
		addedScripts: [],
		addedStyles: [],
		addedPostCSS: [],
		assetsPromises: [],

		initDone: false,

		commonInit: function() {

			$( document )
				.on( 'click.madxEngine', '.madx-calendar-nav__link', madxEngine.switchCalendarMonth )
				.on( 'click.madxEngine', '.madx-calendar-week__day-mobile-overlay', madxEngine.showCalendarEvent )
				.on( 'click.madxEngine', '.madx-listing-dynamic-link__link[data-delete-link="1"]', madxEngine.showConfirmDeleteDialog )
				.on( 'madx-filter-content-rendered', madxEngine.maybeReinitSlider )
				.on( 'click.madxEngine', '.madx-add-to-store', madxEngine.addToStore )
				.on( 'click.madxEngine', '.madx-remove-from-store', madxEngine.removeFromStore )
				.on( 'click.madxEngine', '.madx-engine-listing-overlay-wrap:not([data-url*="event=hover"])', madxEngine.handleListingItemClick )
				.on( 'madx-filter-content-rendered', madxEngine.filtersCompatibility )
				.on( 'click.madxEngine', '.madx-container[data-url]', madxEngine.handleContainerURL )
				.on( 'change.madxEngine', '.madx-listing-dynamic-link .qty', madxEngine.handleProductQuantityChange );

			$( window ).on( 'madx-popup/render-content/ajax/success', madxEngine.initStores );

			window.madxPlugins.hooks.addFilter(
				'madx-popup.show-popup.data',
				'madxEngine.popupData',
				( popupData, $popup, $triggeredBy ) => {

					if ( ! $triggeredBy ) {
						return popupData;
					}

					if ( $triggeredBy.data( 'popupIsmadxEngine' ) ) {
						popupData = madxEngine.preparemadxPopup( popupData, { 'is-madx-engine': true }, $triggeredBy );
					}

					return popupData;
				}
			);

			madxEngine.initStores();
			madxEngine.customUrlActions.init();

		},

		handleProductQuantityChange: function ( event ) {
			event.preventDefault();
			event.stopPropagation();

			const $this = $( this );

			$this.closest( ".madx-listing-dynamic-link" ).find( ".madx-woo-add-to-cart" ).data( "quantity", $this.val() ).attr( "data-quantity", $this.val() );
		},

		handleContainerURL: function() {
			var $this  = $( this ),
				url    = $this.data( 'url' ),
				target = $this.data( 'target' );

			if ( ! target ) {
				window.location = url;
			} else {
				window.open( url, '_blank' ).focus();
			}

		},

		filtersCompatibility: function( event, $provider, filtersInstance, providerType ) {

			if ( 'madx-engine' !== providerType ) {
				return;
			}

			var $blocksListing = $provider.closest( '.madx-listing-grid--blocks' );

			if ( $blocksListing.length ) {
				madxEngine.widgetListingGrid( $blocksListing );
			}

			if ( window.madxPopupFrontend && window.madxPopupFrontend.initAttachedPopups ) {
				window.madxPopupFrontend.initAttachedPopups( $provider );
			}
		},

		init: function() {

			var widgets = {
				'madx-listing-dynamic-field.default' : madxEngine.widgetDynamicField,
				'madx-listing-grid.default': madxEngine.widgetListingGrid,
			};

			$.each( widgets, function( widget, callback ) {
				window.madxartworkFrontend.hooks.addAction( 'frontend/element_ready/' + widget, callback );
			});

			// Re-init sliders in nested tabs
			window.madxartworkFrontend.elements.$window.on(
				'madxartwork/nested-tabs/activate',
				( event, content ) => {
					const $content = $( content );

					setTimeout( () => {
						madxEngine.maybeReinitSlider( event, $content );
						madxEngine.widgetDynamicField( $content );
					} );
				}
			);

			window.madxartworkFrontend.hooks.addFilter(
				'madx-popup/widget-extensions/popup-data',
				madxEngine.preparemadxPopup
			);

			window.madxPlugins.hooks.addFilter(
				'madx-popup.show-popup.data',
				'madxEngine.popupData',
				( popupData, $popup, $triggeredBy ) => {

					if ( ! $triggeredBy ) {
						return popupData;
					}

					if ( $triggeredBy.data( 'popupIsmadxEngine' ) ) {
						popupData = madxEngine.preparemadxPopup( popupData, { 'is-madx-engine': true }, $triggeredBy );
					}

					return popupData;
				}
			);

			madxEngine.updateAddedStyles();
		},

		initBricks: function( $scope ) {

			if ( window.bricksIsFrontend ) {
				return;
			}

			$scope = $scope || $( 'body' );
			madxEngine.initBlocks( $scope );

		},

		initBlocks: function( $scope ) {

			$scope = $scope || $( 'body' );

			window.madxPlugins.init( $scope, [
				{
					block: 'madx-engine/listing-grid',
					callback: madxEngine.widgetListingGrid
				},
				{
					block: 'madx-engine/dynamic-field',
					callback: madxEngine.widgetDynamicField
				}
			] );
		},

		initFrontStores: function( $scope ) {

			$scope = $scope || $( 'body' );

			$( '.madx-add-to-store.is-front-store', $scope ).each( function() {

				var $this = $( this ),
					args  = $this.data( 'args' ),
					store = madxEngineStores[ args.store.type ],
					count = 0;

				args = madxEngine.ensureJSON( args );

				if ( ! store ) {
					return;
				}

				if ( store.inStore( args.store.slug, '' + args.post_id ) ) {
					madxEngine.switchDataStoreStatus( $this );
				}

			} );

			$( '.madx-remove-from-store.is-front-store', $scope ).each( function() {

				var $this = $( this ),
					args  = $this.data( 'args' ),
					store = madxEngineStores[ args.store.type ],
					count = 0;

				args = madxEngine.ensureJSON( args );

				if ( ! store ) {
					return;
				}

				if ( ! store.inStore( args.store.slug, '' + args.post_id ) ) {
					$this.addClass( 'is-hidden' );
				} else {
					$this.removeClass( 'is-hidden' );
				}

			} );

		},

		initStores: function() {

			madxEngine.initFrontStores();

			$.each( madxEngineRegisteredStores, function( storeSlug, storeType ) {

				var store = madxEngineStores[ storeType ],
					storeData = null,
					count = 0;

				if ( ! store ) {
					return;
				}

				storeData = store.getStore( storeSlug );

				if ( storeData && storeData.length ) {
					count = storeData.length;
				}

				$( 'span.madx-engine-data-store-count[data-store="' + storeSlug + '"]' ).text( count );

			} );

			madxEngine.loadFrontStoresItems();

		},

		loadFrontStoresItems: function( $scope ) {

			$scope = $scope || $( 'body' );

			$( '.madx-listing-not-found.madx-listing-grid__items', $scope ).each( function() {

				var $this   = $( this ),
					nav     = $this.data( 'nav' ),
					isStore = $this.data( 'is-store-listing' ),
					query   = nav.query;

				nav = madxEngine.ensureJSON( nav );

				if ( query && query.post__in && query.post__in.length && 0 >= query.post__in.indexOf( 'is-front' ) ) {

					var storeType  = query.post__in[1],
						storeSlug  = query.post__in[2],
						store      = madxEngineStores[ storeType ],
						posts      = [],
						$container = $this.closest( '.madxartwork-widget-container' );

					if ( ! $container.length ) {
						$container = $this.closest( '.madx-listing-grid--blocks' );
					}

					if ( ! store ) {
						return;
					}

					posts = store.getStore( storeSlug );

					if ( ! posts.length ) {
						return;
					}

					query.post__in = posts;
					query.is_front_store = true;

					madxEngine.ajaxGetListing( {
						handler: 'get_listing',
						container: $container,
						masonry: false,
						slider: false,
						append: false,
						query: query,
						widgetSettings: nav.widget_settings,
					}, function( response ) {
						madxEngine.widgetListingGrid( $container );
					} );

				} else if ( isStore ) {
					$( document ).trigger( 'madx-listing-grid-init-store', $this );
				}

			} );
		},

		removeFromStore: function( event ) {

			event.preventDefault();
			event.stopPropagation();

			var $this = $( this ),
				args  = $this.data( 'args' ),
				isDataStoreBtn = $this.hasClass( 'madx-data-store-link' );

			args = madxEngine.ensureJSON( args );

			if ( args.store.is_front ) {

				var store = madxEngineStores[ args.store.type ],
					count = 0;

				if ( ! store ) {
					return;
				}

				if ( ! store.inStore( args.store.slug, '' + args.post_id ) ) {
					var storePosts = store.getStore( args.store.slug );
					count = storePosts.length;
				} else {
					count = store.remove( args.store.slug, args.post_id );
				}

				$( '.madx-add-to-store[data-store="' + args.store.slug + '"][data-post="' + args.post_id + '"]' ).each( function() {
					madxEngine.switchDataStoreStatus( $( this ), true );
				} );

				$( '.madx-data-store-link.madx-remove-from-store[data-store="' + args.store.slug + '"][data-post="' + args.post_id + '"]' ).each( function() {
					madxEngine.switchDataStoreStatus( $( this ), true );
				} );

				$( 'span.madx-engine-data-store-count[data-store="' + args.store.slug + '"]' ).text( count );

				if ( args.remove_from_listing ) {
					$this.closest( '.madx-listing-dynamic-post-' + args.post_id ).remove();
				}

				if ( args.synch_id ) {
					var $container     = $( '#' + args.synch_id ),
						$elemContainer = $container.find( '> .madxartwork-widget-container' ),
						$items         = $container.find( '.madx-listing-grid__items' ),
						posts          = [],
						nav            = $items.data( 'nav' ) || {},
						query          = nav.query || {};

					nav = madxEngine.ensureJSON( nav );

					posts = store.getStore( args.store.slug );

					if ( ! posts.length ) {
						posts = [ 'is-front', args.store.type, args.store.slug ];
					}

					query.post__in = posts;
					query.is_front_store = true;

					madxEngine.ajaxGetListing( {
						handler: 'get_listing',
						container: $elemContainer.length ? $elemContainer : $container,
						masonry: false,
						slider: false,
						append: false,
						query: query,
						widgetSettings: nav.widget_settings,
						postID: window.madxartworkFrontendConfig.post.id,
						elementID: $container.data( 'id' ),
					}, function( response ) {
						madxEngine.widgetListingGrid( $container );
					} );
				}

				$( document ).trigger( 'madx-engine-data-stores-on-remove', args );

				return;

			}

			$this.css( 'opacity', 0.3 );

			$.ajax({
				url: madxEngineSettings.ajaxurl,
				type: 'POST',
				dataType: 'json',
				data: {
					action: 'madx_engine_remove_from_store_' + args.store.slug,
					store: args.store.slug,
					post_id: args.post_id,
				},
			}).done( function( response ) {

				$this.css( 'opacity', 1 );

				if ( response.success ) {

					if ( ! isDataStoreBtn ) {
						$this.addClass( 'is-hidden' );
					}

					$( '.madx-add-to-store[data-store="' + args.store.slug + '"][data-post="' + args.post_id + '"]' ).each( function() {
						madxEngine.switchDataStoreStatus( $( this ), true );
					} );

					$( '.madx-data-store-link.madx-remove-from-store[data-store="' + args.store.slug + '"][data-post="' + args.post_id + '"]' ).each( function() {
						madxEngine.switchDataStoreStatus( $( this ), true );
					} );

					if ( args.synch_id ) {
						var $container     = $( '#' + args.synch_id ),
							$elemContainer = $container.find( '> .madxartwork-widget-container' ),
							$items         = $container.find( '.madx-listing-grid__items' ),
							nav            = $items.data( 'nav' ),
							query          = nav.query;

						nav = madxEngine.ensureJSON( nav );

						madxEngine.ajaxGetListing( {
							handler: 'get_listing',
							container: $elemContainer.length ? $elemContainer : $container,
							masonry: false,
							slider: false,
							append: false,
							query: query,
							widgetSettings: nav.widget_settings,
							postID: window.madxartworkFrontendConfig.post.id,
							elementID: $container.data( 'id' ),
						}, function( response ) {
							madxEngine.widgetListingGrid( $container );
						} );

					}

					if ( args.remove_from_listing ) {
						$this.closest( '.madx-listing-grid__item[data-post="' + args.post_id + '"]' ).remove();
					}

					if ( response.data.fragments ) {
						$.each( response.data.fragments, function( selector, value ) {
							$( selector ).html( value );
						} );
					}

					$( document ).trigger( 'madx-engine-data-stores-on-remove', args );

				} else {
					alert( response.data.message );
				}

				return response;

			} ).done( function( response ) {

				if ( args.remove_from_listing ) {
					$this.closest( '.madx-listing-grid__item' ).remove();
				}

				if ( response.success ) {
					$( 'span.madx-engine-data-store-count[data-store="' + args.store.slug + '"]' ).text( response.data.count );
				}

			} ).fail( function( jqXHR, textStatus, errorThrown ) {
				$this.css( 'opacity', 1 );
				alert( errorThrown );
			} );

		},

		triggerPopup: function( popupID, ismadxEngine, postID ) {

			if ( ! popupID ) {
				return;
			}

			var popupData = {
				popupId: 'madx-popup-' + popupID,
			};

			if ( ismadxEngine ) {
				popupData.ismadxEngine = true;
				popupData.postId      = postID;
			}

			$( window ).trigger( {
				type: 'madx-popup-open-trigger',
				popupData: popupData
			} );

		},

		addToStore: function( event ) {

			event.preventDefault();
			event.stopPropagation();

			var $this = $( this ),
				args  = $this.data( 'args' );

			args = madxEngine.ensureJSON( args );

			if ( $this.hasClass( 'in-store' ) ) {
				if ( args.popup ) {
					madxEngine.triggerPopup( args.popup, args.ismadxEngine, args.post_id );
				} else if ( '_blank' === $this.attr( 'target' ) ) {
					window.open( $this.attr( 'href' ) );
				} else {
					window.location = $this.attr( 'href' );
				}
				return;
			}

			if ( args.store.is_front ) {

				var store = madxEngineStores[ args.store.type ],
					count = 0;

				if ( ! store ) {
					return;
				}

				if ( store.inStore( args.store.slug, '' + args.post_id ) ) {
					var storePosts = store.getStore( args.store.slug );
					count = storePosts.length;
				} else {

					count = store.addToStore( args.store.slug, args.post_id, args.store.size );

					if ( false === count ) {
						return;
					}

				}

				if ( args.popup ) {
					madxEngine.triggerPopup( args.popup, args.ismadxEngine, args.post_id );
				}

				madxEngine.switchDataStoreStatus( $this );
				$( 'span.madx-engine-data-store-count[data-store="' + args.store.slug + '"]' ).text( count );
				$( '.madx-remove-from-store[data-store="' + args.store.slug + '"][data-post="' + args.post_id + '"]' ).removeClass( 'is-hidden' );

				if ( args.synch_id ) {
					var $container     = $( '#' + args.synch_id ),
						$elemContainer = $container.find( '> .madxartwork-widget-container' ),
						$items         = $container.find( '.madx-listing-grid__items' ),
						posts          = [],
						nav            = $items.data( 'nav' ) || {},
						query          = nav.query || {};

					nav = madxEngine.ensureJSON( nav );
					posts = store.getStore( args.store.slug );

					query.post__in = posts;
					query.is_front_store = true;

					madxEngine.ajaxGetListing( {
						handler: 'get_listing',
						container: $elemContainer.length ? $elemContainer : $container,
						masonry: false,
						slider: false,
						append: false,
						query: query,
						widgetSettings: nav.widget_settings,
						postID: window.madxartworkFrontendConfig.post.id,
						elementID: $container.data( 'id' ),
					}, function( response ) {
						madxEngine.widgetListingGrid( $container );
					} );
				}

				$( document ).trigger( 'madx-engine-data-stores-on-add', args );

				return;
			}

			$this.css( 'opacity', 0.3 );

			$( document ).trigger( 'madx-engine-on-add-to-store', [ $this, args ] );

			$.ajax({
				url: madxEngineSettings.ajaxurl,
				type: 'POST',
				dataType: 'json',
				data: {
					action: 'madx_engine_add_to_store_' + args.store.slug,
					store: args.store.slug,
					post_id: args.post_id,
				},
			}).done( function( response ) {

				$this.css( 'opacity', 1 );

				if ( response.success ) {

					madxEngine.switchDataStoreStatus( $this );
					$( '.madx-remove-from-store[data-store="' + args.store.slug + '"][data-post="' + args.post_id + '"]' ).removeClass( 'is-hidden' );

					if ( response.data.fragments ) {
						$.each( response.data.fragments, function( selector, value ) {
							$( selector ).html( value );
						} );
					}

					if ( args.synch_id ) {

						var $container     = $( '#' + args.synch_id ),
							$elemContainer = $container.find( '> .madxartwork-widget-container' ),
							$items         = $container.find( '.madx-listing-grid__items' ),
							nav            = $items.data( 'nav' ),
							query          = nav.query;

						nav = madxEngine.ensureJSON( nav );

						madxEngine.ajaxGetListing( {
							handler: 'get_listing',
							container: $elemContainer.length ? $elemContainer : $container,
							masonry: false,
							slider: false,
							append: false,
							query: query,
							widgetSettings: nav.widget_settings,
							postID: window.madxartworkFrontendConfig.post.id,
							elementID: $container.data( 'id' ),
						}, function( response ) {
							madxEngine.widgetListingGrid( $container );
						} );

					}

					if ( args.popup ) {
						madxEngine.triggerPopup( args.popup, args.ismadxEngine, args.post_id );
					}

				} else {
					alert( response.data.message );
				}

				$( document ).trigger( 'madx-engine-data-stores-on-add', args );

				return response;

			} ).done( function( response ) {

				if ( response.success ) {
					$( 'span.madx-engine-data-store-count[data-store="' + args.store.slug + '"]' ).text( response.data.count );
				}

			} ).fail( function( jqXHR, textStatus, errorThrown ) {
				$this.css( 'opacity', 1 );
				alert( errorThrown );
			} );

		},

		switchDataStoreStatus: function( $item, toInitial ) {

			var isDataStoreLink = $item.hasClass( 'madx-data-store-link' ),
				$label = $item.find( '.madx-listing-dynamic-link__label, .madx-data-store-link__label' ),
				$icon  = $item.find( '.madx-listing-dynamic-link__icon, .madx-data-store-link__icon' ),
				args   = $item.data( 'args' ),
				replaceLabel,
				replaceURL,
				replaceIcon;

			args = madxEngine.ensureJSON( args );

			toInitial = toInitial || false;

			if ( isDataStoreLink ) {

				switch ( args.action_after_added ) {
					case 'remove_from_store':

						if ( toInitial ) {
							$item.addClass( 'madx-add-to-store' );
							$item.removeClass( 'madx-remove-from-store' );

							$item.removeClass( 'in-store' );
						} else {
							$item.addClass( 'madx-remove-from-store' );
							$item.removeClass( 'madx-add-to-store' );

							$item.addClass( 'in-store' );

						}

						break;

					case 'hide':

						if ( toInitial ) {
							$item.removeClass( 'is-hidden' );
						} else {
							$item.addClass( 'is-hidden' );
						}

						return;
				}

			}

			if ( toInitial ) {
				replaceLabel = args.label;
				replaceIcon  = args.icon;
				replaceURL   = '#';
			} else {
				replaceLabel = args.added_label;
				replaceIcon  = args.added_icon;
				replaceURL   = args.added_url;
			}

			if ( $label.length ) {
				$label.replaceWith( replaceLabel );
			} else {
				$item.append( replaceLabel );
			}

			if ( $icon.length ) {
				$icon.replaceWith( replaceIcon );
			} else {
				$item.prepend( replaceIcon );
			}

			if ( isDataStoreLink && 'remove_from_store' === args.action_after_added ) {
				return;
			}

			$item.attr( 'href', replaceURL );

			if ( toInitial ) {
				$item.removeClass( 'in-store' );
			} else if ( ! $item.hasClass( 'in-store' ) ) {
				$item.addClass( 'in-store' );
			}


		},

		showConfirmDeleteDialog: function( event ) {
			event.preventDefault();
			event.stopPropagation();

			var $this = $( this );

			if ( window.confirm( $this.data( 'delete-message' ) ) ) {
				window.location = $this.attr( 'href' );
			}

		},

		handleListingItemClick: function( event ) {

			var url    = $( this ).data( 'url' ),
				target = $( this ).data( 'target' ) || false;

			if ( url ) {

				event.preventDefault();

				if ( window.madxartworkFrontend && window.madxartworkFrontend.isEditMode() ) {
					return;
				}

				if ( -1 !== url.indexOf( '#madx-engine-action' ) ) {

					madxEngine.customUrlActions.runAction( url );

				} else {

					if ( '_blank' === target ) {
						window.open( url );
						return;
					}

					window.location = url;
				}
			}

		},

		customUrlActions: {
			selectorOnClick: 'a[href^="#madx-engine-action"][href*="event=click"]',
			selectorOnHover: 'a[href^="#madx-engine-action"][href*="event=hover"], [data-url^="#madx-engine-action"][data-url*="event=hover"]',

			init: function() {
				var timeout = null;

				$( document ).on( 'click.madxEngine', this.selectorOnClick, function( event ) {
					event.preventDefault();
					madxEngine.customUrlActions.actionHandler( event )
				} );

				$( document ).on( 'click.madxEngine', this.selectorOnHover, function( event ) {
					if ( 'A' === event.currentTarget.nodeName ) {
						event.preventDefault();
					}
				} );

				$( document ).on( {
					'mouseenter.madxEngine': function( event ) {

						if ( timeout ) {
							clearTimeout( timeout );
						}

						timeout = setTimeout( function() {
							madxEngine.customUrlActions.actionHandler( event )
						}, window.madxEngineSettings.hoverActionTimeout );
					},
					'mouseleave.madxEngine': function() {
						if ( timeout ) {
							clearTimeout( timeout );
							timeout = null;
						}
					},
				}, this.selectorOnHover );
			},

			actions: {},

			addAction: function( name, callback ) {
				this.actions[ name ] = callback;
			},

			actionHandler: function( event ) {
				var url = $( event.currentTarget ).attr( 'href' ) || $( event.currentTarget ).attr( 'data-url' );

				this.runAction( url );
			},

			runAction: function( url ) {
				var queryParts = url.split( '&' ),
					settings = {};

				queryParts.forEach( function( item ) {
					if ( -1 !== item.indexOf( '=' ) ) {
						var pair = item.split( '=' );

						settings[ pair[0] ] = decodeURIComponent( pair[1] );
					}
				} );

				if ( ! settings.action ) {
					return;
				}

				var actionCb = this.actions[ settings.action ];

				if ( ! actionCb ) {
					return;
				}

				actionCb( settings );
			}
		},

		preparemadxPopup: function( popupData, widgetData, $scope ) {

			var postId = null;

			if ( widgetData['is-madx-engine'] ) {
				popupData['ismadxEngine'] = true;

				var $gridItems     = $scope.closest( '.madx-listing-grid__items' ),
					$gridItem      = $scope.closest( '.madx-listing-grid__item' ),
					$calendarItem  = $scope.closest( '.madx-calendar-week__day-event' ),
					$itemObject    = $scope.closest( '[data-item-object]' )

				if ( $gridItems.length ) {
					popupData['listingSource'] = $gridItems.data( 'listing-source' );
					popupData['listingId']     = $gridItems.data( 'listing-id' );
					popupData['queryId']       = $gridItems.data( 'query-id' );
				} else {

					var $queryItems    = $scope.closest( '[data-query-id]' ),
						$listingSource = $scope.closest( '[data-listing-source]' );

					if ( $queryItems.length ) {
						popupData['queryId'] = $queryItems.data( 'query-id' );
					}

					if ( $listingSource.length ) {
						popupData['listingSource'] = $listingSource.data( 'listing-source' );
					}
				}

				if ( $gridItem.length ) {
					popupData['postId'] = $gridItem.data( 'post-id' );
				} else if ( $calendarItem.length ) {
					popupData['postId'] = $calendarItem.data( 'post-id' );
				} else if ( $itemObject ) {
					popupData['postId'] = $itemObject.data( 'item-object' );
				} else if ( window.madxartworkFrontendConfig && window.madxartworkFrontendConfig.post ) {
					popupData['postId'] = window.madxartworkFrontendConfig.post.id;
				}

				if ( window.madxEngineFormsEditor && window.madxEngineFormsEditor.hasEditor ) {
					popupData['hasEditor'] = true;
				}

			}

			return popupData;

		},

		showCalendarEvent: function( event ) {

			var $this       = $( this ),
				$day        = $this.closest( '.madx-calendar-week__day' ),
				$week       = $day.closest( '.madx-calendar-week' ),
				$events     = $day.find( '.madx-calendar-week__day-content' ),
				activeClass = 'calendar-event-active';

			if ( $day.hasClass( activeClass ) ) {
				$day.removeClass( activeClass );
				madxEngine.activeCalendarDay.remove();
				madxEngine.activeCalendarDay = null;
				return;
			}

			if ( madxEngine.activeCalendarDay ) {
				madxEngine.activeCalendarDay.remove();
				$( '.' + activeClass ).removeClass( activeClass );
				madxEngine.activeCalendarDay = null;
			}

			$day.addClass( 'calendar-event-active' );

			madxEngine.activeCalendarDay = $( '<tr class="madx-calendar-week"><td colspan="7" class="madx-calendar-week__day madx-calendar-week__day-mobile"><div class="madx-calendar-week__day-mobile-event">' + $events.html() + '</div></td></tr>' );

			// Need for re-init popup events
			madxEngine.activeCalendarDay.find( '.madx-popup-attach-event-inited' ).removeClass( 'madx-popup-attach-event-inited' );
			madxEngine.initElementsHandlers( madxEngine.activeCalendarDay );

			madxEngine.activeCalendarDay.insertAfter( $week );

		},

		widgetListingGrid: function( $scope ) {

			var widgetID    = $scope.closest( '.madxartwork-widget' ).data( 'id' ),
				$wrapper    = $scope.find( '.madx-listing-grid' ).first(),
				hasLazyLoad = $wrapper.hasClass( 'madx-listing-grid--lazy-load' ),
				$listing    = $scope.find( '.madx-listing-grid__items' ).first(),
				$slider     = $listing.parent( '.madx-listing-grid__slider' ),
				$masonry    = $listing.hasClass( 'madx-listing-grid__masonry' ) ? $listing : false,
				navSettings = $listing.data( 'nav' ),
				masonryGrid = false,
				listingType = 'madxartwork';

			navSettings = madxEngine.ensureJSON( navSettings );

			if ( hasLazyLoad ) {

				var lazyLoadOptions = $wrapper.data( 'lazy-load' ),
					widgetSettings = {},
					$container = $scope.find( '.madxartwork-widget-container' );

				// Get widget settings from `madxartworkFrontend` in Editor.
				if ( window.madxartworkFrontend && window.madxartworkFrontend.isEditMode()
					&& $wrapper.closest( '.madxartwork[data-madxartwork-type]' ).hasClass( 'madxartwork-edit-mode' )
				) {
					widgetSettings = madxEngine.getEditorElementSettings( $scope.closest( '.madxartwork-widget' ) );
					widgetID       = false; // for avoid get widget settings from document in editor
				}

				if ( ! $container.length ) {
					$container = $scope;
					widgetSettings = $scope.data( 'widget-settings' );
				}

				if ( ! widgetID ) {
					widgetID    = $scope.data( 'element-id' );
					listingType = $scope.data( 'listing-type' );
				}

				madxEngine.lazyLoadListing( {
					container:      $container,
					elementID:      widgetID,
					postID:         lazyLoadOptions.post_id,
					queriedID:      lazyLoadOptions.queried_id || false,
					offset:         lazyLoadOptions.offset || '0px',
					query:          lazyLoadOptions.query || {},
					listingType:    listingType,
					widgetSettings: widgetSettings,
					extraProps:     lazyLoadOptions.extra_props || false,
				} );

				return;
			}

			if ( $slider.length ) {
				madxEngine.initSlider( $slider );
			}

			if ( $masonry && $masonry.length ) {

				madxEngine.initMasonry( $masonry );

				/* Keep masonry re-init for Bricks */
				if ( $scope.hasClass( 'brxe-madx-engine-listing-grid' ) ) {
					$( window ).on( 'load', function() {
						madxEngine.runMasonry( $masonry );
					} );
				}

			}

			if ( navSettings && navSettings.enabled ) {

				madxEngine.loadMoreListing( {
					container: $listing,
					settings:  navSettings,
					masonry:   $masonry,
					slider:    $slider,
				} );

			}

			// Init elements handlers in editor.
			if ( window.madxartworkFrontend && window.madxartworkFrontend.isEditMode()
				&& $wrapper.closest( '.madxartwork-element-edit-mode' ).length
			) {
				madxEngine.initElementsHandlers( $wrapper );
			}

		},

		initMasonry: function( $masonry ) {
			imagesLoaded( $masonry, function() {
				madxEngine.runMasonry( $masonry );
			} );
		},

		runMasonry: function( $masonry ) {
			var $eWidget = $masonry.closest( '.madxartwork-widget' ),
				$items  = $( '> .madx-listing-grid__item', $masonry ),
				options = $masonry.data( 'masonry-grid-options' );

			options = madxEngine.ensureJSON( options );

			// Reset masonry
			$items.css( {
				marginTop: ''
			} );

			// Bricks margin
			const { gap } = options;
			let margin = null;

			if ( gap ) {
				margin = {
					x: +gap.horizontal,
					y: +gap.vertical,
				};
			}

			var args = {
				container: $masonry[0],
				margin: margin ? margin : 0,
			};

			if ( $eWidget.length ) {
				var settings     = madxEngine.getmadxartworkElementSettings( $eWidget ),
					breakpoints  = {},
					eBreakpoints = window.madxartworkFrontend.config.responsive.activeBreakpoints;

				args.columns = settings.columns_widescreen ? +settings.columns_widescreen : +settings.columns;

				Object.keys( eBreakpoints ).reverse().forEach( function( breakpointName ) {

					if ( settings['columns_' + breakpointName] ) {
						if ( 'widescreen' === breakpointName ) {
							breakpoints[eBreakpoints[breakpointName].value - 1] = +settings['columns'];
						} else {
							breakpoints[eBreakpoints[breakpointName].value] = +settings['columns_' + breakpointName];
						}
					}

				} );

				args.breakAt = breakpoints;

			} else {
				args.columns = options.columns.desktop;
				args.breakAt = {
					1025: options.columns.tablet,
					768:  options.columns.mobile,
				};
			}

			var masonryInstance = Macy( args );

			masonryInstance.runOnImageLoad( function () {
				masonryInstance.recalculate( true );
			}, true );

			// Event to recalculate current masonry listings.
			$masonry.on( 'madx-engine/listing/recalculate-masonry-listing', function() {
				masonryInstance.runOnImageLoad( function () {
					masonryInstance.recalculate( true );
				}, true );
			} );

			// Event to recalculate all masonry listings.
			$( document ).on( 'madx-engine/listing/recalculate-masonry', function() {
				masonryInstance.recalculate( true );
			} );

		},

		ajaxGetListing: function( options, doneCallback, failCallback ) {

			var container = options.container || false,
				handler = options.handler || false,
				masonry = options.masonry || false,
				slider = options.slider || false,
				append = options.append || false,
				query = options.query || {},
				widgetSettings = options.widgetSettings || {},
				postID = options.postID || false,
				queriedID = options.queriedID || false,
				elementID = options.elementID || false,
				page = options.page || 1,
				preventCSS = options.preventCSS || false,
				listingType = options.listingType || false,
				extraProps = options.extraProps || false,
				isEditMode = window.madxartworkFrontend && window.madxartworkFrontend.isEditMode();

			doneCallback = doneCallback || function( response ) {};

			if ( ! container|| ! handler ) {
				return;
			}

			if ( ! preventCSS ) {
				container.css({
					pointerEvents: 'none',
					opacity: '0.5',
					cursor: 'default',
				});
			}

			var requestData = {
					action: 'madx_engine_ajax',
					handler: handler,
					query: query,
					widget_settings: widgetSettings,
					page_settings: {
						post_id: postID,
						queried_id: queriedID,
						element_id: elementID,
						page: page,
					},
					listing_type: listingType,
					isEditMode: isEditMode,
					addedPostCSS: madxEngine.addedPostCSS
				};

			if ( extraProps ) {
				Object.assign( requestData, extraProps );
			}

			$.ajax({
				url: madxEngineSettings.ajaxlisting,
				type: 'POST',
				dataType: 'json',
				data: requestData,
			}).done( function( response ) {

				// container.removeAttr( 'style' );

				// Manual reset container style to prevent removal of masonry styles.
				if ( !preventCSS ) {
					container.css( {
						pointerEvents: '',
						opacity: '',
						cursor: '',
					} );
				}

				if ( response.success ) {

					madxEngine.enqueueAssetsFromResponse( response );

					container.data( 'page', page );

					var $html = $( response.data.html );

					madxEngine.initFrontStores( $html );

					if ( slider && slider.length ) {

						var $slider = slider.find( '> .madx-listing-grid__items' );

						if ( ! $slider.hasClass( 'slick-initialized' ) ) {

							if ( append ) {
								container.append( $html );
							} else {
								container.html( $html );
							}

							var itemsCount = container.find( '> .madx-listing-grid__item' ).length;

							slider.addClass( 'madx-listing-grid__slider' );
							madxEngine.initSlider( slider, { itemsCount: itemsCount } );

						} else {
							$html.each( function( index, el ) {
								$slider.slick( 'slickAdd', el );
							});
						}

					} else {

						if ( append ) {
							container.append( $html );
						} else {
							container.html( $html );
						}

						if ( masonry && masonry.length ) {
							//madxEngine.initMasonry( masonry );
							masonry.trigger( 'madx-engine/listing/recalculate-masonry-listing' );
						}

					}

					Promise.all( madxEngine.assetsPromises ).then( function() {
						madxEngine.initElementsHandlers( $html );
						madxEngine.assetsPromises = [];
					} );

					if ( response.data.fragments ) {
						for ( var selector in response.data.fragments ) {
							var $selector = $( selector );

							if ( $selector.length ) {
								$selector.html( response.data.fragments[ selector ] );
							}
						}
					}
				}

			} ).done( doneCallback ).fail( function() {
				container.removeAttr( 'style' );
				if ( failCallback ) {
					failCallback.call();
				}

			} );

		},

		loadMoreListing: function( args ) {

			var instance = {

				setup: function() {
					this.container = args.container;
					this.masonry   = args.masonry;
					this.slider    = args.slider;
					this.settings  = args.settings;

					this.wrapper = this.container.closest( '.madx-listing-grid' );

					this.type  = this.settings.type || 'click';
					this.page  = parseInt( this.container.data( 'page' ), 10 ) || 0;
					this.pages = parseInt( this.container.data( 'pages' ), 10 ) || 0;
				},

				init: function() {

					this.setup();

					switch ( this.type ) {
						case 'click':

							this.handleMore();

							break;

						case 'scroll':

							if ( ( ! window.madxartworkFrontend || ! window.madxartworkFrontend.isEditMode() ) && ! this.slider.length ) {
								this.handleInfiniteScroll();
							}

							break;
					}
				},

				handleMore: function() {

					if ( ! this.settings.more_el ) {
						return;
					}

					var self    = this,
						$button = $( this.settings.more_el );

					if ( ! $button.length ) {
						return;
					}

					if ( this.page === this.pages && ! window.madxartwork ) {
						$button.css( 'display', 'none' );
					} else {
						$button.removeAttr( 'style' );
					}

					$( document )
						.off( 'click', this.settings.more_el )
						.on( 'click', this.settings.more_el, function( event ) {
							event.preventDefault();

							$button.css( {
								pointerEvents: 'none',
								opacity: '0.5',
								cursor: 'default',
							} );

							self.ajaxGetItems( function( response ) {
									$button.removeAttr( 'style' );

									if ( response.success && self.page === self.pages ) {
										$button.css( 'display', 'none' );
									}
								}, function() {
									$button.button.removeAttr( 'style' );
								}
							);
						} );
				},

				handleInfiniteScroll: function() {

					if ( this.container.hasClass( 'madx-listing-not-found' ) ) {
						return;
					}

					if ( this.page === this.pages ) {
						return;
					}

					var self     = this,
						$trigger = this.wrapper.find( '.madx-listing-grid__loader' ),
						offset   = '0%';

					if ( ! $trigger.length ) {
						$trigger = $( '<div>', {
							class: 'madx-listing-grid__loading-trigger'
						} );

						this.wrapper.append( $trigger );
					}

					// Prepare offset value.
					if ( this.settings.widget_settings && this.settings.widget_settings.load_more_offset ) {
						var offsetValue = this.settings.widget_settings.load_more_offset;

						switch ( typeof offsetValue ) {
							case 'object':
								var size = offsetValue.size ? offsetValue.size : '0',
									unit = offsetValue.unit ? offsetValue.unit : 'px';

								offset = size + unit;
								break;

							case 'number':
							case 'string':
								offset = offsetValue + 'px';
								break;
						}
					}

					var observer = new IntersectionObserver(
						function( entries, observer ) {

							if ( entries[0].isIntersecting ) {

								self.ajaxGetItems( function() {

									// Re-init observer if the last page is not loaded
									if ( self.page !== self.pages ) {
										setTimeout( function() {
											observer.observe( entries[0].target );
										}, 250 );
									}

								} );

								// Detach observer
								observer.unobserve( entries[0].target );
							}
						},
						{
							rootMargin: '0% 0% ' + offset + ' 0%',
						}
					);

					observer.observe( $trigger[0] );
				},

				ajaxGetItems: function( doneCallback, failCallback ) {
					var self = this;

					this.page++;

					this.wrapper.addClass( 'madx-listing-grid-loading' );

					madxEngine.ajaxGetListing( {
							handler:        'listing_load_more',
							container:      this.container,
							masonry:        this.masonry,
							slider:         this.slider,
							append:         true,
							query:          this.settings.query,
							widgetSettings: this.settings.widget_settings,
							page:           this.page,
							preventCSS:     !! this.wrapper.find( '.madx-listing-grid__loader' ).length, // Prevent CSS if listing has the loader.
						}, function( response ) {

							madxEngine.lazyLoading = false;
							self.wrapper.removeClass( 'madx-listing-grid-loading' );

							if ( doneCallback ) {
								doneCallback( response );
							}

							$( document ).trigger( 'madx-engine/listing-grid/after-load-more', [args, response] );

						}, function() {

							madxEngine.lazyLoading = false;
							self.wrapper.removeClass( 'madx-listing-grid-loading' );

							if ( failCallback ) {
								failCallback();
							}

					} );
				},
			};

			instance.init();
		},

		lazyLoadListing: function( args ) {

			var $wrapper = args.container.find( '.madx-listing-grid' ),
				observer = new IntersectionObserver(
					function( entries, observer ) {

						if ( entries[0].isIntersecting ) {

							madxEngine.lazyLoading = true;

							if ( ! $wrapper.length ) {
								$wrapper = args.container;
							}

							$wrapper.addClass( 'madx-listing-grid-loading' );

							madxEngine.ajaxGetListing( {
								handler: 'get_listing',
								container: args.container,
								masonry: false,
								slider: false,
								append: false,
								elementID: args.elementID,
								postID: args.postID,
								queriedID: args.queriedID,
								query: args.query,
								widgetSettings: args.widgetSettings,
								listingType: args.listingType,
								preventCSS: true,
								extraProps: args.extraProps,
							}, function( response ) {

								$wrapper.removeClass( 'madx-listing-grid-loading' );

								var $widget = args.container.closest( '.madxartwork-widget' );

								if ( ! $widget.length ) {
									$widget = args.container.closest( '.madx-listing-grid--blocks' );
								}

								if ( ! $widget.length ) {
									$widget = args.container;
								}

								if ( $widget.length ) {
									$widget.find( '.madx-listing-grid' ).removeClass( 'madx-listing-grid--lazy-load' );
								}

								madxEngine.widgetListingGrid( $widget );
								madxEngine.loadFrontStoresItems( $widget );
								madxEngine.lazyLoading = false;

								var needReInitFilters = false,
									isEditMode = window.madxartworkFrontend && window.madxartworkFrontend.isEditMode();

								if ( ! isEditMode && window.madxSmartFilterSettings ) {

									if ( response.data.filters_data ) {
										$.each( response.data.filters_data, function( param, data ) {
											if ( window.madxSmartFilterSettings[ param ]['madx-engine'] ) {
												window.madxSmartFilterSettings[ param ]['madx-engine'] = $.extend(
													{},
													window.madxSmartFilterSettings[ param ]['madx-engine'],
													data
												);
											} else {
												window.madxSmartFilterSettings[ param ]['madx-engine'] = data;
											}
										});

										needReInitFilters = true;
									}

									if ( response.data.indexer_data ) {
										const {
											provider = false,
											query = {}
										} = response.data.indexer_data;

										window.madxSmartFilters.setIndexedData( provider, query );
									}
								}

								// ReInit filters
								if ( needReInitFilters && window.madxSmartFilters ) {
									window.madxSmartFilters.reinitFilters();
								}

								$( document ).trigger( 'madx-engine/listing-grid/after-lazy-load', [ args, response ] );

							}, function() {
								madxEngine.lazyLoading = false;

								if ( ! $wrapper.length ) {
									$wrapper = args.container;
								}

								$wrapper.removeClass( 'madx-listing-grid-loading' );
							} );

							// Detach observer after the first load the listing
							observer.unobserve( entries[0].target );
						}
					},
					{
						rootMargin: '0% 0% ' + args.offset + ' 0%'
					}
				);

			observer.observe( args.container[0] );
		},

		ensureJSON: function( maybeJSON ) {

			if ( ! maybeJSON ) {
				return maybeJSON;
			}

			if ( 'string' === typeof maybeJSON ) {
				console.log( maybeJSON );
				//maybeJSON = JSON.parse( maybeJSON );
			}

			return maybeJSON;

		},

		initSlider: function( $slider, customOptions ) {
			var $eWidget    = $slider.closest( '.madxartwork-widget' ),
				options     = $slider.data( 'slider_options' ),
				windowWidth = $( window ).width(),
				tabletBP    = 1025,
				mobileBP    = 768,
				tabletSlides, mobileSlides, defaultOptions, slickOptions;

			options = madxEngine.ensureJSON( options );

			customOptions = customOptions || {};

			options = $.extend( {}, options, customOptions );

			if ( $eWidget.length ) {

				var settings     = madxEngine.getmadxartworkElementSettings( $eWidget ),
					responsive   = [],
					deviceMode   = madxartworkFrontend.getCurrentDeviceMode(),
					eBreakpoints = window.madxartworkFrontend.config.responsive.activeBreakpoints;

				options.slidesToShow = settings.columns_widescreen ? +settings.columns_widescreen : +settings.columns;

				Object.keys( eBreakpoints ).reverse().forEach( function( breakpointName ) {

					if ( settings['columns_' + breakpointName] ) {

						if ( 'widescreen' === breakpointName ) {

							responsive.push( {
								breakpoint: eBreakpoints[breakpointName].value,
								settings: {
									slidesToShow: +settings['columns'],
								}
							} );

						} else {
							var breakpointSettings = {
									breakpoint: eBreakpoints[breakpointName].value + 1,
									settings:   {
										slidesToShow: +settings['columns_' + breakpointName],
									}
								};

							if ( options.slidesToScroll > breakpointSettings.settings.slidesToShow ) {
								breakpointSettings.settings.slidesToScroll = breakpointSettings.settings.slidesToShow;
							}

							// if ( 'mobile' === breakpointName ) {
							// 	breakpointSettings.settings.slidesToScroll = 1;
							// }

							responsive.push( breakpointSettings );
						}
					}

				} );

				options.responsive = responsive;

			} else {

				// Ensure we have at least some options to avoid errors
				if ( ! options.slidesToShow ) {
					options.slidesToShow = {
						desktop: 3,
						tablet: 1,
						mobile: 1,
					}
				}

				if ( options.itemsCount <= options.slidesToShow.desktop && windowWidth >= tabletBP ) { // 1025 - ...
					$slider.removeClass( 'madx-listing-grid__slider' );
					return;
				} else if ( options.itemsCount <= options.slidesToShow.tablet && tabletBP > windowWidth && windowWidth >= mobileBP ) { // 768 - 1024
					$slider.removeClass( 'madx-listing-grid__slider' );
					return;
				} else if ( options.itemsCount <= options.slidesToShow.mobile && windowWidth < mobileBP ) { // 0 - 767
					$slider.removeClass( 'madx-listing-grid__slider' );
					return;
				}

				if ( options.slidesToShow.tablet ) {
					tabletSlides = options.slidesToShow.tablet;
				} else {
					tabletSlides = 1 === options.slidesToShow.desktop ? 1 : 2;
				}

				if ( options.slidesToShow.mobile ) {
					mobileSlides = options.slidesToShow.mobile;
				} else {
					mobileSlides = 1;
				}

				options.slidesToShow = options.slidesToShow.desktop;

				options.responsive = [
					{
						breakpoint: 1025,
						settings: {
							slidesToShow: tabletSlides,
							slidesToScroll: options.slidesToScroll > tabletSlides ? tabletSlides : options.slidesToScroll
						}
					},
					{
						breakpoint: 768,
						settings: {
							slidesToShow: mobileSlides,
							slidesToScroll: 1
						}
					}
				];
			}

			defaultOptions = {
				customPaging: function( slider, i ) {
					return $( '<span />' ).text( i + 1 ).attr( 'role', 'tab' );
				},
				slide: '.madx-listing-grid__item',
				dotsClass: 'madx-slick-dots',
			};

			slickOptions = $.extend( {}, defaultOptions, options );

			var $sliderItems = $slider.find( '> .madx-listing-grid__items' );

			if ( slickOptions.infinite ) {
				$sliderItems.on( 'init', function() {
					var $items        = $( this ),
						$clonedSlides = $( '> .slick-list > .slick-track > .slick-cloned.madx-listing-grid__item', $items );

					if ( !$clonedSlides.length ) {
						return;
					}

					madxEngine.initElementsHandlers( $clonedSlides );
				} );
			}

			if ( $sliderItems.hasClass( 'slick-initialized' ) ) {
				$sliderItems.slick( 'refresh', true );
				return;
			}

			if ( slickOptions.variableWidth ) {
				slickOptions.slidesToShow = 1;
				slickOptions.slidesToScroll = 1;
				slickOptions.responsive = null;
			}

			$sliderItems.slick( slickOptions );
		},

		maybeReinitSlider: function( event, $scope ) {
			var $slider = $scope.find( '.madx-listing-grid__slider' );

			if ( $slider.length ) {
				$slider.each( function() {
					madxEngine.initSlider( $( this ) );
				} );
			}
		},

		widgetDynamicField: function( $scope ) {

			var $slider = $scope.find( '.madx-engine-gallery-slider' );

			if ( $slider.length ) {
				if ( $.isFunction( $.fn.imagesLoaded ) ) {
					$slider.imagesLoaded().always( function( instance ) {

						var $eWidget = $slider.closest( '.madxartwork-widget' );

						if ( $slider.hasClass( 'slick-initialized' ) ) {
							$slider.slick( 'refresh', true );
						} else {
							var atts = $slider.data( 'atts' );

							atts = madxEngine.ensureJSON( atts );

							if ( $eWidget.length ) {
								var settings     = madxEngine.getmadxartworkElementSettings( $scope ),
									eBreakpoints = window.madxartworkFrontend.config.responsive.activeBreakpoints,
									responsive   = [];

								if ( settings.img_slider_cols || settings.img_slider_cols_widescreen ) {
									atts.slidesToShow = settings.img_slider_cols_widescreen ? +settings.img_slider_cols_widescreen : +settings.img_slider_cols;
								}

								Object.keys( eBreakpoints ).reverse().forEach( function( breakpointName ) {

									if ( settings['img_slider_cols_' + breakpointName] ) {

										if ( 'widescreen' === breakpointName ) {

											responsive.push( {
												breakpoint: eBreakpoints[breakpointName].value,
												settings:   {
													slidesToShow: +settings['img_slider_cols'],
												}
											} );

										} else {
											var breakpointSettings = {
												breakpoint: eBreakpoints[breakpointName].value + 1,
												settings:   {
													slidesToShow: +settings['img_slider_cols_' + breakpointName],
												}
											};

											responsive.push( breakpointSettings );
										}
									}

								} );

								atts.responsive = responsive;
							}

							$slider.slick( atts );
						}
					} );
				}
			}

			$slider.on('init', function (event, slick) {

				const slider = event.target;

				if (!slider.classList.contains('madx-engine-gallery-lightbox')) {
					return;
				}

				let lightbox = new PhotoSwipeLightbox({
					mainClass: 'brx',
					gallery: slider,
					children: 'a',
					showHideAnimationType: 'none',
					zoomAnimationDuration: false,
					pswpModule: PhotoSwipe5,
				});

				lightbox.addFilter('numItems', numItems => slick.slideCount);

				lightbox.addFilter('clickedIndex', function (clickedIndex, e) {
					const slide = e.target.closest('.slick-slide');

					if (!slide) {
						return clickedIndex;
					}

					if (clickedIndex >= slick.slideCount) {
						return clickedIndex % slick.slideCount;
					}

					return clickedIndex;
				});

				lightbox.addFilter('thumbEl', (thumbnail, itemData, index) => {
					return thumbnail;
				});

				lightbox.addFilter('thumbBounds', (thumbBounds, itemData, index) => {
					return thumbBounds;
				});

				lightbox.init();
			});

		},

		switchCalendarMonth: function( $event ) {

			var $this     = $( this ),
				$calendar = $this.closest( '.madx-calendar' ),
				$widget   = $calendar.closest( '.madxartwork-widget-container' ),
				settings  = $calendar.data( 'settings' ),
				post      = $calendar.data( 'post' ),
				month     = $this.data( 'month' );

			settings = madxEngine.ensureJSON( settings );

			// Context Gutenberg
			if ( ! $widget.length ) {
				$widget = $calendar.closest( '.madx-listing-calendar-block' )
			}

			// Context Bricks
			if ( ! $widget.length ) {
				$widget = $calendar.closest( '.brxe-madx-listing-calendar' )
			}

			$calendar.addClass( 'madx-calendar-loading' );

			madxEngine.currentRequest = {
				madx_engine_action: 'madx_engine_calendar_get_month',
				month: month,
				settings: settings,
				post: post,
			};

			$( document ).trigger( 'madx-engine-request-calendar' );

			$.ajax({
				url: madxEngineSettings.ajaxlisting,
				type: 'POST',
				dataType: 'json',
				data: madxEngine.currentRequest,
			}).done( function( response ) {
				if ( response.success ) {
					$calendar.replaceWith( response.data.content );
					madxEngine.initElementsHandlers( $widget );
				}
				$calendar.removeClass( 'madx-calendar-loading' );
			} );
		},

		initElementsHandlers: function( $selector ) {

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

			if ( window.madxartworkFrontend ) {
				const madxartworkLazyLoad = new Event( "madxartwork/lazyload/observe" );
				document.dispatchEvent( madxartworkLazyLoad );
			}

			if ( window.madxPopupFrontend && window.madxPopupFrontend.initAttachedPopups ) {
				window.madxPopupFrontend.initAttachedPopups( $selector );
			}

		},

		getmadxartworkElementSettings: function( $scope ) {

			if ( window.madxartworkFrontend && window.madxartworkFrontend.isEditMode() && $scope.hasClass( 'madxartwork-element-edit-mode' ) ) {
				return madxEngine.getEditorElementSettings( $scope );
			}

			return $scope.data( 'settings' ) || {};
		},

		getEditorElementSettings: function( $scope ) {
			var modelCID = $scope.data( 'model-cid' ),
				elementData;

			if ( ! modelCID ) {
				return {};
			}

			if ( ! window.madxartworkFrontend.hasOwnProperty( 'config' ) ) {
				return {};
			}

			if ( ! window.madxartworkFrontend.config.hasOwnProperty( 'elements' ) ) {
				return {};
			}

			if ( ! window.madxartworkFrontend.config.elements.hasOwnProperty( 'data' ) ) {
				return {};
			}

			elementData = window.madxartworkFrontend.config.elements.data[ modelCID ];

			if ( ! elementData ) {
				return {};
			}

			return elementData.toJSON();
		},

		debounce: function( threshold, callback ) {
			var timeout;

			return function debounced( $event ) {
				function delayed() {
					callback.call( this, $event );
					timeout = null;
				}

				if ( timeout ) {
					clearTimeout( timeout );
				}

				timeout = setTimeout( delayed, threshold );
			};
		},

		updateAddedStyles: function() {
			if ( window.madxEngineSettings && window.madxEngineSettings.addedPostCSS ) {
				$.each( window.madxEngineSettings.addedPostCSS, function( ind, cssID ) {
					madxEngine.addedStyles.push( 'madxartwork-post-' + cssID );
					madxEngine.addedPostCSS.push( cssID );
				} );
			}
		},

		enqueueAssetsFromResponse: function( response ) {
			if ( response.data.scripts ) {
				madxEngine.enqueueScripts( response.data.scripts );
			}

			if ( response.data.styles ) {
				madxEngine.enqueueStyles( response.data.styles );
			}
		},

		enqueueScripts: function( scripts ) {
			$.each( scripts, function( handle, scriptHtml ) {
				madxEngine.enqueueScript( handle, scriptHtml )
			} );
		},

		enqueueStyles: function( styles ) {
			$.each( styles, function( handle, styleHtml ) {
				madxEngine.enqueueStyle( handle, styleHtml )
			} );
		},

		enqueueScript: function( handle, scriptHtml ) {

			if ( -1 !== madxEngine.addedScripts.indexOf( handle ) ) {
				return;
			}

			if ( ! scriptHtml ) {
				return;
			}

			var selector = 'script[id="' + handle + '-js"]';

			if ( $( selector ).length ) {
				return;
			}

			//$( 'body' ).append( scriptHtml );

			var scriptsTags = scriptHtml.match( /<script[\s\S]*?<\/script>/gm );
			
			if ( scriptsTags.length ) {

				for ( var i = 0; i < scriptsTags.length; i++ ) {

					madxEngine.assetsPromises.push(
						new Promise( function( resolve, reject ) {

							var $tag = $( scriptsTags[i] );

							if ( $tag[0].src ) {

								var tag = document.createElement( 'script' );

								tag.type   = $tag[0].type;
								tag.src    = $tag[0].src;
								tag.id     = $tag[0].id;
								tag.async  = false;
								tag.onload = function() {
									resolve();
								};

								document.body.append( tag );
							} else {
								$( 'body' ).append( scriptsTags[i] );
								resolve();
							}
						} )
					);
				}
			}

			madxEngine.addedScripts.push( handle );
		},

		enqueueStyle: function( handle, styleHtml ) {

			if ( -1 !== handle.indexOf( 'google-fonts' ) ) {
				madxEngine.enqueueGoogleFonts( handle, styleHtml );
				return;
			}

			if ( -1 !== madxEngine.addedStyles.indexOf( handle ) ) {
				return;
			}

			var selector = 'link[id="' + handle + '-css"],style[id="' + handle + '"]';

			if ( $( selector ).length ) {
				return;
			}

			$( 'head' ).append( styleHtml );

			madxEngine.addedStyles.push( handle );

			if ( -1 !== handle.indexOf( 'madxartwork-post' ) ) {
				var postID = handle.replace( 'madxartwork-post-', '' );
				madxEngine.addedPostCSS.push( postID );
			}
		},

		enqueueGoogleFonts: function( handle, styleHtml ) {

			var selector = 'link[id="' + handle + '-css"]';

			if ( $( selector ).length ) {}

			$( 'head' ).append( styleHtml );
		},

		filters: ( function() {

			var callbacks = {};

			return {

				addFilter: function( name, callback ) {

					if ( ! callbacks.hasOwnProperty( name ) ) {
						callbacks[name] = [];
					}

					callbacks[name].push(callback);

				},

				applyFilters: function( name, value, args ) {

					if ( ! callbacks.hasOwnProperty( name ) ) {
						return value;
					}

					if ( args === undefined ) {
						args = [];
					}

					var container = callbacks[ name ];
					var cbLen     = container.length;

					for (var i = 0; i < cbLen; i++) {
						if (typeof container[i] === 'function') {
							value = container[i](value, args);
						}
					}

					return value;
				}

			};

		})()

	};

	$( window ).on( 'madxartwork/frontend/init', madxEngine.init );

	window.madxEngine = madxEngine;

	madxEngine.commonInit();

	window.addEventListener( 'DOMContentLoaded', function() {
		madxEngine.initBlocks();
		madxEngine.initDone = true;
	} );

	window.madxEngineBricks = function() {
		madxEngine.initBricks();
	}

	$( window ).trigger( 'madx-engine/frontend/loaded' );

}( jQuery ) );
