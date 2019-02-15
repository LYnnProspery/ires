import { proxyXhr } from '../lib/xhr-proxy';
import {
    XHR_REQUEST_IS_HIT_MOCK,
    XHR_REQUEST_MOCK_DATA,
    PROXY_UNWRITEABLE_PROP_PREFIX
} from '../const';

const mockList = [
    {
        url: '/hahah',
        method: 'get',
        enable: true
    }
]

// proxyXhr({
//     onreadystatechange(xhr) {
//         // console.log(xhr)
//         // if (xhr.responseURL === '/hahah' || xhr.responseURL ===  location.origin + '/hahah') {
//         //     xhr.responseText = '123123'   
//         // }
//     },

//     open(args, xhr) {
//         mountMockData(args, xhr);
//         // console.log(args, xhr)
//         // if (args[0].toLowerCase() === 'get' && args[1] === '/hahah') {
//         //     console.log('true')
//         //     return true;
//         // }

//         // if (xhr.responseURL === '/hahah' || xhr.responseURL ===  location.origin + '/hahah') {
//         //     return true;
//         // }
//     },

//     send(args, xhr) {
//         console.log(xhr );
//         if (xhr.XHR_REQUEST_IS_HIT_MOCK) {
//             const mockRes = xhr.XHR_REQUEST_MOCK_DATA;

//             // xhr.status = 200;
//             // xhr.statusText = 'success';
//             xhr[PROXY_UNWRITEABLE_PROP_PREFIX + 'status'] = 200;
//             xhr[PROXY_UNWRITEABLE_PROP_PREFIX + 'statusText'] = '123123';

//             xhr[PROXY_UNWRITEABLE_PROP_PREFIX + 'responseText'] = xhr[PROXY_UNWRITEABLE_PROP_PREFIX + 'response'] = mockRes;
//             xhr[PROXY_UNWRITEABLE_PROP_PREFIX + 'readyState'] = xhr.DONE;

//             console.log(xhr)
//         }
//     }

//     // responseText: {
//     //     getter: mockRes
//     // },
//     // response: {
//     //     getter: mockRes
//     // }
// });

function mountMockData (xhrOpenFnArgs, xhrInstance) {
    const hitMockReq = mockList.filter(mock => matchReqUrl(xhrOpenFnArgs, mock))[0];
    if (hitMockReq) {
        xhrInstance.XHR_REQUEST_IS_HIT_MOCK = true;
        xhrInstance.XHR_REQUEST_MOCK_DATA = hitMockReq;
        // xhrInstance.readyState = xhrInstance.OPENED;
        xhrInstance[PROXY_UNWRITEABLE_PROP_PREFIX + 'readyState'] = xhrInstance.OPENED;
        
    }
}

function matchReqUrl(xhrOpenFnArgs, mockService) {
    const [ method, url ] = xhrOpenFnArgs;

    return method.toLowerCase() === mockService.method.toLowerCase() && url === mockService.url;
}

//因为无法确定上层使用的是responseText还是respons属性，为了保险起见，两个属性都拦截一下

// proxyXhr({
//     //拦截回调
//     onreadystatechange:function(xhr){
//     //   console.log(xhr.responseText)
//     },
//     onload:function(xhr){
//     //   console.log('onload', xhr)
//     },
//     // //拦截方法
//     // open:function(arg,xhr){
//     //   console.log("open called: method:%s,url:%s,async:%s",arg[0],arg[1],arg[2])
//     // },

//     send: function(arg,xhr) {
//     //   console.log('send', xhr)
//     }
// });

