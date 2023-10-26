( function () {

	'use strict';


	Vue.component( 'upsale-page', {

		template: '#madx-dashboard-upsale-page',

		props: {
			subpage: [ String, Boolean ]
		},

		data: function() {
			return {
				generalConfig: window.madxDashboardConfig.generalConfig || [],
			};
		},

		computed: {
			getCrocoblockLink: function() {
				let baseUrl = this.generalConfig.pricingPageUrl || 'https://crocoblock.com/pricing/',
					licenseType = `${ this.$root.licenseType }-license` || 'not-activated-license',
					themeAuthor = this.$root.themeInfo.authorSlug || 'unknow-author',
					utmString = window.madxDasboard.getUtmParamsString( {
						utm_source: `dashboard/${ this.$root.pageModule }`,
						utm_medium: `${ licenseType }/${ themeAuthor }`,
						utm_campaign: 'upsale-crocoblock',
					} );

				if ( utmString ) {
					return `${ baseUrl }?${ utmString }`;
				}

				return baseUrl;
			},
		},

		methods: {
			navigateToLicensePage: function() {
				window.location.href = window.madxDashboardConfig.licensePageUrl;
			},

			navigateToLicenseManager: function() {
				window.location.href = window.madxDashboardConfig.licenseManagerUrl;
			}
		}
	} );

} )();
