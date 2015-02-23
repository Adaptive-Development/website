/*
	jQuery Coda-Slider v2.0 - http://www.ndoherty.biz/coda-slider
	Copyright (c) 2009 Niall Doherty
	This plugin available for use in all personal or commercial projects under both MIT and GPL licenses.
*/

$j(function(){
	// Remove the coda-slider-no-js class from the body
	$j("body").removeClass("coda-slider-no-js");
	// Preloader
	//$j(".coda-slider").children('.panel').hide().end().prepend('<p class="loading">Loading...<br /><img src="images/ajax-loader.gif" alt="loading..." /></p>');
});

var sliderCount = 1;

$j.fn.codaSlider = function(settings) {

	settings = $j.extend({
		autoHeight: true,
		autoHeightEaseDuration: 1000,
		autoHeightEaseFunction: "easeInOutExpo",
		autoSlide: false,
		autoSlideInterval: 7000,
		autoSlideStopWhenClicked: true,
		crossLinking: true,
		dynamicArrows: true,
		dynamicArrowLeftText: "&#171; left",
		dynamicArrowRightText: "right &#187;",
		dynamicTabs: true,
		dynamicTabsAlign: "center",
		dynamicTabsPosition: "top",
		externalTriggerSelector: "a.xtrig",
		panelTitleSelector: "h2.title",
		slideEaseDuration: 1000,
		slideEaseFunction: "easeInOutExpo"
	}, settings);
	
	return this.each(function(){
		
		// Uncomment the line below to test your preloader
		// alert("Testing preloader");
		
		var slider = $j(this);
		
		// If we need arrows
		if (settings.dynamicArrows) {
			slider.parent().addClass("arrows");
			slider.before('<div class="coda-nav-left" id="coda-nav-left-' + sliderCount + '"><a href="#">' + settings.dynamicArrowLeftText + '</a></div>');
			slider.after('<div class="coda-nav-right" id="coda-nav-right-' + sliderCount + '"><a href="#">' + settings.dynamicArrowRightText + '</a></div>');
		};
		
		var panelWidth = slider.find(".panel").width();
		var panelCount = slider.find(".panel").size();
		var panelContainerWidth = panelWidth*panelCount;
		var navClicks = 0; // Used if autoSlideStopWhenClicked = true
		
		// Surround the collection of panel divs with a container div (wide enough for all panels to be lined up end-to-end)
		$j('.panel', slider).wrapAll('<div class="panel-container"></div>');
		// Specify the width of the container div (wide enough for all panels to be lined up end-to-end)
		$j(".panel-container", slider).css({ width: panelContainerWidth });
		
		// Specify the current panel.
		// If the loaded URL has a hash (cross-linking), we're going to use that hash to give the slider a specific starting position...
		if (settings.crossLinking && location.hash && parseInt(location.hash.slice(1)) <= panelCount) {
			var currentPanel = parseInt(location.hash.slice(1));
			var offset = - (panelWidth*(currentPanel - 1));
			$j('.panel-container', slider).css({ marginLeft: offset });
		// If that's not the case, check to see if we're supposed to load a panel other than Panel 1 initially...
		} else if (settings.firstPanelToLoad != 1 && settings.firstPanelToLoad <= panelCount) { 
			var currentPanel = settings.firstPanelToLoad;
			var offset = - (panelWidth*(currentPanel - 1));
			$j('.panel-container', slider).css({ marginLeft: offset });
		// Otherwise, we'll just set the current panel to 1...
		} else { 
			var currentPanel = 1;
		};
			
		// Left arrow click
		$j("#coda-nav-left-" + sliderCount + " a").click(function(){
			navClicks++;
			if (currentPanel == 1) {
				offset = - (panelWidth*(panelCount - 1));
				alterPanelHeight(panelCount - 1);
				currentPanel = panelCount;
				slider.siblings('.coda-nav').find('li.current').removeClass('current').parent('ul').find('li:last').addClass('current');
			} else {
				currentPanel -= 1;
				alterPanelHeight(currentPanel - 1);
				offset = - (panelWidth*(currentPanel - 1));
				$j('.coda-nav').find('li.current').removeClass('current').prev().addClass('current');
			};
			$j('.panel-container', slider).animate({ marginLeft: offset }, settings.slideEaseDuration, settings.slideEaseFunction);
			if (settings.crossLinking) { location.hash = currentPanel }; // Change the URL hash (cross-linking)
			return false;
		});
			
		// Right arrow click
		$j('#coda-nav-right-' + sliderCount + ' a').click(function(){
			navClicks++;
			if (currentPanel == panelCount) {
				offset = 0;
				currentPanel = 1;
				alterPanelHeight(0);
				slider.siblings('.coda-nav').find('li.current').removeClass('current').parent('ul').find('li:eq(0)').addClass('current');
			} else {
				offset = - (panelWidth*currentPanel);
				alterPanelHeight(currentPanel);
				currentPanel += 1;
				$j('.coda-nav').find('li.current').removeClass('current').next().addClass('current');
			};
			$j('.panel-container', slider).animate({ marginLeft: offset }, settings.slideEaseDuration, settings.slideEaseFunction);
			if (settings.crossLinking) { location.hash = currentPanel }; // Change the URL hash (cross-linking)
			return false;
		});
		
		// If we need a dynamic menu
		if (settings.dynamicTabs) {
			var dynamicTabs = '<div class="coda-nav" id="coda-nav-' + sliderCount + '"><ul></ul></div>';
			switch (settings.dynamicTabsPosition) {
				case "bottom":
					slider.parent().append(dynamicTabs);
					break;
				default:
					slider.parent().prepend(dynamicTabs);
					break;
			};
			ul = $j('#coda-nav-' + sliderCount + ' ul');
			// Create the nav items
			$j('.panel', slider).each(function(n) {
				ul.append('<li class="tab' + (n+1) + '"><a href="#' + (n+1) + '">' + $j(this).find(settings.panelTitleSelector).text() + '</a></li>');												
			});
			navContainerWidth = slider.width() + slider.siblings('.coda-nav-left').width() + slider.siblings('.coda-nav-right').width();
			ul.parent().css({ width: navContainerWidth });
			switch (settings.dynamicTabsAlign) {
				case "center":
					ul.css({ width: ($j("li", ul).width() + 2) * panelCount });
					break;
				case "right":
					ul.css({ float: 'right' });
					break;
			};
		};
			
		// If we need a tabbed nav
		$j('#coda-nav-' + sliderCount + ' a').each(function(z) {
			// What happens when a nav link is clicked
			$j(this).bind("click", function() {
				navClicks++;
				$j(this).parent().addClass('current').parents('ul').find('a').not($j(this)).parent().removeClass('current');
				offset = - (panelWidth*z);
				alterPanelHeight(z);
				currentPanel = z + 1;
				$j('.panel-container', slider).animate({ marginLeft: offset }, settings.slideEaseDuration, settings.slideEaseFunction);
				if (!settings.crossLinking) { return false }; // Don't change the URL hash unless cross-linking is specified
			});
		});
		$j('.coda-nav ul li:last').addClass('last');
		$j('.coda-nav ul li:first').addClass('first');
		// External triggers (anywhere on the page)
		$j(settings.externalTriggerSelector).each(function() {
			// Make sure this only affects the targeted slider
			if (sliderCount == parseInt($j(this).attr("rel").slice(12))) {
				$j(this).bind("click", function() {
					navClicks++;
					targetPanel = parseInt($j(this).attr("href").slice(1));
					offset = - (panelWidth*(targetPanel - 1));
					alterPanelHeight(targetPanel - 1);
					currentPanel = targetPanel;
					// Switch the current tab:
					slider.siblings('.coda-nav').find('li').removeClass('current').parent('ul').find('li:eq(' + (targetPanel - 1) + ')').addClass('current');
					// Slide
					$j('.panel-container', slider).animate({ marginLeft: offset }, settings.slideEaseDuration, settings.slideEaseFunction);
					if (!settings.crossLinking) { return false }; // Don't change the URL hash unless cross-linking is specified
				});
			};
		});
			
		// Specify which tab is initially set to "current". Depends on if the loaded URL had a hash or not (cross-linking).
		if (settings.crossLinking && location.hash && parseInt(location.hash.slice(1)) <= panelCount) {
			$j("#coda-nav-" + sliderCount + " li:eq(" + (location.hash.slice(1) - 1) + ")").addClass("current");
		// If there's no cross-linking, check to see if we're supposed to load a panel other than Panel 1 initially...
		} else if (settings.firstPanelToLoad != 1 && settings.firstPanelToLoad <= panelCount) {
			$j("#coda-nav-" + sliderCount + " li:eq(" + (settings.firstPanelToLoad - 1) + ")").addClass("current");
		// Otherwise we must be loading Panel 1, so make the first tab the current one.
		} else {
			$j("#coda-nav-" + sliderCount + " li:eq(0)").addClass("current");
		};
		
		// Set the height of the first panel
		if (settings.autoHeight) {
			panelHeight = $j('.panel:eq(' + (currentPanel - 1) + ')', slider).height();
			slider.css({ height: panelHeight });
		};
		
		// Trigger autoSlide
		if (settings.autoSlide) {
			slider.ready(function() {
				setTimeout(autoSlide,settings.autoSlideInterval);
			});
		};
		
		function alterPanelHeight(x) {
			if (settings.autoHeight) {
				panelHeight = $j('.panel:eq(' + x + ')', slider).height()
				slider.animate({ height: panelHeight }, settings.autoHeightEaseDuration, settings.autoHeightEaseFunction);
			};
		};
		
		function autoSlide() {
			if (navClicks == 0 || !settings.autoSlideStopWhenClicked) {
				if (currentPanel == panelCount) {
					var offset = 0;
					currentPanel = 1;
				} else {
					var offset = - (panelWidth*currentPanel);
					currentPanel += 1;
				};
				alterPanelHeight(currentPanel - 1);
				// Switch the current tab:
				slider.siblings('.coda-nav').find('li').removeClass('current').parent('ul').find('li:eq(' + (currentPanel - 1) + ')').addClass('current');
				// Slide:
				$j('.panel-container', slider).animate({ marginLeft: offset }, settings.slideEaseDuration, settings.slideEaseFunction);
				setTimeout(autoSlide,settings.autoSlideInterval);
			};
		};
		
		// Kill the preloader
		$j('.panel', slider).show().end().find("p.loading").remove();
		slider.removeClass("preload");
		
		sliderCount++;
		
	});
};