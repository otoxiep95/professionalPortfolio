// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"node_modules/delegate/src/closest.js":[function(require,module,exports) {
var DOCUMENT_NODE_TYPE = 9;

/**
 * A polyfill for Element.matches()
 */
if (typeof Element !== 'undefined' && !Element.prototype.matches) {
    var proto = Element.prototype;

    proto.matches = proto.matchesSelector ||
                    proto.mozMatchesSelector ||
                    proto.msMatchesSelector ||
                    proto.oMatchesSelector ||
                    proto.webkitMatchesSelector;
}

/**
 * Finds the closest parent that matches a selector.
 *
 * @param {Element} element
 * @param {String} selector
 * @return {Function}
 */
function closest (element, selector) {
    while (element && element.nodeType !== DOCUMENT_NODE_TYPE) {
        if (typeof element.matches === 'function' &&
            element.matches(selector)) {
          return element;
        }
        element = element.parentNode;
    }
}

module.exports = closest;

},{}],"node_modules/delegate/src/delegate.js":[function(require,module,exports) {
var closest = require('./closest');

/**
 * Delegates event to a selector.
 *
 * @param {Element} element
 * @param {String} selector
 * @param {String} type
 * @param {Function} callback
 * @param {Boolean} useCapture
 * @return {Object}
 */
function _delegate(element, selector, type, callback, useCapture) {
    var listenerFn = listener.apply(this, arguments);

    element.addEventListener(type, listenerFn, useCapture);

    return {
        destroy: function() {
            element.removeEventListener(type, listenerFn, useCapture);
        }
    }
}

/**
 * Delegates event to a selector.
 *
 * @param {Element|String|Array} [elements]
 * @param {String} selector
 * @param {String} type
 * @param {Function} callback
 * @param {Boolean} useCapture
 * @return {Object}
 */
function delegate(elements, selector, type, callback, useCapture) {
    // Handle the regular Element usage
    if (typeof elements.addEventListener === 'function') {
        return _delegate.apply(null, arguments);
    }

    // Handle Element-less usage, it defaults to global delegation
    if (typeof type === 'function') {
        // Use `document` as the first parameter, then apply arguments
        // This is a short way to .unshift `arguments` without running into deoptimizations
        return _delegate.bind(null, document).apply(null, arguments);
    }

    // Handle Selector-based usage
    if (typeof elements === 'string') {
        elements = document.querySelectorAll(elements);
    }

    // Handle Array-like based usage
    return Array.prototype.map.call(elements, function (element) {
        return _delegate(element, selector, type, callback, useCapture);
    });
}

/**
 * Finds closest match and invokes callback.
 *
 * @param {Element} element
 * @param {String} selector
 * @param {String} type
 * @param {Function} callback
 * @return {Function}
 */
function listener(element, selector, type, callback) {
    return function(e) {
        e.delegateTarget = closest(e.target, selector);

        if (e.delegateTarget) {
            callback.call(element, e);
        }
    }
}

module.exports = delegate;

},{"./closest":"node_modules/delegate/src/closest.js"}],"node_modules/swup/lib/Cache.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Cache = function () {
    function Cache() {
        _classCallCheck(this, Cache);

        this.pages = {};
        this.count = 0;
        this.last = null;
    }

    _createClass(Cache, [{
        key: 'cacheUrl',
        value: function cacheUrl(page, displayCache) {
            this.count++;
            if (page.url in this.pages === false) {
                this.pages[page.url] = page;
            }
            this.last = this.pages[page.url];
            if (displayCache) {
                this.displayCache();
            }
        }
    }, {
        key: 'getPage',
        value: function getPage(url) {
            return this.pages[url];
        }
    }, {
        key: 'displayCache',
        value: function displayCache() {
            console.groupCollapsed('Cache (' + Object.keys(this.pages).length + ')');
            for (var key in this.pages) {
                console.log(this.pages[key]);
            }
            console.groupEnd();
        }
    }, {
        key: 'exists',
        value: function exists(url) {
            if (url in this.pages) return true;
            return false;
        }
    }, {
        key: 'empty',
        value: function empty(showLog) {
            this.pages = {};
            this.count = 0;
            this.last = null;
            if (showLog) {
                console.log('Cache cleared');
            }
        }
    }, {
        key: 'remove',
        value: function remove(url) {
            delete this.pages[url];
        }
    }]);

    return Cache;
}();

exports.default = Cache;
},{}],"node_modules/swup/lib/Link.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Link = function () {
    function Link() {
        _classCallCheck(this, Link);

        this.link = document.createElement("a");
    }

    _createClass(Link, [{
        key: 'setPath',
        value: function setPath(href) {
            this.link.href = href;
        }
    }, {
        key: 'getPath',
        value: function getPath() {
            var path = this.link.pathname;
            if (path[0] != '/') {
                path = '/' + path;
            }
            return path;
        }
    }, {
        key: 'getAddress',
        value: function getAddress() {
            var path = this.link.pathname + this.link.search;
            if (path[0] != '/') {
                path = '/' + path;
            }
            return path;
        }
    }, {
        key: 'getHash',
        value: function getHash() {
            return this.link.hash;
        }
    }]);

    return Link;
}();

