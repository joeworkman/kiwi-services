var kiwiSettings = new Object();

function handleMessage(event) {
	if(event.name === "kiwiPostText") {
		kiwiPostText(event)
	}
}

function handleContextMenu(event) {
	if (event.userInfo && event.userInfo.node && event.userInfo.node.toLowerCase() == "img") {
		event.contextMenu.appendContextMenuItem("kiwi.menu.image", "Kiwi - Post Image", "postImageWithKiwi");
	}
	if (event.userInfo && event.userInfo.node && event.userInfo.node.toLowerCase() == "a") {
		event.contextMenu.appendContextMenuItem("kiwi.menu.link", "Kiwi - Post Link", "postLinkWithKiwi");
	}
}

function validateCommand(event) {
	if (event.command === "postWithKiwi") { 
		// Disable the button if there is no URL loaded in the tab. Ex. Top Sites
		event.target.disabled = !event.target.browserWindow.activeTab.url;
	}
}

function performCommand (event) {
	if (event.command === "postWithKiwi") {
		kiwiPostText(event)
	}
	if (event.command === "postImageWithKiwi") {
		kiwiImagePost(event)
	}
	if (event.command === "postLinkWithKiwi") {
		kiwiLinkPost(event)
	}
}

function kiwiPostText(event) {
	kiwiSettings.pageURL = safari.application.activeBrowserWindow.activeTab.url;
	kiwiSettings.title = safari.application.activeBrowserWindow.activeTab.title;
	safari.application.activeBrowserWindow.activeTab.page.dispatchMessage("getPostKiwiData", kiwiSettings);
	kiwiSettings = new Object();
}

function kiwiImagePost(event) {
	kiwiSettings.image = event.userInfo.srcUrl;
	kiwiSettings.info = event.userInfo;
	safari.application.activeBrowserWindow.activeTab.page.dispatchMessage("getPostKiwiData", kiwiSettings);
	kiwiSettings = new Object();
}

function kiwiLinkPost(event) {
	kiwiSettings.pageURL = event.userInfo.url;
	kiwiSettings.title = 'link';
	safari.application.activeBrowserWindow.activeTab.page.dispatchMessage("getPostKiwiData", kiwiSettings);
	kiwiSettings = new Object();
}

safari.application.addEventListener("command", performCommand, false);
safari.application.addEventListener("validate", validateCommand, false);
safari.application.addEventListener("message", handleMessage, false);
safari.application.addEventListener("contextmenu", handleContextMenu, false);
