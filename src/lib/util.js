export const getStorage = async (key) => new Promise(resolve => {
    chrome.storage.sync.get([key], (result) => {
        resolve(result[key]);
    });
});

export const setStorage = (key, value) => chrome.storage.sync.set({ [key]: value});

// for arguments tips
export const sendMsg = function (data, onRes) {
    chrome.runtime.sendMessage.apply(chrome, [...arguments]);
};

// for arguments tips
export const listenMsg = function (handler) {
    chrome.runtime.onMessage.addListener.apply(chrome.runtime.onMessage, [...arguments]);
};

// send msg between content_scripts and injects_scripts
export const post = (data) => {
    window.postMessage(data, '*');
};

export const listenPost = (handler) => {
    window.addEventListener('message', (...args) => {
        handler.apply(this, args);
    });
};