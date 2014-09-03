$( document ).ready( function() {

    'use strict';

    // Responsive navigation
    // --------------------------------------------------
    $( '.navbar-nav-toggle, .navbar-nav a' ).on( 'click', function() {
        if ( $( '.navbar' ).css( 'z-index' ) === '4' ) {
            $( '.navbar-nav' ).slideToggle();
            $( '.navbar' ).toggleClass( 'open' );
        }
    } );

    // Handle contact form
    // --------------------------------------------------
    $( '.contact-form' ).on( 'submit', contactFormHandler );

    // Handle subscription form
    // --------------------------------------------------
    $( '.subscription-form' ).on( 'submit', subscriptionFormHandler );

    // Contact form toggle
    // --------------------------------------------------
    $( 'body' ).on( 'click', '.contact-toggle', function( event ) {
        event.preventDefault();
        $( 'body' ).toggleClass( 'open' );
    } );

    // Detect fixed navbar position
    // --------------------------------------------------
    fixedTopBar();

    // Initialize scrollReveal animations
    // --------------------------------------------------
    window.scrollReveal = new scrollReveal();

} );

$( window ).on( 'load', function() {

    'use strict';

    // Initialize sliders
    // --------------------------------------------------
    $( '.showcase-slider' ).owlCarousel( {
        itemsMobile: [480, 1],
        itemsTablet: [768, 2],
        items: 3
    } );
    $( '.testimonials-slider' ).bxSlider( {
        adaptiveHeight: true,
        auto: true,
        controls: false,
        mode: 'fade',
        pager: false,
        pause: 8000
    } );

    // Wait for background images to load
    // --------------------------------------------------
    $( '.background-image' ).each( function() {
        $( this ).addClass( 'loaded' );
    } );

    // Simple smoothscroll script
    // --------------------------------------------------
    $( 'body' ).on( 'click', '[data-smoothscroll]', function( event ) {
        event.preventDefault();

        var $this = $( this );

        $( 'html, body' ).stop().animate( {
            scrollTop: $( $this.attr( 'href' ) ).offset().top
        } );
    } );
} );


//
// Add "scrolling" class to the navbar when not at top
// --------------------------------------------------

function fixedTopBar() {

    'use strict';

    var offset,
        $navbar = $( '.navbar' );

    $( window ).on( 'scroll.happytodesign', function() {
        offset = $navbar.offset().top;
        if ( offset > 10 ) {
            if ( $navbar.attr( 'data-scrolling' ) !== 'true' ) {
                $navbar.attr( 'data-scrolling', 'true' );
            }
        }
        else {
            $navbar.attr( 'data-scrolling', 'false' );
        }
    } ).trigger( 'scroll.happytodesign' );
}


//
// Handle contact form submission
// --------------------------------------------------

function contactFormHandler( event ) {

    'use strict';

    // Prevent default form submission
    event.preventDefault();

    // Cache form for later use	
	var $form = $( '.contact-form' ),
    $submit = $form.find( '[type="submit"]' );
	$submit.prop( 'disabled', true ).data( 'original-text', $submit.text() ).text( $submit.data( 'loading-text' ) );
	
	// get all the inputs into an array.
	var $inputs = $('.contact-form :input');

	// get an associative array of just the values.
	var values = {};
	$inputs.each(function() {
		values[this.name] = $(this).val();
	});

	console.log(values["email"]);
	
	var Feedback = Parse.Object.extend("Feedback");
	var feedback = new Feedback();
	feedback.set("email", values["email"]);
	feedback.set("message", values["message"]);
	feedback.save().then(function(object) {	
	  $submit.prop( 'disabled', false ).text( $submit.data( 'original-text' ) );	
	  
	  // Confirmation message
	  alert("Your message has been sent");
	  
	  // close contact section
	  $("#closeContactButton").trigger( "click" );
	  
	  // Reset form values
	  $form.get(0).reset();
	});

}


//
// Handle subscription form submission
// --------------------------------------------------

function subscriptionFormHandler( event ) {

    'use strict';

    // Prevent default form submission
    event.preventDefault();

    // Cache form for later use
    var $form = $( '.subscription-form' ),
        $submit = $form.find( '[type="submit"]' );

    $submit.prop( 'disabled', true ).data( 'original-text', $submit.text() ).text( $submit.data( 'loading-text' ) );

}