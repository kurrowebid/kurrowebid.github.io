(function( $ ) {

	'use strict';

	Vue.component( 'madx-wc-product-query', {
		template: '#madx-wc-product-query',
		mixins: [
			window.madxQueryWatcherMixin,
			window.madxQueryDateParamsMixin,
			window.madxQueryRepeaterMixin,
			window.madxQueryTaxParamsMixin,
			window.madxQueryMetaParamsMixin,
			window.madxQueryTabInUseMixin
		],
		props: [ 'value', 'dynamic-value' ],
		data: function() {
			return {
				postStatuses: window.madx_query_component_wc_product_query.posts_statuses,
				productTypes: window.madx_query_component_wc_product_query.product_types,
				productTags: window.madx_query_component_wc_product_query.product_tag,
				productCategories: window.madx_query_component_wc_product_query.product_cat,
				operators: window.madxEngineQueryConfig.operators_list,
				dataTypes: window.madxEngineQueryConfig.data_types,
				taxonomies: window.madxEngineQueryConfig.taxonomies,
				query: {},
				dynamicQuery: {}
			};
		},
		computed: {
			dateOperators: function() {
				return this.operators.filter( function( item ) {
					const disallowed = [ '!=', 'LIKE', 'NOT LIKE', 'IN', 'NOT IN', 'NOT BETWEEN', 'EXISTS', 'NOT EXISTS' ];
					return ! disallowed.includes( item.value );
				} );
			}
		},
		created: function() {

			this.query        = { ...this.value };
			this.dynamicQuery = { ...this.dynamicValue };

			if ( ! this.query.specific_query ) {
				this.$set( this.query, 'specific_query', [] );
			}

			if ( ! this.query.date_query ) {
				this.$set( this.query, 'date_query', [] );
			}

			if ( ! this.query.paginate ) {
				this.$set( this.query, 'paginate', true );
			}

			this.presetDate();
			this.presetMeta();
			this.presetTax();

		}
	} );

})( jQuery );
