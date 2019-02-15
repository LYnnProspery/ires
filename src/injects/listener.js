import { listenPost } from '../lib/util';

// handler msg between content_script and inject_script
class Listener {
    constructor() {
        this.init();
    }

    init() {
        this.initMessageListener();
    }

    updateXhrProxy() {

    }

    initMessageListener() {
        listenPost(this.msgHandler);
        // window.addEventListener('message', (e) => {
        //     // TODO updateXhrProxy


        // });
    }

    msgHandler(e) {
        // console.log(e)
    }
}

export { Listener as default }