export const injector = () => {
    let proxyXhrScript = document.createElement('script');

    proxyXhrScript.src = chrome.extension.getURL('/dist/injects.js');
    proxyXhrScript.onload = function() {
        this.remove();
    };

    (document.head || document.documentElement).appendChild(proxyXhrScript);
};