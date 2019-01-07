import { proxyXhr } from '../lib/xhr-proxy';

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