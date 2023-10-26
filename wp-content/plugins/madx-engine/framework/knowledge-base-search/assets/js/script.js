class madxKBS {
	
	constructor() {

		this.hiddenClass = 'is-hidden';
		
		this.$box = jQuery( '.madx-kbs-box' );
		this.$trigger = this.$box.find( '.madx-kbs-trigger' );
		this.$open = this.$trigger.find( '.madx-kbs-trigger__open' );
		this.$close = this.$trigger.find( '.madx-kbs-trigger__close' );
		this.$bubble = this.$box.find( '.madx-kbs-bubble' );
		this.$tooltip = this.$bubble.find( '.madx-kbs-ask-tooltip' );
		this.$results = this.$bubble.find( '.madx-kbs-search-results' );
		this.$noResults = this.$bubble.find( '.madx-kbs-no-results' );
		this.$searching = this.$bubble.find( '.madx-kbs-searching' );
		this.$askSupport = this.$bubble.find( '.madx-kbs-ask-support' );
		this.$askSupportTip = this.$askSupport.find( '.madx-kbs-ask-support__tip' );
		this.$inputContainer = this.$bubble.find( '.madx-kbs-ask-input' );
		this.$inputField = this.$inputContainer.find( '.madx-kbs-ask-input__field' );
		this.$inputButton = this.$inputContainer.find( '.madx-kbs-ask-input__search' );

		this.isActive = false;

		this.attachEventListeners();

	}

	attachEventListeners() {

		this.$trigger.on( 'click', () => {
			this.switchBubble();
		} );

		this.$inputButton.on( 'click', () => {
			this.searchSubmit();
		} );

		this.$inputField.on( 'keypress', ( e ) => {
			let keyCode = ( e.keyCode ? e.keyCode : e.which );
			if ( 13 === keyCode ) {
				e.preventDefault();
				this.searchSubmit();
			}
		} );

	}

	getSearchQuery() {
		return this.$inputField.val();	
	}

	searchSubmit() {
		
		let query = this.getSearchQuery();

		if ( ! query ) {
			return;
		}

		this.clearResults();
		this.show( this.$searching );

		jQuery.ajax({
			url: window.ajaxurl,
			type: 'POST',
			dataType: 'json',
			data: {
				action: 'madx_knowledge_base_search',
				nonce: window.madxKBSData.nonce,
				query: query,
			},
		}).done( ( response ) => {
			
			if ( ! response.success ) {
				return;
			}

			this.showResults( response.data );
			this.hide( this.$searching );

		} ).fail( ( e, textStatus ) => {
			this.hide( this.$searching );
		} );

	}

	showResults( resultsList ) {

		this.show( this.$askSupport );
		
		if ( ! resultsList.length ) {
			this.hide( this.$results );
			this.show( this.$noResults );
			return;
		}

		const row = document.createElement( 'div' );
		const rowLink = document.createElement( 'a' );

		row.classList.add( 'madx-kbs-search-results__row' );
		rowLink.classList.add( 'madx-kbs-search-results__link' );
		rowLink.setAttribute( 'target', '_blank' );

		for ( var i = 0; i < resultsList.length; i++ ) {
			
			let newRow = row.cloneNode();
			let newRowLink = rowLink.cloneNode();

			newRowLink.setAttribute( 'href', resultsList[ i ].url );
			newRowLink.innerHTML = resultsList[ i ].title;

			newRow.appendChild( newRowLink );

			this.$results.append( newRow );
			
		}

		this.show( this.$askSupportTip );
		this.show( this.$results );

	}

	clearResults() {
		this.$results.html( '' );
		this.hide( this.$results );
		this.hide( this.$askSupport );
		this.hide( this.$askSupportTip );
		this.hide( this.$noResults );
	}

	switchBubble() {
		
		this.isActive = ! this.isActive;
		
		if ( this.isActive ) {
			this.show( this.$bubble );
			this.show( this.$tooltip );
			this.show( this.$close );
			this.show( this.$inputContainer );
			this.hide( this.$open );
		} else {
			this.hide( this.$bubble );
			this.hide( this.$close );
			this.show( this.$open );
			this.reset();
		}
	}

	reset() {

		this.clearResults();
		
		this.$inputField.val( '' );
		
		this.hide( this.$bubble );
		this.hide( this.$tooltip );
		this.hide( this.$inputContainer );
		this.hide( this.$searching );
		this.hide( this.$noResults );

	}

	show( $el ) {
		$el.removeClass( this.hiddenClass );
	}

	hide( $el ) {
		$el.addClass( this.hiddenClass );
	}
}

new madxKBS();
