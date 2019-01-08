# ires

This is a chrome extension which can mock http requests, intercepts requests & responds, and modify their content.

## The reason why the requests sended while page loading may not be proxyed
The runtime environment of content_script is an isolated sandbox that does not affect the browser environment, so you cannot directly modify the XMLHttpRequest object.
Modifying the XHR object in the browser environment can only be done by inserting a script tag into the page in content_script. But this insertion process is uncontrollable. So the XHR request sended before this script is executed will not be proxyed and intercepted.
