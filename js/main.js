$(function(){
	
	function addFullPage(){
		// console.log($(window).width())
		if($(window).width() > 992){
			//fullpage js
			new fullpage('#fullpage', {
				anchors: [
					'header', 'about', 'location-other', 
					'location', 'utilities', 'ground',
					'apartment', 'furniture', 'news', 'contact'
				],
				scrollBar: true,
				css3: true,
				paddingTop: '60px',
				responsiveWidth: 992,
				// menu: '#navbar-menu',
				// offsetSections: true,
				// navigation: true,
			});

			window.onbeforeunload = function () {
				window.scrollTo(0,0);
			};

			// wow js
			new WOW().init();
		}
	}

	// addFullPage()
	

	/* Start slide */
	let navText = [
		`<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-chevron-left" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
			<path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
		</svg>`,
		`<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-chevron-right" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
			<path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
		</svg>`
	];
	
	$('.s-premium-5__list').owlCarousel({
		items:1,
		nav: true,
		dots: false,
		loop:true,
		navText: navText,
		autoplay:true,
		autoplayTimeout:5000,
		autoplayHoverPause:true,
		responsive:{
			0 : {
				nav: false,
				margin: 0,
			},
			568 : {
				nav: true,
			},
		}
	});

	$('.s-premium-6__list').owlCarousel({
		items:1,
		loop:true,
		margin:20,
		stagePadding: 200,
		nav: true,
		navText: navText,
		autoplay:true,
		autoplayTimeout:5000,
		autoplayHoverPause:true,
		responsive:{
			0 : {
				stagePadding: 0,
				margin: 0,
				nav: false,
			},
			568 : {
				stagePadding: 0,
				margin: 0,
				nav: true,
			},
			// breakpoint from 992 up
			992 : {
				stagePadding: 200,
			}
		}
	});

	// $('#section0').parallax("50%", 0.1);
	// $('#section1').parallax("50%", 0.1);
	// $('#section2').parallax("50%", 0.1);
	// $('#section3').parallax("50%", 0.1);
	// $('#section4').parallax("50%", 0.1);
	// $('#section5').parallax("50%", 0.1);
	// $('#section6').parallax("50%", 0.1);
	// $('#section7').parallax("50%", 0.1);
	// $('#section8').parallax("50%", 0.1);

	/* Start Scroll fixed Menu */
	// var header = document.getElementById("landing-nav");
	// var sticky = header.offsetTop;
	// window.onscroll = function() {
	// 	myFunction()
	// 	let btnTop = $('.scroll-to-top');
	// 	if (window.scrollY >= 300) {
	// 		btnTop.addClass('is-visible');
	// 	} else {
	// 		btnTop.removeClass('is-visible');
	// 	} 
	// };

	// myFunction()

	// function myFunction() {
	// 	if (window.pageYOffset > sticky) {
	// 		header.classList.add("sticky-top");
	// 	} else {
	// 		header.classList.remove("sticky-top");
	// 	}
	// }
	/* End Scroll fixed Menu */

	$('.scroll-to-top').on('click', function(){
		$('html, body').animate({scrollTop:0}, '300');
	})

	// Scrollspy
	$('body').scrollspy({ target: '#navbar-menu', offset: 90 })

	$("#navbar-menu a").on('click', function(event) {
		var _this = $(this);
		$('html, body').stop().animate({ scrollTop: $(_this.attr('href')).offset().top }, 1500);
		$('.navbar-toggler').trigger('click');
		event.preventDefault();
	});
	  
	//   OpacityScroll.init('s-premium');
	function scrollFullPage() {
		var isScroll = false
		var allEle = $(`.s-premium .section`)
		var index = 0
		var maxIndex = allEle.length
		function opacityScroll(){
			[].forEach.call(allEle, (child, idx) => {
				console.log(idx, child)
				if(idx == index){
					$(child).css({'z-index': 2})
				}else{
					$(child).css({'transform': 'translate(0%, 100%)'})
				}
			})
		}
		opacityScroll()

		$(window).on('wheel', function (e) { 
			// your logic here
			var delta = e.originalEvent.wheelDelta
			if(isScroll || (index <= 0 && delta > 0) || (index >= (maxIndex - 1) && delta < 0)){
				return
			}
			isScroll = true
			if (delta < 0) {
				console.log("Scroll down");
				let indexTemp = index
				index += 1
				$(allEle[index]).css({'z-index': 2, 'transform': 'translate(0%, 0%)'})
				$(allEle[indexTemp]).css({'z-index': 1})
				setTimeout(() => {
					$(allEle[indexTemp]).css({'transform': 'translate(0%, -100%)'})
				}, 800)
			} else {
				console.log("Scroll up");
				let indexTemp = index
				index -= 1
				$(allEle[index]).css({'z-index': 2, 'transform': 'translate(0%, 0%)'})
				$(allEle[indexTemp]).css({'z-index': 1})
				setTimeout(() => {
					$(allEle[indexTemp]).css({'transform': 'translate(0%, 100%)'})
				}, 800)
			}
			setTimeout(() => {
				isScroll = false
			}, 1600)
		})

		$('#navbar-box-menu').on('click', 'a', function(e){
			let indexTagA = parseInt($(this).attr('data-index'));
			let indexTemp = index
			index = indexTagA
			$(allEle[index]).css({'z-index': 2, 'transform': 'translate(0%, 0%)'})
			$(allEle[indexTemp]).css({'z-index': 1})
			setTimeout(() => {
				$(allEle[indexTemp]).css({'transform': 'translate(0%, -100%)'})
			}, 800)
			console.log(index)
		})
	}

	scrollFullPage()
	  
})