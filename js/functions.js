// Custom Functions

	// Variables & Settings:
	var siteAddress="http://adaptivedevelopment.com/wordpress";
	var siteAddress2="http://adaptivedevelopment.com/";
	var siteAddress3="http://www.adaptivedevelopment.com/";
	var emailClass="a.email";


// EXTERNAL LINKS - traps all links with rel="external" or class="external" or those that link to external sources
function linksAndEmails(){

	$j('a[rel^="external"]').click(function(){
		window.open($j(this).attr('href'))
		return false
	})
	$j('a.external').click(function(){
		window.open($j(this).attr('href'))
		return false
	})
	$j("a[href^='http://']").not("a[href^='"+siteAddress+"']").not("a[href^='"+siteAddress2+"']").not("a[href^='"+siteAddress3+"']").not('a[rel^="external"]').click(function(){
		window.open(this.href,'external')
	return false
	})
	// Make emails, using either content or title
	$j(emailClass).each(function(){
		var txt=$j(this).text()
		if($j(this).attr("title")==""){
			var txtc=txt.replace('/','@')
			this.title=txt
			e=this.title.replace('/','@')
			this.href=" "
			this.href='mailto:'+e;$j(this).text(e)
			this.title="Email"
			$j(this).text(txtc)}
		else{
			var txtc=txt.replace('/','@')
			this.href=" "
			var emailLink=$j(this).attr("title")
			e=emailLink.replace('/','@')
			this.href='mailto:'+e
			var newTitle=$j(this).attr("title")
			$j(this).text(txtc)
			this.title="Email"}
	})
}//End



// General Function to use to make sure email enetered is a valid Email Link
function checkMail(email){
	var filter=/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$j/
	if(filter.test(email)){
		return true}
	return false
}//End

// Pre-Load Imagea
(function($) {
  var cache = [];
  // Arguments are image paths relative to the current page.
  $.preLoadImages = function() {
    var args_len = arguments.length;
    for (var i = args_len; i--;) {
      var cacheImage = document.createElement('img');
      cacheImage.src = arguments[i];
      cache.push(cacheImage);
    }
  }
})(jQuery)

// Clear field
function clearField(searchFieldID,searchFieldText){
	$j(searchFieldID).mouseover(function()
		{if(this.value==searchFieldText){this.value='';return true;}
	})
	$j(searchFieldID).mouseout(function(){if(this.value==''){this.value=searchFieldText;return true;}})
}


// Get External Content (Ajax)
function getExternalContent(contentContainer,externalContent){
	$j(contentContainer).addClass('loading-image')
	$j(contentContainer).removeClass('loading-image').load(externalContent)
}//End


//Get Screen Width
function getScreenWidth(){
	var windowWidth=screen.width
	return windowWidth
}//End

// Get Page scroll Position
function getPageScroll(){
	var xScroll,yScroll
	if(self.pageYOffset){
		yScroll=self.pageYOffset
		xScroll=self.pageXOffset
	}else if(document.documentElement&&document.documentElement.scrollTop){
		yScroll=document.documentElement.scrollTop
		xScroll=document.documentElement.scrollLeft
	}else if(document.body){
		yScroll=document.body.scrollTop
		xScroll=document.body.scrollLeft}
		return new Array(xScroll,yScroll)
}//End

// Get current page height
function getPageHeight(){
	var windowHeight
	if(self.innerHeight){
		windowHeight=self.innerHeight
	}else if(document.documentElement&&document.documentElement.clientHeight){
		windowHeight=document.documentElement.clientHeight
	}else if(document.body){
		windowHeight=document.body.clientHeight}
	return windowHeight
}//End

