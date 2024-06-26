// 劫持url
import { EventType } from "../types";
import { getAppListStatus } from "../util";
import {
  runBeforeLoadLifeCycle,
  runBootstrapLifeCycle,
  runMountedLifeCycle,
  runUnmountLifeCycle,
} from "../lifeCycle/index";

const capturedListeners: Record<EventType, Function[]> = {
  hashchange: [],
  popstate: [],
};
const hasListener = (name: EventType, listener: Function) => {
  return capturedListeners[name].filter(
    (listenerItem) => listenerItem === listener
  );
};

const originalPush = window.history.pushState; // 修改url 末尾值，并添加新的历史记录
const originalReplace = window.history.replaceState; // 仅修改url 末尾值，不添加新的历史记录
const originalGo = window.history.go;

// 定义一个historyEvent变量, 用于存储popstate事件.
let historyEvent: PopStateEvent | null = null;
let lastUrl: string = "";

export function hackRouter() {
  // 触发pushState事件，新的url生效时触发
  window.history.pushState = function (...args) {
    const result = originalPush.apply(this, args);
    // 触发pushState事件
    // window.dispatchEvent(new Event("pushState"));
    historyEvent = new PopStateEvent("pushState");
    args[2] && reroute(args[2] as string);
    return result;
  };
  // 触发replaceState事件
  window.history.replaceState = function (...args) {
    const result = originalReplace.apply(this, args);
    // window.dispatchEvent(new Event("replaceState"));
    historyEvent = new PopStateEvent("pushState");
    args[2] && reroute(args[2] as string);
    return result;
  };
  // 触发go事件
  window.history.go = function (...args) {
    const result = originalGo.apply(this, args);
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

const handleReroute = () => {
  reroute(window.location.href);
};

// 重写window.addEventListener方法 / addEventListener() 方法用于向指定元素添加事件句柄。
const hackEventsListener = (func: Function): any => {
  return function (this: Window, name: EventType, listener: Function) {
    if (name === "hashchange" || name === "popstate") {
      if (!hasListener(name, listener)) {
        capturedListeners[name].push(listener);
      } else {
        capturedListeners[name] = capturedListeners[name].filter(
          (listenerItem) => listenerItem !== listener
        );
      }
    } else {
      func.call(this, name, listener);
    }
  };
};

// 手柄
export const reroute = (url: string) => {
  if (lastUrl === url) return;
  const { actives, unmounts } = getAppListStatus();

  Promise.all(
    unmounts
      .map(async (app) => {
        await runUnmountLifeCycle(app);
      })
      .concat(
        actives.map(async (app) => {
          await runBeforeLoadLifeCycle(app);
          await runBootstrapLifeCycle(app);
          await runMountedLifeCycle(app);
        })
      )
  ).then(() => {
    // actives.forEach((app) => {
    //   app.bootstrap && app.bootstrap(app);
    // });
    callCapturedListeners();
  });
};

//
const callCapturedListeners = () => {
  if (historyEvent) {
    Object.keys(capturedListeners).forEach((name) => {
      if (name !== 'popstate' && name !== 'hashchange') {
        return
      }
      const listeners = capturedListeners[name];
      if (listeners.length) {
        listeners.forEach((listener: Function) => {
          // listener(historyEvent);
          listener.call(this, historyEvent);
        });
      }
    });
  }
};
