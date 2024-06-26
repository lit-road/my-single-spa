import { IInstanceAppInfo } from "../types";
import { importEntry } from "import-html-entry";
import { ProxySandbox } from "./sandBox";


/**
 * Executes the provided JavaScript source code within a sandboxed environment.
 * @param src - The JavaScript source code to be executed.
 * @param app - An instance of the IInstanceAppInfo interface.
 * @returns The result of executing the JavaScript code.
 */
const runJs = (src: string, app: IInstanceAppInfo) => { 
  if (!app.proxy) {
    app.proxy = new ProxySandbox();
    // @ts-ignore
    window.__CURRENT_PROXY__ = app.proxy.proxy;
  }

  app.proxy.active();
  const code = `
  return (window=>{
    ${src}
    return window['${app.name}']
  })(window.__CURRENT_PROXY__)`;
  return new Function("app", src)(app);
}

/**
 * Loads an application by importing the entry file and executing its lifecycle scripts.
 * @param app - The application information.
 * @returns The updated application object.
 * @throws If the container element does not exist.
 */
export const loadApp = async (app: IInstanceAppInfo) => { 
  const { entry, container } = app;

  const { template, getExternalScripts, getExternalStyleSheets } = await importEntry(entry);
  
  const containerElement = document.querySelector(container);
  if (!containerElement) {
    throw new Error(`容器${container}不存在`);
  }

  containerElement.innerHTML = template;
  const scripts = await getExternalScripts();
  const styles = await getExternalStyleSheets();
  scripts.forEach((src) => {
    const lifeCycleScript = runJs(src, app) as any;
    
    if (lifeCycleScript) {
      app = { ...app, ...lifeCycleScript };
    }
  });
  return app;
}