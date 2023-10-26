(function( $, madxEngineCCTListConfig ) {

	'use strict';

	window.madxEngineCCTList = new Vue( {
		el: '#madx_cct_list',
		template: '#madx-cct-list',
		data: {
			itemsList: [],
			errorNotices: [],
			editLink: madxEngineCCTListConfig.edit_link,
			showDeleteDialog: false,
			deletedItem: {},
			prefix: madxEngineCCTListConfig.db_prefix,
			showCopyDialog: false,
			copiedItem: {},
		},
		computed: {
			slugsList: function() {
				var result = [];

				for ( var i = 0; i < this.itemsList.length; i++ ) {
					result.push( this.itemsList[i].slug );
				}

				return result;
			},
		},
		mounted: function() {

			var self = this;

			wp.apiFetch( {
				method: 'get',
				path: madxEngineCCTListConfig.api_path,
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
				this.copiedItem     = item;
				this.showCopyDialog = true;
			},
			deleteItem: function( item ) {
				this.deletedItem      = item;
				this.showDeleteDialog = true;
			},
			getEditLink: function( id ) {
				return this.editLink.replace( /%id%/, id );
			},
		}
	} );

})( jQuery, window.madxEngineCCTListConfig );
