(function( $ ) {

	"use strict";

	var madxEnginemadxartworkPreview = {

		selectors: {
			document: '.madxartwork[data-madxartwork-type="madx-listing-items"]',
			newLising: '.madx-new-listing-item',
		},

		init: function() {

			window.madxartworkFrontend.hooks.addAction( 'frontend/element_ready/madx-listing-grid.default', madxEnginemadxartworkPreview.loadHandles );

			$( document ).on( 'madx-engine/listing-grid/after-lazy-load', madxEnginemadxartworkPreview.loadHandlesOnLazyLoad );

			window.madxartworkFrontend.on( 'components:init', function () {
				window.madxartwork.on( 'document:loaded', function () {
					madxEnginemadxartworkPreview.loadBackHandles();
				} );
			});

			$( document )
				.on( 'click', '.madx-engine-document-handle',      madxEnginemadxartworkPreview.documentHandleClick )
				.on( 'click', '.madx-engine-document-back-handle', madxEnginemadxartworkPreview.documentBackHandleClick );


			// Re-Init the masonry js on change the columns setting
			window.madxartwork.on( 'document:loaded', () => {
				window.madxartwork.channels.editor.on(
					'change:madx-listing-grid',
					madxEnginemadxartworkPreview.reInitMasonryOnChangeColumns
				);
			} );
		},

		reInitMasonryOnChangeColumns: function( childView, editedElement ) {

			const settingName = childView.model.get( 'name' );

			if ( 'columns' !== settingName && -1 === settingName.indexOf( 'columns_' ) ) {
				return;
			}

			if ( ! editedElement.model.getSetting( 'is_masonry' ) ) {
				return;
			}

			const $masonry = editedElement.$el.find( '.madx-listing-grid__masonry' );

			if ( ! $masonry.length ) {
				return;
			}

			if ( window.madxEngine ) {
				window.madxEngine.runMasonry( $masonry );
			} else {
				editedElement.renderHTML();
			}
		},

		loadHandlesOnLazyLoad: function( event, args ) {
			madxEnginemadxartworkPreview.loadHandles( $( args.container ) );
		},

		loadHandles: function( $scope ) {
			var $listing   = $scope.find( '.madx-listing' ).first(),
				$documents = $scope.find( madxEnginemadxartworkPreview.selectors.document ),
				handlesDocuments = [],
				$handleHtml;

			// Nested lists should not add handles.
			if ( $listing.closest( madxEnginemadxartworkPreview.selectors.document ).length ) {
				return;
			}

			if ( !$documents.length ) {
				return;
			}

			if ( $documents.hasClass( 'madxartwork-edit-mode' ) ) {
				return;
			}

			$handleHtml = '<div class="madx-engine-document-handle" role="button" title="' + window.madxEnginemadxartworkPreviewConfig.i18n.edit + '"><i class="eicon-edit"></i></div>';

			$documents.each( function() {

				var $document = $( this ),
					documentID = $document.data( 'madxartworkId' );

				if ( -1 !== handlesDocuments.indexOf( documentID ) ) {
					return;
				}

				$document.addClass( 'madx-engine-document-edit-item' );
				$document.prepend( $handleHtml );
				handlesDocuments.push( documentID );
			} );
		},

		loadBackHandles: function() {
			var $documents = $( madxEnginemadxartworkPreview.selectors.document ).filter( '.madx-engine-document-edit-item.madxartwork-edit-mode' ),
				$handleHtml;

			if ( ! $documents.length ) {
				return;
			}

			$handleHtml = '<div class="madx-engine-document-back-handle" role="button" title="' + window.madxEnginemadxartworkPreviewConfig.i18n.back + '"><i class="eicon-arrow-left"></i></div>';

			$documents.prepend( $handleHtml );
		},

		documentHandleClick: function() {
			var $handle = $( this ),
				$document = $handle.closest( madxEnginemadxartworkPreview.selectors.document );

			if ( $document.hasClass( 'madxartwork-edit-area-active' ) ) {
				return;
			}

			madxEnginemadxartworkPreview.switchDocument( $document.data( 'madxartworkId' ) );
		},

		documentBackHandleClick: function() {
			madxEnginemadxartworkPreview.switchDocument( window.madxartworkFrontendConfig.post.id );
		},

		switchDocument: function( documentID ) {
			if ( ! documentID ) {
				return;
			}

			window.madxartworkCommon.api.internal( 'panel/state-loading' );
			window.madxartworkCommon.api.run( 'editor/documents/switch', {
				id: documentID
			} ).then( function() {
				return window.madxartworkCommon.api.internal( 'panel/state-ready' );
			} );
		}

	};

	$( window ).on( 'madxartwork/frontend/init', madxEnginemadxartworkPreview.init );

}( jQuery ));
