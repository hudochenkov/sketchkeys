$(document).ready(function() {
	function fireRefreshEventOnWindow() {
		var event = document.createEvent('HTMLEvents');

		event.initEvent('resize', true, false);
		window.dispatchEvent(event);
	}

	$('.faq__question').click(function() {
		$(this)
			.parent()
			.toggleClass('is-expanded');
	});

	$('.tab-card').on('click', function(e) {
		e.preventDefault();

		$(this)
			.addClass('tab-card--current')
			.siblings()
			.removeClass('tab-card--current')
			.closest('.products')
			.find('.products__tab')
			.removeClass('products__tab--current')
			.eq($(this).index())
			.addClass('products__tab--current');

		fireRefreshEventOnWindow();
	});

	$('[data-btn-scroll]').click(function(e) {
		var scrollTarget = $(this).attr('href');
		var scrollHeight = $(scrollTarget).offset().top - 20;

		$('html, body').animate(
			{
				scrollTop: scrollHeight,
			},
			500
		);

		e.preventDefault();
	});

	$('[data-menu-btn]').click(function() {
		$('[data-header]').toggleClass('--opened');
	});

	// Product images gallery
	if ($('#gallery').length) {
		var gallerySlider = tns({
			container: '#gallery',
			nav: true,
			navContainer: '#gallery-thumbs',
			controlsContainer: '#gallery-btns',
			slideBy: 'page',
			autoHeight: true,
			navAsThumbnails: true,
			onInit: function() {
				$('[data-gallery]').addClass('--active');
			},
		});
	}

	if ($('#gallery-2').length) {
		var gallerySlider2 = tns({
			container: '#gallery-2',
			nav: true,
			navContainer: '#gallery-thumbs-2',
			controlsContainer: '#gallery-btns-2',
			slideBy: 'page',
			autoHeight: true,
			navAsThumbnails: true,
			onInit: function() {
				$('[data-gallery-2]').addClass('--active');
			},
		});
	}

	// Popup
	var $popupBody = $('[data-popup-body]');

	$('[data-popup-open]').click(function() {
		$popupBody.addClass('active');
	});
	$('[data-popup-close]').click(function() {
		$popupBody.removeClass('active');
	});
});

