(function( $ ) {

	'use strict';

	Vue.component( 'madx-wp-query', {
		template: '#madx-wp-query',
		props: [ 'value', 'dynamic-value' ],
		mixins: [
			window.madxQueryWatcherMixin,
			window.madxQueryRepeaterMixin,
		],
		data: function() {
			return {
				pageTypesOptions: window.madx_query_component_current_wp_query.page_types_options,
				query: {},
			};
		},
		created: function() {
			this.query = { ...this.value };

			if ( ! this.query.posts_per_page ) {
				this.$set( this.query, 'posts_per_page', [] );
			}
		}
	} );

})( jQuery );
