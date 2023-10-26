(function( $, madxEngineRelationConfig ) {

	'use strict';

	window.madxEngineCPT = new Vue( {
		el: '#madx_cpt_form',
		template: '#madx-cpt-form',
		data: {
			args: madxEngineRelationConfig.args,
			isLegacy: false,
			postTypes: madxEngineRelationConfig.post_types,
			objectTypes: madxEngineRelationConfig.object_types,
			relationsTypes: madxEngineRelationConfig.relations_types,
			buttonLabel: madxEngineRelationConfig.edit_button_label,
			isEdit: madxEngineRelationConfig.item_id,
			helpLinks: madxEngineRelationConfig.help_links,
			existingRelations: madxEngineRelationConfig.existing_relations,
			legacyRelations: madxEngineRelationConfig.legacy_relations,
			showConvertDialog: false,
			showDeleteDialog: false,
			saving: false,
			converting: false,
			loaded: false,
			errors: {
				name: false,
				slug: false,
			},
			errorNotices: [],
		},
		created() {

			this.$set( this.args, 'meta_fields', [] );

			if ( madxEngineRelationConfig.item_id ) {

				wp.apiFetch( {
					method: 'get',
					path: madxEngineRelationConfig.api_path_get + madxEngineRelationConfig.item_id,
				} ).then( ( response ) => {

					if ( response.success && response.data ) {

						this.args     = _.assign( {}, response.data.args );
						this.isLegacy = response.data.args.is_legacy;
						this.loaded   = true;

						if ( ! this.args.meta_fields || ! this.args.meta_fields.length ) {
							this.$set( this.args, 'meta_fields', [] );
						}

					} else {
						if ( response.notices.length ) {
							response.notices.forEach( ( notice ) => {

								this.$CXNotice.add( {
									message: notice.message,
									type: 'error',
									duration: 15000,
								} );

							} );
						}
					}
				} );

			} else {
				this.loaded = true;
			}

		},
		computed: {
			availableParentRelations() {
				var result = [
					{
						value: '',
						label: 'Select...',
					}
				];

				for ( var relationKey in this.legacyRelations ) {
					result.push( {
						value: relationKey,
						label: this.legacyRelations[ relationKey ],
					} );
				}

				return result;
			},
		},
		methods: {
			handleDeletionError( errors ) {

				errors.forEach( ( error ) => {
					this.errorNotices.push( error.message );
				} );

			},
			handleFocus( where ) {

				if ( this.errors[ where ] ) {
					this.$set( this.errors, where, false );
					this.$CXNotice.close( where );
				}

			},
			convertCurrentRel() {

				this.converting = true;

				window.wp.ajax.send(
					'madx_engine_relations_convert',
					{
						type: 'GET',
						data: {
							_nonce: madxEngineRelationConfig.nonce,
							relID: madxEngineRelationConfig.item_id,
						},
						success: ( response ) => {

							this.converting = false;

							this.$CXNotice.add( {
								message: 'Done! Load new data...',
								type: 'success',
								duration: 3000,
							} );

							window.location.reload();

						},
						error: ( data, errorCode, errorText ) => {

							this.converting = false;

							this.$CXNotice.add( {
								message: data,
								type: 'error',
								duration: 15000,
							} );
						}
					}
				);

			},
			save() {

				var hasErrors = false,
					path      = madxEngineRelationConfig.api_path_edit;

				if ( madxEngineRelationConfig.item_id ) {
					path += madxEngineRelationConfig.item_id;
				}

				if ( hasErrors ) {
					return;
				}

				this.saving = true;

				wp.apiFetch( {
					method: 'post',
					path: path,
					data: {
						args: this.args,
					}
				} ).then( ( response ) => {

					if ( response.success ) {
						if ( madxEngineRelationConfig.redirect ) {
							window.location = madxEngineRelationConfig.redirect.replace( /%id%/, response.item_id );
						} else {

							this.$CXNotice.add( {
								message: madxEngineRelationConfig.notices.success,
								type: 'success',
							} );

							this.saving = false;
						}
					} else {

						if ( response.notices.length ) {
							response.notices.forEach( ( notice ) => {

								this.$CXNotice.add( {
									message: notice.message,
									type: 'error',
									duration: 7000,
								} );

								//self.errorNotices.push( notice.message );
							} );
						}

						this.saving = false;
					}
				} ).catch( ( response ) => {
					//self.errorNotices.push( response.message );

					this.$CXNotice.add( {
						message: response.message,
						type: 'error',
						duration: 7000,
					} );

					this.saving = false;
				} );

			},
		}
	} );

})( jQuery, window.madxEngineRelationConfig );
