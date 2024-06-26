// IAppState
export var EAppStatus;
(function (EAppStatus) {
    // find
    EAppStatus["NOT_FIND"] = "NOT_FIND";
    // load
    EAppStatus["NOT_LOADED"] = "NOT_LOADED";
    EAppStatus["LOADING"] = "LOADING_SOURCE_CODE";
    EAppStatus["LOADED"] = "LOAD_SOURCE_CODE";
    // bootstrap
    // NOT_BOOTSTRAPPED = "NOT_BOOTSTRAPPED",
    EAppStatus["BOOTSTRAPPING"] = "BOOTSTRAPPING";
    // mount
    // NOT_MOUNTED = "NOT_MOUNTED",
    EAppStatus["MOUNTING"] = "MOUNTING";
    EAppStatus["MOUNTED"] = "MOUNTED";
    // update
    EAppStatus["UPDATING"] = "UPDATING";
    EAppStatus["UPDATED"] = "UPDATED";
    // unmount
    EAppStatus["UNMOUNTING"] = "UNMOUNTING";
    EAppStatus["UNMOUNTED"] = "UNMOUNTED";
    // E load
    EAppStatus["LOAD_ERR"] = "LOAD_ERR";
    EAppStatus["SKIP_BECAUSE_BROKEN"] = "SKIP_BECAUSE_BROKEN";
})(EAppStatus || (EAppStatus = {}));
//# sourceMappingURL=types.js.map