/**

 * jQuery easyParallax
 * @author Robert Katke
 * @version 0.3.1 beta
 * @date May 10, 2016
 * @category jQuery plugin
 * @description easy scrolling parallax and background-attachment parallax

 * to do
 * - load following images directly when element is 100% height

 * changelog

 * 0.3.1
 * - load images directly when in viewport

 * 0.3.0
 * - fix fixed parallax version in Firefox
 * - add text elements for scrolling

 * 0.2.1
 * - fix parallax width
 * - fix overflow hidden problem

 * 0.2
 * - load images over data-image
 * - change the scrolling effect, when parallax position >= 0

**/
(function(e){
	e.fn.easyParallax = function(params) {
		
		var self 	= this.css({
			'zIndex': '-1',
			'width': '100%',
			'overflow': 'hidden',
			'position': 'relative'
		});
		var wHeight = $(window).height();
		var wHalf	= wHeight / 2;

		self.each(function(i, elm) {

			// add settings to plugin
			var settings = $.extend({}, e.fn.easyParallax.defaultSettings, params);

			// override settings when inline data-attributes are set
			settings = $.extend({}, settings, $(elm).data());

			// define the top position
			var offsetSelf = $(elm).offset().top - wHeight;


			// define scroll element -> is text or not
			if(settings.text == true) {

				var scrollElm = $(elm).removeAttr('style').css({
					'position': 'absolute',
					'zIndex': -1
				});

			}else{

				// add div.scroll-image to each element
				var scrollElm = $('<div class="scroll-image"></div>').prependTo($(elm)).css({
					width: '100%',
					height: $(elm).outerHeight(true),
				});
			}

			// if offset <= 0
			if(settings.position == 'top') {

				// reset the offset value
				offsetSelf = 0;

				$(this).css({
					'position': 'fixed',
					'height': '100%'
				});

				if(settings.text != true) {
					$(this).find($(scrollElm)).css({
						'background': 'url('+$(this).attr('data-image')+')',
						'backgroundSize': 'cover',
						'height': '100%'
					});

				}
			}

			/**
			** load image when next element directly on bottom or when element in viewport
			**/

			if($(elm).offset().top <= wHeight || $(elm).offset().top-wHeight <= $(window).scrollTop()) {
				$(this).find($(scrollElm)).css({
					'background': 'url('+$(this).attr('data-image')+')',
					'backgroundSize': 'cover'
				});
				if(settings.effect == 'fixed') {
					$(this).find($(scrollElm)).css({
						'background': 'url('+$(this).attr('data-image')+') center fixed',
						'backgroundSize': 'cover'
					});
				}
			}


			// If effect = scroll
			if(settings.effect == 'scroll') {
				
				// defines the height for parallax element
				if(settings.text != true) {
					$(elm).css({
						'height': $(elm).outerHeight(true)
					});
				}

				// start scroll function for scrolling effect
				$(window).scroll(function(){

					// current scroll position
					var currentScroll = $(this).scrollTop();

					// define the the scroll speed for top parallax on websites
					var topStart = (currentScroll - offsetSelf) / parseInt(settings.speed);

					if(settings.position == 'top') {	

						// scrolling when parallax is top on websites
						if(currentScroll >= offsetSelf) {
							scrollElm.css({
								'transform': 'translate3D(0,-'+topStart+'px,0)'
							});
						}
					}else{

						// define the scroll speed to show the complete image by scrolling
						var start = -(wHalf - parseInt((currentScroll - offsetSelf) / 2));

						// load data-image to .scroll-image 50px before the element are in viewport
						if(currentScroll >= (offsetSelf - 400)) {
							if(settings.text == true) {
								scrollElm.css({
									'height': 'auto'
								});
							}else{
								scrollElm.css({
									'background': 'url('+$(elm).attr('data-image')+')',
									'backgroundSize': 'cover',
									'position': 'absolute',
									'top': 0,
									'height': '100vh',
									'transform': 'translate3D(0,-'+wHalf+'px,0)'
								});
							}
						}

						// start the parallax when element are in viewport
						if(currentScroll >= offsetSelf) {	
							if(settings.text == true) {
								scrollElm.css({
									'transform': 'translate3D(0,'+start+'px,0)'
								});
							}else{					
								scrollElm.css({
									'transform': 'translate3D(0,'+start+'px,0)'
								});
							}
						}
					}

				});
				// end of scroll function for scrolling effect
			}

			// If effect = fixed
			if(settings.effect == 'fixed') {

				$(window).scroll(function() {

					// current scroll position
					var currentScroll = $(this).scrollTop();

					// load data-image to .scroll-image
					if(currentScroll >= (offsetSelf - 400)) {
						scrollElm.css({
							'background': 'url('+$(elm).attr('data-image')+') center fixed',
							'backgroundSize': 'cover'
						});
					}
				});

				scrollElm.css({
					'top': 0,
					'left': 0,
					'height': '100vh',
					'width': '100%',
					'backgroundSize': 'cover',
					'backgroundPosition': 'center fixed',
					'zIndex': -1
				});
			}		
			
		});	
	}

	// default settings
	// can be overwriten by data-attributes
	e.fn.easyParallax.defaultSettings =
	{
		speed: 6,
		effect: 'scroll',
		position: 'default',
		text: false
	};
	
})(jQuery);