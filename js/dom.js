

$j(function() 

{

	//jQuery.preLoadImages("wordpress/wp-content/uploads/2010/09/customer-collaboration.png", "wordpress/wp-content/uploads/2010/09/simplicity.png", "wordpress/wp-content/uploads/2010/09/self-ogrganising-teams.png");

	$j('HTML').addClass('js');  

	$j(".show-0").remove();

	

	$j('a[href][rel*=external]').click(function(){ this.target = "_blank"; });

	

	$j('#coda-slider-1').codaSlider({

        dynamicArrows: false,

        dynamicTabs: false,

        firstPanelToLoad: 1

    });

    

    $j("a.jQueryBookmark").click(function(e){

		e.preventDefault(); // this will prevent the anchor tag from going the user off to the link

		var bookmarkUrl = this.href;

		var bookmarkTitle = this.title;

	 

		if (window.sidebar) { // For Mozilla Firefox Bookmark

			window.sidebar.addPanel(bookmarkTitle, bookmarkUrl,"");

		} else if( window.external || document.all) { // For IE Favorite

			window.external.AddFavorite( bookmarkUrl, bookmarkTitle);

		} else if(window.opera) { // For Opera Browsers

			$("a.jQueryBookmark").attr("href",bookmarkUrl);

			$("a.jQueryBookmark").attr("title",bookmarkTitle);

			$("a.jQueryBookmark").attr("rel","sidebar");

		} else { // for other browsers which does not support

			 alert('Your browser does not support this bookmark action');

			 return false;

		}

	});





	$j('.textarea textarea').wysiwyg({

    controls: {

		justifyLeft   : { visible : false },

     	justifyCenter : { visible : false },

     	justifyRight  : { visible : false },

     	justifyFull   : { visible : false },

     	paste : { visible : false }

	}

 	});

 	

 	$j(".menu-item-19 a").colorbox({iframe:true, innerWidth:980, innerHeight:'85%'});

 	$j("#quicklinks .menu-item-22 a").colorbox({iframe:true, innerWidth:980, innerHeight:'85%'});

 	$j("a.iframe").colorbox({iframe:true, innerWidth:980, innerHeight:'85%'});





		$j('#view-window ul').cycle({

			fx: 'fade', 

			cleartypeNoBg: false,	// boolean = true if clearType corrections should be applied (for IE) 

			delay: 0,				// milliseconds = additional delay for first transition (hint: can be negative)

			timeout: 5000,			//  milliseconds between slide transitions (0 to disable auto advance)

			pause: 1,				// boolean = 1 pauses the slideshow on mouseOver

			random: 0,				// boolean = 0 moves through slides sequentially; 1 moves through slides in random order

			speed: 1000,			// number = millisecond transition speed between slides

			fastOnEvent: 1000,		// milliseconds = forces fast transitions when triggered manually

			next:   '#snext', 

    		prev:   '#sprev',

    		pager: '#slider-nav',

			

			// callback fn that creates a thumbnail to use as pager anchor 

    		pagerAnchorBuilder: function(idx, slide) { 

        		//return '<li><a href="#"><img src="' + slide.src + '" width="50" height=thisArrow"50" /></a></li>';

        		var thisArrow = ""

        		//return '<li class="small-nav"><a class="theme-icon" href="#">' +thisArrow+ '</a></li>'; 

        		return '<li class="small-nav clearfix '  + $j(slide).children(".theme-icon").eq(0).attr('id') + '"><a class="theme-icon" href="#">' 

        			+ $j(slide).children(".theme-icon").eq(0).html() + '</a><div><span>' + $j(slide).children("h1").eq(0).text() + '</span></div></li>';

    		}

			

		});

	



});



// ON Load of window

$j(window).load(function(){



	$j(".tooltip").tipTip( { delay: 100, edgeOffset: 0, fadeOut: 400, defaultPosition: "top" } );

	

	/* Disable Right Click */

	//$j(document).bind("contextmenu",function(e){ return false;  });

});// End Load Window







