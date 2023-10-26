Vue.component( 'madx-query-delete-dialog', {
	name: 'madx-query-delete-dialog',
	template: '#madx-query-delete-dialog',
	props: {
		value: {
			type: Boolean,
			default: false,
		},
		itemId: {
			type: String,
			default: '',
		},
		itemName: {
			type: String,
			default: '',
		}
	},
	data: function() {
		return {
			isVisible: this.value,
		};
	},
	watch: {
		value: function( val ) {
			this.setVisibility( val );
		}
	},
	methods: {
		handleCancel: function() {
			this.setVisibility( false );
			this.$emit( 'input', false );
			this.$emit( 'on-cancel' );
		},
		handleOk: function() {

			var self = this;

			self.setVisibility( false );

			wp.apiFetch( {
				method: 'delete',
				path: madxEngineQueryDeleteDialog.api_path + self.itemId,
			} ).then( function( response ) {

				if ( response.success ) {
					window.location = madxEngineQueryDeleteDialog.redirect;
				}

				self.$emit( 'input', false );
				self.$emit( 'on-ok' );

			} ).catch( function( e ) {

				self.$emit( 'input', false );
				self.$emit( 'on-ok' );

				console.log(e);

			} );

		},
		setVisibility: function( value ) {

			if ( this.isVisible === value ) {
				return;
			}

			this.isVisible = value;
		},
	},
} );
