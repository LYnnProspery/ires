import Vue from 'vue';
import './index.less';

new Vue({
    el: '#app',
    data: {
        newMock: {
            mockRequestMethodList: ['GET', 'POST', 'PUT', 'DELETE'],
            selectedMethod: 'GET',
            showMethodList: false
        },
        newInspector: {
            mockRequestMethodList: ['GET', 'POST', 'PUT', 'DELETE'],
            selectedMethod: 'GET',
            showMethodList: false
        },
        creatingMock: false,
        creatingInspector: false
    },

    computed: {
        mockRequestMethods() {
            return this.newMock.mockRequestMethodList.filter(item => item !== this.newMock.selectedMethod);
        },

        inspectorMethods() {
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
        }
    }
});