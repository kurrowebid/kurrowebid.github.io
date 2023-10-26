(function( $ ) {

	'use strict';

	Vue.component( 'madx-comments-query', {
		template: '#madx-comments-query',
		mixins: [
			window.madxQueryWatcherMixin,
			window.madxQueryRepeaterMixin,
			window.madxQueryMetaParamsMixin,
			window.madxQueryDateParamsMixin,
			window.madxQueryTabInUseMixin,
		],
		props: [ 'value', 'dynamic-value' ],
		data: function() {

			const postTypes = window.madxEngineQueryConfig.post_types;

			/*postTypes.push( {
				value: 'any',
				label: 'Any',
			} );*/

			return {
				operators: window.madxEngineQueryConfig.operators_list,
				dataTypes: window.madxEngineQueryConfig.data_types,
				postTypes: window.madxEngineQueryConfig.post_types,
				postStatuses: window.madx_query_component_posts.posts_statuses,
				query: {},
				dynamicQuery: {},
			};
		},
		computed: {
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

			this.query        = { ...this.value };
			this.dynamicQuery = { ...this.dynamicValue };

			this.presetMeta();
			this.presetDate();

		}
	} );

})( jQuery );
