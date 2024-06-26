// IAppState
export enum EAppStatus {
  // find
  NOT_FIND = "NOT_FIND",
  // load
  NOT_LOADED = "NOT_LOADED",
  LOADING = "LOADING_SOURCE_CODE",
  LOADED = "LOAD_SOURCE_CODE",
  // bootstrap
  // NOT_BOOTSTRAPPED = "NOT_BOOTSTRAPPED",
  BOOTSTRAPPING = "BOOTSTRAPPING",
  // mount
  // NOT_MOUNTED = "NOT_MOUNTED",
  MOUNTING = "MOUNTING",
  MOUNTED = "MOUNTED",
  // update
  UPDATING = "UPDATING",
  UPDATED = "UPDATED",
  // unmount
  UNMOUNTING = "UNMOUNTING",
  UNMOUNTED = "UNMOUNTED",
  // E load
  LOAD_ERR = "LOAD_ERR",
  SKIP_BECAUSE_BROKEN = "SKIP_BECAUSE_BROKEN",
}

// IAppInfo
export interface IAppInfo {
  name: string;
  version?: string;
  description?: string;
  entry: string;
  container: string;
  activeRule: string;
  meta?: any;
  proxy?: any;
}

// LifeCycle
export type LifeCycle = (app: IAppInfo) => Promise<any>;

// ILifeCycle
export interface ILifeCycle {
  beforeLoad?: LifeCycle | LifeCycle[];
  afterLoad?: LifeCycle | LifeCycle[];
  beforeMount?: LifeCycle | LifeCycle[];
  afterMount?: LifeCycle | LifeCycle[];
  beforeUnmount?: LifeCycle | LifeCycle[];
  afterUnmount?: LifeCycle | LifeCycle[];
}

// 
export interface IInstanceAppInfo extends IAppInfo {
  status: EAppStatus;
  bootstrap?: LifeCycle;
  mount?: LifeCycle;
  unmount?: LifeCycle;
  update?: LifeCycle;
}

//
export type EventType = "hashchange" | "popstate";
