(function( $, madxEngineCPTListConfig ) {

	'use strict';

	window.madxEngineCPTList = new Vue( {
		el: '#madx_cpt_list',
		template: '#madx-cpt-list',
		data: {
			errorNotices: [],
			editLink: madxEngineCPTListConfig.edit_link,
			builtInTypes: madxEngineCPTListConfig.built_in_types,
			engineTypes: madxEngineCPTListConfig.engine_types,
			showDeleteDialog: false,
			showTypes: 'madx-engine',
			deletedItem: {},
		},
		computed: {
			slugsList: function() {
				var result = [];

				for ( var i = 0; i < this.itemsList.length; i++ ) {
					result.push( this.itemsList[i].slug );
				}

				return result;
			},
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
					editLink += '&edit-type=built-in&tax=' + slug;
				}

				return editLink;

			},
		}
	} );

})( jQuery, window.madxEngineCPTListConfig );
