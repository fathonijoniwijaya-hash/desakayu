$(window).load(function(){
	$('.loading').fadeOut('fast');
	$('.container').fadeIn('fast');
});
$('document').ready(function(){
		var vw;
		var momentIndex = 1;
		var momentInterval;

		function startMoments() {
			var img = new Image();
			img.src = 'moment/1.jpg';
			img.onload = function() {
				$('.moment-container').fadeIn('slow');
				momentInterval = setInterval(function() {
					momentIndex++;
					var nextImg = new Image();
					nextImg.src = 'moment/' + momentIndex + '.jpg';
					nextImg.onload = function() {
						$('#moment_img').animate({ opacity: 0 }, 500, function() {
							$(this).attr('src', nextImg.src).animate({ opacity: 1 }, 500);
						});
					};
					nextImg.onerror = function() {
						momentIndex = 1;
						$('#moment_img').animate({ opacity: 0 }, 500, function() {
							$(this).attr('src', 'moment/1.jpg').animate({ opacity: 1 }, 500);
						});
					};
				}, 4000);
			};
			img.onerror = function() {
				var imgPng = new Image();
				imgPng.src = 'moment/1.png';
				imgPng.onload = function() {
					$('.moment-container').fadeIn('slow');
					momentInterval = setInterval(function() {
						momentIndex++;
						var nextImg = new Image();
						nextImg.src = 'moment/' + momentIndex + '.png';
						nextImg.onload = function() {
							$('#moment_img').animate({ opacity: 0 }, 500, function() {
								$(this).attr('src', nextImg.src).animate({ opacity: 1 }, 500);
							});
						};
						nextImg.onerror = function() {
							momentIndex = 1;
							$('#moment_img').animate({ opacity: 0 }, 500, function() {
								$(this).attr('src', 'moment/1.png').animate({ opacity: 1 }, 500);
							});
						};
					}, 4000);
				};
			};
		}

		function launchSpectacularConfetti() {
			// 1. Initial massive blast from bottom corners
			confetti({
				particleCount: 150,
				angle: 60,
				spread: 70,
				origin: { x: 0, y: 0.8 }
			});
			confetti({
				particleCount: 150,
				angle: 120,
				spread: 70,
				origin: { x: 1, y: 0.8 }
			});

			// 2. Continuous shower from top corners for 4 seconds
			var end = Date.now() + (4 * 1000);

			(function frame() {
				confetti({
					particleCount: 4,
					angle: -60,
					spread: 55,
					origin: { x: 0, y: 0 }
				});
				confetti({
					particleCount: 4,
					angle: -120,
					spread: 55,
					origin: { x: 1, y: 0 }
				});

				if (Date.now() < end) {
					requestAnimationFrame(frame);
				}
			}());
		}

		function animateBalloons() {
			var w = window.innerWidth || document.documentElement.clientWidth || $(window).width();
			var isMobile = w < 768;
			
			// Fluid balloon width: 9vw on mobile, 70px on desktop
			var balloonWidth = isMobile ? (w * 0.09) : 70;
			
			// Spacing: fills ~85% of screen width on mobile, and capped to 100px on desktop
			var spacing = isMobile ? ((w * 0.85 - balloonWidth) / 8) : 100;
			spacing = Math.max(30, Math.min(100, spacing));
			
			var topPos = isMobile ? 180 : 240;
			vw = w / 2;

			var balloonsList = [
				{ id: '#b11', index: 0 },
				{ id: '#b22', index: 1 },
				{ id: '#b33', index: 2 },
				{ id: '#b44', index: 3 },
				{ id: '#b55', index: 4 },
				{ id: '#b66', index: 5 },
				{ id: '#b77', index: 6 },
				{ id: '#b88', index: 7 },
				{ id: '#b99', index: 8 }
			];

			$.each(balloonsList, function(i, b) {
				var leftPos = vw + (b.index - 4) * spacing - balloonWidth / 2;
				$(b.id).stop().animate({ top: topPos, left: leftPos }, 500);
			});
		}

		function shootFirework() {
			function launchSingleFirework(leftPercent, targetBottom, delay, colors) {
				setTimeout(function() {
					var $rocket = $('<div class="firework-rocket"></div>').appendTo('body');
					$rocket.css({
						position: 'fixed',
						bottom: '0px',
						left: leftPercent + '%',
						width: '5px',
						height: '30px',
						background: 'linear-gradient(to top, rgba(255,255,255,0), rgba(255,165,0,1))',
						boxShadow: '0 0 8px rgba(255,165,0,0.8), 0 0 15px rgba(255,69,0,0.6)',
						zIndex: 9999,
						transform: 'translateX(-50%)'
					});

					$rocket.animate({
						bottom: targetBottom
					}, 1200, 'swing', function() {
						$rocket.remove();
						
						// Explosion
						confetti({
							particleCount: 120,
							spread: 360,
							startVelocity: 35,
							origin: { x: leftPercent / 100, y: 1 - parseInt(targetBottom) / 100 },
							colors: colors || ['#ff0055', '#00ffcc', '#ffcc00', '#ff00ff', '#00ffff', '#ffffff']
						});
					});
				}, delay);
			}

			// Launch a spectacular series of 5 fireworks!
			// 1. Center
			launchSingleFirework(50, '60vh', 0, ['#ff0055', '#00ffcc', '#ffcc00', '#ff00ff', '#00ffff', '#ffffff']);
			
			// 2 & 3. Left-center & Right-center slightly later
			launchSingleFirework(30, '70vh', 400, ['#ff3300', '#ff9900', '#ffff00', '#ffffff']);
			launchSingleFirework(70, '70vh', 600, ['#00ff00', '#00ffff', '#0000ff', '#ffffff']);
			
			// 4 & 5. Outer edges slightly later
			launchSingleFirework(15, '55vh', 1000, ['#ff00ff', '#ff0055', '#ffffff']);
			launchSingleFirework(85, '55vh', 1200, ['#ffff00', '#ff9900', '#ffffff']);
		}

		$(window).resize(function(){
			$('#b1,#b2,#b3,#b4,#b5,#b6,#b7,#b8,#b9').stop();
			animateBalloons();
		});

	$('#maximize').click(function(){
		var elem = document.documentElement;
		if (elem.requestFullscreen) {
			elem.requestFullscreen();
		} else if (elem.mozRequestFullScreen) { /* Firefox */
			elem.mozRequestFullScreen();
		} else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
			elem.webkitRequestFullscreen();
		} else if (elem.msRequestFullscreen) { /* IE/Edge */
			elem.msRequestFullscreen();
		}
		$(this).fadeOut('slow').promise().done(function(){
			$('#turn_on').fadeIn('slow');
		});
	});

	$('#turn_on').click(function(){
		$('.bulb-yellow').addClass('bulb-glow-yellow');
		$('.bulb-red').addClass('bulb-glow-red');
		$('.bulb-blue').addClass('bulb-glow-blue');
		$('.bulb-green').addClass('bulb-glow-green');
		$('.bulb-pink').addClass('bulb-glow-pink');
		$('.bulb-orange').addClass('bulb-glow-orange');
		$('body').addClass('peach');
		$(this).fadeOut('slow').delay(5000).promise().done(function(){
			$('#play').fadeIn('slow');
		});
	});

	$('#play').click(function(){
		var audio = $('.song')[0];
        audio.play();
        $('.bulb-yellow').addClass('bulb-glow-yellow-after');
		$('.bulb-red').addClass('bulb-glow-red-after');
		$('.bulb-blue').addClass('bulb-glow-blue-after');
		$('.bulb-green').addClass('bulb-glow-green-after');
		$('.bulb-pink').addClass('bulb-glow-pink-after');
		$('.bulb-orange').addClass('bulb-glow-orange-after');
		$('body').css('backgroud-color','#FFF');
		$('body').addClass('peach-after');
		$(this).fadeOut('slow').delay(6000).promise().done(function(){
			$('#confetti_launch').fadeIn('slow');
		});
	});

	$('#confetti_launch').click(function(){
		shootFirework();
		setTimeout(function() {
			launchSpectacularConfetti();
		}, 300);
		$(this).fadeOut('slow').delay(6000).promise().done(function(){
			$('#bannar_coming').fadeIn('slow');
		});
	});

	$('#bannar_coming').click(function(){
		$('.bannar').addClass('bannar-come');
		$(this).fadeOut('slow').delay(6000).promise().done(function(){
			$('#balloons_flying').fadeIn('slow');
		});
	});

	function loopOne() {
		var randleft = 1000*Math.random();
		var randtop = 500*Math.random();
		$('#b1').animate({left:randleft,bottom:randtop},10000,function(){
			loopOne();
		});
	}
	function loopTwo() {
		var randleft = 1000*Math.random();
		var randtop = 500*Math.random();
		$('#b2').animate({left:randleft,bottom:randtop},10000,function(){
			loopTwo();
		});
	}
	function loopThree() {
		var randleft = 1000*Math.random();
		var randtop = 500*Math.random();
		$('#b3').animate({left:randleft,bottom:randtop},10000,function(){
			loopThree();
		});
	}
	function loopFour() {
		var randleft = 1000*Math.random();
		var randtop = 500*Math.random();
		$('#b4').animate({left:randleft,bottom:randtop},10000,function(){
			loopFour();
		});
	}
	function loopFive() {
		var randleft = 1000*Math.random();
		var randtop = 500*Math.random();
		$('#b5').animate({left:randleft,bottom:randtop},10000,function(){
			loopFive();
		});
	}

	function loopSix() {
		var randleft = 1000*Math.random();
		var randtop = 500*Math.random();
		$('#b6').animate({left:randleft,bottom:randtop},10000,function(){
			loopSix();
		});
	}
	function loopSeven() {
		var randleft = 1000*Math.random();
		var randtop = 500*Math.random();
		$('#b7').animate({left:randleft,bottom:randtop},10000,function(){
			loopSeven();
		});
	}
	function loopEight() {
		var randleft = 1000*Math.random();
		var randtop = 500*Math.random();
		$('#b8').animate({left:randleft,bottom:randtop},10000,function(){
			loopEight();
		});
	}
	function loopNine() {
		var randleft = 1000*Math.random();
		var randtop = 500*Math.random();
		$('#b9').animate({left:randleft,bottom:randtop},10000,function(){
			loopNine();
		});
	}

	$('#balloons_flying').click(function(){
		$('.balloon-border').animate({top:-500},8000);
		$('#b1,#b4,#b5,#b7,#b9').addClass('balloons-rotate-behaviour-one');
		$('#b2,#b3,#b6,#b8').addClass('balloons-rotate-behaviour-two');
		// $('#b3').addClass('balloons-rotate-behaviour-two');
		// $('#b4').addClass('balloons-rotate-behaviour-one');
		// $('#b5').addClass('balloons-rotate-behaviour-one');
		// $('#b6').addClass('balloons-rotate-behaviour-two');
		// $('#b7').addClass('balloons-rotate-behaviour-one');
		loopOne();
		loopTwo();
		loopThree();
		loopFour();
		loopFive();
		loopSix();
		loopSeven();
		loopEight();
		loopNine();
		
		$(this).fadeOut('slow').delay(5000).promise().done(function(){
			$('#cake_fadein').fadeIn('slow');
		});
	});	

	$('#cake_fadein').click(function(){
		$('.cake').fadeIn('slow');
		$(this).fadeOut('slow').delay(3000).promise().done(function(){
			$('#light_candle').fadeIn('slow');
		});
	});

	$('#light_candle').click(function(){
		$('.fuego').fadeIn('slow');
		$(this).fadeOut('slow').promise().done(function(){
			$('#wish_message').fadeIn('slow');
		});
	});

		
	$('#wish_message').click(function(){
		$('#b1,#b2,#b3,#b4,#b5,#b6,#b7,#b8,#b9').stop();
		$('#b1').attr('id','b11');
		$('#b2').attr('id','b22');
		$('#b3').attr('id','b33');
		$('#b4').attr('id','b44');
		$('#b5').attr('id','b55');
		$('#b6').attr('id','b66');
		$('#b7').attr('id','b77');
		$('#b8').attr('id','b88');
		$('#b9').attr('id','b99');
		animateBalloons();
		$('.balloons').css('opacity','0.9');
		$('.balloons h2').fadeIn(3000);
		$(this).fadeOut('slow').delay(3000).promise().done(function(){
			$('#story').fadeIn('slow');
		});
	});
	
	$('#story').click(function(){
		$(this).fadeOut('slow');
		$('.cake').fadeOut('fast').promise().done(function(){
			$('.message').fadeIn('slow');
			startMoments();
		});
		
		var i;

		function msgLoop (i) {
			$("p:nth-child("+i+")").fadeOut('slow').delay(800).promise().done(function(){
			i=i+1;
			$("p:nth-child("+i+")").fadeIn('slow').delay(1000);
			if(i==21){
				$("p:nth-child(21)").delay(2500).fadeOut('slow').promise().done(function () {
					$('.cake').fadeIn('fast');
					$('.moment-container').fadeOut('slow');
					clearInterval(momentInterval);
				});
				
			}
			else{
				msgLoop(i);
			}			

		});
			// body...
		}
		
		msgLoop(0);
		
	});

	// Fullscreen Toggle functionality
	$('#fullscreen_toggle').click(function() {
		var doc = window.document;
		var docEl = doc.documentElement;

		var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullscreen || docEl.msRequestFullscreen;
		var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

		if (!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
			// Request fullscreen
			if (requestFullScreen) {
				requestFullScreen.call(docEl);
			}
			// If we are on the first step, trigger progress to turn_on
			if ($('#maximize').is(':visible')) {
				$('#maximize').fadeOut('slow').promise().done(function(){
					$('#turn_on').fadeIn('slow');
				});
			}
		} else {
			// Cancel fullscreen
			if (cancelFullScreen) {
				cancelFullScreen.call(doc);
			}
		}
	});

	// Synchronize SVG Icons with actual Fullscreen State
	$(document).on('fullscreenchange webkitfullscreenchange mozfullscreenchange MSFullscreenChange', function() {
		if (document.fullscreenElement || document.webkitIsFullScreen || document.mozFullScreen || document.msFullscreenElement) {
			$('#fullscreen_toggle .icon-expand').hide();
			$('#fullscreen_toggle .icon-compress').show();
		} else {
			$('#fullscreen_toggle .icon-compress').hide();
			$('#fullscreen_toggle .icon-expand').show();
		}
	});
});




//alert('hello');