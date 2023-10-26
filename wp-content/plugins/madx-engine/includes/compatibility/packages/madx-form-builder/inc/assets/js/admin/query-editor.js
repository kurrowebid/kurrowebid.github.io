(function( $ ) {

	'use strict';

	Vue.component( 'madx-form-builder-query', {
		template: '#madx-form-builder-query',
		mixins: [
			window.madxQueryWatcherMixin,
			window.madxQueryRepeaterMixin,
			window.madxQueryMetaParamsMixin
		],
		props: [ 'value', 'dynamic-value' ],
		data: function() {
			console.log( window.madx_query_component_madx_form_builder_query.forms );
			return {
				formsList: window.madx_query_component_madx_form_builder_query.forms,
				operators: window.madxEngineQueryConfig.operators_list,
				dataTypes: window.madxEngineQueryConfig.data_types,
				query: {},
				dynamicQuery: {}
			};
		},
		created: function() {

			this.query        = { ...this.value };
			this.dynamicQuery = { ...this.dynamicValue };

			if ( ! this.query.date_query ) {
				this.$set( this.query, 'date_query', '' );
			}

			this.presetMeta();

		}
	} );

})( jQuery );
