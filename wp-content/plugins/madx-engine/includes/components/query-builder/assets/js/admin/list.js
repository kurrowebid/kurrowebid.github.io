(function( $, madxEngineQueryListConfig ) {

	'use strict';

	window.madxEngineQueryList = new Vue( {
		el: '#madx_query_list',
		template: '#madx-query-list',
		data: {
			itemsList: [],
			errorNotices: [],
			editLink: madxEngineQueryListConfig.edit_link,
			showDeleteDialog: false,
			deletedItem: {},
			queryTypes: madxEngineQueryListConfig.query_types,
		},
		mounted: function() {

			var self = this;

			wp.apiFetch( {
				method: 'get',
				path: madxEngineQueryListConfig.api_path,
			} ).then( function( response ) {

				if ( response.success && response.data ) {
					for ( var itemID in response.data ) {
						var item = response.data[ itemID ];
						self.itemsList.push( item );
					}
				} else {
					if ( response.notices.length ) {
						response.notices.forEach( function( notice ) {
							self.errorNotices.push( notice.message );
						} );
					}
				}
			} ).catch( function( e ) {
				self.errorNotices.push( e.message );
			} );
		},
		methods: {
			copyItem: function( item ) {

				if ( !item ) {
					return;
				}

				var self = this,
					newItemData = JSON.parse( JSON.stringify( item ) );

				newItemData.labels.name = newItemData.labels.name  + ' (Copy)';

				wp.apiFetch( {
					method: 'post',
					path: madxEngineQueryListConfig.api_path_add,
					data: {
						general_settings: Object.assign(
							{},
							newItemData.labels,
							newItemData.args,
							{
								slug: newItemData.slug,
							},
						),
					},
				} ).then( function( response ) {

					if ( response.success && response.item_id ) {

						newItemData.id = response.item_id;

						self.itemsList.unshift( newItemData );

						self.$CXNotice.add( {
							message: madxEngineQueryListConfig.notices.copied,
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
			getQueryType: function( type ) {
				for (var i = 0; i < this.queryTypes.length; i++) {
					if ( type === this.queryTypes[ i ].value ) {
						return this.queryTypes[ i ].label;
					}
				}

				return type;

			},
			getEditLink: function( id ) {
				return this.editLink.replace( /%id%/, id );
			},
		}
	} );

})( jQuery, window.madxEngineQueryListConfig );
