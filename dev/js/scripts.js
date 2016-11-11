$(document).ready(function() {
	$('.faq__question').click(function() {
		$(this).parent().toggleClass('is-expanded');
	});

	$('.photos-list').bxSlider({
		pager: false,
		infiniteLoop: false,
		hideControlOnEnd: true
	});

	$('.masthead__action').click(function(e) {
		var scrollTarget = $(this).attr('href');
		var scrollHeight = $(scrollTarget).offset().top - 20;

		$('html, body').animate({
			scrollTop: scrollHeight
		}, 500);

		e.preventDefault();
	});

	function showPopup() {
		// using two separate style sets, otherwise they applied in the wrong order
		$('html')
			.css({
				overflowY: 'hidden',
			})
			.css({
				paddingRight: getScrollbarSize() + 'px',
			});

		$('.popup__container').scrollTop = 0;
		$('html').addClass('is-popup-visible');
		$('.popup').addClass('popup--visible');
	}

	function hidePopup() {
		$('html').removeClass('is-popup-visible');
		$('.popup').removeClass('popup--visible');

		setTimeout(function () {
			$('html').css({
				overflowY: 'scroll',
				paddingRight: 0,
			});
		}, 300);
	}

	function getScrollbarSize() {
		var scrollDiv = document.createElement('div');
		var scrollbarSize;

		scrollDiv.style.cssText = 'width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;';
		document.body.appendChild(scrollDiv);
		scrollbarSize = scrollDiv.offsetWidth - scrollDiv.clientWidth;
		document.body.removeChild(scrollDiv);

		return scrollbarSize;
	}

	$('.js-open-popup').click(function (e) {
		e.preventDefault();

		showPopup();
	});

	$('.js-close-popup').click(function (e) {
		if (e.target.classList.contains('js-close-popup')) {
			e.preventDefault();

			hidePopup();
		}
	});

	$(document).keydown(function (e) {
		// ESCAPE key pressed
		if (e.keyCode === 27) {
			hidePopup();
		}
	});
});
