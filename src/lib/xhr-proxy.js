let originXMLHttpRequest;
let proxyOpt;
const originXhrInstance = new XMLHttpRequest();

const PROXY_UNWRITEABLE_PROP_PREFIX = '_proxy_';
const PROPERTY_SETTER_KEY = 'setter';
const PROPERTY_GETTER_KEY = 'getter';


const proxyXhr = (opt) => {
    proxyOpt = opt;

    // if xhr is already proxyed by proxyXhr function, originXMLHttpRequest is origin function but XMLhttpRequest not
    originXMLHttpRequest = originXMLHttpRequest || XMLHttpRequest;

    // proxy XMLHttpRequest constructor
    XMLHttpRequest = function() {
        // keep instances for diffent requests
        // originXhrInstance = new originXMLHttpRequest();
    };

    Object.keys(originXMLHttpRequest.prototype).forEach(attr => {
        let type;

        try {
            // get some attr may thorw exception which like: XMLHttpRequest.prototype.onreadystatechange
            // Uncaught TypeError: Illegal invocation at XMLHttpRequest.invokeGetter
            type = typeof originXMLHttpRequest.prototype[attr];
        } catch(err) {}

        // prototype of xhr:
        //      1. function:
        //          e.g: send
        //      2. not function:
        //          a. eventHandler attr which will be defined by developer
        //              e.g: onreadystatechange
        //          b. props
        //              e.g: timeout
        if (type === 'function') {
            XMLHttpRequest.prototype[attr] = proxyFunction(attr);
        } else {
            Object.defineProperty(XMLHttpRequest.prototype, attr, {
                enumerable: true,
                configurable: true,
                get: proxyGetter(attr),
                set: proxySetter(attr)
            });
        }
    });
};

// proxy function of XMLHttpRequest prototype
const proxyFunction = function (functionOnXhrPrototype) {
    return function (...args) {
        // if the function which passed in config return true, request will be intercepted and end the rest of logic
        // if the function return false or has not a return value, the request will be send by the origin xhr instance
        if (proxyOpt[functionOnXhrPrototype] && proxyOpt[functionOnXhrPrototype].call(this, args, originXhrInstance)){
            return;
        }

        return originXhrInstance[functionOnXhrPrototype].apply(originXhrInstance, args);
    }
};

// mainly for attr which is not writeable like: responseText
// so return the proxy value which can be edit instead the origin value
const proxyGetter = (propOnXhrPrototype) => {
    return function() {
        
        let proxyUnwriteableProp = PROXY_UNWRITEABLE_PROP_PREFIX + propOnXhrPrototype;
        
        let value = this.hasOwnProperty(proxyUnwriteableProp) ? this[proxyUnwriteableProp] : originXhrInstance[propOnXhrPrototype];
        
        let xhrPropGetter = (proxyOpt[propOnXhrPrototype] || {})[PROPERTY_GETTER_KEY];

        return xhrPropGetter && xhrPropGetter(value, originXhrInstance) || value;
    };
};

const proxySetter = (propOnXhrPrototype) => {
    return function(bussinessXhrPropValue) {
        // value of 'this': XMLHttpRequest instance which create in bussiness logic
        let xhrInstance = originXhrInstance;
        let propHandler = proxyOpt[propOnXhrPrototype];

        if (typeof propHandler === 'function') {
            // proxy eventHandler function which like 'onload'
            xhrInstance[propOnXhrPrototype] = (...args) => {
                // if the function which passed in config return true, request will be intercepted and end the rest of logic
                // if the function return false or has not a return value, the request will be send by the origin xhr instance
                propHandler(this) || bussinessXhrPropValue && bussinessXhrPropValue.apply(xhrInstance, args);
            };
        } else {
            // proxy property which like 'timeout' 
            // if no propHandler means has not set any logic in the intercepter hook
            // In case of no propHandler, no xhrPropSetter and no return value of xhrPropSetter will both do nothing
            let xhrPropSetter = (propHandler || {})[PROPERTY_SETTER_KEY];
            
            let bussinessXhrPropValue = xhrPropSetter && xhrPropSetter(bussinessXhrPropValue, xhrInstance) || bussinessXhrPropValue;

            try {
                xhrInstance[propOnXhrPrototype] = bussinessXhrPropValue;
            } catch(e) {
                // proxy the unwriteable prop with another value
                xhrInstance[PROXY_UNWRITEABLE_PROP_PREFIX + propOnXhrPrototype] = bussinessXhrPropValue;
            }
        }
    }
};

const unloadInspector = () => {
    XMLHttpRequest = originXMLHttpRequest || XMLHttpRequest;

    xhrInstance = new XMLHttpRequest();
};

export {
    proxyXhr,
    unloadProxy
};
