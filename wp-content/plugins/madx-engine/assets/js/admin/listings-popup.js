(function( $ ) {

	'use strict';

	var madxListings = {

		editorControl: null,
		editButton: null,
		editXHR: null,

		onEditorCreateClick: function( control ) {
			this.openPopup();
			this.editorControl = control;
		},

		init: function() {

			var self      = this,
				$document = $( document );

			$document
				.on( 'click.madxListings', '.page-title-action', self.openPopup )
				.on( 'click.madxListings', '.madx-engine-listing-edit-settings', self.loadEditPopup )
				.on( 'click.madxListings', '.madx-engine-listing-save', self.saveListingSettings )
				.on( 'click.madxListings', '.madx-engine-listing-cancel', self.closePopup )
				.on( 'click.madxListings', '.madx-listings-popup__overlay, .madx-listings-popup__close', self.closePopup );

			if ( window.madxListingsSettings.isAjax ) {
				$document.on( 'submit.madxListings', '#templates_type_form', self.ajaxSubmit );
			}

			$( 'body' ).on( 'change', '#listing_source', self.switchListingSources );

			self.applyCustomOptions();

			if ( '#add_new' === window.location.hash ) {
				self.openPopup();
			}

		},

		applyCustomOptions: function() {
			
			var $popup = $( '.madx-listings-popup' );

			if ( window.madxListingsSettings.exclude ) {
				for ( var i = 0; i < window.madxListingsSettings.exclude.length; i++ ) {
					$popup.find( '*[name="' + window.madxListingsSettings.exclude[ i ] + '"]' ).closest( '.madx-listings-popup__form-row' ).hide();
				}
			}

			if ( window.madxListingsSettings.button && window.madxListingsSettings.button.css_class ) {
				$popup.find( '#templates_type_submit' ).addClass( window.madxListingsSettings.button.css_class );
			}

		},

		ajaxSubmit: function( event ) {
			
			event.preventDefault();

			var self = madxListings;

			let formEl = document.getElementById( 'templates_type_form' );
			let formData = new FormData( formEl );

			const values = {};

			for( var data of formData.entries() ) {
				values[ data[0] ] = data[1];
			}

			values['_is_ajax_form'] = true;

			$.ajax( {
				url: formEl.action,
				type: 'POST',
				dataType: 'json',
				data: values,
			} ).done( function( response ) {

				if ( response.success && self.editorControl ) {
					
					let options = self.editorControl.model.get( 'options' );
					let listingID = response.data.id;
					
					options[ listingID ] = response.data.title;
					self.editorControl.model.set( 'options', options );
					self.editorControl.setValue( listingID );
					self.editorControl.render();
					self.closePopup();

					let previewWindow = window.madxartwork.$preview[0].contentWindow;
										
					previewWindow.madxartworkCommon.api.internal( 'panel/state-loading' );
					previewWindow.madxartworkCommon.api.run( 'editor/documents/switch', {
						id: listingID
					} ).then( function() {
						return previewWindow.madxartworkCommon.api.internal( 'panel/state-ready' );
					} );

				}
				

			} );

		},

		switchListingSources: function( event ) {

			var $this = $( this );
			madxListings.switchFieldsVisibility( $this );

		},

		switchFieldsVisibility: function( $source ) {
			
			let val  = $source.find( 'option:selected' ).val();
			let $row = $source.closest( '.madx-listings-popup__form-row' );

			$row.siblings( '.madx-template-listing' ).removeClass( 'madx-template-act' );
			$row.siblings( '.madx-template-' + val ).addClass( 'madx-template-act' );
		},

		saveListingSettings: function() {

			let $this    = $( this );
			let formEl   = $this.closest( 'form' )[0];
			let formData = new FormData( formEl );

			const values = {};

			for( var data of formData.entries() ) {
				values[ data[0] ] = data[1];
			}

			values._listing_id  = $this.data( 'listing-id' );
			values._open_editor = $this.hasClass( 'open-editor' );
			values.action       = 'madx_engine_save_listing_settings';
			values._nonce       = window.madxListingsSettings._nonce;

			$this.attr( 'disabled', 'disabled' );
			$this.siblings().attr( 'disabled', 'disabled' );

			$.ajax( {
				url: ajaxurl,
				type: 'POST',
				dataType: 'json',
				data: values
			} ).done( function( response ) {

				if ( response.success && response.data.redirect ) {
					window.location = response.data.redirect;
				} else {
					window.location.reload();
				}

			} ).fail( function() {
				$this.attr( 'disabled', false );
				$this.siblings().attr( 'disabled', false );
			} );

		},

		loadEditPopup: function( event ) {

			if ( madxListings.editButton ) {
				madxListings.editButton.removeClass( 'madx-engine-listing-edit-settings--is-loading' );
			}

			if ( madxListings.editXHR ) {
				madxListings.editXHR.abort();
			}

			madxListings.editButton = $( this );

			madxListings.editButton.addClass( 'madx-engine-listing-edit-settings--is-loading' );

			madxListings.editXHR = $.ajax( {
				url: ajaxurl,
				type: 'POST',
				dataType: 'json',
				data: {
					action: 'madx_engine_get_edit_listing_popup',
					listing_id: madxListings.editButton.data( 'listing-id' ),
					_nonce: window.madxListingsSettings._nonce,
				}
			} ).done( function( response ) {

				if ( response.success ) {
					let $popup = $( response.data );
					$popup.addClass( 'madx-listings-popup-active' );
					madxListings.switchFieldsVisibility( $popup.find( '#listing_source' ) );
					$( 'body' ).append( $popup );
				}

				madxListings.editButton.removeClass( 'madx-engine-listing-edit-settings--is-loading' );
				madxListings.editXHR = null;
				madxListings.editButton = null;

			} );

		},

		openPopup: function( event ) {

			if ( event ) {
				event.preventDefault();
			}

			$( '.madx-listings-popup.madx-listings-popup--new' ).addClass( 'madx-listings-popup-active' );

		},

		closePopup: function() {

			let $this = $( this );
			let $popup = $this.closest( '.madx-listings-popup' )

			if ( $popup.hasClass( 'madx-listings-popup--new' ) ) {
				$popup.removeClass( 'madx-listings-popup-active' );
				window.history.pushState( "", document.title, window.location.pathname + window.location.search );
			} else {
				$popup.remove();
			}
			
		}

	};

	madxListings.init();

	window.madxListings = madxListings;

})( jQuery );
