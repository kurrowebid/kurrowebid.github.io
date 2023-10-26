(function( $ ) {

	'use strict';

	Vue.component( 'madx-posts-query', {
		template: '#madx-posts-query',
		mixins: [
			window.madxQueryWatcherMixin,
			window.madxQueryRepeaterMixin,
			window.madxQueryMetaParamsMixin,
			window.madxQueryTaxParamsMixin,
			window.madxQueryDateParamsMixin,
			window.madxQueryDateParamsMixin,
			window.madxQueryTabInUseMixin,
		],
		props: [ 'value', 'dynamic-value' ],
		data: function() {
			return {
				postTypes: window.madxEngineQueryConfig.post_types,
				taxonomies: window.madxEngineQueryConfig.taxonomies,
				postStatuses: window.madx_query_component_posts.posts_statuses,
				operators: window.madxEngineQueryConfig.operators_list,
				dataTypes: window.madxEngineQueryConfig.data_types,
				orderbyOptions: window.madxEngineQueryConfig.orderby_options.posts,
				query: {},
				dynamicQuery: {},
			};
		},
		computed: {
			commentOperators: function() {
				return this.operators.filter( function( item ) {
					const allowed = [ '=', '!=', '>', '>=', '<', '<=' ];
					return allowed.includes( item.value );
				} );
			},
			dateOperators: function() {
				return this.operators.filter( function( item ) {
					const disallowed = [ 'EXISTS', 'NOT EXISTS', 'LIKE', 'NOT LIKE' ];
					return ! disallowed.includes( item.value );
				} );
			},
			metaClauses: function() {

				let result = [];

				for ( var i = 0; i < this.query.meta_query.length; i++ ) {
					if ( this.query.meta_query[ i ].clause_name ) {
						result.push( {
							value: this.query.meta_query[ i ].clause_name,
							label: this.query.meta_query[ i ].clause_name,
						} )
					}
				}

				return result;
			},
		},
		created: function() {

			this.query = { ...this.value };
			this.dynamicQuery = { ...this.dynamicValue };

			if ( ! this.query.orderby ) {
				this.$set( this.query, 'orderby', [] );
			}

			this.presetMeta();
			this.presetTax();
			this.presetDate();

		}
	} );

})( jQuery );
