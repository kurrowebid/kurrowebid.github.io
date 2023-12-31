(function( $ ) {

	'use strict';

	Vue.component( 'madx-repeater-query', {
		template: '#madx-repeater-query',
		mixins: [
			window.madxQueryWatcherMixin,
			window.madxQueryRepeaterMixin,
			window.madxQueryMetaParamsMixin,
		],
		props: [ 'value', 'dynamic-value' ],
		data: function() {
			return {
				sourcesList: window.madx_query_component_repeater.sources,
				metaFields: window.madx_query_component_repeater.meta_fields,
				optionsFields: window.madx_query_component_repeater.options_fields,
				taxonomies: window.madxEngineQueryConfig.taxonomies,
				operators: window.madxEngineQueryConfig.operators_list,
				dataTypes: window.madxEngineQueryConfig.data_types,
				query: {},
				dynamicQuery: {},
			};
		},
		computed: {
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

			this.presetMeta();

			// if ( undefined === this.query.hide_empty ) {
			// 	this.$set( this.query, 'hide_empty', true );
			// }

		},
	} );

})( jQuery );
