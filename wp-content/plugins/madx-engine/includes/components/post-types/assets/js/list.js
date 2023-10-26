(function( $, madxEngineCPTListConfig ) {

	'use strict';

	window.madxEngineCPTList = new Vue( {
		el: '#madx_cpt_list',
		template: '#madx-cpt-list',
		data: {
			errorNotices: [],
			editLink: madxEngineCPTListConfig.edit_link,
			showDeleteDialog: false,
			deletedItem: {},
			showTypes: 'madx-engine',
			builtInTypes: madxEngineCPTListConfig.built_in_types,
			engineTypes: madxEngineCPTListConfig.engine_types
		},
		computed: {
			itemsList: function() {
				var result = [];

				if ( 'madx-engine' === this.showTypes ) {
					result = this.engineTypes;
				} else {
					result = this.builtInTypes;
				}

				return result;
			},
		},
		methods: {
			switchType: function() {
				if ( 'madx-engine' === this.showTypes ) {
					this.showTypes = 'built-in';
				} else {
					this.showTypes = 'madx-engine';
				}
			},
			copyItem: function( item ) {

				if ( !item || !item.id ) {
					return;
				}

				var self = this;

				wp.apiFetch( {
					method: 'post',
					path: madxEngineCPTListConfig.api_path_copy + item.id,
				} ).then( function( response ) {

					if ( response.success && response.item ) {

						self.engineTypes.unshift( response.item );

						self.$CXNotice.add( {
							message: madxEngineCPTListConfig.notices.copied,
							type: 'success',
						} );

					} else {
						if ( response.notices.length ) {
							response.notices.forEach( function( notice ) {

								self.$CXNotice.add( {
									message: notice.message,
									type: 'error',
									duration: 7000,
								} );


							} );
						}
					}
				} ).catch( function( response ) {

					self.$CXNotice.add( {
						message: response.message,
						type: 'error',
						duration: 7000,
					} );

				} );

			},
			deleteItem: function( item ) {
				this.deletedItem      = item;
				this.showDeleteDialog = true;
			},
			getEditLink: function( id, slug ) {

				var editLink = this.editLink.replace( /%id%/, id );

				if ( 'built-in' === this.showTypes ) {
					editLink += '&edit-type=built-in&post-type=' + slug;
				}

				return editLink;

			}
		}
	} );

})( jQuery, window.madxEngineCPTListConfig );
