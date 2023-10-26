import EditIcon from "icons/edit";
import ViewIcon from "icons/view";
import DisconnectIcon from "icons/disconnect";
import TrashIcon from "icons/trash";

const {
	Button,
	Popover
} = wp.components;

const {
	Component,
	Fragment
} = wp.element;

class RowActions extends Component {

	constructor( props ) {
		super( props );

		this.state = {
			isTrash: false,
			isDisconnect: false,
		}
	}

	processDisconnect() {

		window.wp.ajax.send(
			'madx_engine_relations_disconnect_relation_items',
			{
				type: 'POST',
				data: {
					_nonce: window.madxEngineRelationsCommon._nonce,
					relID: this.props.relID,
					relatedObjectID: this.props.relatedObjectID,
					relatedObjectType: this.props.relatedObjectType,
					relatedObjectName: this.props.relatedObjectName,
					currentObjectID: this.props.currentObjectID,
					isParentProcessed: this.props.isParentProcessed,
					isTrash: this.state.isTrash,
				},
				success: ( response ) => {
					this.cancelDisconnect();
					this.props.onUpdate( response.related_list );
				},
				error: ( response, errorCode, errorText ) => {

					this.cancelDisconnect();

					if ( response ) {
						alert( response );
					} else {
						alert( errorText );
					}

				}
			}
		);

	}

	cancelDisconnect() {
		this.setState( {
			isTrash: false,
			isDisconnect: false,
		} );
	}

	confirmPopover( text ) {

		text = text || window.madxEngineRelationsCommon.i18n.confirmText;

		return <Popover
			position="top center"
			noArrow={ false }
			onFocusOutside={ () => {
				this.cancelDisconnect();
			} }
		>
			{ text }
			<a
				href="#"
				onClick={ ( event ) => {
					event.preventDefault();
					event.stopPropagation();
					this.processDisconnect();
				} }
			>{ window.madxEngineRelationsCommon.i18n.yes }</a>
			<a
				href="#"
				onClick={ ( event ) => {
					event.preventDefault();
					event.stopPropagation();
					this.cancelDisconnect();
				} }
			>{ window.madxEngineRelationsCommon.i18n.no }</a>
		</Popover>
	}

	render() {
		return ( <div className="madx-engine-rels__actions-list">
			{ this.props.actions.edit && <Button
				isSecondary
				isSmall
				icon={ EditIcon }
				onClick={ () => {
					window.open( this.props.actions.edit, '_blank' ).focus();
				} }
			>{ window.madxEngineRelationsCommon.i18n.edit }</Button> }
			{ this.props.actions.view && <Button
				isSecondary
				isSmall
				icon={ ViewIcon }
				onClick={ () => {
					window.open( this.props.actions.view, '_blank' ).focus();
				} }
			>{ window.madxEngineRelationsCommon.i18n.view }</Button> }
			{ this.props.actions.disconnect && <Button
				isSecondary
				isDestructive
				isSmall
				icon={ DisconnectIcon }
				onClick={ () => {
					this.setState( {
						isTrash: false,
						isDisconnect: true,
					} );
				} }
			>
				{ window.madxEngineRelationsCommon.i18n.disconnect }
				{ ( this.state.isDisconnect && ! this.state.isTrash ) && this.confirmPopover() }
			</Button> }
			{ this.props.actions.trash && <Button
				isSecondary
				isDestructive
				isSmall
				icon={ TrashIcon }
				onClick={ () => {
					this.setState( {
						isTrash: true,
						isDisconnect: true,
					} );
				} }
			>
				{ window.madxEngineRelationsCommon.i18n.deleteItem }
				{ ( this.state.isDisconnect && this.state.isTrash ) && this.confirmPopover( window.madxEngineRelationsCommon.i18n.confirmDelete ) }
			</Button> }
		</div> );
	}

}

export default RowActions;