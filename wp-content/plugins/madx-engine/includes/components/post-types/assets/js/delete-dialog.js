Vue.component( 'madx-cpt-delete-dialog', {
	name: 'madx-cpt-delete-dialog',
	template: '#madx-cpt-delete-dialog',
	props: {
		value: {
			type: Boolean,
			default: false,
		},
		postTypeId: {
			type: Number,
		},
		postTypeSlug: {
			type: String,
		},
		postTypeName: {
			type: String,
			default: '',
		},
	},
	data: function() {
		return {
			isVisible: this.value,
			postsAction: 'none',
			attachTo: '',
			postTypes: window.madxEngineCPTDeleteDialog.types
		};
	},
	watch: {
		value: function( val ) {
			this.setVisibility( val );
		}
	},
	computed: {
		availablePostTypes: function() {
			var self = this;
			return self.postTypes.filter( function( item ) {
				return item.value !== self.postTypeSlug;
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
				method: 'delete',
				path: madxEngineCPTDeleteDialog.api_path + self.postTypeId,
				data: {
					action: self.postsAction,
					to_post_type: self.attachTo,
				}
			} ).then( function( response ) {

				if ( response.success ) {
					window.location = madxEngineCPTDeleteDialog.redirect;
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