exports.default = Link;
},{}],"node_modules/swup/lib/transitionEnd.js":[function(require,module,exports) {
'use strict';

module.exports = function transitionEnd() {
    var el = document.createElement('div');

    var transEndEventNames = {
        WebkitTransition: 'webkitTransitionEnd',
        MozTransition: 'transitionend',
        OTransition: 'oTransitionEnd otransitionend',
        transition: 'transitionend'
    };

    for (var name in transEndEventNames) {
        if (el.style[name] !== undefined) {
            return transEndEventNames[name];
        }
    }

    return false;
};
},{}],"node_modules/swup/lib/modules/request.js":[function(require,module,exports) {
"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

module.exports = function (options) {
    var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    var defaults = {
        url: window.location.pathname + window.location.search,
        method: "GET",
        data: null
    };

    var data = _extends({}, defaults, options);

    var request = new XMLHttpRequest();

    request.onreadystatechange = function () {
        if (request.readyState === 4) {
            if (request.status !== 500) {
                callback(request.responseText, request);
            } else {
                callback(null, request);
            }
        }
    };

    request.open(data.method, data.url, true);
    request.setRequestHeader("X-Requested-With", "swup");
    request.send(data.data);
    return request;
};
},{}],"node_modules/swup/lib/modules/getDataFromHtml.js":[function(require,module,exports) {
'use strict';

module.exports = function (html, request) {
    var _this = this;

    var content = html.replace('<body', '<div id="swupBody"').replace('</body>', '</div>');
    var fakeDom = document.createElement('div');
    fakeDom.innerHTML = content;
    var blocks = [];

    for (var i = 0; i < this.options.elements.length; i++) {
        if (fakeDom.querySelector(this.options.elements[i]) == null) {
            console.warn('Element ' + this.options.elements[i] + ' is not found in cached page.');
            return null;
        } else {
            [].forEach.call(document.body.querySelectorAll(this.options.elements[i]), function (item, index) {
                fakeDom.querySelectorAll(_this.options.elements[i])[index].dataset.swup = blocks.length;
                blocks.push(fakeDom.querySelectorAll(_this.options.elements[i])[index].outerHTML);
            });
        }
    }

    var json = {
        title: fakeDom.querySelector('title').innerText,
        pageClass: fakeDom.querySelector('#swupBody').className,
        originalContent: html,
        blocks: blocks,
        responseURL: request != null ? request.responseURL : window.location.href
    };
    return json;
};
},{}],"node_modules/swup/lib/modules/loadPage.js":[function(require,module,exports) {
'use strict';

var forEach = Array.prototype.forEach;


module.exports = function (data, popstate) {
    var _this = this;

    var finalPage = null;

    // scrolling
    if (this.options.doScrollingRightAway && !this.scrollToElement) {
        this.doScrolling(popstate);
    }

    var animationPromises = [];

    if (!popstate || this.options.animateHistoryBrowsing) {
        // start animation
        this.triggerEvent('animationOutStart');
        document.documentElement.classList.add('is-changing');
        document.documentElement.classList.add('is-leaving');
        document.documentElement.classList.add('is-animating');
        if (popstate) {
            document.documentElement.classList.add('is-popstate');
        }
        document.documentElement.classList.add('to-' + this.classify(data.url));

        // detect animation end
        var animatedElements = document.querySelectorAll(this.options.animationSelector);
        forEach.call(animatedElements, function (element) {
            var promise = new Promise(function (resolve) {
                element.addEventListener(_this.transitionEndEvent, function (event) {
                    if (element == event.target) {
                        resolve();
                    }
                });
            });
            animationPromises.push(promise);
        });

        Promise.all(animationPromises).then(function () {
            _this.triggerEvent('animationOutDone');
        });

        // create pop element with or without anchor
        if (this.scrollToElement != null) {
            var pop = data.url + this.scrollToElement;
        } else {
            var pop = data.url;
        }
        if (!popstate) this.createState(pop);
    } else {
        // proceed without animating
        this.triggerEvent('animationSkipped');
    }

    if (this.cache.exists(data.url)) {
        var xhrPromise = new Promise(function (resolve) {
            resolve();
        });
        this.triggerEvent('pageRetrievedFromCache');
    } else {
        if (!this.preloadPromise || this.preloadPromise.route != data.url) {
            var xhrPromise = new Promise(function (resolve, reject) {
                _this.getPage(data, function (response, request) {
                    if (request.status === 500) {
                        _this.triggerEvent('serverError');
                        reject(data.url);
                        return;
                    } else {
                        // get json data
                        var page = _this.getDataFromHtml(response, request);
                        if (page != null) {
                            page.url = data.url;
                        } else {
                            reject(data.url);
                            return;
                        }
                        // render page
                        _this.cache.cacheUrl(page, _this.options.debugMode);
                        _this.triggerEvent('pageLoaded');
                    }
                    resolve();
                });
            });
        } else {
            var xhrPromise = this.preloadPromise;
        }
    }

    Promise.all(animationPromises.concat([xhrPromise])).then(function () {
        finalPage = _this.cache.getPage(data.url);
        _this.renderPage(finalPage, popstate);
        _this.preloadPromise = null;
    }).catch(function (errorUrl) {
        // rewrite the skipPopStateHandling function to redirect manually when the history.go is processed
        _this.options.skipPopStateHandling = function () {
            window.location = errorUrl;
            return true;
        };

        // go back to the actual page were still at
        window.history.go(-1);
    });
};
},{}],"node_modules/swup/lib/modules/renderPage.js":[function(require,module,exports) {
'use strict';

var _Link = require('../Link');

var _Link2 = _interopRequireDefault(_Link);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var forEach = Array.prototype.forEach;


module.exports = function (page, popstate) {
    var _this = this;

    document.documentElement.classList.remove('is-leaving');

    // replace state in case the url was redirected
    var link = new _Link2.default();
    link.setPath(page.responseURL);

    if (window.location.pathname !== link.getPath()) {
        window.history.replaceState({
            url: link.getPath(),
            random: Math.random(),
            source: "swup"
        }, document.title, link.getPath());
    }

    // only add for non-popstate transitions
    if (!popstate || this.options.animateHistoryBrowsing) {
        document.documentElement.classList.add('is-rendering');
    }

    this.triggerEvent('willReplaceContent');

    // replace blocks
    for (var i = 0; i < page.blocks.length; i++) {
        document.body.querySelector('[data-swup="' + i + '"]').outerHTML = page.blocks[i];
    }

    // set title
    document.title = page.title;

    // handle classes after render
    // remove
    if (this.options.pageClassPrefix !== false) {
        document.body.className.split(' ').forEach(function (className) {
            // empty string for page class
            if (className != "" && className.includes(_this.options.pageClassPrefix)) {
                document.body.classList.remove(className);
            }
        });
    }
    // add
    if (page.pageClass != "") {
        page.pageClass.split(' ').forEach(function (className) {
            if (className != "" && className.includes(_this.options.pageClassPrefix)) {
                document.body.classList.add(className);
            }
        });
    }

    this.triggerEvent('contentReplaced');
    this.triggerEvent('pageView');
    if (!this.options.cache) {
        this.cache.empty(this.options.debugMode);
    }
    setTimeout(function () {
        if (!popstate || _this.options.animateHistoryBrowsing) {
            _this.triggerEvent('animationInStart');
            document.documentElement.classList.remove('is-animating');
        }
    }, 10);

    // scrolling
    if (!this.options.doScrollingRightAway || this.scrollToElement) {
        this.doScrolling(popstate);
    }

    // detect animation end
    var animatedElements = document.querySelectorAll(this.options.animationSelector);
    var promises = [];
    forEach.call(animatedElements, function (element) {
        var promise = new Promise(function (resolve) {
            element.addEventListener(_this.transitionEndEvent, function (event) {
                if (element == event.target) {
                    resolve();
                }
            });
        });
        promises.push(promise);
    });

    //preload pages if possible
    this.preloadPages();

    if (!popstate || this.options.animateHistoryBrowsing) {
        Promise.all(promises).then(function () {
            _this.triggerEvent('animationInDone');
            // remove "to-{page}" classes
            document.documentElement.className.split(' ').forEach(function (classItem) {
                if (new RegExp("^to-").test(classItem) || classItem === "is-changing" || classItem === "is-rendering" || classItem === "is-popstate") {
                    document.documentElement.classList.remove(classItem);
                }
            });
        });
    }

    // update current url
    this.getUrl();
    // reset scroll-to element
    this.scrollToElement = null;
};
},{"../Link":"node_modules/swup/lib/Link.js"}],"node_modules/swup/lib/modules/goBack.js":[function(require,module,exports) {
'use strict';

module.exports = function (page, popstate) {
    setTimeout(function () {
        document.body.classList.remove('is-changing');
        history.back();
    }, 100);
};
},{}],"node_modules/swup/lib/modules/createState.js":[function(require,module,exports) {
"use strict";

module.exports = function (url) {
    window.history.pushState({
        url: url || window.location.href.split(window.location.hostname)[1],
        random: Math.random(),
        source: "swup"
    }, document.getElementsByTagName('title')[0].innerText, url || window.location.href.split(window.location.hostname)[1]);
};
},{}],"node_modules/swup/lib/modules/triggerEvent.js":[function(require,module,exports) {
'use strict';

module.exports = function (eventName) {
    if (this.options.debugMode) {
        console.log('%cswup:' + '%c' + eventName, 'color: #343434', 'color: #009ACD');
    }
    var event = new CustomEvent('swup:' + eventName, { detail: eventName });
    document.dispatchEvent(event);
};
},{}],"node_modules/swup/lib/modules/getUrl.js":[function(require,module,exports) {
"use strict";

module.exports = function () {
    this.currentUrl = window.location.pathname + window.location.search;
};
},{}],"node_modules/swup/lib/modules/scrollTo.js":[function(require,module,exports) {
'use strict';

module.exports = function (element, to) {
    var _this = this;

    var animatedScroll = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.options.animateScroll;

    var friction = 1 - this.options.scrollFriction;
    var acceleration = this.options.scrollAcceleration;

    var positionY = 0;
    var velocityY = 0;
    var targetPositionY = 0;
    var targetPositionYWithOffset = 0;
    var direction = 0;

    var raf = null;

    function getScrollTop() {
        return document.body.scrollTop || document.documentElement.scrollTop;
    }

    var animate = function animate() {
        var distance = update();
        render();

        if (direction === 1 && targetPositionY > positionY || direction === -1 && targetPositionY < positionY) {
            raf = requestAnimationFrame(animate);
        } else {
            window.scrollTo(0, targetPositionY);
            _this.triggerEvent('scrollDone');
        }
    };

    function update() {
        var distance = targetPositionYWithOffset - positionY;
        var attraction = distance * acceleration;

        applyForce(attraction);

        velocityY *= friction;
        positionY += velocityY;

        return distance;
    }

    var applyForce = function applyForce(force) {
        velocityY += force;
    };

    var render = function render() {
        window.scrollTo(0, positionY);
    };

    window.addEventListener('mousewheel', function (event) {
        if (raf) {
            cancelAnimationFrame(raf);
            raf = null;
        }
    }, {
        passive: true
    });

    var scrollTo = function scrollTo(offset, callback) {
        positionY = getScrollTop();
        direction = positionY > offset ? -1 : 1;
        targetPositionYWithOffset = offset + direction;
        targetPositionY = offset;
        velocityY = 0;
        if (positionY != targetPositionY) {
            animate();
        } else {
            _this.triggerEvent('scrollDone');
        }
    };

    this.triggerEvent('scrollStart');
    if (animatedScroll == 0) {
        window.scrollTo(0, to);
        this.triggerEvent('scrollDone');
    } else {
        scrollTo(to);
    }
};
},{}],"node_modules/swup/lib/modules/classify.js":[function(require,module,exports) {
'use strict';

module.exports = function (text) {
    var output = text.toString().toLowerCase().replace(/\s+/g, '-') // Replace spaces with -
    .replace(/\//g, '-') // Replace / with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text
    if (output[0] == "/") output = output.splice(1);
    if (output == '') output = 'homepage';
    return output;
};
},{}],"node_modules/swup/lib/modules/doScrolling.js":[function(require,module,exports) {
"use strict";

module.exports = function (popstate) {
    if (this.options.scroll && (!popstate || this.options.animateHistoryBrowsing)) {
        if (this.scrollToElement != null) {
            var element = document.querySelector(this.scrollToElement);
            if (element != null) {
                var top = element.getBoundingClientRect().top + window.pageYOffset;
                this.scrollTo(document.body, top);
            } else {
                console.warn("Element for offset not found (" + this.scrollToElement + ")");
            }
            this.scrollToElement = null;
        } else {
            this.scrollTo(document.body, 0);
        }
    }
};
},{}],"node_modules/swup/lib/modules/markSwupElements.js":[function(require,module,exports) {
"use strict";

module.exports = function (element) {
    var _this = this;

    var blocks = 0;

    for (var i = 0; i < this.options.elements.length; i++) {
        if (element.querySelector(this.options.elements[i]) == null) {
            console.warn("Element " + this.options.elements[i] + " is not in current page.");
        } else {
            [].forEach.call(document.body.querySelectorAll(this.options.elements[i]), function (item, index) {
                element.querySelectorAll(_this.options.elements[i])[index].dataset.swup = blocks;
                blocks++;
            });
        }
    }
};
},{}],"node_modules/swup/lib/modules/updateTransition.js":[function(require,module,exports) {
"use strict";

module.exports = function (from, to, custom) {

    // homepage case
    if (from == "/") {
        from = "/homepage";
    }
    if (to == "/") {
        to = "/homepage";
    }

    // transition routes
    this.transition = {
        from: from.replace('/', ''),
        to: to.replace('/', '')
    };

    if (custom) {
        this.transition.custom = custom;
    }
};
},{}],"node_modules/swup/lib/modules/preloadPages.js":[function(require,module,exports) {
'use strict';

var _Link = require('../Link');

var _Link2 = _interopRequireDefault(_Link);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function () {
    var _this = this;

    if (this.options.preload) {
        var preload = function preload(pathname) {
            var link = new _Link2.default();
            link.setPath(pathname);
            if (link.getAddress() != _this.currentUrl && !_this.cache.exists(link.getAddress()) && _this.preloadPromise == null) {
                _this.getPage({ url: link.getAddress() }, function (response, request) {
                    if (request.status === 500) {
                        _this.triggerEvent('serverError');
                        return;
                    } else {
                        // get json data
                        var page = _this.getDataFromHtml(response, request);
                        if (page != null) {
                            page.url = link.getAddress();
                            _this.cache.cacheUrl(page, _this.options.debugMode);
                            _this.triggerEvent('pagePreloaded');
                        }
                    }
                });
            }
        };

        document.querySelectorAll('[data-swup-preload]').forEach(function (element) {
            preload(element.href);
        });
    }
};
},{"../Link":"node_modules/swup/lib/Link.js"}],"node_modules/swup/lib/modules/usePlugin.js":[function(require,module,exports) {
'use strict';

module.exports = function (plugin, options) {
    var _this = this;

    options = Object.assign({}, plugin.options, options);

    plugin.options = options;

    var getCurrentPageHtml = function getCurrentPageHtml() {
        var page = _this.cache.getPage(window.location.pathname + window.location.search);
        var html = document.createElement('html');
        html.innerHTML = page.originalContent;
        return html;
    };

    this.plugins.push(plugin);
    plugin.exec(options, this, getCurrentPageHtml);
    return this.plugins;
};
},{}],"node_modules/swup/lib/modules/log.js":[function(require,module,exports) {
'use strict';

module.exports = function (str) {
    if (this.options.debugMode) {
        console.log(str + '%c', 'color: #009ACD');
    }
};
},{}],"node_modules/swup/lib/index.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

// helpers


// modules


var _delegate = require('delegate');

var _delegate2 = _interopRequireDefault(_delegate);

var _Cache = require('./Cache');

var _Cache2 = _interopRequireDefault(_Cache);

var _Link = require('./Link');

var _Link2 = _interopRequireDefault(_Link);

var _transitionEnd = require('./transitionEnd');

var _transitionEnd2 = _interopRequireDefault(_transitionEnd);

var _request = require('./modules/request');

var _request2 = _interopRequireDefault(_request);

var _getDataFromHtml = require('./modules/getDataFromHtml');

var _getDataFromHtml2 = _interopRequireDefault(_getDataFromHtml);

var _loadPage = require('./modules/loadPage');

var _loadPage2 = _interopRequireDefault(_loadPage);

var _renderPage = require('./modules/renderPage');

var _renderPage2 = _interopRequireDefault(_renderPage);

var _goBack = require('./modules/goBack');

var _goBack2 = _interopRequireDefault(_goBack);

var _createState = require('./modules/createState');

var _createState2 = _interopRequireDefault(_createState);

var _triggerEvent = require('./modules/triggerEvent');

var _triggerEvent2 = _interopRequireDefault(_triggerEvent);

var _getUrl = require('./modules/getUrl');

var _getUrl2 = _interopRequireDefault(_getUrl);

var _scrollTo = require('./modules/scrollTo');

var _scrollTo2 = _interopRequireDefault(_scrollTo);

var _classify = require('./modules/classify');

var _classify2 = _interopRequireDefault(_classify);

var _doScrolling = require('./modules/doScrolling');

var _doScrolling2 = _interopRequireDefault(_doScrolling);

var _markSwupElements = require('./modules/markSwupElements');

var _markSwupElements2 = _interopRequireDefault(_markSwupElements);

var _updateTransition = require('./modules/updateTransition');

var _updateTransition2 = _interopRequireDefault(_updateTransition);

var _preloadPages = require('./modules/preloadPages');

var _preloadPages2 = _interopRequireDefault(_preloadPages);

var _usePlugin = require('./modules/usePlugin');

var _usePlugin2 = _interopRequireDefault(_usePlugin);

var _log = require('./modules/log');

var _log2 = _interopRequireDefault(_log);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Swup = function () {
    function Swup(setOptions) {
        _classCallCheck(this, Swup);

        // default options
        var defaults = {
            cache: true,
            animationSelector: '[class*="transition-"]',
            elements: ['#swup'],
            pageClassPrefix: '',
            debugMode: false,
            scroll: true,

            doScrollingRightAway: false,
            animateScroll: true,
            scrollFriction: .3,
            scrollAcceleration: .04,

            preload: true,
            support: true,
            plugins: [],

            skipPopStateHandling: function skipPopStateHandling(event) {
                if (event.state && event.state.source == "swup") {
                    return false;
                }
                return true;
            },
            animateHistoryBrowsing: false,

            LINK_SELECTOR: 'a[href^="' + window.location.origin + '"]:not([data-no-swup]), a[href^="/"]:not([data-no-swup]), a[href^="#"]:not([data-no-swup])',
            FORM_SELECTOR: 'form[data-swup-form]'

            /**
             * current transition object
             */
        };this.transition = {};

        var options = _extends({}, defaults, setOptions);

        /**
         * helper variables
         */
        // mobile detection variable
        this.mobile = false;
        // id of element to scroll to after render
        this.scrollToElement = null;
        // promise used for preload, so no new loading of the same page starts while page is loading
        this.preloadPromise = null;
        // save options
        this.options = options;
        // plugins array
        this.plugins = [];

        /**
         * make modules accessible in instance
         */
        this.getUrl = _getUrl2.default;
        this.cache = new _Cache2.default();
        this.link = new _Link2.default();
        this.transitionEndEvent = (0, _transitionEnd2.default)();
        this.getDataFromHtml = _getDataFromHtml2.default;
        this.getPage = _request2.default;
        this.scrollTo = _scrollTo2.default;
        this.loadPage = _loadPage2.default;
        this.renderPage = _renderPage2.default;
        this.goBack = _goBack2.default;
        this.createState = _createState2.default;
        this.triggerEvent = _triggerEvent2.default;
        this.classify = _classify2.default;
        this.doScrolling = _doScrolling2.default;
        this.markSwupElements = _markSwupElements2.default;
        this.updateTransition = _updateTransition2.default;
        this.preloadPages = _preloadPages2.default;
        this.usePlugin = _usePlugin2.default;
        this.log = _log2.default;
        this.enable = this.enable;
        this.destroy = this.destroy;

        /**
         * detect mobile devices
         */
        if (window.innerWidth <= 767) {
            this.mobile = true;
        }

        // attach instance to window in debug mode
        if (this.options.debugMode) {
            window.swup = this;
        }

        this.getUrl();
        this.enable();
    }

    _createClass(Swup, [{
        key: 'enable',
        value: function enable() {
            var _this = this;

            /**
             * support check
             */
            if (this.options.support) {
                // check pushState support
                if (!('pushState' in window.history)) {
                    console.warn('pushState is not supported');
                    return;
                }
                // check transitionEnd support
                if ((0, _transitionEnd2.default)()) {
                    this.transitionEndEvent = (0, _transitionEnd2.default)();
                } else {
                    console.warn('transitionEnd detection is not supported');
                    return;
                }
                // check Promise support
                if (typeof Promise === "undefined" || Promise.toString().indexOf("[native code]") === -1) {
                    console.warn('Promise is not supported');
                    return;
                }
            }

            // variable to keep event listeners from "delegate"
            this.delegatedListeners = {};

            /**
             * link click handler
             */
            this.delegatedListeners.click = (0, _delegate2.default)(document, this.options.LINK_SELECTOR, 'click', this.linkClickHandler.bind(this));

            /**
             * link mouseover handler (preload)
             */
            this.delegatedListeners.mouseover = (0, _delegate2.default)(document.body, this.options.LINK_SELECTOR, 'mouseover', this.linkMouseoverHandler.bind(this));

            /**
             * form submit handler
             */
            this.delegatedListeners.formSubmit = (0, _delegate2.default)(document, this.options.FORM_SELECTOR, 'submit', this.formSubmitHandler.bind(this));

            /**
             * popstate handler
             */
            window.addEventListener('popstate', this.popStateHandler.bind(this));

            /**
             * initial save to cache
             */
            var page = this.getDataFromHtml(document.documentElement.outerHTML);
            page.url = this.currentUrl;
            if (this.options.cache) {
                this.cache.cacheUrl(page, this.options.debugMode);
            }

            /**
             * mark swup blocks in html
             */
            this.markSwupElements(document.documentElement);

            /**
             * enable plugins from options
             */
            this.options.plugins.forEach(function (item) {
                return _this.usePlugin(item);
            });

            /**
             * modify initial history record
             */
            window.history.replaceState(Object.assign({}, window.history.state, {
                url: window.location.href,
                random: Math.random(),
                source: "swup"
            }), document.title, window.location.href);

            /**
             * Disable browser scroll control on popstates when animateHistoryBrowsing option is enabled
             */
            if (this.options.animateHistoryBrowsing) {
                window.history.scrollRestoration = "manual";
            }

            /**
             * trigger enabled event
             */
            this.triggerEvent('enabled');
            document.documentElement.classList.add('swup-enabled');

            /**
             * trigger page view event
             */
            this.triggerEvent('pageView');

            /**
             * preload pages if possible
             */
            this.preloadPages();
        }
    }, {
        key: 'destroy',
        value: function destroy() {
            // remove delegated listeners
            this.delegatedListeners.click.destroy();
            this.delegatedListeners.mouseover.destroy();

            // remove popstate listener
            window.removeEventListener('popstate', this.popStateHandler.bind(this));

            // empty cache
            this.cache.empty();

            // remove swup data atributes from blocks
            document.querySelectorAll('[data-swup]').forEach(function (element) {
                delete element.dataset.swup;
            });

            this.triggerEvent('disabled');
            document.documentElement.classList.remove('swup-enabled');
        }
    }, {
        key: 'linkClickHandler',
        value: function linkClickHandler(event) {
            // no control key pressed
            if (!event.metaKey) {
                this.triggerEvent('clickLink');
                var link = new _Link2.default();
                event.preventDefault();
                link.setPath(event.delegateTarget.href);
                if (link.getAddress() == this.currentUrl || link.getAddress() == '') {
                    if (link.getHash() != '') {
                        this.triggerEvent('samePageWithHash');
                        var element = document.querySelector(link.getHash());
                        if (element != null) {
                            if (this.options.scroll) {
                                var top = element.getBoundingClientRect().top + window.pageYOffset;
                                this.scrollTo(document.body, top);
                            }
                            history.replaceState({
                                url: link.getAddress() + link.getHash(),
                                random: Math.random(),
                                source: "swup"
                            }, document.title, link.getAddress() + link.getHash());
                        } else {
                            console.warn('Element for offset not found (' + link.getHash() + ')');
                        }
                    } else {
                        this.triggerEvent('samePage');
                        if (this.options.scroll) {
                            this.scrollTo(document.body, 0, 1);
                        }
                    }
                } else {
                    if (link.getHash() != '') {
                        this.scrollToElement = link.getHash();
                    }
                    // custom class fro dynamic pages
                    var swupClass = event.delegateTarget.dataset.swupClass;
                    if (swupClass != null) {
                        this.updateTransition(window.location.pathname, link.getAddress(), event.delegateTarget.dataset.swupClass);
                        document.documentElement.classList.add('to-' + swupClass);
                    } else {
                        this.updateTransition(window.location.pathname, link.getAddress());
                    }
                    this.loadPage({ url: link.getAddress() }, false);
                }
            } else {
                this.triggerEvent('openPageInNewTab');
            }
        }
    }, {
        key: 'linkMouseoverHandler',
        value: function linkMouseoverHandler(event) {
            var _this2 = this;

            this.triggerEvent('hoverLink');
            if (this.options.preload) {
                var link = new _Link2.default();
                link.setPath(event.delegateTarget.href);
                if (link.getAddress() != this.currentUrl && !this.cache.exists(link.getAddress()) && this.preloadPromise == null) {
                    this.preloadPromise = new Promise(function (resolve, reject) {
                        _this2.getPage({ url: link.getAddress() }, function (response, request) {
                            if (request.status === 500) {
                                _this2.triggerEvent('serverError');
                                reject(link.getAddress());
                                return;
                            } else {
                                // get json data
                                var page = _this2.getDataFromHtml(response, request);
                                if (page != null) {
                                    page.url = link.getAddress();
                                    _this2.cache.cacheUrl(page, _this2.options.debugMode);
                                    _this2.triggerEvent('pagePreloaded');
                                } else {
                                    reject(link.getAddress());
                                    return;
                                }
                            }
                            resolve();
                            _this2.preloadPromise = null;
                        });
                    });
                    this.preloadPromise.route = link.getAddress();
                }
            }
        }
    }, {
        key: 'formSubmitHandler',
        value: function formSubmitHandler(event) {
            // no control key pressed
            if (!event.metaKey) {
                this.triggerEvent('submitForm');
                event.preventDefault();
                var form = event.target;
                var formData = new FormData(form);

                var link = new _Link2.default();
                link.setPath(form.action);

                if (link.getHash() != '') {
                    this.scrollToElement = link.getHash();
                }

                if (form.method.toLowerCase() != "get") {
                    // remove page from cache
                    this.cache.remove(link.getAddress());

                    // send data
                    this.loadPage({
                        url: link.getAddress(),
                        method: form.method,
                        data: formData
                    });
                } else {
                    // create base url
                    var url = link.getAddress() || window.location.href;
                    var inputs = form.querySelectorAll('input');
                    if (url.indexOf('?') == -1) {
                        url += "?";
                    } else {
                        url += "&";
                    }

                    // add form data to url
                    inputs.forEach(function (input) {
                        if (input.type == "checkbox" || input.type == "radio") {
                            if (input.checked) {
                                url += encodeURIComponent(input.name) + "=" + encodeURIComponent(input.value) + "&";
                            }
                        } else {
                            url += encodeURIComponent(input.name) + "=" + encodeURIComponent(input.value) + "&";
                        }
                    });

                    // remove last "&"
                    url = url.slice(0, -1);

                    // remove page from cache
                    this.cache.remove(url);

                    // send data
                    this.loadPage({
                        url: url
                    });
                }
            } else {
                this.triggerEvent('openFormSubmitInNewTab');
            }
        }
    }, {
        key: 'popStateHandler',
        value: function popStateHandler(event) {
            var link = new _Link2.default();
            if (this.options.skipPopStateHandling(event)) return;
            link.setPath(event.state ? event.state.url : window.location.pathname);
            if (link.getHash() != '') {
                this.scrollToElement = link.getHash();
            } else {
                event.preventDefault();
            }
            this.triggerEvent('popState');
            this.loadPage({ url: link.getAddress() }, event);
        }
    }]);

    return Swup;
}();

exports.default = Swup;
},{"delegate":"node_modules/delegate/src/delegate.js","./Cache":"node_modules/swup/lib/Cache.js","./Link":"node_modules/swup/lib/Link.js","./transitionEnd":"node_modules/swup/lib/transitionEnd.js","./modules/request":"node_modules/swup/lib/modules/request.js","./modules/getDataFromHtml":"node_modules/swup/lib/modules/getDataFromHtml.js","./modules/loadPage":"node_modules/swup/lib/modules/loadPage.js","./modules/renderPage":"node_modules/swup/lib/modules/renderPage.js","./modules/goBack":"node_modules/swup/lib/modules/goBack.js","./modules/createState":"node_modules/swup/lib/modules/createState.js","./modules/triggerEvent":"node_modules/swup/lib/modules/triggerEvent.js","./modules/getUrl":"node_modules/swup/lib/modules/getUrl.js","./modules/scrollTo":"node_modules/swup/lib/modules/scrollTo.js","./modules/classify":"node_modules/swup/lib/modules/classify.js","./modules/doScrolling":"node_modules/swup/lib/modules/doScrolling.js","./modules/markSwupElements":"node_modules/swup/lib/modules/markSwupElements.js","./modules/updateTransition":"node_modules/swup/lib/modules/updateTransition.js","./modules/preloadPages":"node_modules/swup/lib/modules/preloadPages.js","./modules/usePlugin":"node_modules/swup/lib/modules/usePlugin.js","./modules/log":"node_modules/swup/lib/modules/log.js"}],"node_modules/swupjs/lib/modules/loadPage.js":[function(require,module,exports) {
'use strict';

module.exports = function (data, popstate) {
    var _this = this;

    var finalPage = null;

    // scrolling
    if (this.options.doScrollingRightAway && !this.scrollToElement) {
        this.doScrolling(popstate);
    }

    var animationPromises = [];

    if (!popstate || this.options.animateHistoryBrowsing) {
        // start animation
        this.triggerEvent('animationOutStart');
        document.documentElement.classList.add('is-changing');
        document.documentElement.classList.add('is-leaving');
        if (popstate) {
            document.documentElement.classList.add('is-popstate');
        }
        document.documentElement.classList.add('to-' + this.classify(data.url));

        // animation promise
        var animationPromise = this.createAnimationPromise(this.getAnimation(this.transition, this.animations, 'out'));
        animationPromises.push(animationPromise);

        Promise.all(animationPromises).then(function () {
            _this.triggerEvent('animationOutDone');
        });

        // create pop element with or without anchor
        if (this.scrollToElement != null) {
            var pop = data.url + this.scrollToElement;
        } else {
            var pop = data.url;
        }
        if (!popstate) this.createState(pop);
    } else {
        // proceed without animating
        this.triggerEvent('animationSkipped');
    }

    if (this.cache.exists(data.url)) {
        var xhrPromise = new Promise(function (resolve) {
            resolve();
        });
        this.triggerEvent('pageRetrievedFromCache');
    } else {
        if (!this.preloadPromise || this.preloadPromise.route != data.url) {
            var xhrPromise = new Promise(function (resolve) {
                _this.getPage(data, function (response, request) {
                    if (request.status === 500) {
                        _this.triggerEvent('serverError');
                        reject(data.url);
                        return;
                    } else {
                        // get json data
                        var page = _this.getDataFromHtml(response, request);
                        if (page != null) {
                            page.url = data.url;
                        } else {
                            reject(data.url);
                            return;
                        }
                        // render page
                        _this.cache.cacheUrl(page, _this.options.debugMode);
                        _this.triggerEvent('pageLoaded');
                    }
                    resolve();
                });
            });
        } else {
            var xhrPromise = this.preloadPromise;
        }
    }

    Promise.all(animationPromises.concat([xhrPromise])).then(function () {
        finalPage = _this.cache.getPage(data.url);
        _this.renderPage(finalPage, popstate);
        _this.preloadPromise = null;
    }).catch(function (errorUrl) {
        // rewrite the skipPopStateHandling function to redirect manually when the history.go is processed
        _this.options.skipPopStateHandling = function () {
            window.location = errorUrl;
            return true;
        };

        // go back to the actual page were still at
        window.history.go(-1);
    });
};
},{}],"node_modules/swupjs/lib/modules/renderPage.js":[function(require,module,exports) {
'use strict';

var _Link = require('swup/lib/Link');

var _Link2 = _interopRequireDefault(_Link);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var forEach = Array.prototype.forEach;


module.exports = function (page, popstate) {
    var _this = this;

    document.documentElement.classList.remove('is-leaving');

    // replace state in case the url was redirected
    var link = new _Link2.default();
    link.setPath(page.responseURL);

    if (window.location.pathname !== link.getPath()) {
        window.history.replaceState({
            url: link.getPath(),
            random: Math.random(),
            source: "swup"
        }, document.title, link.getPath());
    }

    if (!popstate || this.options.animateHistoryBrowsing) {
        document.documentElement.classList.add('is-rendering');
    }

    this.triggerEvent('willReplaceContent');

    // replace blocks
    for (var i = 0; i < page.blocks.length; i++) {
        document.body.querySelector('[data-swup="' + i + '"]').outerHTML = page.blocks[i];
    }

    // set title
    document.title = page.title;

    // handle classes after render
    // remove
    if (this.options.pageClassPrefix !== false) {
        document.body.className.split(' ').forEach(function (className) {
            // empty string for page class
            if (className != "" && className.includes(_this.options.pageClassPrefix)) {
                document.body.classList.remove(className);
            }
        });
    }

    // add
    if (page.pageClass != "") {
        page.pageClass.split(' ').forEach(function (className) {
            if (className != "" && className.includes(_this.options.pageClassPrefix)) {
                document.body.classList.add(className);
            }
        });
    }

    this.triggerEvent('contentReplaced');
    this.triggerEvent('pageView');

    if (!this.options.cache) {
        this.cache.empty(this.options.debugMode);
    }

    // scrolling
    if (!this.options.doScrollingRightAway || this.scrollToElement) {
        this.doScrolling(popstate);
    }

    // detect animation end
    var animationPromises = [];
    if (!popstate || this.options.animateHistoryBrowsing) {
        this.triggerEvent('animationInStart');
        var animationPromise = this.createAnimationPromise(this.getAnimation(this.transition, this.animations, 'in'));
        animationPromises.push(animationPromise);
    }

    //preload pages if possible
    this.preloadPages();

    if (!popstate || this.options.animateHistoryBrowsing) {
        Promise.all(animationPromises).then(function () {
            _this.triggerEvent('animationInDone');
            // remove "to-{page}" classes
            document.documentElement.className.split(' ').forEach(function (classItem) {
                if (new RegExp("^to-").test(classItem) || classItem === "is-changing" || classItem === "is-rendering" || classItem === "is-popstate") {
                    document.documentElement.classList.remove(classItem);
                }
            });
        });
    }

    // update current url
    this.getUrl();
    // reset scroll-to element
    this.scrollToElement = null;
};
},{"swup/lib/Link":"node_modules/swup/lib/Link.js"}],"node_modules/swupjs/lib/modules/getAnimation.js":[function(require,module,exports) {
'use strict';

module.exports = function (transition, animations, type) {

    var animation = null;
    var animationName = null;
    var topRating = 0;

    Object.keys(animations).forEach(function (item) {
        var rating = 0;
        if (item.includes('>')) {
            var route = item.split('>');
            var from = route[0];
            var to = route[1];

            // TO equals to TO
            if (to == transition.to || to == "*") {
                rating++;
            }

            // equals to CUSTOM animation
            if (to == transition.custom) {
                rating = rating + 2;
            }

            // FROM equals or is ANY
            if (from == transition.from || from == "*") {
                rating++;
            }
        }

        // set new final animation
        if (rating > topRating) {
            topRating = rating;
            animationName = item;
            animation = animations[item];
        }
    });

    if (animation == null || topRating == 1) {
        animation = animations['*'];
        animationName = '*';
    }
    this.triggerEvent('pageAnimation:' + animationName);

    return animation[type];
};
},{}],"node_modules/swupjs/lib/modules/createAnimationPromise.js":[function(require,module,exports) {
"use strict";

module.exports = function (fn) {
    return new Promise(function (resolve) {
        fn(resolve);
    });
};
},{}],"node_modules/swupjs/lib/index.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _swup = require('swup');

