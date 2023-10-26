import FormsSettings from "./tabs/forms-settings/FormsSettings";

const { applyFilters } = wp.hooks;

const componentTabs = applyFilters( 'madx.engine.tabs.register', [
	FormsSettings
] );

componentTabs.forEach( TabComponent => {
	Vue.component( `madx-engine-tab-${ TabComponent.name }`, TabComponent );
} )
