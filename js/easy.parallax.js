/**

 * jQuery easyParallax
 * @author Robert Katke
 * @version 0.5 beta
 * @date May 10, 2016
 * @category jQuery plugin
 * @description easy scrolling parallax and background-attachment parallax

**/

(function(e){
	e.fn.easyParallax = function(params) {

		var self = this;

		// window height
		var wHeight = $(window).height();

		self.each(function(i, elm) {

			// add settings to plugin
			var settings = $.extend({}, e.fn.easyParallax.defaultSettings, params);

			// override settings when inline data-attributes are set
			settings = $.extend({}, settings, $(elm).data());

			// default style for element
			$(elm).css({
				'zIndex': settings.zindex,
				'width': '100%',
				'overflow': 'hidden',
				'position': 'relative'
			})

			// define the top position
			var offsetSelf = $(elm).offset().top - wHeight;

			// element height
			var elmHeight = $(elm).outerHeight(true);
			$(elm).css('height', elmHeight);

			// half height
			var elmHalfHeight = elmHeight / 2;

			// define scroll element -> is text or not
			if(settings.text == true) {

				var scrollElm = $(elm).removeAttr('style').css({
					'position': 'absolute',
					'zIndex': settings.zindex
				});

			}else{

				// add div.scroll-image to each element
				var scrollElm = $('<div class="scroll-image"></div>').prependTo($(elm)).css({
					width: '100%',
					height: elmHeight
				});
			}

			// if offset <= 0
			if(settings.position == 'top') {

				// reset the offset value
				offsetSelf = 0;

				$(this).css({
					'position': 'fixed',
					'height': '100%',
					'top': 0,
					'left': 0
				});

				if(settings.text != true) {

					$(this).find($(scrollElm)).css({
						'background': 'url('+$(this).attr('data-image-src')+')',
						'backgroundSize': 'cover',
						'height': '100%',
						'transform': 'none'
					});

				}
			}

			/**
			** load image when next element directly on bottom or when element in viewport
			**/
			var directStart = -(elmHalfHeight - Math.round(($(window).scrollTop() - offsetSelf) / 2));

			if($(elm).offset().top <= wHeight || $(elm).offset().top - wHeight <= $(window).scrollTop()) {
				
				if(settings.effect == 'fixed' || settings.position == 'top') {

					$(this).find($(scrollElm)).css({
						'background': 'url('+$(this).attr('data-image-src')+')'+settings.imageposition+' fixed',
						'backgroundSize': 'cover'
					});

				}else{

					$(this).find($(scrollElm)).css({
						'background': 'url('+$(this).attr('data-image-src')+')',
						'backgroundSize': 'cover',
						'transform': 'translate3D(0,'+directStart+'px,0)',
						'position': 'absolute',
						'top': 0,
						'left': 0
					});

				}
			}


			// If effect = scroll
			if(settings.effect == 'scroll') {

				// set the negative position for the image
				if(settings.position != 'top') {
					$(scrollElm).css({
						'transform': 'translate3D(0,-'+elmHalfHeight+'px,0)',
						'zIndex': settings.zindex
					});
				}

				// start scroll function for scrolling effect
				$(window).scroll(function(){

					// current scroll position
					var currentScroll = $(this).scrollTop();

					// define the the scroll speed for top parallax on websites
					var topStart = (currentScroll - offsetSelf) / Math.round(settings.speed);

					// scrolling when parallax is top on websites
					if(settings.position == 'top') {	

						if(currentScroll >= offsetSelf) {
							scrollElm.css({
								'transform': 'translate3D(0,-'+topStart+'px,0)'
							});
						}
					}else{

						// define the scroll speed to show the complete image by scrolling
						var start = -(elmHalfHeight - Math.round((currentScroll - offsetSelf) / 2));

						// load data-image-src to .scroll-image 400px before the element are in viewport
						if(currentScroll >= (offsetSelf - 400)) {

							if(settings.text == true) {
								scrollElm.css({
									'height': 'auto'
								});

							}else{

								scrollElm.css({
									'background': 'url('+$(elm).attr('data-image-src')+')'+settings.imageposition,
									'backgroundSize': 'cover',
									'position': 'absolute',
									'top': 0,
									'transform': 'translate3D(0,-'+elmHalfHeight+'px,0)'
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

					// load data-image-src to .scroll-image
					if(currentScroll >= (offsetSelf - 400)) {

						scrollElm.css({
							'background': 'url('+$(elm).attr('data-image-src')+')'+settings.imageposition+' fixed',
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
					'backgroundPosition': settings.imageposition+' fixed',
					'zIndex': settings.zindex
				});
			}		
			
		});	
	}

	// default settings
	// can be overwriten by data-attributes
	e.fn.easyParallax.defaultSettings = {
		speed: 6,
		effect: 'scroll',
		position: 'default',
		text: false,
		imageposition: 'center',
		zindex: '-1'
	};
	$(document).ready(function() {
		$('.parallax').easyParallax();
	});
	
})(jQuery);