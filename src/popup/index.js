import Vue from 'vue';
import './index.less';

new Vue({
    el: '#app',
    data: {
        newMock: {
            mockRequestMethodList: ['GET', 'POST', 'PUT', 'DELETE'],
            selectedMethod: 'GET',
            showMethodList: false
        }
    },

    computed: {
        mockRequestMethods() {
            return this.newMock.mockRequestMethodList.filter(item => item !== this.newMock.selectedMethod);
        }
    },

    methods: {
        showMockMethodList() {
            this.newMock.showMethodList = true;
        },

        selectMockMethod(method) {
            this.newMock.selectedMethod = method;
            this.newMock.showMethodList = false;
        }
    }
});