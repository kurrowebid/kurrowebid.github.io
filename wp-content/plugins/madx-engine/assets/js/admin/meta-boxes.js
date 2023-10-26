(function( $ ) {

	'use strict';

	var madxEngineMetaBoxes = {

		init: function() {

			var self = this;

			self.initDateFields( $( '.cx-control' ) );

			$( document ).on( 'cx-control-init', function( event, data ) {
				if ( data?.target ) {
					self.initDateFields( $( data.target ) );
				}
			} );

		},

		/**
		 * Initialize date and time pickers
		 *
		 * @return {[type]} [description]
		 */
		initDateFields: function( $scope ) {

			var isRTL          = window.madxEngineMetaBoxesConfig.isRTL || false,
				i18n           = window.madxEngineMetaBoxesConfig.i18n || {},
				saveDateFormat = 'yy-mm-dd',
				saveTimeFormat = 'HH:mm',
				dateFormat     = window.madxEngineMetaBoxesConfig.dateFormat || saveDateFormat,
				timeFormat     = window.madxEngineMetaBoxesConfig.timeFormat || saveTimeFormat;

			$( 'input[type="date"]:not(.hasDatepicker)', $scope ).each( function() {

				var $this = $( this ),
					value = $this.val(),
					$datepicker = $( '<input/>', {
						'type': 'text',
						'class': 'widefat cx-ui-text',
					} );

				if ( $this.prop( 'required' ) ) {
					$datepicker.prop( 'required', 'required' );
				}

				//$this.attr( 'type', 'text' );
				$this.prop( 'type', 'hidden' );
				$this.after( $datepicker );

				$datepicker.datepicker({
					dateFormat: dateFormat,
					altField: $this,
					altFormat: saveDateFormat,
					nextText: '>>',
					prevText: '<<',
					isRTL: isRTL,
					monthNames: i18n.monthNames,
					monthNamesShort: i18n.monthNamesShort,
					beforeShow: function( input, datepicker ) {
						datepicker.dpDiv.addClass( 'madx-engine-datepicker' );
					},
				});

				if ( value ) {
					$datepicker.datepicker(
						'setDate',
						$.datepicker.parseDate( saveDateFormat, value,
							{
								monthNames: i18n.monthNames,
								monthNamesShort: i18n.monthNamesShort,
							}
						)
					);
				}

				$datepicker.on( 'blur', function() {
					if ( ! $datepicker.val() ) {
						$this.val( '' ).trigger( 'change' );
					}
				} );

				$datepicker.on( 'change', function() {
					$( window ).trigger( {
						type:          'cx-control-change',
						controlName:   $this.attr( 'name' ),
						controlStatus: $this.val(),
					} );
				} );

			} );

			$( 'input[type="time"]:not(.hasDatepicker)', $scope ).each( function() {

				var $this = $( this ),
					value = $this.val(),
					$timepicker = $( '<input/>', {
						'type': 'text',
						'class': 'widefat cx-ui-text',
					} );

				if ( $this.prop( 'required' ) ) {
					$timepicker.prop( 'required', 'required' );
				}

				//$this.attr( 'type', 'text' );
				$this.prop( 'type', 'hidden' );
				$this.after( $timepicker );

				$timepicker.timepicker({
					timeFormat: timeFormat,
					altField: $this,
					altTimeFormat: saveTimeFormat,
					isRTL: isRTL,
					timeOnlyTitle: i18n.timeOnlyTitle,
					timeText: i18n.timeText,
					hourText: i18n.hourText,
					minuteText: i18n.minuteText,
					currentText: i18n.currentText,
					closeText: i18n.closeText,
					altFieldTimeOnly: false,
					beforeShow: function( input, datepicker ) {
						datepicker.dpDiv.addClass( 'madx-engine-datepicker' );
					},
				});

				if ( value ) {
					$timepicker.timepicker( 'setTime', $.datepicker.formatTime( timeFormat, $.datepicker.parseTime( saveTimeFormat, value ) ) );
				}

				$timepicker.on( 'blur', function() {
					if ( ! $timepicker.val() ) {
						$this.val( '' ).trigger( 'change' );
					}
				} );

				$timepicker.on( 'change', function() {
					$( window ).trigger( {
						type:          'cx-control-change',
						controlName:   $this.attr( 'name' ),
						controlStatus: $this.val(),
					} );
				} );

			} );

			$( 'input[type="datetime-local"]:not(.hasDatepicker)', $scope ).each( function() {

				var $this = $( this ),
					value = $this.val(),
					$datetimepicker = $( '<input/>', {
						'type': 'text',
						'class': 'widefat cx-ui-text',
					} );

				if ( $this.prop( 'required' ) ) {
					$datetimepicker.prop( 'required', 'required' );
				}

				//$this.attr( 'type', 'text' );
				$this.prop( 'type', 'hidden' );
				$this.after( $datetimepicker );

				$datetimepicker.datetimepicker({
					dateFormat: dateFormat,
					timeFormat: timeFormat,
					altField: $this,
					altFormat: saveDateFormat,
					altTimeFormat: saveTimeFormat,
					altFieldTimeOnly: false,
					altSeparator: 'T',
					nextText: '>>',
					prevText: '<<',
					isRTL: isRTL,
					timeText: i18n.timeText,
					hourText: i18n.hourText,
					minuteText: i18n.minuteText,
					currentText: i18n.currentText,
					closeText: i18n.closeText,
					monthNames: i18n.monthNames,
					monthNamesShort: i18n.monthNamesShort,
					beforeShow: function( input, datepicker ) {
						datepicker.dpDiv.addClass( 'madx-engine-datepicker' );
					},
				});

				if ( value ) {
					$datetimepicker.datetimepicker(
						'setDate',
						$.datepicker.parseDateTime( saveDateFormat, saveTimeFormat, value, {}, {
								separator: 'T',
								monthNames: i18n.monthNames,
								monthNamesShort: i18n.monthNamesShort,
							}
						)
					);
				}

				$datetimepicker.on( 'blur', function() {
					if ( ! $datetimepicker.val() ) {
						$this.val( '' ).trigger( 'change' );
					}
				} );

				$datetimepicker.on( 'change', function() {
					$( window ).trigger( {
						type:          'cx-control-change',
						controlName:   $this.attr( 'name' ),
						controlStatus: $this.val(),
					} );
				} );

			} );

		},

	};

	madxEngineMetaBoxes.init();

})( jQuery );
