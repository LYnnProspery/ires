import {
    listenMsg,
    getStorage,
    setStorage
} from '../lib/util';
import {
    UPDATE_MOCK_DATA_SIGNAL,
    UPDATE_INTERCEPTER_DATA_SIGNAL,
    MOCK_STORAGE_KEY,
    INTERCEPTER_STORAGE_KEY
} from '../const';


// handle msg between popup and background
class Listener {
    constructor() {
        this.init();
    }

    init() {
        listenMsg((req, sender, sendRes) => {
            // popup 初始化 从storage拿数据
            // popup 更新 通知background
            // background 同步Storage和content_script

            // content_script 初始化从storage拿数据发送给inject_script
            // background 通知更新后 通知inject_script更新
            switch (req.msg) {
                case UPDATE_MOCK_DATA_SIGNAL:
                    if (req.data) {
                        this.updateStorage(MOCK_STORAGE_KEY, req.data);
                        this.notifyContentScriptListener();

                        sendRes({
                            result: 1
                        });
                    }
                    break;
            }
        });
    }

    updateStorage(key, data) {
        setStorage(key, data);
    }

    notifyContentScriptListener() {
        
    }
}

export { Listener as default }
