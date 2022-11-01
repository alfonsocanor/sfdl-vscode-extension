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
exports.Log = void 0;
const apexLog_1 = __webpack_require__(3);
const apexLogMenu_1 = __webpack_require__(6);
const apexLogValidation_1 = __webpack_require__(9);
const apexLogAction_1 = __webpack_require__(11);
//Map is logType => eventName => class/interface name
const LOG_TYPE_PROCESOR_MAPPING = {
    'apexLog': new apexLog_1.ApexLog(new apexLogMenu_1.ApexLogMenu(), new apexLogValidation_1.ApexLogValidation(), new apexLogAction_1.ApexLogAction())
};
class Log {
    constructor(_logType) {
        this._logType = _logType;
    }
    process() {
        LOG_TYPE_PROCESOR_MAPPING[this._logType].process();
    }
}
exports.Log = Log;


/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ApexLog = void 0;
const logProcessor_1 = __webpack_require__(4);
class ApexLog extends logProcessor_1.LogProcessor {
    constructor(_logMenu, _validation, _action) {
        super();
        this._logMenu = _logMenu;
        this._validation = _validation;
        this._action = _action;
        this.successMessage = 'Salesforce Debug Logs executed!';
        this.exceptionMessage = 'Salesforce Debug Logs can\'t process the file. Invalid Apex Log.';
        this.logMenu = _logMenu;
        this.validation = _validation;
        this.action = _action;
    }
}
exports.ApexLog = ApexLog;


