/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 5:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Log = exports.editor = void 0;
const vscode = __webpack_require__(1);
exports.editor = vscode.window.activeTextEditor;
var EVENT_NAME;
(function (EVENT_NAME) {
    EVENT_NAME[EVENT_NAME["PROCESS"] = 0] = "PROCESS";
    EVENT_NAME[EVENT_NAME["ACTION"] = 1] = "ACTION";
    EVENT_NAME[EVENT_NAME["VALIDATION"] = 2] = "VALIDATION";
    EVENT_NAME[EVENT_NAME["MENU"] = 3] = "MENU";
})(EVENT_NAME || (EVENT_NAME = {}));
//Map is logType => eventName => class/interface name
const LOG_TYPE_PROCESOR_MAPPING = {
    'apexLog': {
        'PROCESS': 'ApexLog',
        'ACTION': 'ApexLogAction',
        'VALIDATION': 'ApexLogValidation',
        'MENU': 'ApexLogMenu'
    }
};
class Log {
    constructor(_logType) {
        this._logType = _logType;
    }
    process() {
        let processor = this.reflection(EVENT_NAME.PROCESS, this.processorConstructor());
        processor[EVENT_NAME.PROCESS](); //Execute process method from LogProcessor class
    }
    //constructor default = empty array
    reflection(eventName, constructor = new Array()) {
        let newInstance = Object.create(vscode.window[LOG_TYPE_PROCESOR_MAPPING[this._logType][eventName]].prototype);
        newInstance.constructor.apply(newInstance, constructor);
        return newInstance;
    }
    processorConstructor() {
        return new Array(this.reflection(EVENT_NAME.MENU), this.reflection(EVENT_NAME.VALIDATION), this.reflection(EVENT_NAME.ACTION));
    }
}
exports.Log = Log;


/***/ }),

/***/ 1:
/***/ ((module) => {

module.exports = require("vscode");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.deactivate = exports.activate = void 0;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = __webpack_require__(1);
const log_1 = __webpack_require__(5);
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
function activate(context) {
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Salesforce Debug Logs (sfdl) is now active!');
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('sfdl.processLog', () => {
        new log_1.Log('apexLog').process();
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
// This method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;

})();

module.exports = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=extension.js.map