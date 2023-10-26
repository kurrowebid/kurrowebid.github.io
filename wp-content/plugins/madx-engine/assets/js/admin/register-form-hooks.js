( () => {
	const { applyFilters } = wp.hooks;
	const notifications = applyFilters( 'madx.engine.register.notifications', [] );
	const formFields = applyFilters( 'madx.engine.register.fields', [] );
	const metaBoxes = applyFilters( 'madx.engine.register.metaBoxes', [] );

	notifications.forEach( NotificationComponent => {
		Vue.component( `madx-engine-notification-${ NotificationComponent.name }`, NotificationComponent );
	} );

	formFields.forEach( FieldComponent => {
		Vue.component( `madx-engine-field-${ FieldComponent.name }`, FieldComponent );
	} );

	metaBoxes.forEach( BoxComponent => {
		new Vue({
			el: `#madx-engine-meta-box-${ BoxComponent.name }`,
			template: '<BoxComponent />',
			components: { BoxComponent }
		});
	} )
} )()