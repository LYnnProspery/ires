import { getStorage } from '../lib/util';
import {
    MOCK_STORAGE_KEY,
    UPDATE_MOCK_DATA_SIGNAL,
    UPDATE_INTERCEPTER_DATA_SIGNAL
} from '../const';

// manage xhr config and sync with inject_script
class ConfManager {
    constructor(listener) {
        this.listener = listener;
        this.init();
    }

    init() {
        this.getUserProxyConfig();
    }

    async getUserProxyConfig() {
        this.mockConfig = await getStorage(MOCK_STORAGE_KEY);

        this.updateInjectScriptProxyConf({
            msg: UPDATE_MOCK_DATA_SIGNAL,
            data: this.mockConfig
        });
    }

    updateInjectScriptProxyConf(data) {
        this.listener.notifyInjectScriptListener(data);
    }
}

export { ConfManager as default };