# Kiwi Services for Mac OS X

Services are apart of the core functionality of Mac OS X. They let you trigger automations from almost any contextual menu throughout the operating system. The services that are displayed are even customized based on the object that you have selected to run you service on. For more information about OS X services, check out this article by [Macworld](http://www.macworld.com/article/1163996/how_to_use_services_in_mac_os_x.html). 

The following services are available to you here in the `OSXServices` folder. 

* **Kiwi - Compose Post**: When you select text in any application you can access this service. A new post with Kiwi will be opened with the text that you had selected. 

* **Kiwi - Post Image**: When you have an image (or multiple images) selected, this service will become available. Kiwi will take the images and upload them to the cloud. It will then compose a new post where the urls to the uploaded images will be inserted once their uploads complete. 
* **Kiwi - Post Now**: This service is similar to the *Compose Post* service. When you select text in any application you can access this service. However, a post with the selected text will be sent directly to App.net without giving you the option to edit the post first in Kiwi.  

## Installation

The installation of system services is pretty simple. There are two options available. 

1. Double click on the *.workflow* files and you will be prompted to install the service. Done. 
2. To manually install the services, you will need to copy the *.workflow* files into **<Home>/Library/Services**. 
