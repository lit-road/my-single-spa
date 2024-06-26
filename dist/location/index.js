var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
import { getAppListStatus } from "../util";
import { runBeforeLoadLifeCycle, runBootstrapLifeCycle, runMountedLifeCycle, runUnmountLifeCycle, } from "../lifeCycle/index";
var capturedListeners = {
    hashchange: [],
    popstate: [],
};
var hasListener = function (name, listener) {
    return capturedListeners[name].filter(function (listenerItem) { return listenerItem === listener; });
};
var originalPush = window.history.pushState; // 修改url 末尾值，并添加新的历史记录
var originalReplace = window.history.replaceState; // 仅修改url 末尾值，不添加新的历史记录
var originalGo = window.history.go;
// 定义一个historyEvent变量, 用于存储popstate事件.
var historyEvent = null;
var lastUrl = "";
export function hackRouter() {
    // 触发pushState事件，新的url生效时触发
    window.history.pushState = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var result = originalPush.apply(this, args);
        // 触发pushState事件
        // window.dispatchEvent(new Event("pushState"));
        historyEvent = new PopStateEvent("pushState");
        args[2] && reroute(args[2]);
        return result;
    };
    // 触发replaceState事件
    window.history.replaceState = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var result = originalReplace.apply(this, args);
        // window.dispatchEvent(new Event("replaceState"));
        historyEvent = new PopStateEvent("pushState");
        args[2] && reroute(args[2]);
        return result;
    };
    // 触发go事件
    window.history.go = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var result = originalGo.apply(this, args);
        window.dispatchEvent(new Event("go"));
        args[0] && reroute(window.location.href);
        return result;
    };
    // hashchange事件
    window.addEventListener("hashchange", handleReroute);
    // state 增减事件
    window.addEventListener("popstate", handleReroute);
    // 存起来，统一处理
    window.addEventListener = hackEventsListener(window.addEventListener);
}
var handleReroute = function () {
    reroute(window.location.href);
};
// 重写window.addEventListener方法 / addEventListener() 方法用于向指定元素添加事件句柄。
var hackEventsListener = function (func) {
    return function (name, listener) {
        if (name === "hashchange" || name === "popstate") {
            if (!hasListener(name, listener)) {
                capturedListeners[name].push(listener);
            }
            else {
                capturedListeners[name] = capturedListeners[name].filter(function (listenerItem) { return listenerItem !== listener; });
            }
        }
        else {
            func.call(this, name, listener);
        }
    };
};
// 手柄
export var reroute = function (url) {
    if (lastUrl === url)
        return;
    var _a = getAppListStatus(), actives = _a.actives, unmounts = _a.unmounts;
    Promise.all(unmounts
        .map(function (app) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, runUnmountLifeCycle(app)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); })
        .concat(actives.map(function (app) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, runBeforeLoadLifeCycle(app)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, runBootstrapLifeCycle(app)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, runMountedLifeCycle(app)];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); }))).then(function () {
        // actives.forEach((app) => {
        //   app.bootstrap && app.bootstrap(app);
        // });
        callCapturedListeners();
    });
};
//
var callCapturedListeners = function () {
    if (historyEvent) {
        Object.keys(capturedListeners).forEach(function (name) {
            if (name !== 'popstate' && name !== 'hashchange') {
                return;
            }
            var listeners = capturedListeners[name];
            if (listeners.length) {
                listeners.forEach(function (listener) {
                    // listener(historyEvent);
                    listener.call(_this, historyEvent);
                });
            }
        });
    }
};
//# sourceMappingURL=index.js.map