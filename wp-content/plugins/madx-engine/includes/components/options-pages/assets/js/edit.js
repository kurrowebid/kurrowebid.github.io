(function( $, madxEnginePageConfig ) {

	'use strict';

	window.madxEngineMB = new Vue( {
		el: '#madx_cpt_form',
		template: '#madx-cpt-form',
		data: {
			generalSettings: madxEnginePageConfig.general_settings,
			fieldsList: madxEnginePageConfig.fields,
			icons: madxEnginePageConfig.icons,
			buttonLabel: madxEnginePageConfig.edit_button_label,
			isEdit: madxEnginePageConfig.item_id,
			allParents: madxEnginePageConfig.parents,
			availableCaps: madxEnginePageConfig.capabilities,
			availablePositions: madxEnginePageConfig.positions,
			defaultMenuPosition: madxEnginePageConfig.default_position,
			helpLinks: madxEnginePageConfig.help_links,
			initialStorageType: null,
			updateOptions: '',
			showDeleteDialog: false,
			saving: false,
			errors: {
				name: false,
				slug: false,
			},
			errorNotices: [],
		},
		mounted: function() {

			var self = this;

			if ( madxEnginePageConfig.item_id ) {

				wp.apiFetch( {
					method: 'get',
					path: madxEnginePageConfig.api_path_get + madxEnginePageConfig.item_id,
				} ).then( function( response ) {

					if ( response.success && response.data ) {

						self.generalSettings    = response.data.general_settings;
						self.fieldsList         = response.data.fields;
						self.initialStorageType = self.storageType;

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
				self.$set( self.generalSettings, 'position', parseInt( self.defaultMenuPosition, 10 ) );
			}
		},
		computed: {
			availableParents: function() {
				var self = this,
					parents;

				parents = self.allParents.filter( function( page ) {
					if ( ! self.generalSettings.slug ) {
						return true;
					} else {
						return self.generalSettings.slug !== page.value;
					}
				} );

				parents.unshift( {
					value: '',
					label: '',
				} );

				return parents;
			},
			storageType: function() {
				var storageType = this.generalSettings.storage_type;

				if ( 'separate' === storageType && this.generalSettings.option_prefix ) {
					storageType += '_with_prefix';
				}

				return storageType;
			},
			storageTypeIsChanged: function() {
				if ( ! this.isEdit ) {
					return false;
				} else if ( ! this.initialStorageType ) {
					return false;
				} else {
					return this.initialStorageType !== this.storageType;
				}
			},
		},
		methods: {
			preSetSlug: function() {

				if ( ! this.generalSettings.slug ) {

					var regex = /\s+/g,
						slug  = this.generalSettings.name.toLowerCase().replace( regex, '-' );

					// Replace accents
					slug = slug.normalize( 'NFD' ).replace( /[\u0300-\u036f]/g, "" );

					// Replace cyrillic
					slug = window.madxEngineTools.maybeCyrToLatin( slug );

					this.$set( this.generalSettings, 'slug', slug );

				}

				if ( ! this.generalSettings.menu_name ) {
					this.$set( this.generalSettings, 'menu_name', this.generalSettings.name );
				}

			},
			handleFocus: function( where ) {

				if ( this.errors[ where ] ) {
					this.$set( this.errors, where, false );
					this.$CXNotice.close( where );
					//this.errorNotices.splice( 0, this.errorNotices.length );
				}

			},
			save: function() {

				var self      = this,
					hasErrors = false,
					path      = madxEnginePageConfig.api_path_edit;

				if ( madxEnginePageConfig.item_id ) {
					path += madxEnginePageConfig.item_id;
				}

				if ( ! self.generalSettings.name ) {
					self.$set( this.errors, 'name', true );

					self.$CXNotice.add( {
						message: madxEnginePageConfig.notices.name,
						type: 'error',
						duration: 7000,
					}, 'name' );

					//self.errorNotices.push( madxEnginePageConfig.notices.name );
					hasErrors = true;
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
						fields: self.fieldsList,
						initial_storage_type: this.initialStorageType,
						update_options: this.updateOptions,
					}
				} ).then( function( response ) {

					if ( response.success ) {
						if ( madxEnginePageConfig.redirect ) {
							window.location = madxEnginePageConfig.redirect.replace( /%id%/, response.item_id );
						} else {

							self.$CXNotice.add( {
								message: madxEnginePageConfig.notices.success,
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

								//self.errorNotices.push( notice.message );
							} );
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

})( jQuery, window.madxEnginePageConfig );
