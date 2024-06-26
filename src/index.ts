import type { IAppInfo, ILifeCycle } from "./types";
import { setAppList, getAppList } from "./appList";
import { setLifeCycle } from "./lifeCycle";
import { hackRouter, reroute } from "./location";

//
/**
 * Registers micro apps with the given app information and optional lifecycle hooks.
 * @param apps - An array of app information.
 * @param lifeCycle - Optional lifecycle hooks.
 */
export const registerMircoApps = (
  apps: IAppInfo[],
  lifeCycle?: ILifeCycle
) => {
  debugger
  setAppList(apps);
  lifeCycle && setLifeCycle(lifeCycle);
};

/**
 * Starts the application.
 * Retrieves the list of registered apps and performs necessary actions.
 * Throws an error if no app is registered.
 */
export const start = () => {
  const apps = getAppList();
  apps.length && apps.find((app) => app.activeRule);
  if(!apps.length) {
    throw new Error("No app is registered");
  }
  hackRouter();
  reroute(window.location.href);
};
