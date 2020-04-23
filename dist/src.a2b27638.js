// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
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

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
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
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"src/main.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"node_modules/parcel-bundler/src/builtins/css-loader.js"}],"src/navigation.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  cities: [{
    section: "cupertino",
    label: "Cupertino",
    timezoneOffset: -7
  }, {
    section: "new-york-city",
    label: "New York City",
    timezoneOffset: -4
  }, {
    section: "london",
    label: "London",
    timezoneOffset: 1
  }, {
    section: "amsterdam",
    label: "Amsterdam",
    timezoneOffset: 2
  }, {
    section: "tokyo",
    label: "Tokyo",
    timezoneOffset: 9
  }, {
    section: "hong-kong",
    label: "Hong Kong",
    timezoneOffset: 8
  }, {
    section: "sydney",
    label: "Sydney",
    timezoneOffset: 10
  }]
};
exports.default = _default;
},{}],"src/utils.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.keyDownChange = exports.keyDown = exports.resize = exports.onClick = exports.onChangeClick = exports.setTimeWithOffset = void 0;

var _navigation = _interopRequireDefault(require("./navigation"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// enter key code
var ENTER_KEY_CODE = 13; // timer for time display

var intervalTimer;
/**
 * Returns element position
 *
 * @param {node} element - Element to get the position of
 *
 * @return {object} - Returns the relative position of the node in realtion to view port
 */

var relativePosition = function relativePosition(element) {
  return element.getBoundingClientRect();
};
/**
 * Set position passed marker
 *
 * @param {node} marker - The element for the active marker, which needs to be positioned
 * @param {object} positionOffsets - The relative positions to apply. Should include the width, height, left, and top
 */


var setMarkerPosition = function setMarkerPosition(marker, positionOffsets) {
  marker.style.width = "".concat(positionOffsets.width, "px");
  marker.style.height = "".concat(positionOffsets.height, "px");
  marker.style.left = "".concat(positionOffsets.left, "px");
  marker.style.top = "".concat(positionOffsets.top, "px");
};
/**
 * Set time of current selection
 *
 * @param {number} offset - The offset to apply to utc time
 * @param {string} label - The name of the city
 */


var setTimeWithOffset = function setTimeWithOffset(offset, label) {
  clearInterval(intervalTimer);
  var time = new Date();
  time.setHours(time.getUTCHours() + offset);
  var meridian = time.getHours() >= 12 ? "pm" : "am";
  var baseHours = time.getHours() - 12 > 0 ? time.getHours() - 12 : time.getHours();
  var hours = baseHours < 10 ? "0".concat(baseHours) : baseHours;
  var minutes = time.getMinutes() < 10 ? "0".concat(time.getMinutes()) : time.getMinutes();
  var seconds = time.getSeconds() < 10 ? "0".concat(time.getSeconds()) : time.getSeconds();
  var timeLabel = document.querySelector(".time_label");
  var timeDisplay = document.querySelector(".time_display");
  timeLabel.textContent = "The time in ".concat(label, " is");
  timeDisplay.textContent = "".concat(hours, ":").concat(minutes, ":").concat(seconds).concat(meridian);
  intervalTimer = setInterval(setTimeWithOffset, 1000, offset, label);
};
/**
 * Click handler for menu button on mobile. Toggles button open state.
 */


exports.setTimeWithOffset = setTimeWithOffset;

var onChangeClick = function onChangeClick() {
  var nav = document.querySelector(".nav_item_wrapper");
  nav.classList.toggle("active");
};
/**
 * Click handler for the navigation items. Gets active marker and set position
 *
 * @param {event} e - Event which triggers click
 */


exports.onChangeClick = onChangeClick;

var onClick = function onClick(e) {
  var item = e.target;
  if (!item.classList.contains("nav_item_content") && !item.classList.contains("nav_item")) return;
  var clickTarget = item.classList.contains("nav_item") ? item : item.parentNode;
  var value = clickTarget.value;

  var city = _navigation.default.cities.find(function (city) {
    return city.section === value;
  });

  var label = city.label,
      timezoneOffset = city.timezoneOffset;
  document.querySelectorAll(".nav_item").forEach(function (el) {
    return el.classList.remove("active");
  });
  clickTarget.classList.add("active");
  var itemRelativePosition = relativePosition(clickTarget);
  setMarkerPosition(document.querySelector(".active_marker"), itemRelativePosition);
  setTimeWithOffset(timezoneOffset, label); // hide menu after selection on mobile

  if (window.innerWidth <= 870) {
    setTimeout(onChangeClick, 350);
  }
};
/**
 * Window resize event handler to correct marker positin on resize
 */


exports.onClick = onClick;

var resize = function resize() {
  var itemRelativePosition = relativePosition(document.querySelector(".nav_item.active"));
  setMarkerPosition(document.querySelector(".active_marker"), itemRelativePosition);
};
/**
 * Handler for key press on nav items for accessibility. Sets the position only if enter is hit on the current selected nav item.
 *
 * @param {event} e  - Event which triggered key press
 */


exports.resize = resize;

var keyDown = function keyDown(e) {
  if (e.keyCode === ENTER_KEY_CODE) {
    onClick(e);
  }
};
/**
 *  Key handler for menu button on mobile. Toggles button open state.
 *
 * @param {event} e - Evenet which triggered key press
 */


exports.keyDown = keyDown;

var keyDownChange = function keyDownChange(e) {
  if (e.keyCode === ENTER_KEY_CODE) {
    onChangeClick(e);
  }
};

exports.keyDownChange = keyDownChange;
},{"./navigation":"src/navigation.js"}],"src/index.js":[function(require,module,exports) {
"use strict";

require("./main.css");

var _navigation = _interopRequireDefault(require("./navigation"));

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// create the wrapper for the list items
var navItemWrapper = document.createElement("ul");
navItemWrapper.classList.add("nav_item_wrapper"); // loop through the cities to create the nav

_navigation.default.cities.forEach(function (city, index) {
  var _navButton$classList;

  var label = city.label,
      section = city.section; // create the list items and buttons for each city

  var navItem = document.createElement("li");
  var navButton = document.createElement("button");
  var navContent = document.createElement("span");
  var classes = index === 0 ? ["nav_item", "active"] : ["nav_item"]; // add event listeners

  navContent.addEventListener("click", _utils.onClick);
  navButton.addEventListener("keypress", _utils.keyDown); // set the button values

  (_navButton$classList = navButton.classList).add.apply(_navButton$classList, classes);

  navButton.value = section;
  navButton.type = "button"; // set content values and tab index for accessibility

  navContent.textContent = label;
  navContent.classList.add("nav_item_content");
  navContent.tabIndex = -1; // append each city to the list

  navButton.appendChild(navContent);
  navItem.appendChild(navButton);
  navItemWrapper.appendChild(navItem);
}); // marker to underline the text


var activeMarker = document.createElement("span");
activeMarker.classList.add("active_marker"); // append nav and marker

var navContainer = document.querySelector("#nav_container");
navContainer.appendChild(navItemWrapper);
navContainer.appendChild(activeMarker); // event listeners for mobile view

var changeBtn = document.querySelector(".change_btn");
changeBtn.addEventListener("keypress", _utils.keyDownChange); // icon for mobile view

var iconWrapper = document.querySelector(".menu_icon_wrapper");
iconWrapper.addEventListener("click", _utils.onChangeClick); // get current active item

var _navigation$cities$fi = _navigation.default.cities.find(function (city) {
  return city.section === document.querySelector(".nav_item.active").value;
}),
    label = _navigation$cities$fi.label,
    timezoneOffset = _navigation$cities$fi.timezoneOffset; // set the initial selected item, ie first in list


(0, _utils.resize)();
(0, _utils.setTimeWithOffset)(timezoneOffset, label); // listen to window resize to correct the positioning

window.addEventListener("resize", _utils.resize);
},{"./main.css":"src/main.css","./navigation":"src/navigation.js","./utils":"src/utils.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "49882" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
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

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
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
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/index.js"], null)
//# sourceMappingURL=/src.a2b27638.js.map