(function( $, madxEngineQueryConfig ) {

	'use strict';

	var madxEngineQuery = new Vue( {
		el: '#madx_query_form',
		template: '#madx-query-form',
		data: {
			generalSettings: {},
			postTypes: madxEngineQueryConfig.post_types,
			queryTypes: madxEngineQueryConfig.query_types,
			buttonLabel: madxEngineQueryConfig.edit_button_label,
			isEdit: madxEngineQueryConfig.item_id,
			helpLinks: madxEngineQueryConfig.help_links,
			typesComponents: madxEngineQueryConfig.types_components,
			showDeleteDialog: false,
			saving: false,
			suggestions: [],
			updatingPreview: false,
			previewCount: 0,
			previewBody: null,
			errors: {
				name: false,
			},
			errorNotices: [],
		},
		created: function() {
			this.updatePreview = _.debounce( this.updatePreviewCallback, 500 );
		},
		mounted: function() {

			var self = this;

			if ( madxEngineQueryConfig.item_id ) {

				wp.apiFetch( {
					method: 'get',
					path: madxEngineQueryConfig.api_path_get + madxEngineQueryConfig.item_id,
				} ).then( function( response ) {

					if ( response.success && response.data ) {

						for ( const property in response.data ) {
							self.$set( self.generalSettings, property, response.data[ property ] );
						}

						self.updatePreview();

					} else {
						if ( response.notices.length ) {
							response.notices.forEach( function( notice ) {
								self.$CXNotice.add( {
									message: notice.message,
									type: 'error',
									duration: 15000,
								} );
								//self.errorNotices.push( notice.message );
							} );
						}
					}
				} ).catch( function( e ) {
					console.log( e );
				} );

			} else {
				setTimeout( function() {
					self.$set( self.generalSettings, 'query_type', 'posts' );
				}, 1000 );
			}

		},
		methods: {
			switchPreview: function( value ) {
				this.$set( this.generalSettings, 'show_preview', value );
				this.updatePreview();
			},
			updatePreviewCallback: function() {

				var self = this;

				if ( ! self.generalSettings.show_preview ) {
					return;
				}

				self.updatingPreview = true;

				var preview = {},
					query = {},
					dynamic_query = {};

				if ( self.generalSettings.preview_page || self.generalSettings.preview_page_title ) {
					preview.page = self.generalSettings.preview_page;
					preview.page_url = self.generalSettings.preview_page_title;
				}

				if ( self.generalSettings.preview_query_string ) {
					preview.query_string = self.generalSettings.preview_query_string;
				}

				query         = self.generalSettings[ self.generalSettings.query_type ];
				dynamic_query = self.generalSettings[ '__dynamic_' + self.generalSettings.query_type ];

				wp.apiFetch( {
					method: 'post',
					path: madxEngineQueryConfig.api_path_update_preview,
					data: {
						preview: preview,
						query_id: madxEngineQueryConfig.item_id,
						query_type: self.generalSettings.query_type,
						query: query,
						dynamic_query: dynamic_query,
					}
				} ).then( function( response ) {

					if ( response.success ) {
						self.previewCount = response.count;
						self.previewBody  = response.data;
					}

					self.updatingPreview = false;
				} ).catch( function( response ) {
					self.updatingPreview = false;
					self.$CXNotice.add( {
						message: response.message,
						type: 'error',
						duration: 7000,
					} );

				} );

			},
			searchPreviewPage: function( value ) {

				var self = this;

				if ( ! value ) {
					self.$set( self.generalSettings, 'preview_page', null );
					self.$set( self.generalSettings, 'preview_page_title', '' );
					self.updatePreview();
					return;
				}

				if ( 2 > value.length ) {
					return;
				}

				wp.apiFetch( {
					method: 'get',
					path: madxEngineQueryConfig.api_path_search_preview + '?_s=' + value,
				} ).then( function( response ) {
					self.suggestions = response.data;
					self.suggestions.unshift( { id: 0, text: 'Use raw URL string', url: value } );
				} ).catch( function( response ) {
					//self.errorNotices.push( response.message );

					self.$CXNotice.add( {
						message: response.message,
						type: 'error',
						duration: 7000,
					} );

				} );
			},
			applySuggestion: function( suggestion ) {
				if ( 0 !== suggestion.id ) {
					this.$set( this.generalSettings, 'preview_page_title', suggestion.text );
					this.$set( this.generalSettings, 'preview_page', suggestion.id );
				} else {
					this.$set( this.generalSettings, 'preview_page_title', suggestion.url );
					this.$set( this.generalSettings, 'preview_page', 0 );
				}
				
				this.suggestions = [];
				this.updatePreview();
			},
			ensureQueryType: function() {

				if ( this.generalSettings.query_type && ! this.generalSettings[ this.generalSettings.query_type ] ) {
					this.$set( this.generalSettings, this.generalSettings.query_type, {} );
				}

				if ( this.generalSettings.query_type && ! this.generalSettings[ '__dynamic_' + this.generalSettings.query_type ] ) {
					this.$set( this.generalSettings, '__dynamic_' + this.generalSettings.query_type, {} );
				}

			},
			handleFocus: function( where ) {

				if ( this.errors[ where ] ) {
					this.$set( this.errors, where, false );
					this.$CXNotice.close( where );
					//this.errorNotices.splice( 0, this.errorNotices.length );
				}

			},
			setDynamicQuery: function( prop, value ) {
				this.$set( this.generalSettings, prop, value );
				this.updatePreview();
			},
			save: function() {

				var self      = this,
					hasErrors = false,
					path      = madxEngineQueryConfig.api_path_edit;

				if ( madxEngineQueryConfig.item_id ) {
					path += madxEngineQueryConfig.item_id;
				}

				for ( var errKey in this.errors ) {

					if ( ! self.generalSettings[ errKey ] ) {
						self.$set( this.errors, errKey, true );

						self.$CXNotice.add( {
							message: madxEngineQueryConfig.notices[ errKey ],
							type: 'error',
							duration: 7000,
						}, 'name' );

						//self.errorNotices.push( madxEngineCCTConfig.notices.name );
						hasErrors = true;
					}

				}

				if ( hasErrors ) {
					return;
				}

				self.saving = true;

				wp.apiFetch( {
					method: 'post',
					path: path,
					data: {
						general_settings: self.generalSettings,
						meta_fields: self.metaFields,
					}
				} ).then( function( response ) {

					if ( response.success ) {
						if ( madxEngineQueryConfig.redirect ) {
							window.location = madxEngineQueryConfig.redirect.replace( /%id%/, response.item_id );
						} else {

							self.$CXNotice.add( {
								message: madxEngineQueryConfig.notices.success,
								type: 'success',
							} );

							self.saving = false;
						}
					} else {
						if ( response.notices.length ) {
							response.notices.forEach( function( notice ) {

								self.$CXNotice.add( {
									message: notice.message,
									type: 'error',
									duration: 7000,
								} );

							} );

							self.saving = false;
						}
					}
				} ).catch( function( response ) {
					//self.errorNotices.push( response.message );

					self.$CXNotice.add( {
						message: response.message,
						type: 'error',
						duration: 7000,
					} );

					self.saving = false;
				} );

			},
		}
	} );

})( jQuery, window.madxEngineQueryConfig );
