import { post } from '../lib/util';
// handler msg between content_script and injects_script
class Listener {
    constructor() {

    }

    init() {
        this.initListener();
    }

    initListener() {
    
    }

    notifyInjectScriptListener(data) {
        post(data);
    }
}

export { Listener as default }