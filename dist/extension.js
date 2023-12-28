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
const noMenu_1 = __webpack_require__(13);
//Map is logType => eventName => class/interface name
const LOG_TYPE_PROCESOR_MAPPING = {
    'apexLog': new apexLog_1.ApexLog(new apexLogMenu_1.ApexLogMenu(), new apexLogValidation_1.ApexLogValidation(), new apexLogAction_1.ApexLogAction()),
    'apexLogAutoApply': new apexLog_1.ApexLog(new noMenu_1.NoMenu(), new apexLogValidation_1.ApexLogValidation(), new apexLogAction_1.ApexLogAction('applyAll'))
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
// Define an abstract base class for a log processor
class LogProcessor {
    // Method to process a log
    async process() {
        // Get the log from the current editor
        let log = utils.getLog();
        // Check if the log is valid
        let isValid = this.runValidation(log);
        // If the log is invalid, display the exception message and return
        if (!isValid) {
            utils.displayMessage(this.exceptionMessage);
            return;
        }
        // Get the selected action from the log menu
        let actionSelected = await this.displayMenu();
        // Apply the selected action to the log
        let logFormatted = this.applyAction(actionSelected?.name, log);
        // Replace the log in the current editor with the formatted log
        this.refreshWindow(logFormatted);
        // Display the success message
        utils.displayMessage(this.successMessage);
        // Navigate to the top of the log
        utils.navigateTop();
    }
    // Method to display the log menu and return the selected action
    displayMenu() {
        return this.logMenu.getOption();
    }
    // Method to validate the log
    runValidation(log) {
        return this.validation.validate(log);
    }
    // Method to apply an action to the log
    applyAction(actionName, log) {
        return this.action.apply(actionName, log);
    }
    // Method to refresh the current editor window with the given log
    refreshWindow(log) {
        // Get the active text editor
        let editor = vscode.window.activeTextEditor;
        // Get the range of text in the current editor
        let textRange = utils.selectAllPageContent();
        // Replace the text in the editor with the given log
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
// Function to get the log text from the active editor
function getLog() {
    // Get the active text editor
    let editor = vscode.window.activeTextEditor;
    // Get the active text editor's document
    const document = editor?.document;
    // Get the text of the document
    const log = document?.getText();
    // Return the log text, or an empty string if log is falsy
    return log || '';
}
exports.getLog = getLog;
// Function to get the file name of the active editor
function getFileName() {
    // Get the active text editor
    let editor = vscode.window.activeTextEditor;
    // Return the file name of the active text editor's document, or 'no log found' if editor is falsy
    return editor ? editor.document.fileName : 'no log found';
}
exports.getFileName = getFileName;
// Function to get the range of text in the active editor
function selectAllPageContent() {
    // Get the active text editor
    let editor = vscode.window.activeTextEditor;
    let range;
    // If editor is truthy...
    if (editor) {
        // ...get the first and last lines of the document
        let firstLine = editor.document.lineAt(0);
        let lastLine = editor.document.lineAt(editor.document.lineCount - 1);
        // ...create a range of text that spans from the start of the first line to the end of the last line
        range = new vscode.Range(0, firstLine.range.start.character, editor.document.lineCount - 1, lastLine.range.end.character);
    }
    // Return the range of text
    return range;
}
exports.selectAllPageContent = selectAllPageContent;
// Function to navigate to the top of the active editor
function navigateTop() {
    // Get the active text editor
    let editor = vscode.window.activeTextEditor;
    // If editor is truthy...
    if (editor) {
        // ...create a new position at the start of the document
        var p = new vscode.Position(0, 0);
        // ...create a new selection using the new position
        var s = new vscode.Selection(p, p);
        // Set the selection of the editor to the new selection
        editor.selection = s;
        // Reveal the new selection in the editor
        editor.revealRange(s);
    }
}
exports.navigateTop = navigateTop;
// Function to display a message to the user
function displayMessage(message) {
    // Display the message using the showInformationMessage method of the vscode.window object
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
// Define an abstract base class for a log menu
class LogMenu {
    // Method to get an option from the menu
    getOption() {
        // Get an array of menu options
        const options = this.getMenuOptions();
        // If there are no options, return undefined
        if (options.length === 0) {
            return;
        }
        // Return the selected option
        return this.optionSelected(options);
    }
    // Method to get an array of menu options
    getMenuOptions() {
        // Map the menuOptions object to an array of DisplayMenu objects
        return this.menuOptions.map((action) => {
            // Return a new DisplayMenu object
            return new displayMenu_1.DisplayMenu('', action.label, action.name);
        });
    }
    // Method to get the selected option from the menu
    async optionSelected(options) {
        // Show the quick pick menu with the given options and store the selected option in a constant
        const option = await vscode.window.showQuickPick(options, {
            canPickMany: false,
        });
        // Return the selected option
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
const logValidation_1 = __webpack_require__(10);
class ApexLogValidation extends logValidation_1.LogValidation {
    constructor() {
        super(...arguments);
        this.validFilters = ['APEX_CODE'];
        this.validFileExtensions = ['.log'];
    }
}
exports.ApexLogValidation = ApexLogValidation;


/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LogValidation = void 0;
const utils = __webpack_require__(5);
// Define an abstract base class for a log validation object
class LogValidation {
    // Method to validate a log
    validate(log) {
        // Return the result of validateFileExtension OR validateLogFile
        return this.validateFileExtension() || this.validateLogFile(log);
    }
    // Method to validate the file extension of the log file
    validateFileExtension() {
        // Return true if the validFileExtensions array contains a file extension that is included in the file name
        return this.validFileExtensions.some(fileExtension => utils.getFileName().includes(fileExtension));
    }
    // Method to validate the contents of the log file
    validateLogFile(log) {
        // Return true if the validFilters array contains a value that is included in the log text
        return this.validFilters.some(value => log.includes(value));
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
                let tab = '\t';
                return tab.repeat(numberOfTabs);
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
// Define an abstract base class for a log action
class LogAction {
    constructor(actionOverride) {
        this.actionOverride = actionOverride ? { name: actionOverride } : '';
    }
    // Method to apply a log action to a log
    apply(actionName, log) {
        // actionName is override by the value of the actionOverride if exist otherwhise uses the actionName selected by user
        actionName = this.actionOverride ? this.actionOverride.name : actionName;
        // Split log into an array of lines. Each line ends with \n 
        let logLines = log?.split('\n');
        let logFormatted;
        if (logLines && actionName) {
            logFormatted = this.actions[actionName](this.filters, logLines, this.actions);
            logFormatted.join('\n');
        }
        // Return logFormatted if it is truthy, or log if logFormatted is falsy
        return logFormatted ? logFormatted.join('\n') : log;
    }
}
exports.LogAction = LogAction;


/***/ }),
/* 13 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NoMenu = void 0;
const logMenu_1 = __webpack_require__(7);
class NoMenu extends logMenu_1.LogMenu {
    constructor() {
        super(...arguments);
        this.menuOptions = [];
    }
}
exports.NoMenu = NoMenu;


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
    async function handleOpenLogFile(textDocument) {
        // Check if the file has the .log extension and if it contains 'APEX_CODE'
        if (textDocument.uri.fsPath.endsWith('.log')) {
            // Check the value of the "sfdl.enableActionsAutoExecution" option
            const enableActionsAutoExecution = vscode.workspace.getConfiguration().get('sfdl.enableActionsAutoExecution');
            if (enableActionsAutoExecution) {
                new log_1.Log('apexLogAutoApply').process();
            }
        }
    }
    // Register the event listener
    vscode.workspace.onDidOpenTextDocument(handleOpenLogFile);
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