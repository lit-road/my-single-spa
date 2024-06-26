var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
import { importEntry } from "import-html-entry";
import { ProxySandbox } from "./sandBox";
/**
 * Executes the provided JavaScript source code within a sandboxed environment.
 * @param src - The JavaScript source code to be executed.
 * @param app - An instance of the IInstanceAppInfo interface.
 * @returns The result of executing the JavaScript code.
 */
var runJs = function (src, app) {
    if (!app.proxy) {
        app.proxy = new ProxySandbox();
        // @ts-ignore
        window.__CURRENT_PROXY__ = app.proxy.proxy;
    }
    app.proxy.active();
    var code = "\n  return (window=>{\n    ".concat(src, "\n    return window['").concat(app.name, "']\n  })(window.__CURRENT_PROXY__)");
    return new Function("app", src)(app);
};
/**
 * Loads an application by importing the entry file and executing its lifecycle scripts.
 * @param app - The application information.
 * @returns The updated application object.
 * @throws If the container element does not exist.
 */
export var loadApp = function (app) { return __awaiter(void 0, void 0, void 0, function () {
    var entry, container, _a, template, getExternalScripts, getExternalStyleSheets, containerElement, scripts, styles;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                entry = app.entry, container = app.container;
                return [4 /*yield*/, importEntry(entry)];
            case 1:
                _a = _b.sent(), template = _a.template, getExternalScripts = _a.getExternalScripts, getExternalStyleSheets = _a.getExternalStyleSheets;
                containerElement = document.querySelector(container);
                if (!containerElement) {
                    throw new Error("\u5BB9\u5668".concat(container, "\u4E0D\u5B58\u5728"));
                }
                containerElement.innerHTML = template;
                return [4 /*yield*/, getExternalScripts()];
            case 2:
                scripts = _b.sent();
                return [4 /*yield*/, getExternalStyleSheets()];
            case 3:
                styles = _b.sent();
                scripts.forEach(function (src) {
                    var lifeCycleScript = runJs(src, app);
                    if (lifeCycleScript) {
                        app = __assign(__assign({}, app), lifeCycleScript);
                    }
                });
                return [2 /*return*/, app];
        }
    });
}); };
//# sourceMappingURL=index.js.map