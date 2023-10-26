import DynamicBlockControls from './toolbar';

const {
	addFilter,
	applyFilters
} = wp.hooks;

const {
	Fragment
} = wp.element;


function addToolbarControls( BlockEdit ) {
	return ( props ) => {
		if ( props.isSelected ) {
			return (
				<Fragment>
					<BlockEdit { ...props } />
					<DynamicBlockControls { ...props } />
				</Fragment>
			);
		}

		return <BlockEdit { ...props } />;
	};
}

addFilter(
	'editor.BlockEdit',
	'madx-engine/add-toolbar-controls',
	addToolbarControls,
	900
);

function registerAttributes( settings, name ) {

	var atts = window.madxEngineListingData.dynamicData[ name ];

	if ( atts ) {
		return _.assign( {}, settings, {
			attributes: _.assign( {}, settings.attributes, {
				[ window.madxEngineListingData.dynamicKey ]: {
					type: 'object',
					default: {}
				},
			} ),
			supports: _.assign( {}, settings.supports, {
				[ window.madxEngineListingData.dynamicKey ]: atts
			} ),
		} );
	} else {
		return settings;
	}
}

addFilter(
	'blocks.registerBlockType',
	'madx-engine/register-block-attributes',
	registerAttributes
);
