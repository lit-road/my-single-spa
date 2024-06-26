import { IAppInfo, LifeCycle } from "../types";
// appList
let appList: IAppInfo[] = [];
export const setAppList = (apps: IAppInfo[]) => {
  appList = apps;
};

export const getAppList = () => {
  return appList;
};