var _swup2 = _interopRequireDefault(_swup);

var _loadPage = require('./modules/loadPage');

var _loadPage2 = _interopRequireDefault(_loadPage);

var _renderPage = require('./modules/renderPage');

var _renderPage2 = _interopRequireDefault(_renderPage);

var _getAnimation = require('./modules/getAnimation');

var _getAnimation2 = _interopRequireDefault(_getAnimation);

var _createAnimationPromise = require('./modules/createAnimationPromise');

var _createAnimationPromise2 = _interopRequireDefault(_createAnimationPromise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// modules


var Swupjs = function (_Swup) {
    _inherits(Swupjs, _Swup);

    function Swupjs(setOptions) {
        _classCallCheck(this, Swupjs);

        var defaults = {
            animations: {
                '*': {
                    out: function out(next) {
                        next();
                    },
                    in: function _in(next) {
                        next();
                    }
                }
            }
        };

        var options = _extends({}, defaults, setOptions);

        var _this = _possibleConstructorReturn(this, (Swupjs.__proto__ || Object.getPrototypeOf(Swupjs)).call(this, options));

        _this.loadPage = _loadPage2.default;
        _this.renderPage = _renderPage2.default;
        _this.getAnimation = _getAnimation2.default;
        _this.createAnimationPromise = _createAnimationPromise2.default;


        _this.animations = options.animations;
        return _this;
    }

    /**
     * make modules accessible in instance
     */


    return Swupjs;
}(_swup2.default);

exports.default = Swupjs;
},{"swup":"node_modules/swup/lib/index.js","./modules/loadPage":"node_modules/swupjs/lib/modules/loadPage.js","./modules/renderPage":"node_modules/swupjs/lib/modules/renderPage.js","./modules/getAnimation":"node_modules/swupjs/lib/modules/getAnimation.js","./modules/createAnimationPromise":"node_modules/swupjs/lib/modules/createAnimationPromise.js"}],"js/pageTransition.js":[function(require,module,exports) {
"use strict";

var _swupjs = _interopRequireDefault(require("swupjs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var swupjs = new _swupjs.default(options);
var options = {
  animations: {
    "*": {
      in: function _in(next) {
        document.querySelector("#swup").style.opacity = 1;
        anime({
          targets: "#swup",
          opacity: 0,
          duration: 10000,
          complete: next
        });
      },
      out: function out(next) {
        document.querySelector("#swup").style.opacity = 1;
        anime({
          targets: "#swup",
          opacity: 0,
          duration: 10000,
          complete: next
        });
      }
    }
  }
};
},{"swupjs":"node_modules/swupjs/lib/index.js"}],"../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "50049" + '/');

  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();
      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/pageTransition.js"], null)
//# sourceMappingURL=/pageTransition.4fcc647c.map