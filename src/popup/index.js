import Vue from 'vue';
import './index.less';
import {
    MOCK_STORAGE_KEY,
    UPDATE_MOCK_DATA_SIGNAL,
    UPDATE_INTERCEPTER_DATA_SIGNAL
} from '../const';
import { setStorage, getStorage, sendMsg } from '../lib/util';

const defaultConfig = {
    newMock: {
        mockRequestMethodList: ['GET', 'POST', 'PUT', 'DELETE'],
        selectedMethod: 'GET',
        showMethodList: false,
        serviceUrl: '',
        resText: ''
    },
    newInspector: {
        mockRequestMethodList: ['GET', 'POST', 'PUT', 'DELETE'],
        selectedMethod: 'GET',
        showMethodList: false,
        serviceUrl: ''
    }
};

new Vue({
    el: '#app',
    data: {
        newMock: Object.assign({}, defaultConfig.newMock),
        newInspector: Object.assign({}, defaultConfig.newInspector),
        creatingMock: false,
        creatingInspector: false,
        mockServiceList: [],
        intercepterList: []
    },

    computed: {
        mockRequestMethods() {
            return this.newMock.mockRequestMethodList.filter(item => item !== this.newMock.selectedMethod);
        },

        intercepterMethods() {
            return this.newInspector.mockRequestMethodList.filter(item => item !== this.newInspector.selectedMethod);
        }
    },

    methods: {
        showMockMethodList(type) {
            this['new' + type].showMethodList = true;
        },

        selectMockMethod(method, type) {
            this['new' + type].selectedMethod = method;
            this['new' + type].showMethodList = false;
        },

        newHandler(type) {
            this['creating' + type] = true;
        },

        destroyHandler(type) {
            this['creating' + type] = false;
            this['new' + type] = Object.assign({}, defaultConfig['new' + type]);
        },

        createNewMockService() {
            let mockService = {
                method: this.newMock.selectedMethod,
                url: this.newMock.serviceUrl,
                resText: this.newMock.resText
            };

            this.mockServiceList.push({
                ...mockService,
                enabled: true
            });
            
            // TODO created的时候 拿storage 的mock 和 Inspector 列表
            // 更新的时候 去更新storage
            // 更新在background中做
            sendMsg({
                msg: UPDATE_MOCK_DATA_SIGNAL,
                data: this.mockServiceList
            }, (res) => {
                console.log(res);
            });


            console.log(this.mockServiceList)
        }
    }
});