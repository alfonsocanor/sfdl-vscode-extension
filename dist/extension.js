/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = require("vscode");

/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ApexLog = void 0;
const vscode = __webpack_require__(1);
const constants = __webpack_require__(5);
class ApexLog {
    process() {
        const quickPick = vscode.window.createQuickPick();
        quickPick.items = constants.ACTIONS.map((action) => ({ label: action.label, name: action.name }));
        quickPick.onDidChangeSelection(([action]) => {
            if (action) {
                quickPick.dispose();
                this.processor(action['name']);
            }
        });
        quickPick.onDidHide(() => quickPick.dispose());
        quickPick.show();
    }
    processor(action) {
        //new ApexLogProcessor(action).execute();
    }
}
exports.ApexLog = ApexLog;


/***/ }),
/* 3 */,
/* 4 */,
/* 5 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EXECUTED_ACTION_ERROR_MESSAGE = exports.EXECUTED_ACTION_SUCCESS_MESSAGE = exports.ACTIONS = exports.LOG_LINE = void 0;
var LOG_LINE;
(function (LOG_LINE) {
    LOG_LINE[LOG_LINE["HEAP_ALLOCATE"] = 0] = "HEAP_ALLOCATE";
    LOG_LINE[LOG_LINE["STATEMENT_EXECUTE"] = 1] = "STATEMENT_EXECUTE";
    LOG_LINE[LOG_LINE["SYSTEM_METHOD_ENTRY"] = 2] = "SYSTEM_METHOD_ENTRY";
    LOG_LINE[LOG_LINE["CONSTRUCTOR_ENTRY"] = 3] = "CONSTRUCTOR_ENTRY";
    LOG_LINE[LOG_LINE["CONSTRUCTOR_EXIT"] = 4] = "CONSTRUCTOR_EXIT";
    LOG_LINE[LOG_LINE["CODE_UNIT_STARTED"] = 5] = "CODE_UNIT_STARTED";
    LOG_LINE[LOG_LINE["CODE_UNIT_FINISHED"] = 6] = "CODE_UNIT_FINISHED";
    LOG_LINE[LOG_LINE["METHOD_ENTRY"] = 7] = "METHOD_ENTRY";
    LOG_LINE[LOG_LINE["METHOD_EXIT"] = 8] = "METHOD_EXIT";
    LOG_LINE[LOG_LINE["SOQL_EXECUTE"] = 9] = "SOQL_EXECUTE";
})(LOG_LINE = exports.LOG_LINE || (exports.LOG_LINE = {}));
exports.ACTIONS = [
    {
        label: 'SFDL: Apex - Remove HEAP_ALLOCATE & STATEMENT_EXECUTE Lines',
        name: 'removeHeapAllocateAndStatementExecute',
    },
    {
        label: 'SFDL: Apex - Format Hierarchy Entry/Exit',
        name: 'hierarchyEntryExit',
    },
    {
        label: 'SFDL: Apex - Apply all actions',
        name: 'applyAll',
    },
];
exports.EXECUTED_ACTION_SUCCESS_MESSAGE = 'Salesforce Debug Logs executed!';
exports.EXECUTED_ACTION_ERROR_MESSAGE = 'Salesforce Debug Logs can\'t process the file. Invalid Apex Log.';


/***/ }),
/* 6 */,
/* 7 */,
/* 8 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Log = exports.editor = void 0;
const vscode = __webpack_require__(1);
exports.editor = vscode.window.activeTextEditor;
class Log {
    constructor(_log) {
        this._log = _log;
    }
    run() {
        console.log('@run');
        this._log.process();
    }
}
exports.Log = Log;


/***/ })
/******/ 	]);
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
const apexLog_1 = __webpack_require__(2);
const log_1 = __webpack_require__(8);
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
        new log_1.Log(new apexLog_1.ApexLog()).run();
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