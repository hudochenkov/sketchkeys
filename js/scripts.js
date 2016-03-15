$(document).ready(function() {
	$('.faq__question').click(function() {
		$(this).parent().toggleClass('is-expanded');
	});

	var slider = $('.photos-list').bxSlider({
		pager: false,
		onSliderLoad: function() {
			// fix showing previous slide on page load
			// this.goToSlide(1);
			// this.goToSlide(0);
			this.redrawSlider();
			this.redrawSlider();
		}
	});

	window.slider = slider;


	$('.masthead__action').click(function(e) {
		var scrollTarget = $(this).attr('href');
		var scrollHeight = $(scrollTarget).offset().top - 20;

		$('html, body').animate({
			scrollTop: scrollHeight
		}, 500);

		e.preventDefault();
	});
});
