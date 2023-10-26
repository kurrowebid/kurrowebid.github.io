(function( $ ) {

	'use strict';

	Vue.component( 'madx-cct-query', {
		template: '#madx-cct-query',
		mixins: [
			window.madxQueryWatcherMixin,
			window.madxQueryRepeaterMixin,
		],
		props: [ 'value', 'dynamic-value' ],
		data: function() {
			return {
				operators: window.madxEngineQueryConfig.operators_list,
				dataTypes: window.madxEngineQueryConfig.data_types,
				contentTypes: window.madx_query_component_custom_content_type.content_types,
				query: {},
				dynamicQuery: {},
			};
		},
		computed: {
			currentFields: function() {

				if ( ! this.query.content_type ) {
					return [];
				}

				var fields = window.madx_query_component_custom_content_type.types_fields[ this.query.content_type ] || [];

				return fields;
			},
			orderByOptions: function() {

				if ( ! this.query.content_type ) {
					return [];
				}

				var fields = window.madx_query_component_custom_content_type.types_fields[ this.query.content_type ] || [],
					orderByOptions = window.madx_query_component_custom_content_type.order_by_options || [];

				return fields.concat( orderByOptions );
			}
		},
		created: function() {

			this.query        = { ...this.value };
			this.dynamicQuery = { ...this.dynamicValue };

			if ( ! this.query.order ) {
				this.$set( this.query, 'order', [] );
			}

			this.presetArgs();

		},
		methods: {
			hasFields: function() {
				return 0 < this.currentFields.length;
			},
			presetArgs: function() {
				if ( ! this.query.args ) {
					this.$set( this.query, 'args', [] );
				}

				if ( ! this.dynamicQuery.args ) {
					this.$set( this.dynamicQuery, 'args', {} );
				} else if ( 'object' !== typeof this.dynamicQuery.args || undefined !== this.dynamicQuery.args.length ) {
					this.$set( this.dynamicQuery, 'args', {} );
				}

				for ( const prop in this.dynamicQuery.args ) {
					if ( ! Object.keys( this.dynamicQuery.args[ prop ] ).length ) {
						this.$set( this.dynamicQuery.args, prop, {} );
					}
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
