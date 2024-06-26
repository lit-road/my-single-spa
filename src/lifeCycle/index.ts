import {
  IAppInfo,
  EAppStatus,
  IInstanceAppInfo,
  ILifeCycle,
} from "../types";
// lifeCycle
let lifeCycle:ILifeCycle = {};

export const setLifeCycle = (lifeCycles: ILifeCycle) => {
  lifeCycle = lifeCycles;
};

export const getLifeCycle = () => {
  return lifeCycle;
};

// 运行生命周期
export const runLifeCycle = async (name: keyof ILifeCycle, app: IAppInfo) => {
  const fn = lifeCycle[name];
  if (Array.isArray(fn)) {
    await Promise.all(
      fn.map((f) => {
        f(app);
      })
    );
  } else {
    await fn?.(app);
  }
};

// run numount lifeCycle
export const runUnmountLifeCycle = async (app: IInstanceAppInfo) => {
  app.status = EAppStatus.UNMOUNTING;
  await app.unmount?.(app);
  app.status = EAppStatus.UNMOUNTED;
  await runLifeCycle("afterUnmount", app);
};

/**
 * Runs the bootstrap lifecycle for the given app.
 * @param app - The instance of the app.
 * @returns The updated app instance.
 */
export const runBootstrapLifeCycle = async (app: IInstanceAppInfo) => {
  if(app.status !== EAppStatus.NOT_LOADED) {
    return app;
  }
  app.status = EAppStatus.BOOTSTRAPPING;
  app.bootstrap?.(app);
  app.status = EAppStatus.MOUNTING;
  // await runLifeCycle("beforeLoad", app);
};

export const runMountedLifeCycle = async (app: IInstanceAppInfo) => {
  app.status = EAppStatus.MOUNTING;
  await app.mount?.(app);
  app.status = EAppStatus.MOUNTED;
  await runLifeCycle("afterMount", app);
}

// 
export const runBeforeLoadLifeCycle = async (app: IInstanceAppInfo) => {
  if (app.status !== EAppStatus.NOT_LOADED) { 
    return app;
  }
  app.status = EAppStatus.LOADING;
  await runLifeCycle("beforeLoad", app);
  app.status = EAppStatus.LOADED;
}

