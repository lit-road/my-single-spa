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
import { EAppStatus, } from "../types";
// lifeCycle
var lifeCycle = {};
export var setLifeCycle = function (lifeCycles) {
    lifeCycle = lifeCycles;
};
export var getLifeCycle = function () {
    return lifeCycle;
};
// 运行生命周期
export var runLifeCycle = function (name, app) { return __awaiter(void 0, void 0, void 0, function () {
    var fn;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                fn = lifeCycle[name];
                if (!Array.isArray(fn)) return [3 /*break*/, 2];
                return [4 /*yield*/, Promise.all(fn.map(function (f) {
                        f(app);
                    }))];
            case 1:
                _a.sent();
                return [3 /*break*/, 4];
            case 2: return [4 /*yield*/, (fn === null || fn === void 0 ? void 0 : fn(app))];
            case 3:
                _a.sent();
                _a.label = 4;
            case 4: return [2 /*return*/];
        }
    });
}); };
// run numount lifeCycle
export var runUnmountLifeCycle = function (app) { return __awaiter(void 0, void 0, void 0, function () {
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                app.status = EAppStatus.UNMOUNTING;
                return [4 /*yield*/, ((_a = app.unmount) === null || _a === void 0 ? void 0 : _a.call(app, app))];
            case 1:
                _b.sent();
                app.status = EAppStatus.UNMOUNTED;
                return [4 /*yield*/, runLifeCycle("afterUnmount", app)];
            case 2:
                _b.sent();
                return [2 /*return*/];
        }
    });
}); };
/**
 * Runs the bootstrap lifecycle for the given app.
 * @param app - The instance of the app.
 * @returns The updated app instance.
 */
export var runBootstrapLifeCycle = function (app) { return __awaiter(void 0, void 0, void 0, function () {
    var _a;
    return __generator(this, function (_b) {
        if (app.status !== EAppStatus.NOT_LOADED) {
            return [2 /*return*/, app];
        }
        app.status = EAppStatus.BOOTSTRAPPING;
        (_a = app.bootstrap) === null || _a === void 0 ? void 0 : _a.call(app, app);
        app.status = EAppStatus.MOUNTING;
        return [2 /*return*/];
    });
}); };
export var runMountedLifeCycle = function (app) { return __awaiter(void 0, void 0, void 0, function () {
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                app.status = EAppStatus.MOUNTING;
                return [4 /*yield*/, ((_a = app.mount) === null || _a === void 0 ? void 0 : _a.call(app, app))];
            case 1:
                _b.sent();
                app.status = EAppStatus.MOUNTED;
                return [4 /*yield*/, runLifeCycle("afterMount", app)];
            case 2:
                _b.sent();
                return [2 /*return*/];
        }
    });
}); };
// 
export var runBeforeLoadLifeCycle = function (app) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (app.status !== EAppStatus.NOT_LOADED) {
                    return [2 /*return*/, app];
                }
                app.status = EAppStatus.LOADING;
                return [4 /*yield*/, runLifeCycle("beforeLoad", app)];
            case 1:
                _a.sent();
                app.status = EAppStatus.LOADED;
                return [2 /*return*/];
        }
    });
}); };
//# sourceMappingURL=index.js.map