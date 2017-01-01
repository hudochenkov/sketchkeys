$(document).ready(function() {
	Array.prototype.slice.call(document.querySelectorAll('.js_slider')).forEach(function (element, index) {
		element.addEventListener('before.lory.slide', handleSliderArrows);

		lory(element, {
			rewindOnResize: false,
		});
	});

	function handleSliderArrows(e) {
		var slidesCount = e.target.querySelectorAll('.js_slide').length;
		var nextSlide = e.detail.nextSlide;
		var currentSlide = e.detail.index;

		if (nextSlide > currentSlide) {
			switchArrow('prev', true, e.target);

			if (nextSlide >= slidesCount - 1) {
				switchArrow('next', false, e.target);
			}
		} else if (nextSlide < currentSlide) {
			switchArrow('next', true, e.target);

			if (nextSlide <= 0) {
				switchArrow('prev', false, e.target);
			}
		}
	}

	function switchArrow(direction, state, slider) {
		var disabledClass = 'slider__arrow--disabled';
		var arrow = slider.querySelector('.js_' + direction);

		if (state) {
			arrow.classList.remove(disabledClass);
		} else {
			arrow.classList.add(disabledClass);
		}
	}

	function fireRefreshEventOnWindow() {
		var event = document.createEvent("HTMLEvents");

		event.initEvent('resize', true, false);
		window.dispatchEvent(event);
	}

	$('.faq__question').click(function() {
		$(this).parent().toggleClass('is-expanded');
	});

	$('.tab-card').on('click', function(e) {
		e.preventDefault();

		$(this)
			.addClass('tab-card--current').siblings().removeClass('tab-card--current')
			.closest('.products').find('.products__tab').removeClass('products__tab--current').eq($(this).index()).addClass('products__tab--current');

		fireRefreshEventOnWindow();
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
