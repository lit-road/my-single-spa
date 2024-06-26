import { EAppStatus } from "./types";
import { getAppList } from "./appList";
import { match } from "path-to-regexp";
// 获取应用列表状态
/**
 * Retrieves the list of active and unmounted apps based on their status and active rule.
 * @returns An object containing the active and unmounted apps.
 */
export var getAppListStatus = function () {
    var actives = [];
    var unmounts = [];
    var list = getAppList();
    list.forEach(function (app) {
        var isActive = match(app.activeRule, { end: false })(window.location.pathname);
        switch (app.status) {
            case EAppStatus.NOT_LOADED:
            case EAppStatus.LOADING:
            case EAppStatus.LOADED:
                isActive && actives.push(app);
                break;
            case EAppStatus.MOUNTED:
                !isActive && unmounts.push(app);
                break;
            case EAppStatus.UNMOUNTED:
                unmounts.push(app);
                break;
        }
    });
    return { actives: actives, unmounts: unmounts };
};
//# sourceMappingURL=util.js.map