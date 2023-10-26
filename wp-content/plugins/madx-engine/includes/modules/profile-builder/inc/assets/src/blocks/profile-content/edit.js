const {
	Disabled
} = wp.components;

const {
	serverSideRender: ServerSideRender
} = wp;

const Edit = function( props ) {

	const {
		attributes,
	} = props;

	return <Disabled>
		<ServerSideRender
			block="madx-engine/profile-content"
			attributes={ attributes }
			urlQueryArgs={ {} }
		/>
	</Disabled>;
}

export default Edit;
