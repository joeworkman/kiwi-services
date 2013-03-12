var kiwiShiftDown = false, kiwiCmdDown = false;
var shiftKey = 16, cmdKey = 91, pKey = 80;

function handleMessage(event) {	
	// console.log('Inject: handleMessage')
	if (window !== window.top) { return; }
	if (event.name === "getPostKiwiData") {
		getPostKiwiData(event);
    }
	if (event.name === "postImageWithKiwi") {
		getPostKiwiData(event);
    }
}

function findImagesByRegexp(regexp, parentNode) {
   var images = Array.prototype.slice.call((parentNode || document).getElementsByTagName('img'));
   var length = images.length;
   var ret = [];
   for(var i = 0; i < length; ++i) {
      if(images[i].src.search(regexp) != -1) {
         ret.push(images[i]);
      }
   }
   return ret;
}

function getPostKiwiData(event) {	
	var settings = event.message;
    // console.log('Intercepted getPostKiwiData')
    // console.log(settings)
	
	var postText = ''

	if (settings.image) {
		alt = findImagesByRegexp(settings.image)[0].getAttribute('alt');
		postText = alt + ' ' + settings.image
	}
	else {
		var pageURL = settings.pageURL
		var title = document.title

	    var selectedText = document.getSelection().toString()
	    // console.log('Got Selected Text: '+ selectedText)
		
		postText = selectedText == '' ? title : selectedText
		postText += ' ' + pageURL 
	}

	var postUrl = 'kiwi://post?text='+ encodeURIComponent( postText )

	// console.log('Open Post URL: '+ postUrl)
	document.location.href = postUrl
}

function listenKeyUp(key) {
    if (key.keyCode === shiftKey) { kiwiShiftDown = false }
    if (key.keyCode === cmdKey)   { kiwiCmdDown   = false }
}

function listenKeyDown(key) {
    if (key.keyCode === shiftKey) { kiwiShiftDown = true }
    if (key.keyCode === cmdKey)   { kiwiCmdDown   = true }

	if ((kiwiShiftDown && kiwiCmdDown) && key.keyCode === pKey) {
		safari.self.tab.dispatchMessage('kiwiPostText',true)
		kiwiShiftDown = false
		kiwiCmdDown   = false
	}
}

function handleContextMenu(event) {
	// console.log('Inject: handleContextMenu')
	var selection = false;
	if (window.getSelection().rangeCount) {
	  var range = window.getSelection().getRangeAt(0);
	  if (!range.collapsed) {
	    selection = true;
	  }
	}
	safari.self.tab.setContextMenuEventUserInfo(event, {
	  node: event.target.nodeName,
	  selection: selection,
	  srcUrl: event.target.src,
	  url: document.location.href,
	});
}

document.addEventListener('keydown', listenKeyDown, false)
document.addEventListener('keyup', listenKeyUp, false)
document.addEventListener("contextmenu", handleContextMenu, false);

safari.self.addEventListener("message", handleMessage, false);