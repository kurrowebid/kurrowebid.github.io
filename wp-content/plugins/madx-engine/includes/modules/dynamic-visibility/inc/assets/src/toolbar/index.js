import VisibilityIcon from "../icons/visibility";
import VisibilityModal from './visibility-modal';

const {
	addFilter
} = wp.hooks;

const {
	ToolbarGroup,
	ToolbarButton,
} = wp.components;

const {
	BlockControls
} = wp.blockEditor;

const {
	Component,
	Fragment
} = wp.element;

class VisibilityBlockControls extends Component {

	constructor( props ) {
		
		super( props );

		this.state = {
			showModal: false,
		}

	}

	getValue( key, attr, object ) {

		object = object || {};

		if ( ! key || ! attr ) {
			return null;
		}

		if ( ! object[ attr ] ) {
			return null;
		}

		return object[ attr ][ key ];

	}

	closeModal( attributes ) {
		this.props.setAttributes( { madxDynamicVisibility: attributes } );
		this.setState( { showModal: false } );
	}

	render() {

		if ( ! this.props.attributes.madxDynamicVisibility ) {
			return ( null );
		}

		const attributes = this.props.attributes.madxDynamicVisibility;
		const style = {};

		var hasDynamicData = false;

		if ( attributes && attributes.jedv_enabled ) {
			hasDynamicData = true;
		}

		if ( hasDynamicData ) {
			style.color = 'var(--wp-admin-theme-color)';
		}

		return (
			<BlockControls>
				<ToolbarGroup>
					<ToolbarButton
						icon={ VisibilityIcon }
						label="Dynamic Visibility"
						className={ hasDynamicData ? 'dynamic-visibility-is-active' : '' }
						style={ style }
						onClick={ () => {
							this.setState( { showModal: ! this.state.showModal } );
						} }
						aria-expanded={ this.state.showModal }
					/>
					{ this.state.showModal && <VisibilityModal
						attributes={ this.props.attributes.madxDynamicVisibility }
						onClose={ ( visibilityAttributes ) => {
							this.closeModal( visibilityAttributes );
						} }
						onComplete={ ( visibilityAttributes ) => {
							this.closeModal( visibilityAttributes );
						} }
					/> }
				</ToolbarGroup>
			</BlockControls>
		);
	}
}

export default VisibilityBlockControls;
