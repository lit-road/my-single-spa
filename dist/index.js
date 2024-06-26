import { setAppList, getAppList } from "./appList";
import { setLifeCycle } from "./lifeCycle";
import { hackRouter, reroute } from "./location";
//
/**
 * Registers micro apps with the given app information and optional lifecycle hooks.
 * @param apps - An array of app information.
 * @param lifeCycle - Optional lifecycle hooks.
 */
export var registerMircoApps = function (apps, lifeCycle) {
    debugger;
    setAppList(apps);
    lifeCycle && setLifeCycle(lifeCycle);
};
/**
 * Starts the application.
 * Retrieves the list of registered apps and performs necessary actions.
 * Throws an error if no app is registered.
 */
export var start = function () {
    var apps = getAppList();
    apps.length && apps.find(function (app) { return app.activeRule; });
    if (!apps.length) {
        throw new Error("No app is registered");
    }
    hackRouter();
    reroute(window.location.href);
};
//# sourceMappingURL=index.js.map