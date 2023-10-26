(
	function ( $ ) {
		const CaptchaHandler = function (
			formID, { action_prefix, key }, resolve, reject ) {
			var script  = document.querySelector(
				'script#madx-form-builder-recaptcha-js' ),
			    cpField = $( 'form[data-form-id="' + formID + '"]' ).
				    find( '.captcha-token' );

			function setFormToken() {
				if ( window.grecaptcha ) {
					grecaptcha.execute(
						key,
						{
							action: action_prefix + formID,
						},
					).then( function ( token ) {
						cpField.val( token );
						resolve();
					} );
				}
				else {
					reject();
				}
			}

			if ( !script ) {

				script = document.createElement( 'script' );

				script.id  = 'madx-form-builder-recaptcha-js';
				script.src = 'https://www.google.com/recaptcha/api.js?render=' +
					key;

				const currentInput = cpField[ cpField.length - 1 ];

				currentInput.parentNode.insertBefore( script, currentInput );

				setFormToken();

			}
			else {
				setFormToken();
			}
		};

		const setUpCaptcha = function ( formID, resolve, reject ) {
			const current = window.madxFormBuilderReCaptchaConfig[ formID ] ||
				false;

			if ( !current ) {
				return resolve();
			}

			window.madxFormBuilderCaptcha( formID, current, resolve, reject );
		};

		const setUpMain = function () {
			let addFilter;

			if ( window.madxFormBuilderAbstract ) {
				addFilter = window.madxPlugins.hooks.addFilter;
			}
			else {
				addFilter = wp.hooks.addFilter;
			}

			if ( !window.madxFormBuilderCaptcha ) {
				window.madxFormBuilderCaptcha = CaptchaHandler;
			}

			addFilter(
				'madx.fb.submit.ajax.promises',
				'madx-form-builder-recaptcha',
				function ( promises, $form ) {
					promises.push( new Promise( ( resolve, reject ) => {
						setUpCaptcha( $form.data( 'form-id' ), resolve,
							reject );
					} ) );

					return promises;
				},
			);

			addFilter(
				'madx.fb.submit.reload.promises',
				'madx-form-builder-recaptcha',
				function ( promises, event ) {
					const $form = $( event.target );

					promises.push( new Promise( ( resolve, reject ) => {
						setUpCaptcha( $form.data( 'form-id' ), resolve,
							reject );
					} ) );

					return promises;
				},
			);

		};

		$( setUpMain );
	}
)( jQuery );