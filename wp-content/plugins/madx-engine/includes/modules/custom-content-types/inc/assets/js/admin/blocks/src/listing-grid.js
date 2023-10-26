const {
	TextareaControl,
	SelectControl,
	PanelBody,
	Button
} = wp.components;

const CCTPanel = class extends wp.element.Component {

	constructor(props) {
		super( props );
		this.handleChange = this.handleChange.bind( this );
		this.queryDialog = null;
	}

	componentDidMount() {
		this.queryDialog = new madxQueryDialog({
			listing: this.props.attributes.lisitng_id,
			fetchPath: window.madxEngineCCTBlocksData.fetchPath,
			value: this.props.attributes.madx_cct_query,
			onSend: ( value, inputEvent ) => {
				this.handleChange( 'madx_cct_query', value );
			}
		});
	}

	componentWillUnmount() {
		this.queryDialog.remove();
	}

	handleChange( key, value ) {
		var atts = JSON.parse( JSON.stringify( this.props.attributes ) );
		atts[ key ] = value;
		this.props.onChange( atts );
	}

	render() {
		return <PanelBody
					title={ 'Content Types Query' }
					initialOpen={ false }
				>
			<TextareaControl
				label={ 'Query String' }
				help={ 'Use the button below to generate query string' }
				value={ this.props.attributes.madx_cct_query }
				onChange={ newValue => {
					this.handleChange( 'madx_cct_query', newValue );
				} }
			/>
			<Button
				label={ 'Generate Query' }
				isSecondary={ true }
				isSmall={ true }
				onClick={ () => {

					var jsonData = this.props.attributes.madx_cct_query || '{}';

					this.queryDialog.setOptions( {
						listing: this.props.attributes.lisitng_id,
					} );

					this.queryDialog.setValue( JSON.parse( jsonData ) );
					this.queryDialog.create();

				} }
			>{ 'Generate Query' }</Button>
			{ window.madxEngineCCTBlocksData.stores && window.madxEngineCCTBlocksData.stores.length &&
				<div
					style={ { paddingTop: '20px' } }
				>
					<SelectControl
						label={ 'Get items from store' }
						value={ this.props.attributes.madx_cct_from_store }
						options={ window.madxEngineCCTBlocksData.stores }
						onChange={ newValue => {
							this.handleChange( 'madx_cct_from_store', newValue );
						}}
					/>
				</div>
			}
		</PanelBody>;
	}
}

if ( ! window.madxEngineListingData.customPanles.listingGrid ) {
	window.madxEngineListingData.customPanles.listingGrid = [];
}

window.madxEngineListingData.customPanles.listingGrid.push( CCTPanel );
