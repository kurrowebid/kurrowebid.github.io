(function( $, madxEngineCPTConfig ) {

	'use strict';

	window.madxEngineCPT = new Vue( {
		el: '#madx_cpt_form',
		template: '#madx-cpt-form',
		data: {
			generalSettings: madxEngineCPTConfig.general_settings,
			labels: madxEngineCPTConfig.labels,
			advancedSettings: madxEngineCPTConfig.advanced_settings,
			metaFields: madxEngineCPTConfig.meta_fields,
			postTypes: madxEngineCPTConfig.post_types,
			metaFieldsEnabled: madxEngineCPTConfig.meta_fields_enabled,
			labelsList: madxEngineCPTConfig.labels_list,
			buttonLabel: madxEngineCPTConfig.edit_button_label,
			isEdit: madxEngineCPTConfig.item_id,
			helpLinks: madxEngineCPTConfig.help_links,
			showDeleteDialog: false,
			initialSlug: null,
			updateTerms: false,
			resetDialog: false,
			isBuiltIn: false,
			saving: false,
			errors: {
				name: false,
				slug: false,
				post_type: false,
			},
			errorNotices: [],
			incorrectSlugMessage: madxEngineCPTConfig.slug_error,
			showIncorrectSlug: false,
		},
		mounted: function() {

			var self = this,
				path = null;

			if ( madxEngineCPTConfig.is_built_in ) {
				self.isBuiltIn = true;
			}

			if ( madxEngineCPTConfig.item_id ) {

				if ( madxEngineCPTConfig.item_id > 0 ) {
					path = madxEngineCPTConfig.api_path_get + madxEngineCPTConfig.item_id;
				} else {
					path = madxEngineCPTConfig.api_path_get;
				}

				wp.apiFetch( {
					method: 'get',
					path: path,
				} ).then( function( response ) {

					if ( response.success && response.data ) {

						self.generalSettings  = response.data.general_settings;
						self.labels           = response.data.labels;
						self.advancedSettings = response.data.advanced_settings;
						self.metaFields       = response.data.meta_fields;
						self.initialSlug      = self.generalSettings.slug;

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
				} );

			} else {
				self.preSetIsPublicDeps();
			}
		},
		methods: {
			slugIsChanged: function() {
				if ( ! this.isEdit ) {
					return false;
				} else if ( ! this.initialSlug ) {
					return false;
				} else {
					return this.initialSlug !== this.generalSettings.slug;
				}
			},
			handleDeletionError: function( errors ) {

				var self = this;

				errors.forEach( function( error ) {
					self.$CXNotice.add( {
						message: error.message,
						type: 'error',
						duration: 7000,
					} );
					//self.errorNotices.push( error.message );
				} );
			},
			handleFocus: function( where ) {

				if ( this.errors[ where ] ) {
					this.$set( this.errors, where, false );
					this.$CXNotice.close( where );
					//this.errorNotices.splice( 0, this.errorNotices.length );
				}

			},
			handleLabelFocus: function( key, isSingular, defaultMask ) {

				var name          = 'post',
					defaultString = '';

				if ( 'singular_name' === key ) {
					return;
				}

				if ( this.labels[ key ] ) {
					return;
				}

				if ( ! defaultMask ) {
					return;
				}

				if ( isSingular ) {

					if ( this.labels.singular_name ) {
						name = this.labels.singular_name;
					} else if ( this.generalSettings.name ) {
						if ( 's' === this.generalSettings.name.slice( -1 ) ) {
							name = this.generalSettings.name.substring( 0, this.generalSettings.name - 1 );
						} else {
							name = this.generalSettings.name;
						}

					}

				} else {
					name = this.generalSettings.name;
				}

				defaultString = defaultMask.replace( /%s%/, name );

				this.$set( this.labels, key, defaultString );

			},
			savePostType: function() {

				var self      = this,
					hasErrors = false,
					path      = madxEngineCPTConfig.api_path_edit;

				if ( madxEngineCPTConfig.item_id ) {
					if ( self.isBuiltIn ) {
						path += self.generalSettings.slug;
					} else {
						path += madxEngineCPTConfig.item_id;
					}
				}

				if ( this.showIncorrectSlug ) {

					self.$CXNotice.add( {
						message: this.incorrectSlugMessage,
						type: 'error',
						duration: 7000,
					}, 'name' );

					hasErrors = true;
				}

				if ( ! self.generalSettings.name ) {
					self.$set( this.errors, 'name', true );

					self.$CXNotice.add( {
						message: madxEngineCPTConfig.notices.name,
						type: 'error',
						duration: 7000,
					}, 'name' );

					//self.errorNotices.push( madxEngineCPTConfig.notices.name );
					hasErrors = true;
				}

				if ( ! self.generalSettings.slug ) {
					self.$set( this.errors, 'slug', true );

					self.$CXNotice.add( {
						message: madxEngineCPTConfig.notices.slug,
						type: 'error',
						duration: 7000,
					}, 'slug' );

					//self.errorNotices.push( madxEngineCPTConfig.notices.slug );
					hasErrors = true;
				}

				if ( ! self.generalSettings.object_type ) {
					self.$set( this.errors, 'post_type', true );

					self.$CXNotice.add( {
						message: madxEngineCPTConfig.notices.post_type,
						type: 'error',
						duration: 7000,
					}, 'post_type' );

					//self.errorNotices.push( madxEngineCPTConfig.notices.post_type );
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
						labels: self.labels,
						advanced_settings: self.advancedSettings,
						meta_fields: self.metaFields,
						update_terms: self.updateTerms,
						initial_slug: self.initialSlug,
					}
				} ).then( function( response ) {

					if ( response.success ) {
						if ( madxEngineCPTConfig.redirect ) {
							window.location = madxEngineCPTConfig.redirect.replace( /%id%/, response.item_id );
						} else {

							self.$CXNotice.add( {
								message: madxEngineCPTConfig.notices.success,
								type: 'success',
							} );

							self.$set( self.generalSettings, 'id', response.item_id );
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
			preSetIsPublicDeps: function() {

				this.$set( this.advancedSettings, 'exclude_from_search', ! this.advancedSettings.public );
				this.$set( this.advancedSettings, 'publicly_queryable', this.advancedSettings.public );
				this.$set( this.advancedSettings, 'show_in_nav_menus', this.advancedSettings.public );
				this.$set( this.advancedSettings, 'show_ui', this.advancedSettings.public );

			},
			preSetSlug: function() {

				if ( ! this.generalSettings.slug ) {

					var regex = /\s+/g,
						slug  = this.generalSettings.name.toLowerCase().replace( regex, '-' );

					// Replace accents
					slug = slug.normalize( 'NFD' ).replace( /[\u0300-\u036f]/g, "" );

					// Replace cyrillic
					slug = window.madxEngineTools.maybeCyrToLatin( slug );

					if ( 32 < slug.length ) {
						slug = slug.substr( 0, 32 );

						if ( '-' === slug.slice( -1 ) ) {
							slug = slug.slice( 0, -1 );
						}
					}

					this.$set( this.generalSettings, 'slug', slug );

				}

			},
			checkSlug: function() {
				this.showIncorrectSlug = ( 32 < this.generalSettings.slug.length );
			},
			isCollapsed: function( object ) {

				if ( undefined === object.collapsed || true === object.collapsed ) {
					return true;
				} else {
					return false;
				}

			},
			resetToDefaults: function() {

				var self = this;

				self.resetDialog = false;

				if ( self.errorNotices.length ) {
					self.errorNotices.splice( 0, self.errorNotices.length );
				}

				wp.apiFetch( {
					method: 'delete',
					path: madxEngineCPTConfig.api_path_reset + self.generalSettings.slug,
					data: {},
				} ).then( function( response ) {

					if ( response.success ) {
						window.location.reload();
					} else {
						if ( response.notices.length ) {
							response.notices.forEach( function( notice ) {
								self.errorNotices.push( notice.message );
							} );
						}
					}

				} ).catch( function( response ) {
					self.errorNotices.push( response.message );
				} );

			}
		}
	} );

})( jQuery, window.madxEngineCPTConfig );
