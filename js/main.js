$(function(){
	
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
			},
			1200 : {
				stagePadding: 250,
			},
			1440 : {
				stagePadding: 200,
			}
		}
	});


	$('.scroll-to-top').on('click', function(){
		$('html, body').animate({scrollTop:0}, '300');
	})
	  
	//   OpacityScroll.init('s-premium');
	function scrollFullPage() {
		var isScroll = false
		var allEle = $(`.s-premium .section`)
		var index = 0
		var maxIndex = allEle.length
		var duration = 700
		function opacityScroll(){
			[].forEach.call(allEle, (child, idx) => {
				console.log(idx, child)
				if(idx == index){
					$(child).css({'z-index': 3})
				}
			})
		}
		function onTranslate(type, el, elTemp){
			let distanceA = 100
			let distanceZ = 0
			if(index == 0){
				$('.s-premium').addClass('s-premium--first');
			}else {
				setTimeout(() => {
					$('.s-premium').removeClass('s-premium--first');
				}, duration)
			}
			if (index == 8){
				setTimeout(() => {
					$('.s-premium').addClass('s-premium--last');
				}, duration)
			}else{
				setTimeout(() => {
					$('.s-premium').removeClass('s-premium--last');
				}, duration)
			}
			if(type == "up"){
				distanceA = -100
				distanceZ = 0
			}
			el.css({'z-index': 4})
			elTemp.css({'z-index': 3})
			$('#navbar-box-menu a, #navbar-menu a').removeClass('active')
			$("#navbar-box-menu").find(`[data-index='${index}']`).addClass('active')
			$("#navbar-menu").find(`[data-index='${index}']`).addClass('active')
			$({distanceTranslate: distanceA}).animate({ distanceTranslate : distanceZ }, {
				step: function(go) {
					el.css('transform','translate(0%, '+ go +'%)');
				},
				duration,
				easing: 'linear',
				complete: function(){ 
					elTemp.css({'z-index': 1})
					setTimeout(() => {
						isScroll = false
					}, 300)
				}
			});
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
				let indexTemp = index
				index += 1
				onTranslate('down', $(allEle[index]), $(allEle[indexTemp]))
			} else {
				let indexTemp = index
				index -= 1
				onTranslate('up', $(allEle[index]), $(allEle[indexTemp]))
			}
		})

		$('#navbar-box-menu, #navbar-menu').on('click', 'a', function(e){
			let indexTagA = parseInt($(this).attr('data-index'));
			let indexTemp = index
			index = indexTagA
			if(index == indexTemp) return
			isScroll = true
			if(index > indexTemp){
				onTranslate('down', $(allEle[index]), $(allEle[indexTemp]))
			}else{
				onTranslate('up', $(allEle[index]), $(allEle[indexTemp]))
			}
			$('#navbarSupportedContent').collapse('hide');
		})
	}

	function addFullPage(){
		// console.log($(window).width())
		if($(window).width() > 1200){
			scrollFullPage()
			// wow js
			new WOW().init();
		}else{

			$("#navbar-menu a").on('click', function(event) {
				var _this = $(this);
				$('html, body').stop().animate({ scrollTop: $(_this.attr('href')).offset().top - 63 }, 1500);
				if(!$(this).hasClass('collapsed') && $(window).width() <= 1200){
					$('#navbarSupportedContent').collapse('hide');
				}
				event.preventDefault();
			});
		}
	}
	addFullPage()
})