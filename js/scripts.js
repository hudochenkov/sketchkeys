$(document).ready(function() {
	Array.prototype.slice.call(document.querySelectorAll('.js_slider')).forEach(function (element, index) {
		element.addEventListener('before.lory.slide', handleSliderArrows);

		// Hack. Sometimes lory doesn't respond to arrows after page load
		element.addEventListener('after.lory.init', function() {
			setTimeout(fireRefreshEventOnWindow, 100);
		});

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

	if (window.location.hash && window.location.hash === '#photoshop') {
		var photoshopClick = document.createEvent('HTMLEvents');

		photoshopClick.initEvent('click', true, false);

		document.querySelector('.js-photoshop-tab-title').dispatchEvent(photoshopClick);
	}
});

// Shopify buttons
(function() {
	var options = {
		"product": {
			"variantId": "all",
			"width": "240px",
			"contents": {
				"img": false,
				"title": false,
				"variantTitle": false,
				"price": false,
				"description": false,
				"buttonWithQuantity": true,
				"button": false,
				"quantity": false
			},
			"text": {
				"button": "Add to cart"
			},
			"styles": {
				"product": {
					"text-align": "left",
					"@media (min-width: 601px)": {
						"max-width": "calc(25% - 20px)",
						"margin-left": "20px",
						"margin-bottom": "50px"
					}
				},
				"button": {
					"background-color": "#ff4324",
					"font-size": "14px",
					"padding-top": "7px",
					"padding-bottom": "7px",
					"padding-left": "20px",
					"padding-right": "20px",
					":hover": {
						"background-color": "#e63c20"
					},
					":focus": {
						"background-color": "#e63c20"
					},
					"font-weight": "bold"
				},
				"quantityInput": {
					"font-size": "14px",
					"padding-top": "7px",
					"padding-bottom": "7px"
				},
				"buttonWithQuantity": {
					"margin-top": "10px !important"
				}
			}
		},
		// "option": {},
		"cart": {
			"contents": {
				"button": true
			},
			"styles": {
				"button": {
					"background-color": "#ff4324",
					"font-size": "14px",
					"padding-top": "15px",
					"padding-bottom": "15px",
					":hover": {
						"background-color": "#e63c20"
					},
					":focus": {
						"background-color": "#e63c20"
					},
					"font-weight": "bold"
				},
				"footer": {
					"background-color": "#ffffff"
				}
			}
		},
		"modalProduct": {
			"contents": {
				"variantTitle": false,
				"buttonWithQuantity": true,
				"button": false,
				"quantity": false
			},
			"styles": {
				"product": {
					"@media (min-width: 601px)": {
						"max-width": "100%",
						"margin-left": "0px",
						"margin-bottom": "0px"
					}
				},
				"button": {
					"background-color": "#ff4324",
					"font-size": "14px",
					"padding-top": "15px",
					"padding-bottom": "15px",
					"padding-left": "30px",
					"padding-right": "30px",
					":hover": {
						"background-color": "#e63c20"
					},
					":focus": {
						"background-color": "#e63c20"
					},
					"font-weight": "bold"
				},
				"quantityInput": {
					"font-size": "14px",
					"padding-top": "15px",
					"padding-bottom": "15px"
				}
			}
		},
		"toggle": {
			"styles": {
				"toggle": {
					"background-color": "#ff4324",
					":hover": {
						"background-color": "#e63c20"
					},
					":focus": {
						"background-color": "#e63c20"
					},
					"font-weight": "bold"
				},
				"count": {
					"font-size": "14px"
				}
			}
		},
		"productSet": {
			"styles": {
				"products": {
					"@media (min-width: 601px)": {
						"margin-left": "-20px"
					}
				}
			}
		}
	};

	// Sketch
	(function () {
		var scriptURL = 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';
		if (window.ShopifyBuy) {
			if (window.ShopifyBuy.UI) {
				ShopifyBuyInit();
			} else {
				loadScript();
			}
		} else {
			loadScript();
		}

		function loadScript() {
			var script = document.createElement('script');
			script.async = true;
			script.src = scriptURL;
			(document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(script);
			script.onload = ShopifyBuyInit;
		}

		function ShopifyBuyInit() {
			var client = ShopifyBuy.buildClient({
				domain: 'sketchkeys.myshopify.com',
				apiKey: '655a916cfa5f1eab28d2b0b6ef44d7ac',
				appId: '6',
			});

			ShopifyBuy.UI.onReady(client).then(function (ui) {
				ui.createComponent('product', {
					id: [5389615873],
					node: document.getElementById('product-component-466273057e4'),
					moneyFormat: '%24%7B%7Bamount%7D%7D',
					options: options
				});
			});
		}
	})();

	// XCode
	(function () {
		var scriptURL = 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';
		if (window.ShopifyBuy) {
			if (window.ShopifyBuy.UI) {
				ShopifyBuyInit();
			} else {
				loadScript();
			}
		} else {
			loadScript();
		}

		function loadScript() {
			var script = document.createElement('script');
			script.async = true;
			script.src = scriptURL;
			(document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(script);
			script.onload = ShopifyBuyInit;
		}

		function ShopifyBuyInit() {
			var client = ShopifyBuy.buildClient({
				domain: 'sketchkeys.myshopify.com',
				apiKey: '655a916cfa5f1eab28d2b0b6ef44d7ac',
				appId: '6',
			});

			ShopifyBuy.UI.onReady(client).then(function (ui) {
				ui.createComponent('product', {
					id: [8753894797],
					node: document.getElementById('product-component-cf6e5c2ebd5'),
					moneyFormat: '%24%7B%7Bamount%7D%7D',
					options: options
				});
			});
		}
	})();
})();