/***/ }),
/* 4 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LogProcessor = void 0;
const vscode = __webpack_require__(1);
const utils = __webpack_require__(5);
const editor = vscode.window.activeTextEditor;
class LogProcessor {
    async process() {
        let log = utils.getLog();
        let isValid = this.runValidation(log);
        if (!isValid) {
            utils.displayMessage(this.exceptionMessage);
            return;
        }
        let actionSelected = await this.displayMenu();
        let logFormatted = this.applyAction(actionSelected.name, log);
        this.refreshWindow(logFormatted);
        utils.displayMessage(this.successMessage);
        utils.navigateTop();
    }
    displayMenu() {
        return this.logMenu.getOption();
    }
    runValidation(log) {
        return this.validation.validate(log);
    }
    applyAction(actionName, log) {
        return this.action.apply(actionName, log);
    }
    refreshWindow(log) {
        let textRange = utils.selectAllPageContent();
        editor?.edit(editBuilder => {
            editBuilder.replace(textRange, log);
        });
    }
}
exports.LogProcessor = LogProcessor;


/***/ }),
/* 5 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.displayMessage = exports.navigateTop = exports.selectAllPageContent = exports.getFileName = exports.getLog = void 0;
const vscode = __webpack_require__(1);
function getLog() {
    let editor = vscode.window.activeTextEditor;
    const document = editor?.document;
    const log = document?.getText();
    return log || 'no log found';
}
exports.getLog = getLog;
function getFileName() {
    let editor = vscode.window.activeTextEditor;
    return editor ? editor.document.fileName : 'no log found';
}
exports.getFileName = getFileName;
function selectAllPageContent() {
    let editor = vscode.window.activeTextEditor;
    let range;
    if (editor) {
        let firstLine = editor.document.lineAt(0);
        let lastLine = editor.document.lineAt(editor.document.lineCount - 1);
        range = new vscode.Range(0, firstLine.range.start.character, editor.document.lineCount - 1, lastLine.range.end.character);
    }
    return range;
}
exports.selectAllPageContent = selectAllPageContent;
function navigateTop() {
    let editor = vscode.window.activeTextEditor;
    if (editor) {
        var p = new vscode.Position(0, 0);
        var s = new vscode.Selection(p, p);
        editor.selection = s;
        editor.revealRange(s);
    }
}
exports.navigateTop = navigateTop;
function displayMessage(message) {
    vscode.window.showInformationMessage(message);
}
exports.displayMessage = displayMessage;


/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ApexLogMenu = void 0;
const logMenu_1 = __webpack_require__(7);
class ApexLogMenu extends logMenu_1.LogMenu {
    constructor() {
        super(...arguments);
        this.menuOptions = [
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
    }
}
exports.ApexLogMenu = ApexLogMenu;


/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LogMenu = void 0;
const displayMenu_1 = __webpack_require__(8);
const vscode = __webpack_require__(1);
class LogMenu {
    getOption() {
        const options = this.getMenuOptions();
        return this.optionSelected(options);
    }
    getMenuOptions() {
        return this.menuOptions.map((action) => {
            return new displayMenu_1.DisplayMenu('', action.label, action.name);
        });
    }
    async optionSelected(options) {
        const option = await vscode.window.showQuickPick(options, {
            canPickMany: false,
        });
        return option;
    }
}
exports.LogMenu = LogMenu;


/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DisplayMenu = void 0;
class DisplayMenu {
    constructor(detail, label, name) {
        this.detail = detail;
        this.description = '';
        this.label = `${label}`;
        this.name = `${name}`;
    }
}
exports.DisplayMenu = DisplayMenu;


/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ApexLogValidation = void 0;
const utils = __webpack_require__(5);
const logValidation_1 = __webpack_require__(10);
class ApexLogValidation extends logValidation_1.LogValidation {
    constructor() {
        super(...arguments);
        this.validations = {
            isApexLog(log) {
                return log && log.includes('APEX_CODE');
            },
            isLogFile() {
                return utils.getFileName().includes('.log');
            }
        };
    }
}
exports.ApexLogValidation = ApexLogValidation;


/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LogValidation = void 0;
class LogValidation {
    validate(log) {
        return Object.keys(this.validations).some((validation) => {
            return this.validations[validation](log);
        });
    }
}
exports.LogValidation = LogValidation;


/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ApexLogAction = void 0;
const logAction_1 = __webpack_require__(12);
var LOG_LINE_FILTER;
(function (LOG_LINE_FILTER) {
    LOG_LINE_FILTER["HEAP_ALLOCATE"] = "HEAP_ALLOCATE";
    LOG_LINE_FILTER["STATEMENT_EXECUTE"] = "STATEMENT_EXECUTE";
    LOG_LINE_FILTER["SYSTEM_METHOD_ENTRY"] = "SYSTEM_METHOD_ENTRY";
    LOG_LINE_FILTER["CONSTRUCTOR_ENTRY"] = "CONSTRUCTOR_ENTRY";
    LOG_LINE_FILTER["CONSTRUCTOR_EXIT"] = "CONSTRUCTOR_EXIT";
    LOG_LINE_FILTER["CODE_UNIT_STARTED"] = "CODE_UNIT_STARTED";
    LOG_LINE_FILTER["CODE_UNIT_FINISHED"] = "CODE_UNIT_FINISHED";
    LOG_LINE_FILTER["METHOD_ENTRY"] = "METHOD_ENTRY";
    LOG_LINE_FILTER["METHOD_EXIT"] = "METHOD_EXIT";
    LOG_LINE_FILTER["SOQL_EXECUTE"] = "SOQL_EXECUTE";
})(LOG_LINE_FILTER || (LOG_LINE_FILTER = {}));
class ApexLogAction extends logAction_1.LogAction {
    constructor() {
        super(...arguments);
        this.actions = {
            hierarchyEntryExit(filters, logLines) {
                let tabs2Add = 0;
                return logLines.map(line => {
                    if (filters.isEntry(line)) {
                        tabs2Add++;
                        return filters.tabs2Add2Line(tabs2Add - 1) + line;
                    }
                    if (filters.isExit(line)) {
                        if (tabs2Add === 0) {
                            return tabs2Add;
                        }
                        tabs2Add--;
                    }
                    return filters.tabs2Add2Line(tabs2Add) + line;
                });
            },
            removeHeapAllocateAndStatementExecute(filters, logLines) {
                return logLines.filter(line => !filters.isHeapAllocate(line) && !filters.isStatementExecute(line));
            },
            applyAll(filters, logLines, actions) {
                return Object.keys(actions)
                    .filter(name => name !== 'applyAll')
                    .reduce((log2Format, action) => {
                    return actions[action](filters, log2Format);
                }, logLines);
            }
        };
        this.filters = {
            isHeapAllocate(line) {
                return line && line.includes(LOG_LINE_FILTER.HEAP_ALLOCATE);
            },
            isStatementExecute(line) {
                return line && line.includes(LOG_LINE_FILTER.STATEMENT_EXECUTE);
            },
            isEntry(line) {
                return line && (line.includes(LOG_LINE_FILTER.METHOD_ENTRY) ||
                    line.includes(LOG_LINE_FILTER.SYSTEM_METHOD_ENTRY) ||
                    line.includes(LOG_LINE_FILTER.CONSTRUCTOR_ENTRY)) ||
                    line.includes(LOG_LINE_FILTER.CODE_UNIT_STARTED);
            },
            isExit(line) {
                return line && (line.includes(LOG_LINE_FILTER.METHOD_EXIT) ||
                    line.includes(LOG_LINE_FILTER.SYSTEM_METHOD_ENTRY) ||
                    line.includes(LOG_LINE_FILTER.CONSTRUCTOR_EXIT)) ||
                    line.includes(LOG_LINE_FILTER.CODE_UNIT_FINISHED);
            },
            extractSoqlLine(line) {
                return line && !line.includes(LOG_LINE_FILTER.SOQL_EXECUTE);
            },
            tabs2Add2Line(numberOfTabs) {
                let tabs2Return = numberOfTabs === 0 ? '' : '\t';
                for (let counter = 1; counter < numberOfTabs; counter++) {
                    tabs2Return = tabs2Return + '\t';
                }
                return tabs2Return;
            }
        };
    }
}
exports.ApexLogAction = ApexLogAction;


/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LogAction = void 0;
class LogAction {
    apply(actionName, log) {
        let logLines = log?.split('\n');
        let logFormatted;
        if (logLines) {
            //actions passing as another argument for applyAll function
            logFormatted = this.actions[actionName](this.filters, logLines, this.actions);
            logFormatted.join('\n');
        }
        return logFormatted ? logFormatted.join('\n') : log;
    }
}
exports.LogAction = LogAction;


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
const log_1 = __webpack_require__(2);
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