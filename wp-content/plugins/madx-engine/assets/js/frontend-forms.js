( function( $ ) {

	"use strict";

	$.fn.madxFormConditional = function( options ) {

		var settings = $.extend( {
			hideJS: true
		}, options );

		var checkValue = function( $listenTo, listenFor, operator ) {

			var val = '';
			var checkResult = false;
			var controlType = 'plain';

			operator = operator || 'equal';

			if ( $listenTo.is( 'input[type=checkbox]' ) ) {
				controlType = 'checkbox';
			} else if ( $listenTo.is( 'input[type=radio]' ) ) {
				controlType = 'radio';
			}

			if ( 'checkbox' === controlType ) {
				val = [];
			}

			if ( 'plain' === controlType ) {
				val = $listenTo.val();
			} else {

				$listenTo.each( function() {

					var $control = $( this );

					if ( $control.is( ':checked' ) ) {
						if ( 'checkbox' === controlType ) {
							val.push( $control.val() );
						} else {
							val = $control.val();
						}
					}

				} );
			}

			if ( 'is-hidden' === val ) {
				val = '';
			}

			switch ( operator ) {
				case 'equal':
					if ( val && val.constructor === Array ) {
						checkResult = false;
					} else {
						checkResult = ( val == listenFor );
					}
					break;

				case 'greater':
					if ( val && val.constructor === Array ) {
						checkResult = false;
					} else {
						checkResult = ( parseFloat( val ) > parseFloat( listenFor ) );
					}
					break;

				case 'less':
					if ( val && val.constructor === Array ) {
						checkResult = false;
					} else {
						checkResult = ( parseFloat( val ) < parseFloat( listenFor ) );
					}
					break;

				case 'between':

					if ( val && val.constructor === Array ) {
						checkResult = false;
					} else {
						if ( 2 <= listenFor.length ) {
							let from = parseFloat( listenFor[0] );
							let to = parseFloat( listenFor[1] );
							val = parseFloat( val );
							checkResult = ( from <= val && val <= to );
						} else {
							checkResult = false;
						}
					}

					break;

				case 'one_of':
					if ( val && val.constructor === Array ) {

						var intersect = listenFor.filter( function( n ) {
							return val.indexOf( n ) !== -1;
						} );

						checkResult = 0 < intersect.length;

					} else if ( ! val ) {
						checkResult = false;
					} else {
						if ( listenFor.length ) {
							checkResult = 0 <= listenFor.indexOf( val );
						} else {
							checkResult = false;
						}
					}

					break;

				case 'contain':

					if ( val && val.constructor === Array ) {

						var intersect = val.filter( function( n ) {
							return n.indexOf( listenFor ) !== -1;
						} );

						checkResult = 0 < intersect.length;

					} else if ( ! val ) {
						checkResult = false;
					} else {
						checkResult = 0 <= val.indexOf( listenFor );
					}

					break;
			}

			return checkResult;
		};

		var checkVisibilityCond = function( listenTo, listenFor, $section, operator, type ) {

			var checked = $section.data( 'checked' );
			var $listenTo = $( listenTo );
			var checkResult = checkValue( $listenTo, listenFor, operator );

			type = type || 'show';

			if ( ! checked ) {
				checked = {};
			}

			if ( 'show' === type ) {
				checked[ listenTo ] = checkResult;
			} else {
				checked[ listenTo ] = ! checkResult;
			}

			$section.data( 'checked', checked );

		};

		var checkSetValueCond = function( listenTo, listenFor, $section, operator, value, type ) {

			var currentVal = $section.data( 'result_' + type );
			var $listenTo = $( listenTo );
			var checkResult = checkValue( $listenTo, listenFor, operator );

			if ( checkResult ) {
				currentVal = value;
			}

			$section.data( 'result_' + type, currentVal );

		};

		var setValue = function( $section ) {

			var setVal = false;
			var setCalcVal = false;
			var $field;
			var triggered = false;

			if ( $section.data( 'result_set_value' ) ) {
				setVal = $section.data( 'result_set_value' );
			}

			if ( $section.data( 'result_set_calculated_value' ) ) {
				setCalcVal = $section.data( 'result_set_calculated_value' );
			}

			if ( ! setVal && ! setCalcVal ) {
				return;
			}

			$field = $section.find( '.madx-form__field' );

			if ( ! $field.length ) {
				return;
			}

			if ( $field.is( 'select' ) ) {

				$field.find( ':selected' ).removeAttr( 'selected' );

				if ( setVal ) {
					$field.find( 'option[value="' + setVal + '"]' ).attr( 'selected', 'selected' ).trigger( 'change.madxEngine' );
					triggered = true;
				}

				if ( setCalcVal ) {
					$field.find( 'option[data-calculate="' + setCalcVal + '"]' ).attr( 'selected', 'selected' );
					if ( ! triggered ) {
						$field.trigger( 'change.madxEngine' );
						triggered = true;
					}
				}

			} else if ( $field.is( ':not( input[type=checkbox], input[type=radio] )' ) ) {

				if ( setVal ) {
					$field.val( setVal ).trigger( 'change.madxEngine' );
					triggered = true;
				}

				if ( setCalcVal ) {
					$field.data( 'calculate', setCalcVal );
					if ( ! triggered ) {
						$field.trigger( 'change.madxEngine' );
						triggered = true;
					}
				}

			} else {

				$field.each( function() {

					var $this = $( this );

					if ( $this.is( ':checked' ) ) {
						$this.removeAttr( 'checked' );
					}

					if ( setVal && setVal == $this.val() ) {
						$this.attr( 'checked', 'checked' ).trigger( 'change.madxEngine' );
						triggered = true;
					}

					if ( setCalcVal && setCalcVal == $this.data( 'calculate' ) ) {
						$this.attr( 'checked', 'checked' );
						if ( ! triggered ) {
							$this.trigger( 'change.madxEngine' );
							triggered = true;
						}
					}

				} );

			}

		};

		var setVisibility = function( $section ) {

			var checked = $section.data( 'checked' );
			var $row = $section.closest( '.madx-form-row' );
			var res = true;

			if ( ! checked ) {
				return;
			}

			for ( var check in checked ) {
				if ( ! checked[ check ] ) {
					res = false;
				}
			}

			if ( res ) {

				$section.show();
				$row.show();

				$section.find( '*[data-initial-type]' ).each( function() {
					var $this = $( this );

					$this.attr( 'type', $this.data( 'initial-type' ) );
				} );

				$section.find( 'select option[data-is-hidden="1"]' ).remove();
				$section.find( '.madx-form__fields-group input[data-is-hidden="1"]' ).remove();

				//$section.find( '*[data-required="1"]:not(.checkradio-field)' ).val( '' );

				$section.find( '.madx-form__field[data-value]' ).each( function() {
					var $this = $( this );

					$this.val( $this.attr( 'data-value' ) );
					$this.removeAttr( 'data-value' );
				} );

				$section.find( '*[data-required="1"]' )
					.removeAttr( 'data-required' )
					.attr( 'required', true );

			} else {

				$section.hide();

				$section.find( '*[type="date"],*[type="time"],*[type="email"],*[type="url"],*[type="number"]' ).each( function() {
					var $this = $( this ),
						type  = $this.attr( 'type' );

					$this.attr( 'data-initial-type', type );
					$this.attr( 'type', 'text' );
				} );

				var $select = $section.find( 'select' );
				var val     = 'is-hidden';

				if ( $select.length ) {

					var defaultVal = $select.data( 'default-val' );

					if ( defaultVal || 0 === defaultVal ) {
						val = defaultVal;
					}

					$select.append( '<option value="' + val + '" data-is-hidden="1"></option>' );

				}

				var $checkradio = $section.find( '.madx-form__field.checkradio-field' );

				if ( $checkradio.length ) {
					var $group = $checkradio.closest( '.madx-form__fields-group' );

					if ( ! $group.find( 'input[data-is-hidden="1"]' ).length ) {
						$group.append( '<input type="hidden" name="' + $checkradio.attr( 'name' ).replace( '[]', '' ) + '" value="' + val + '" data-is-hidden="1">' );
					}

				}

				//$section.find( '*[required="required"]:not(.checkradio-field)' ).val( val );

				$section.find( '.madx-form__field:not(.checkradio-field):not(.file-field)' ).each( function() {
					var $this = $( this );

					if ( val === $this.val() ) {
						return;
					}

					$this.attr( 'data-value', $this.val() );
					$this.val( val );
				} );

				$section.find( '*[required="required"]' )
					.removeAttr( 'required' )
					.attr( 'data-required', 1 );

				// Maybe hide parent row.
				var $hiddenItems = $row.find( '>*' ).filter( function() {
					return $( this ).css( 'display' ) === 'none';
				} );

				if ( $row.find( '>*' ).length === $hiddenItems.length ) {
					$row.hide();
				}
			}

		};

		return this.each( function() {

			var $section = $( this );
			var conditions = $section.data( 'conditional' );

			if ( ! conditions || ! conditions.length ) {
				return;
			}

			for ( var i = 0; i < conditions.length; i++ ) {

				let condition = conditions[ i ];

				if ( ! condition.field ) {
					continue;
				}

				let listenTo   = ".madx-form__field[name=" + condition.field + "], .madx-form__field [name=" + condition.field + "], .madx-form__field[name=" + condition.field + "\\[\\]]";
				let listenFor  = condition.value;
				let operator   = condition.operator;
				let type       = condition.type;
				let valueToSet = condition.set_value;

				//Set up event listener
				$( document ).on( 'change.madxEngine', listenTo, function() {

					if ( 'show' === type || 'hide' === type ) {
						checkVisibilityCond( listenTo, listenFor, $section, operator, type );
					} else {
						checkSetValueCond( listenTo, listenFor, $section, operator, valueToSet, type );
					}

					setValue( $section );
					setVisibility( $section );

				} );

				//If setting was chosen, hide everything first...
				if ( settings.hideJS && ( 'show' === type || 'hide' === type ) ) {
					$section.hide();
				}

				//Show based on current value on page load
				if ( 'show' === type || 'hide' === type ) {
					checkVisibilityCond( listenTo, listenFor, $section, operator, type );
				} else {
					checkSetValueCond( listenTo, listenFor, $section, operator, valueToSet, type );
				}

			}

			setValue( $section );
			setVisibility( $section );

		} );
	};

	var madxEngineForms = {

		calcFields: {},
		repeaterCalcFields: {},
		childrenCalcFields: {},

		pages: {},

		init: function() {

			var widgets = {
				'madx-engine-booking-form.default': madxEngineForms.widgetBookingForm,
			};

			$.each( widgets, function( widget, callback ) {
				window.madxartworkFrontend.hooks.addAction( 'frontend/element_ready/' + widget, callback );
			} );

		},

		commonInit: function() {
			var self = madxEngineForms;

			$( document )
				.on( 'click.madxEngine', '.madx-form__submit.submit-type-ajax', self.ajaxSubmitForm )
				.on( 'submit.madxEngine', 'form.madx-form.submit-type-reload', self.reloadSubmitForm )
				.on( 'click.madxEngine', '.madx-form__next-page', self.nextFormPage )
				.on( 'click.madxEngine', '.madx-form__prev-page', self.prevFormPage )
				.on( 'focus.madxEngine', '.madx-form__field', self.clearFieldErrors )
				.on( 'click.madxEngine', '.madx-form__field-template', self.simLabelClick )
				.on( 'change.madxEngine', '.madx-form__field', self.recalcFields )
				.on( 'madx-engine/form/repeater-changed', '.madx-form-repeater', self.recalcFields )
				.on( 'change.madxEngine', '.madx-form__field.checkboxes-group-required', self.requiredCheckboxGroup )
				.on( 'change.madxEngine', '.checkradio-field', self.changeActiveTemplateClass )
				.on( 'input.madxEngine/range', '.madx-form__field.range-field', self.updateRangeField )
				.on( 'click.madxEngine', '.madx-form-repeater__new', self.newRepeaterItem )
				.on( 'click.madxEngine', '.madx-form-repeater__remove', self.removeRepeaterItem )
				.on( 'input.madxEngine', '.madx-form__field.text-field, .madx-form__field.textarea-field', self.inputTextFields )
				.on( 'madx-engine/form/page/field-changed', self.maybeSwitchPage );

		},

		initBlocks: function( $scope ) {
			
			$scope = $scope || $( 'body' );
			
			window.madxPlugins.init( $scope, [
				{
					block: 'madx-engine/booking-form',
					callback: madxEngineForms.widgetBookingForm
				}
			] );

		},

		removeRepeaterItem: function() {

			var $this         = $( this ),
			    $repeater     = $this.closest( '.madx-form-repeater' ),
			    $repeaterItem = $this.closest( '.madx-form-repeater__row' ),
			    $editor       = $repeaterItem.find( '.wp-editor-area' );

			$this.trigger( 'madx-engine/form/on-remove-repeater-item' );

			if ( $editor.length && window.wp && window.wp.editor ) {
				$editor.each( function() {
					window.wp.editor.remove( $( this ).attr( 'id' ) );
				} );
			}

			$repeaterItem.remove();
			$repeater.trigger( 'madx-engine/form/repeater-changed' );

		},

		newRepeaterItem: function() {

			var $this     = $( this ),
			    $repeater = $this.closest( '.madx-form-repeater' ),
			    $initial  = $repeater.find( '.madx-form-repeater__initial' ),
			    $items    = $repeater.find( '.madx-form-repeater__items' ),
			    $newVal   = $initial.html(),
			    index     = 0;

			if ( $items.find( '.madx-form-repeater__row' ).length ) {
				$items.find( '.madx-form-repeater__row' ).each( function() {
					var $this        = $( this ),
					    currentIndex = parseInt( $this.data( 'index' ), 10 );

					if ( currentIndex > index ) {
						index = currentIndex;
					}
				} );
				index++;
			}

			$newVal = $newVal.replace( /__i__/g, index );
			$newVal = $( $newVal );
			$newVal.data( 'index', index );
			$newVal.attr( 'data-index', index );

			madxEngineForms.initRangeFields( $newVal );

			$items.append( $newVal );

			var $editor = $newVal.find( '.wp-editor-area' );

			if ( $editor.length && window.wp && window.wp.editor ) {
				$editor.each( function() {
					madxEngineForms.wysiwygInitWithTriggers( this );
				} );
			}

			if ( $.fn.inputmask ) {
				$newVal.find( '.madx-form__masked-field' ).inputmask();
			}

			madxEngineForms.initConditions( $newVal );

			$repeater.trigger( 'madx-engine/form/repeater-changed' );
			$this.trigger( 'madx-engine/form/repeater-add-new', [ index ] );

			madxEngineForms.calculateRowValue( $newVal );

		},

		updateRepeaterItems: function( $repeater, $field ) {

			var val = madxEngineForms.getFieldValue( $field );

			if ( ! val ) {
				return;
			}

			for ( var i = 0; i < val; i++ ) {

				var $item = $repeater.find( '.madx-form-repeater__row[data-index="' + i + '"]' );

				if ( ! $item.length ) {
					madxEngineForms.newRepeaterItem.call( $repeater );
				}

			}

			var $rows = $repeater.find( '.madx-form-repeater__row' );

			if ( $rows.length ) {
				$rows.each( function() {
					var $row  = $( this ),
					    index = parseInt( $row.data( 'index' ), 10 );

					index++;

					if ( index > val ) {
						$row.remove();
						$repeater.trigger( 'madx-engine/form/repeater-changed' );
					}

				} );
			}

			$repeater.trigger( 'change' );

		},

		calculateRowValue: function( $row ) {

			var val = madxEngineForms.calculateValue( $row );

			$row.data( 'value', val );
			madxEngineForms.calculateFieldsInRow( $row );

		},

		calculateFieldsInRow: function( $row ) {

			$row.find( '.madx-form__calculated-field--child' ).each( function() {

				var $childCalculatedField = $( this ),
				    val                   = madxEngineForms.calculateValue( $childCalculatedField )

				if ( ! val ) {
					val = 0;
				}

				$childCalculatedField.find( '.madx-form__calculated-field-val' ).text( val.toFixed( $childCalculatedField.data( 'precision' ) ) );
				$childCalculatedField.find( '.madx-form__calculated-field-input' ).val( val.toFixed( $childCalculatedField.data( 'precision' ) ) ).trigger( 'change.madxEngine' );

			} );

		},

		initRepeaterListener: function( $scope ) {

			var $repeater = $scope.find( '.madx-form-repeater' );

			if ( ! $repeater.length ) {
				return;
			}

			$repeater.each( function() {

				var $this    = $( this ),
				    settings = $this.data( 'settings' );

				if ( 'dynamically' === settings.manageItems && settings.itemsField ) {
					var $itemsField = $scope.find( '[data-field-name="' + settings.itemsField + '"]' );

					madxEngineForms.updateRepeaterItems( $this, $itemsField );

					$itemsField.on( 'change', function() {
						madxEngineForms.updateRepeaterItems( $this, $itemsField );
					} );
				}

				if ( 'custom' === settings.calcType ) {

					var calculated = null;

					madxEngineForms.repeaterCalcFields[ $this.data( 'field-name' ) ] = {
						'el': $this,
						'listenTo': $this.data( 'listen_fields' ),
					};

					calculated = madxEngineForms.calculateValue( $this );

					$this.data( 'value', calculated.toFixed( 0 ) );

				}

				var $initial = $this.find( '.madx-form-repeater__initial' );
				$initial = $( $initial.html() );

				var $calcFields = $initial.find( '.madx-form__calculated-field--child' );

				if ( $calcFields.length ) {

					$calcFields.each( function() {

						var $childField = $( this );

						madxEngineForms.childrenCalcFields[ $childField.data( 'name' ) ] = {
							'el': $childField,
							'parentEl': $this,
							'listenTo': $childField.data( 'listen_to' ),
						};

						$this.find( '.madx-form-repeater__row' ).each( function() {
							madxEngineForms.calculateRowValue( $( this ), $childField.data( 'precision' ) );
						} );

					} );
				}

			} );

		},

		simLabelClick: function( event ) {
			$( this ).next( '.madx-form__field-label' ).trigger( 'click' );
		},

		maybeSwitchPage: function( event, $field, $page, disabled ) {

			var $item    = $field[ 0 ],
			    isSwitch = $field.data( 'switch' ),
			    value    = null,
			    $toPage  = null;

			if ( ! isSwitch ) {
				return;
			}

			if ( disabled ) {
				return;
			}

			value = $item.value;

			if ( ! value ) {
				return;
			}

			$toPage = $page.next();

			if ( ! $page || ! $page.length ) {
				return;
			}

			if ( ! $toPage || ! $toPage.length ) {
				return;
			}

			madxEngineForms.switchFormPage( $page, $toPage );

		},

		changeActiveTemplateClass: function( event ) {

			var $this     = $( this ),
			    $template = $this.closest( '.madx-form__field-wrap' ).find( '.madx-form__field-template' );

			if ( ! $template.length ) {
				return;
			}

			if ( 'radio' === $this[ 0 ].type ) {
				$template
					.closest( '.madx-form__fields-group' )
					.find( '.madx-form__field-template--checked' )
					.removeClass( 'madx-form__field-template--checked' );
			}

			$template.toggleClass( 'madx-form__field-template--checked', $this[ 0 ].checked );

		},

		initConditions: function( $scope ) {
			$scope.find( '.madx-form-col' ).madxFormConditional();
		},

		widgetBookingForm: function( $scope ) {

			var $calcFields = $scope.find( '.madx-form__calculated-field' );

			var $editor = $scope.find( '.madx-form__field .wp-editor-area' );

			if ( $editor.length && window.wp && window.wp.editor ) {
				$editor.each( function() {
					madxEngineForms.wysiwygInitWithTriggers( this, true );
				} );
			}
			madxEngineForms.initRequiredCheckboxGroup( $scope );

			$( document ).trigger( 'madx-engine/booking-form/init', [ $scope ] );

			madxEngineForms.initFormPager( $scope );
			madxEngineForms.initRangeFields( $scope );
			madxEngineForms.initRepeaterListener( $scope );
			madxEngineForms.initConditions( $scope );

			if ( $.fn.inputmask ) {
				$scope.find( '.madx-form__masked-field' ).inputmask();
			}

			if ( ! $calcFields.length ) {
				return;
			}

			$calcFields.each( function() {

				var $this      = $( this ),
				    calculated = null;

				madxEngineForms.calcFields[ $this.data( 'name' ) ] = {
					'el': $this,
					'listenTo': $this.data( 'listen_to' ),
				};

				calculated = madxEngineForms.calculateValue( $this );

				$this.find( '.madx-form__calculated-field-val' ).text( calculated.toFixed( $this.data( 'precision' ) ) );
				$this.find( '.madx-form__calculated-field-input' ).val( calculated.toFixed( $this.data( 'precision' ) ) ).trigger( 'change.madxEngine' );

			} );
		},

		initFormPager: function( $scope ) {
			var $pages = $scope.find( '.madx-form-page' ),
			    $form  = $scope.find( '.madx-form' );

			if ( ! $pages.length ) {
				return;
			}

			$pages.each( function() {

				var $page = $( this );

				if ( ! $page.hasClass( '.madx-form-page--hidden' ) ) {
					madxEngineForms.initSingleFormPage( $page, $form, false );
				}

			} );

		},

		initSingleFormPage: function( $page, $form, $changedField ) {

			var $button        = $page.find( '.madx-form__next-page' ),
			    $msg           = $page.find( '.madx-form__next-page-msg' ),
			    requiredFields = $page[ 0 ].querySelectorAll( '.madx-form__field[required]' ),
			    pageNum        = parseInt( $page.data( 'page' ), 10 ),
			    disabled       = false,
			    radioFields    = {};

			$changedField = $changedField || false;

			if ( requiredFields.length ) {
				for ( var i = 0; i < requiredFields.length; i++ ) {

					var $field = $( requiredFields[ i ] );
					var val = null;
					var isRadio = false;

					if ( 'INPUT' === $field[ 0 ].nodeName ) {

						if ( $field.length > 1 ) {
							for ( var j = 0; j < $field.length; j++ ) {
								if ( $field[ j ].checked ) {
									val = $field[ j ].value;
								}
							}
						} else if ( 'radio' === $field[ 0 ].type ) {

							isRadio = true;

							if ( $field[ 0 ].checked ) {
								radioFields[ $field[ 0 ].name ] = $field[ 0 ].value;
							}

						} else {
							val = $field.val();
						}
					}

					if ( 'TEXTAREA' === $field[ 0 ].nodeName ) {
						val = $field.val();
					}

					if ( 'SELECT' === $field[ 0 ].nodeName ) {
						val = $field.find( 'option:selected' ).val();
					}

					if ( ! val ) {
						disabled = true;
					}

					if ( isRadio && radioFields[ $field[ 0 ].name ] ) {
						disabled = false;
					}

				}
			}

			if ( disabled ) {

				if ( $msg.length ) {
					$msg.addClass( 'madx-form__next-page-msg--visible' );
				}

				$button.attr( 'disabled', true );
			} else {

				if ( $msg.length ) {
					$msg.removeClass( 'madx-form__next-page-msg--visible' );
				}

				$button.attr( 'disabled', false );
			}

			if ( ! madxEngineForms.pages[ pageNum ] ) {
				madxEngineForms.pages[ pageNum ] = {
					page: $page,
					disabled: disabled,
				};
			} else {
				madxEngineForms.pages[ pageNum ].disabled = disabled;
			}

			if ( $changedField ) {
				$( document ).trigger( 'madx-engine/form/page/field-changed', [ $changedField, $page, disabled ] );
			}

			if ( $page.hasClass( 'madx-form-page--initialized' ) ) {
				return;
			}

			$page.on( 'change.madxEngine', '.madx-form__field', function() {
				madxEngineForms.initSingleFormPage( $page, $form, $( this ) );
			} );

			$page.addClass( 'madx-form-page--initialized' );

		},

		nextFormPage: function() {

			var $button     = $( this ),
			    $fromPage   = $button.closest( '.madx-form-page' ),
			    $pageFields = $fromPage.find( '.madx-form__field' ).filter( ':input' ),
			    $toPage     = $fromPage.next();

			if ( ! madxEngineForms.isFieldsValid( $pageFields ) ) {
				return;
			}

			madxEngineForms.switchFormPage( $fromPage, $toPage );

		},

		prevFormPage: function() {

			var $button   = $( this ),
			    $fromPage = $button.closest( '.madx-form-page' ),
			    $toPage   = $fromPage.prev();

			madxEngineForms.switchFormPage( $fromPage, $toPage );
		},

		isFieldsValid: function( $fields ) {
			var isValid = true;

			$fields.each( function( ind, field ) {
				if ( ! field.checkValidity() ) {
					field.reportValidity();
					isValid = false;
					return false;
				}
			} );

			return isValid;
		},

		switchFormPage: function( $fromPage, $toPage ) {

			var $form = $fromPage.closest( '.madx-form' );

			$fromPage.addClass( 'madx-form-page--hidden' );
			$toPage.removeClass( 'madx-form-page--hidden' );

			madxEngineForms.initSingleFormPage( $toPage, $form, false );

			$( document ).trigger( 'madx-engine/form/switch-page', [ $fromPage, $toPage ] )

			$( '.madx-form-messages-wrap[data-form-id="' + $form.data( 'form-id' ) + '"]' ).html( '' );

		},

		getFieldValue: function( $field ) {

			var val = 0;

			if ( $field.length ) {

				if ( 'INPUT' === $field[ 0 ].nodeName ) {
					if ( $field.length > 1 ) {

						for ( var i = 0; i < $field.length; i++ ) {
							if ( $field[ i ].checked ) {

								var itemVal = 0;

								if ( undefined !== $field[ i ].dataset.calculate ) {
									itemVal = $field[ i ].dataset.calculate;
								} else {
									itemVal = $field[ i ].value;
								}

								if ( 'checkbox' === $field[ i ].type ) {
									val += parseInt( itemVal, 10 );
								} else {
									val = itemVal;
								}

							}
						}

					} else {
						if ( 'checkbox' === $field[ 0 ].type ) {
							if ( $field[ 0 ].checked ) {
								if ( undefined !== $field[ 0 ].dataset.calculate ) {
									val = $field[ 0 ].dataset.calculate;
								} else {
									val = $field[ 0 ].value;
								}
							}
						} else {
							val = $field.val();
						}
					}
				}

				if ( 'SELECT' === $field[ 0 ].nodeName ) {

					var selectedOption = $field.find( 'option:selected' ),
					    calcValue      = selectedOption.data( 'calculate' );

					if ( undefined !== calcValue ) {
						val = calcValue;
					} else {
						val = $field.find( 'option:selected' ).val();
					}

				}

				if ( 'DIV' === $field[ 0 ].nodeName ) {

					if ( $field.hasClass( 'madx-form-repeater' ) ) {
						var repeaterSettings = $field.data( 'settings' );
						if ( repeaterSettings && 'custom' === repeaterSettings.calcType ) {
							$field.find( '.madx-form-repeater__row' ).each( function() {
								var $row   = $( this ),
								    rowVal = madxEngineForms.calculateValue( $row );

								$row.data( 'value', rowVal );

								val += rowVal;
							} );

						} else {
							val = $field.find( '.madx-form-repeater__row' ).length;
						}
					}

				}

			}

			if ( ! val ) {
				val = '0';
			}

			val = madxEngine.filters.applyFilters( 'forms/calculated-field-value', val, $field );

			return val;

		},

		calculateValue: function( $scope ) {

			var formula  = String( $scope.data( 'formula' ) ),
			    listenTo = $( '[name^="' + $scope.data( 'listen_to' ) + '"]', $scope.closest( 'form' ) ),
			    regexp   = /%([a-zA-Z0-9-_]+)%/g,
			    func     = null;

			if ( ! formula ) {
				return null;
			}

			formula = madxEngine.filters.applyFilters( 'forms/calculated-formula-before-value', formula, $scope );

			formula = formula.replace( regexp, function( match1, match2 ) {

				var object = null;

				if ( $scope.data( 'repeater' ) ) {
					object = $scope;
				} else if ( $scope.hasClass( 'madx-form__calculated-field--child' ) ) {
					object = $scope.closest( '.madx-form-repeater__row' ).find( '[data-field-name="' + match2 + '"]' );
				} else if ( $scope.data( 'repeater-row' ) ) {
					object = $scope.find( '[data-field-name="' + match2 + '"]' );
				} else {
					object = $scope.closest( 'form' ).find( '[name="' + match2 + '"], [name="' + match2 + '[]"]' );
				}

				return madxEngineForms.getFieldValue( object );

			} );

			formula = madxEngine.filters.applyFilters( 'forms/calculated-formula-after-value', formula, $scope );

			func = new Function( 'return ' + formula );

			return func();

		},

		recalcFields: function( event ) {

			var $this          = $( this ),
			    fieldName      = $this.attr( 'name' ),
			    fieldPrecision = 2,
			    calculated     = null,
			    done           = false;

			if ( $this.data( 'field-name' ) ) {
				fieldName = $this.data( 'field-name' );
			}

			if ( ! fieldName ) {
				return;
			}

			$.each( madxEngineForms.calcFields, function( calcFieldName, field ) {

				fieldName = fieldName.replace( '[]', '' );

				if ( 0 <= $.inArray( fieldName, field.listenTo ) ) {

					calculated = madxEngineForms.calculateValue( field.el );
					fieldPrecision = field.el.data( 'precision' );

					field.el.find( '.madx-form__calculated-field-val' ).text( calculated.toFixed( fieldPrecision ) );
					field.el.find( '.madx-form__calculated-field-input' ).val( calculated.toFixed( fieldPrecision ) ).trigger( 'change.madxEngine' );

				}

			} );

			if ( 'madx-engine/form/repeater-changed' !== event.type ) {

				$.each( madxEngineForms.repeaterCalcFields, function( calcFieldName, field ) {

					fieldName = fieldName.replace( '[]', '' );

					if ( 0 <= $.inArray( fieldName, field.listenTo ) ) {

						field.el.trigger( 'madx-engine/form/repeater-changed' );

					}

				} );

			}

			$.each( madxEngineForms.childrenCalcFields, function( calcFieldName, field ) {

				fieldName = fieldName.replace( '[]', '' );

				if ( 0 <= $.inArray( fieldName, field.listenTo ) ) {
					var $row = $this.closest( '.madx-form-repeater__row' );
					madxEngineForms.calculateFieldsInRow( $row );
				}

			} );

		},

		initRequiredCheckboxGroup: function( $scope ) {
			var $group = $scope.find( '.madx-form__fields-group' );

			$group.each( function() {
				var $this       = $( this ),
				    $checkboxes = $( '.checkboxes-group-required', $this );

				if ( $checkboxes.length ) {
					var isChecked = $checkboxes.is( ':checked' );

					$checkboxes.attr( 'required', ! isChecked );
				}
			} );
		},

		requiredCheckboxGroup: function( event ) {
			var $this       = $( event.target ),
			    $group      = $this.closest( '.madx-form__fields-group' ),
			    $checkboxes = $( '.checkboxes-field', $group );

			if ( $checkboxes.length < 2 ) {
				return;
			}

			var isChecked = $checkboxes.is( ':checked' );

			$checkboxes.attr( 'required', ! isChecked );
		},

		initRangeFields: function( $scope ) {
			var $rangeFields = $scope.find( '.madx-form__field.range-field' );

			if ( ! $rangeFields.length ) {
				return;
			}

			$rangeFields.each( function() {
				madxEngineForms.updateRangeField( { target: $( this ), firstInit: true } );
			} );
		},

		updateRangeField: function( event ) {
			var $target        = $( event.target ),
			    $wrap          = $target.closest( '.madx-form__field-wrap' ),
			    $number        = $wrap.find( '.madx-form__field-value-number' ),
			    max            = $target.attr( 'max' ) || 100,
			    val            = $target.val(),
			    isElemEditMode = window.madxartworkFrontend ? window.madxartworkFrontend.isEditMode() : false;

			if ( event.firstInit && ! isElemEditMode ) {
				$number.text( max ).css( 'min-width', $number.width() );
			}

			$number.text( val );
		},

		inputTextFields: function() {
			$( this ).trigger( 'change.madxEngine' );
		},

		reloadSubmitForm: function( event ) {

			var $maskedFields = $( event.target ).find( '.madx-form__masked-field' );

			if ( $maskedFields.length ) {
				$maskedFields.each( function() {
					var $maskedField = $( this );

					// Remove mask if empty value
					if ( !$maskedField.val() && $maskedField.inputmask ) {
						$maskedField.inputmask( 'remove' );
					}
				} );
			}

			$( this ).find( '.madx-form__submit' ).attr( 'disabled', true );
		},

		ajaxSubmitForm: function() {

			var $this  = $( this ),
			    $form  = $this.closest( '.madx-form' ),
			    formID = $form.data( 'form-id' ),
			    data   = {
				    action: 'madx_engine_form_booking_submit',
			    };

			if ( 'undefined' !== typeof $form[ 0 ].checkValidity && 'undefined' !== typeof $form[ 0 ].reportValidity && ! $form[ 0 ].checkValidity() ) {
				$form[ 0 ].reportValidity();
				return;
			}

			if ( window.tinyMCE ) {
				window.tinyMCE.triggerSave();
			}

			data.values = $form.serializeArray();
			data._madx_engine_booking_form_id = formID;

			$form.addClass( 'is-loading' );
			$this.attr( 'disabled', true );

			$( '.madx-form-messages-wrap[data-form-id="' + formID + '"]' ).html( '' );
			$form.find( '.madx-form__field-error' ).remove();

			$.ajax( {
				url: madxEngineSettings.ajaxurl,
				type: 'POST',
				dataType: 'json',
				data: data,
			} ).done( function( response ) {

				$form.removeClass( 'is-loading' );
				$this.attr( 'disabled', false );

				switch ( response.status ) {

					case 'validation_failed':

						$.each( response.fields, function( index, fieldName ) {
							var $field = $form.find( '.madx-form__field[name="' + fieldName + '"]:last' );

							if ( $field.hasClass( 'checkradio-field' ) ) {
								$field.closest( '.madx-form__field-wrap' ).after( response.field_message );
							} else {
								$field.after( response.field_message );
							}

						} );

						break;

					case 'success':
						$( document ).trigger( 'madx-engine/form/ajax/on-success', [ response, $form, data ] );
						break;
				}
				if ( response.redirect ) {
					window.location = response.redirect;
				} else if ( response.reload ) {
					window.location.reload();
				}

				$( '.madx-form-messages-wrap[data-form-id="' + formID + '"]' ).html( response.message );

			} );

		},

		clearFieldErrors: function() {

			var $this  = $( this ),
			    formID = $this.closest( '.madx-form' ).data( 'form-id' );
			$this.closest( '.madx-form-col' ).find( '.madx-form__field-error' ).remove();
			$( '.madx-form-messages-wrap[data-form-id="' + formID + '"]' ).html( '' );

		},

		addTriggersWysiwyg: function( field, editorId ) {
			const callable = function( e ) {
				this.save();
				field.trigger( 'change.madxEngine', [ this ] );
			};
			
			setTimeout( function() {
				const editor = tinymce.get( editorId );

				if ( ! editor ) {
					return;
				}

				editor
					.on( 'input', callable )
					.on( 'change', callable );
			} );
		},
		wysiwygInit: function( closure, replace = false ) {
			const self     = $( closure ),
				  editorID = self.attr( 'id' ),
				  field    = self.closest( '.madx-form__field' );

			if ( replace && window.tinymce && window.tinymce.get( editorID ) ) {
				window.tinymce.get( editorID ).remove();
			}

			window.wp.editor.initialize(
				editorID,
				field.data( 'editor' ),
			);

			return { editorID, field: self };
		},
		wysiwygInitWithTriggers: function( closure, replace = false ) {
			const { editorID, field } = madxEngineForms.wysiwygInit( closure, replace );

			madxEngineForms.addTriggersWysiwyg( field, editorID );
		},

	};

	$( window ).on( 'madxartwork/frontend/init', madxEngineForms.init );

	window.addEventListener( 'DOMContentLoaded', function() {
		madxEngineForms.initBlocks();
	} );

	window.madxEngineForms = madxEngineForms;

	madxEngineForms.commonInit();

}( jQuery ) );
