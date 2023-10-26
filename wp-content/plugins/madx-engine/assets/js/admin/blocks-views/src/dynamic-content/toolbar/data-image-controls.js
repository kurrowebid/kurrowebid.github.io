import GroupedSelectControl from "components/grouped-select-control.js";

const {
	TextControl,
	SelectControl,
	withFilters
} = wp.components;

const {
	Fragment
} = wp.element;

class DataImageControls extends wp.element.Component {

	render() {

		const {
			getValue,
			attr,
			attributes,
			setAttributes,
			setValue,
			supports
		} = this.props;

		const mediaFields = window.madxEngineListingData.mediaFields;

		return <Fragment>
			<GroupedSelectControl
				label={ 'Image Source' }
				value={ getValue(
					'data_source',
					attr,
					attributes
				) }
				options={ mediaFields }
				onChange={ newValue => {
					setValue(
						newValue,
						'data_source',
						attr,
						attributes,
						setAttributes,
						supports
					);
				}}
			/>
		</Fragment>;
	}
}

export default withFilters( 'madxEngine.dynamic.dataImageControls' )( DataImageControls );
