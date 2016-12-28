$(document).ready(function() {
	$('.faq__question').click(function() {
		$(this).parent().toggleClass('is-expanded');
	});

	var sliders = [];

	$('.photos-list').each(function() {
		sliders.push(
			$(this).bxSlider({
				pager: false,
				infiniteLoop: false,
				hideControlOnEnd: true
			})
		);
	});

	$('.tab-card').on('click', function(e) {
		e.preventDefault();

		$(this)
			.addClass('tab-card--current').siblings().removeClass('tab-card--current')
			.closest('.products').find('.products__tab').removeClass('products__tab--current').eq($(this).index()).addClass('products__tab--current');

		var currentSlider = sliders[$(this).index()];
		var currentSlide = currentSlider.getCurrentSlide();

		currentSlider.reloadSlider();
		currentSlider.goToSlide(currentSlide);
	});

	$('.masthead__action').click(function(e) {
		var scrollTarget = $(this).attr('href');
		var scrollHeight = $(scrollTarget).offset().top - 20;

		$('html, body').animate({
			scrollTop: scrollHeight
		}, 500);

		e.preventDefault();
	});
});
