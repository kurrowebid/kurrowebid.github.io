Vue.component( 'madx-cpt-delete-dialog', {
	name: 'madx-cpt-delete-dialog',
	template: '#madx-cpt-delete-dialog',
	props: {
		value: {
			type: Boolean,
			default: false,
		},
		taxId: {
			type: Number,
		},
		taxSlug: {
			type: String,
		},
		taxName: {
			type: String,
			default: '',
		},
	},
	data: function() {
		return {
			isVisible: this.value,
			termsAction: 'none',
			attachTo: '',
			allTaxes: window.madxEngineCPTDeleteDialog.taxonomies
		};
	},
	watch: {
		value: function( val ) {
			this.setVisibility( val );
		}
	},
	computed: {
		availableTaxonomies: function() {
			var self = this;
			return self.allTaxes.filter( function( item ) {
				return item.value !== self.taxSlug;
			} );
		},
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
				method: 'DELETE',
				path: madxEngineCPTDeleteDialog.api_path + self.taxId,
				data: {
					action: self.termsAction,
					to_tax: self.attachTo,
				}
			} ).then( function( response ) {

				if ( response.success ) {
					window.location = madxEngineCPTDeleteDialog.redirect;
				} else {
					self.$emit( 'on-error', response.notices );
				}

				self.$emit( 'input', false );
				self.$emit( 'on-ok' );

			} ).catch( function( e ) {

				self.$emit( 'input', false );
				self.$emit( 'on-error', [ {
					type: 'error',
					message: e
				} ] );

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