// Check products and load their scripts
(function() {
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
		(
			document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]
		).appendChild(script);
		script.onload = ShopifyBuyInit;
	}

	function ShopifyBuyInit() {
		var client = ShopifyBuy.buildClient({
			domain: 'sketchkeys.myshopify.com',
			storefrontAccessToken: '655a916cfa5f1eab28d2b0b6ef44d7ac',
		});

		ShopifyBuy.UI.onReady(client).then(function(ui) {
			// Photoshop
			if ($('#product-component-2bcd54ed610').length) {
				ui.createComponent('product', {
					id: [8753894797],
					node: document.getElementById('product-component-2bcd54ed610'),
					moneyFormat: '%24%7B%7Bamount%7D%7D',
					options: {
						product: {
							variantId: 'all',
							width: '100%',
							contents: {
								img: false,
								imgWithCarousel: false,
								title: false,
								variantTitle: false,
								price: false,
								description: false,
								buttonWithQuantity: true,
								button: false,
								quantity: false,
							},
							text: {
								button: 'Add to Cart',
							},
							styles: {
								product: {
									'text-align': 'left',
									'@media (min-width: 601px)': {
										'max-width': '100%',
										'margin-left': '0',
										'margin-bottom': '50px',
									},
								},
								button: {
									'background-color': '#ff4324',
									':hover': {
										'background-color': '#e63c20',
									},
									'border-radius': '5px',
									':focus': {
										'background-color': '#e63c20',
									},
									'font-weight': 'bold',
								},
								variantTitle: {
									'font-weight': 'normal',
								},
								title: {
									'font-family': 'Roboto, sans-serif',
									'font-size': '26px',
								},
								description: {
									'font-weight': 'normal',
								},
								price: {
									'font-size': '18px',
									'font-weight': 'normal',
								},
								compareAt: {
									'font-size': '15px',
									'font-family': 'Helvetica Neue, sans-serif',
									'font-weight': 'normal',
								},
							},
							googleFonts: ['Roboto'],
						},
						cart: {
							contents: {
								button: true,
							},
							styles: {
								button: {
									'background-color': '#ff4324',
									':hover': {
										'background-color': '#e63c20',
									},
									'border-radius': '5px',
									':focus': {
										'background-color': '#e63c20',
									},
									'font-weight': 'bold',
								},
								footer: {
									'background-color': '#ffffff',
								},
							},
						},
						modalProduct: {
							contents: {
								img: false,
								imgWithCarousel: true,
								variantTitle: false,
								buttonWithQuantity: true,
								button: false,
								quantity: false,
							},
							styles: {
								product: {
									'@media (min-width: 601px)': {
										'max-width': '100%',
										'margin-left': '0px',
										'margin-bottom': '0px',
									},
								},
								button: {
									'background-color': '#ff4324',
									':hover': {
										'background-color': '#e63c20',
									},
									'border-radius': '5px',
									':focus': {
										'background-color': '#e63c20',
									},
									'font-weight': 'bold',
								},
								variantTitle: {
									'font-weight': 'normal',
								},
								title: {
									'font-family': 'Roboto, sans-serif',
								},
								description: {
									'font-weight': 'normal',
								},
								price: {
									'font-weight': 'normal',
								},
								compareAt: {
									'font-family': 'Helvetica Neue, sans-serif',
									'font-weight': 'normal',
								},
							},
							googleFonts: ['Roboto'],
						},
						toggle: {
							styles: {
								toggle: {
									'background-color': '#ff4324',
									':hover': {
										'background-color': '#e63c20',
									},
									':focus': {
										'background-color': '#e63c20',
									},
									'font-weight': 'bold',
								},
								count: {
									'font-size': '16px',
								},
							},
						},
						productSet: {
							styles: {
								products: {
									'@media (min-width: 601px)': {
										'margin-left': '-20px',
									},
								},
							},
						},
					},
				});
			}

			// Sketch
			if ($('#product-component-abbb5be5b97').length) {
				ui.createComponent('product', {
					id: [5389615873],
					node: document.getElementById('product-component-abbb5be5b97'),
					moneyFormat: '%24%7B%7Bamount%7D%7D',
					options: {
						product: {
							variantId: 'all',
							width: '100%',
							contents: {
								img: false,
								imgWithCarousel: false,
								title: false,
								variantTitle: false,
								price: false,
								description: false,
								buttonWithQuantity: true,
								button: false,
								quantity: false,
							},
							text: {
								button: 'Add to Cart',
							},
							styles: {
								product: {
									'text-align': 'left',
									'@media (min-width: 601px)': {
										'max-width': '100%',
										'margin-left': '0',
										'margin-bottom': '50px',
									},
								},
								button: {
									'background-color': '#ff4324',
									':hover': {
										'background-color': '#e63c20',
									},
									'border-radius': '5px',
									':focus': {
										'background-color': '#e63c20',
									},
									'font-weight': 'bold',
								},
								variantTitle: {
									'font-weight': 'normal',
								},
								title: {
									'font-family': 'Roboto, sans-serif',
									'font-size': '26px',
								},
								description: {
									'font-weight': 'normal',
								},
								price: {
									'font-size': '18px',
									'font-weight': 'normal',
								},
								compareAt: {
									'font-size': '15px',
									'font-family': 'Helvetica Neue, sans-serif',
									'font-weight': 'normal',
								},
							},
							googleFonts: ['Roboto'],
						},
						cart: {
							contents: {
								button: true,
							},
							styles: {
								button: {
									'background-color': '#ff4324',
									':hover': {
										'background-color': '#e63c20',
									},
									'border-radius': '5px',
									':focus': {
										'background-color': '#e63c20',
									},
									'font-weight': 'bold',
								},
								footer: {
									'background-color': '#ffffff',
								},
							},
						},
						modalProduct: {
							contents: {
								img: false,
								imgWithCarousel: true,
								variantTitle: false,
								buttonWithQuantity: true,
								button: false,
								quantity: false,
							},
							styles: {
								product: {
									'@media (min-width: 601px)': {
										'max-width': '100%',
										'margin-left': '0px',
										'margin-bottom': '0px',
									},
								},
								button: {
									'background-color': '#ff4324',
									':hover': {
										'background-color': '#e63c20',
									},
									'border-radius': '5px',
									':focus': {
										'background-color': '#e63c20',
									},
									'font-weight': 'bold',
								},
								variantTitle: {
									'font-weight': 'normal',
								},
								title: {
									'font-family': 'Roboto, sans-serif',
								},
								description: {
									'font-weight': 'normal',
								},
								price: {
									'font-weight': 'normal',
								},
								compareAt: {
									'font-family': 'Helvetica Neue, sans-serif',
									'font-weight': 'normal',
								},
							},
							googleFonts: ['Roboto'],
						},
						toggle: {
							styles: {
								toggle: {
									'background-color': '#ff4324',
									':hover': {
										'background-color': '#e63c20',
									},
									':focus': {
										'background-color': '#e63c20',
									},
									'font-weight': 'bold',
								},
								count: {
									'font-size': '16px',
								},
							},
						},
						productSet: {
							styles: {
								products: {
									'@media (min-width: 601px)': {
										'margin-left': '-20px',
									},
								},
							},
						},
					},
				});
			}

			if ($('#product-component-f27277d0756').length) {
				ui.createComponent('product', {
					id: [1338337460260],
					node: document.getElementById('product-component-f27277d0756'),
					moneyFormat: '%24%7B%7Bamount%7D%7D',
					options: {
						product: {
							variantId: 'all',
							width: '240px',
							contents: {
								img: false,
								imgWithCarousel: false,
								title: false,
								variantTitle: false,
								price: false,
								description: false,
								buttonWithQuantity: true,
								button: false,
								quantity: false,
							},
							text: {
								button: 'Add to Cart',
							},
							styles: {
								product: {
									'text-align': 'left',
									'@media (min-width: 601px)': {
										'max-width': '100%',
										'margin-left': '0',
										'margin-bottom': '50px',
									},
								},
								button: {
									'background-color': '#ff4324',
									'font-size': '15px',
									'padding-top': '15.5px',
									'padding-bottom': '15.5px',
									':hover': {
										'background-color': '#e63c20',
									},
									'border-radius': '5px',
									':focus': {
										'background-color': '#e63c20',
									},
									'font-weight': 'bold',
								},
								variantTitle: {
									'font-weight': 'normal',
								},
								title: {
									'font-size': '26px',
									color: '#000000',
								},
								description: {
									'font-weight': 'normal',
								},
								price: {
									'font-size': '18px',
									color: '#000000',
									'font-weight': 'normal',
								},
								quantityInput: {
									'font-size': '15px',
									'padding-top': '15.5px',
									'padding-bottom': '15.5px',
								},
								compareAt: {
									'font-size': '15px',
									'font-family': 'Helvetica Neue, sans-serif',
									'font-weight': 'normal',
									color: '#000000',
								},
							},
						},
						cart: {
							contents: {
								button: true,
							},
							styles: {
								button: {
									'background-color': '#ff4324',
									'font-size': '15px',
									'padding-top': '15.5px',
									'padding-bottom': '15.5px',
									':hover': {
										'background-color': '#e63c20',
									},
									'border-radius': '5px',
									':focus': {
										'background-color': '#e63c20',
									},
									'font-weight': 'bold',
								},
								footer: {
									'background-color': '#ffffff',
								},
							},
						},
						modalProduct: {
							contents: {
								img: false,
								imgWithCarousel: true,
								variantTitle: false,
								buttonWithQuantity: true,
								button: false,
								quantity: false,
							},
							styles: {
								product: {
									'@media (min-width: 601px)': {
										'max-width': '100%',
										'margin-left': '0px',
										'margin-bottom': '0px',
									},
								},
								button: {
									'background-color': '#ff4324',
									'font-size': '15px',
									'padding-top': '15.5px',
									'padding-bottom': '15.5px',
									':hover': {
										'background-color': '#e63c20',
									},
									'border-radius': '5px',
									':focus': {
										'background-color': '#e63c20',
									},
									'font-weight': 'bold',
								},
								variantTitle: {
									'font-weight': 'normal',
								},
								description: {
									'font-weight': 'normal',
								},
								price: {
									'font-weight': 'normal',
								},
								quantityInput: {
									'font-size': '15px',
									'padding-top': '15.5px',
									'padding-bottom': '15.5px',
								},
								compareAt: {
									'font-family': 'Helvetica Neue, sans-serif',
									'font-weight': 'normal',
								},
							},
						},
						toggle: {
							styles: {
								toggle: {
									'background-color': '#ff4324',
									':hover': {
										'background-color': '#e63c20',
									},
									':focus': {
										'background-color': '#e63c20',
									},
									'font-weight': 'bold',
								},
								count: {
									'font-size': '15px',
								},
							},
						},
						productSet: {
							styles: {
								products: {
									'@media (min-width: 601px)': {
										'margin-left': '-20px',
									},
								},
							},
						},
					},
				});
			}

			// Figma
			if ($('#product-component-4031afeb481').length) {
				ui.createComponent('product', {
					id: [1173135097892],
					node: document.getElementById('product-component-4031afeb481'),
					moneyFormat: '%24%7B%7Bamount%7D%7D',
					options: {
						product: {
							variantId: 'all',
							width: '100%',
							contents: {
								img: false,
								imgWithCarousel: false,
								title: false,
								variantTitle: false,
								price: false,
								description: false,
								buttonWithQuantity: true,
								button: false,
								quantity: false,
							},
							text: {
								button: 'Add to Cart',
							},
							styles: {
								product: {
									'text-align': 'left',
									'@media (min-width: 601px)': {
										'max-width': '100%',
										'margin-left': '0',
										'margin-bottom': '50px',
									},
								},
								button: {
									'background-color': '#ff4324',
									':hover': {
										'background-color': '#e63c20',
									},
									'border-radius': '5px',
									':focus': {
										'background-color': '#e63c20',
									},
									'font-weight': 'bold',
								},
								variantTitle: {
									'font-weight': 'normal',
								},
								title: {
									'font-family': 'Roboto, sans-serif',
									'font-size': '26px',
								},
								description: {
									'font-weight': 'normal',
								},
								price: {
									'font-size': '18px',
									'font-weight': 'normal',
								},
								compareAt: {
									'font-size': '15px',
									'font-family': 'Helvetica Neue, sans-serif',
									'font-weight': 'normal',
								},
							},
							googleFonts: ['Roboto'],
						},
						cart: {
							contents: {
								button: true,
							},
							styles: {
								button: {
									'background-color': '#ff4324',
									':hover': {
										'background-color': '#e63c20',
									},
									'border-radius': '5px',
									':focus': {
										'background-color': '#e63c20',
									},
									'font-weight': 'bold',
								},
								footer: {
									'background-color': '#ffffff',
								},
							},
						},
						modalProduct: {
							contents: {
								img: false,
								imgWithCarousel: true,
								variantTitle: false,
								buttonWithQuantity: true,
								button: false,
								quantity: false,
							},
							styles: {
								product: {
									'@media (min-width: 601px)': {
										'max-width': '100%',
										'margin-left': '0px',
										'margin-bottom': '0px',
									},
								},
								button: {
									'background-color': '#ff4324',
									':hover': {
										'background-color': '#e63c20',
									},
									'border-radius': '5px',
									':focus': {
										'background-color': '#e63c20',
									},
									'font-weight': 'bold',
								},
								variantTitle: {
									'font-weight': 'normal',
								},
								title: {
									'font-family': 'Roboto, sans-serif',
								},
								description: {
									'font-weight': 'normal',
								},
								price: {
									'font-weight': 'normal',
								},
								compareAt: {
									'font-family': 'Helvetica Neue, sans-serif',
									'font-weight': 'normal',
								},
							},
							googleFonts: ['Roboto'],
						},
						toggle: {
							styles: {
								toggle: {
									'background-color': '#ff4324',
									':hover': {
										'background-color': '#e63c20',
									},
									':focus': {
										'background-color': '#e63c20',
									},
									'font-weight': 'bold',
								},
								count: {
									'font-size': '16px',
								},
							},
						},
						productSet: {
							styles: {
								products: {
									'@media (min-width: 601px)': {
										'margin-left': '-20px',
									},
								},
							},
						},
					},
				});
			}
		});
	}
})();
