import CaptchaTab from './Captcha.vue';

const { __ } = wp.i18n;

const title = __( 'Captcha Settings', 'madx-form-builder' );
const component = CaptchaTab;

export {
	title,
	component
}