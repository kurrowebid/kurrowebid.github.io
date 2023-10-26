(function( $ ) {

	'use strict';

	Vue.component( 'madx-rest-api-query', {
		template: '#madx-rest-api-query',
		mixins: [
			window.madxQueryWatcherMixin,
			window.madxQueryRepeaterMixin,
		],
		props: [ 'value', 'dynamic-value' ],
		data: function() {
			return {
				endpoints: window.madx_query_component_rest_api.endpoints,
				query: {},
				dynamicQuery: {},
			};
		},
		created: function() {

			this.query        = { ...this.value };
			this.dynamicQuery = { ...this.dynamicValue };

			this.presetArgs();

		},
		methods: {
			presetArgs: function() {
				if ( ! this.query.args ) {
					this.$set( this.query, 'args', [] );
				}

				if ( ! this.dynamicQuery.args ) {
					this.$set( this.dynamicQuery, 'args', {} );
				} else if ( 'object' !== typeof this.dynamicQuery.args || undefined !== this.dynamicQuery.args.length ) {
					this.$set( this.dynamicQuery, 'args', {} );
				}
			},
			newDynamicArgs: function( newClause, metaQuery, prevID ) {

				let newItem = {};

				if ( prevID && this.dynamicQuery.args[ prevID ] ) {
					newItem = { ...this.dynamicQuery.args[ prevID ] };
				}

				this.$set( this.dynamicQuery.args, newClause._id, newItem );

			},
			deleteDynamicArgs: function( id ) {
				this.$delete( this.dynamicQuery.args, id );
			},
		}
	} );

})( jQuery );
