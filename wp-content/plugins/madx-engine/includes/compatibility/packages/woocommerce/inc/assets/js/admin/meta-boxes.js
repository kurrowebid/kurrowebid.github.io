const madxEngineWCMetaBoxesTypes = [ 'woocommerce_product_data', 'woocommerce_product_variation' ];

window.madxPlugins.hooks.addFilter(
	'madxEngine.metaFields.showConditionsEditor',
	'madxEngineWCMetaBoxes',
	( result ) => {
		if ( 'woocommerce_product_variation' === window.madxEngineMB.generalSettings.object_type ) {
			return false;
		}
		return result;
	}
);

window.madxPlugins.hooks.addFilter(
	'madxEngine.metaFields.fieldConditions',
	'madxEngineWCMetaBoxes',
	( conditions, key ) => {
		if ( 'width' === key || 'allow_custom' === key || 'save_custom' === key ) {
			conditions.push( {
				'input': window.madxEngineMB.generalSettings.object_type,
				'compare': 'not_in',
				'value': madxEngineWCMetaBoxesTypes,
			} );
		}

		if ( 'is_required' === key ) {
			conditions.push( {
				'input': window.madxEngineMB.generalSettings.object_type,
				'compare': 'not_equal',
				'value': 'woocommerce_product_variation',
			} );
		}

		return conditions;
	}
);

window.madxPlugins.hooks.addFilter(
	'madxEngine.metaFields.allowedObjectTypes',
	'madxEngineWCMetaBoxes',
	( objectTypes ) => {
		if ( madxEngineWCMetaBoxesTypes.includes( window.madxEngineMB.generalSettings.object_type ) ) {
			return [ objectTypes[ 0 ] ];
		} else {
			return objectTypes;
		}
	}
);

window.madxPlugins.hooks.addFilter(
	'madxEngine.metaFields.allowedFieldTypes',
	'madxEngineWCMetaBoxes',
	( fieldTypes ) => {
		const isWCMetaBox = madxEngineWCMetaBoxesTypes.includes( window.madxEngineMB.generalSettings.object_type );
		const disallowedTypes = [ 'html', 'map', 'repeater', 'wysiwyg' ];

		return fieldTypes.filter( ( fieldType ) => {
			if ( 'woocommerce_product_variation' === window.madxEngineMB.generalSettings.object_type && 'iconpicker' === fieldType.value ) {
				return false;
			}

			return ! (isWCMetaBox && disallowedTypes.includes( fieldType.value ));
		} );
	}
);