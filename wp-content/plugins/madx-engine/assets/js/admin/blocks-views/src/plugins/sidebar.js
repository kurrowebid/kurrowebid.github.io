( function( wp ) {

	if ( ! wp.editPost ) {
		return;
	}

	var registerPlugin = wp.plugins.registerPlugin;
	var PluginSidebar  = wp.editPost.PluginSidebar;
	var el             = wp.element.createElement;
	var settings       = window.madxEngineListingData.settings;
	var post           = window.madxEngineListingData.post;

	const {
		SelectControl,
		Button,
		PanelBody
	} = wp.components;

	if ( window.madxEngineListingData.ismadxEnginePostType ) {
		registerPlugin( 'madx-listings-settings', {
			render: function() {
				return el( PluginSidebar,
					{
						name: 'madx-listings-settings',
						icon: 'admin-post',
						title: 'Listing Settings',
					},
					(
						<PanelBody>
							<SelectControl
								label={ 'Source' }
								value={settings.source}
								options={[
									{
										value: 'posts',
										label: 'Posts',
									},
									{
										value: 'terms',
										label: 'Terms',
									}
								]}
							/>
						</PanelBody>
					)
				);
			},
		} );
	}
} )( window.wp );
