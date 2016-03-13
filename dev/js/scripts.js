$(document).ready(function() {
	$('.faq__question').click(function() {
		$(this).parent().toggleClass('is-expanded');
	});

	$('.photos-list').bxSlider({
		pager: false
	});
});
