/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = require("vscode");

/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EXECUTED_ACTION_ERROR_MESSAGE = exports.EXECUTED_ACTION_SUCCESS_MESSAGE = exports.ACTIONS = exports.ACTION_NAME = exports.LOG_LINE = void 0;
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
var ACTION_NAME;
(function (ACTION_NAME) {
    ACTION_NAME[ACTION_NAME["name"] = 0] = "name";
})(ACTION_NAME = exports.ACTION_NAME || (exports.ACTION_NAME = {}));
exports.ACTIONS = [
    {
        label: 'SFDL: Remove HEAP_ALLOCATE & STATEMENT_EXECUTE Lines',
        name: 'removeHeapAllocateAndStatementExecute',
    },
    {
        label: 'SFDL: Format Hierarchy Entry/Exit',
        name: 'hierarchyEntryExit',
    },
    {
        label: 'SFDL: Apply all actions',
        name: 'applyAllFormattingActions',
    },
];
exports.EXECUTED_ACTION_SUCCESS_MESSAGE = 'Salesforce Debug Logs executed!';
exports.EXECUTED_ACTION_ERROR_MESSAGE = 'Salesforce Debug Logs can\'t process the file. Invalid Apex Log.';


/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.start = void 0;
const vscode = __webpack_require__(1);
const constants = __webpack_require__(2);
const utils = __webpack_require__(4);
const validations = __webpack_require__(6);
const formattingActions = __webpack_require__(5);
const editor = vscode.window.activeTextEditor;
function start() {
    if (editor) {
        let log = utils.getLog(editor);
        let isValid = validations.execute(log);
        if (!isValid) {
            utils.displayMessage(constants.EXECUTED_ACTION_ERROR_MESSAGE);
            return;
        }
        displayActions(log);
    }
}
exports.start = start;
function displayActions(log) {
    const quickPick = vscode.window.createQuickPick();
    quickPick.items = constants.ACTIONS.map((action) => ({ label: action.label, name: action.name }));
    quickPick.onDidChangeSelection(([action]) => {
        if (action) {
            executeFormattingAction(action[constants.ACTION_NAME.name], log);
            quickPick.dispose();
        }
    });
    quickPick.onDidHide(() => quickPick.dispose());
    quickPick.show();
}
function executeFormattingAction(action, log) {
    let textRange = utils.selectAllPageContent(editor);
    let logArrayOfLines = formattingActions.execute(log, action);
    applyFormatting(editor, textRange, logArrayOfLines);
    utils.navigateTop(editor);
    utils.displayMessage(constants.EXECUTED_ACTION_SUCCESS_MESSAGE);
}
function applyFormatting(editor, textRange, logDetailsArrayOfLines) {
    editor.edit(editBuilder => {
        editBuilder.replace(textRange, logDetailsArrayOfLines);
    });
}


/***/ }),
/* 4 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.displayMessage = exports.navigateTop = exports.selectAllPageContent = exports.getLog = void 0;
const vscode = __webpack_require__(1);
function getLog(editor) {
    const document = editor.document;
    const log = document.getText();
    return log;
}
exports.getLog = getLog;
function selectAllPageContent(editor) {
    let firstLine = editor.document.lineAt(0);
    let lastLine = editor.document.lineAt(editor.document.lineCount - 1);
    let range = new vscode.Range(0, firstLine.range.start.character, editor.document.lineCount - 1, lastLine.range.end.character);
    return range;
}
exports.selectAllPageContent = selectAllPageContent;
function navigateTop(editor) {
    var p = new vscode.Position(0, 0);
    var s = new vscode.Selection(p, p);
    editor.selection = s;
    editor.revealRange(s);
}
exports.navigateTop = navigateTop;
function displayMessage(message) {
    vscode.window.showInformationMessage(message);
}
exports.displayMessage = displayMessage;


/***/ }),
/* 5 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.execute = void 0;
const constants = __webpack_require__(2);
const logLinesAnalyseFunctions = {
    isHeapAllocate(line) {
        return line && line.includes(constants.LOG_LINE.HEAP_ALLOCATE);
    },
    isStatementExecute(line) {
        return line && line.includes(constants.LOG_LINE.STATEMENT_EXECUTE);
    },
    isEntry(line) {
        return line && (line.includes(constants.LOG_LINE.METHOD_ENTRY) ||
            line.includes(constants.LOG_LINE.SYSTEM_METHOD_ENTRY) ||
            line.includes(constants.LOG_LINE.CONSTRUCTOR_ENTRY)) ||
            line.includes(constants.LOG_LINE.CODE_UNIT_STARTED);
    },
    isExit(line) {
        return line && (line.includes(constants.LOG_LINE.METHOD_EXIT) ||
            line.includes(constants.LOG_LINE.SYSTEM_METHOD_ENTRY) ||
            line.includes(constants.LOG_LINE.CONSTRUCTOR_EXIT)) ||
            line.includes(constants.LOG_LINE.CODE_UNIT_FINISHED);
    },
    extractSoqlLine(line) {
        return line && !line.includes(constants.LOG_LINE.SOQL_EXECUTE);
    },
};
const invokeFormattingAction = {
    hierarchyEntryExit(logLinesArray) {
        let tabs2Add = 0;
        return logLinesArray.map(line => {
            if (logLinesAnalyseFunctions.isEntry(line)) {
                tabs2Add++;
                return tabs2Add2Line(tabs2Add - 1) + line;
            }
            if (logLinesAnalyseFunctions.isExit(line)) {
                if (tabs2Add === 0) {
                    return tabs2Add;
                }
                tabs2Add--;
            }
            return tabs2Add2Line(tabs2Add) + line;
        });
    },
    removeHeapAllocateAndStatementExecute(logLinesArray) {
        return logLinesArray.filter(line => {
            return !logLinesAnalyseFunctions.isHeapAllocate(line) && !logLinesAnalyseFunctions.isStatementExecute(line);
        });
    },
    applyAllFormattingActions(logLinesArray) {
        let logFormatted = [...invokeFormattingAction.hierarchyEntryExit(logLinesArray)];
        return invokeFormattingAction.removeHeapAllocateAndStatementExecute(logFormatted);
    }
};
function tabs2Add2Line(numberOfTabs) {
    let tabs2Return = numberOfTabs === 0 ? '' : '\t';
    for (let counter = 1; counter < numberOfTabs; counter++) {
        tabs2Return = tabs2Return + '\t';
    }
    return tabs2Return;
}
function execute(logDetails, action) {
    if (!logDetails) {
        return '';
    }
    let logDetailsArrayOfLines = logDetails.split('\n');
    let logDetailsFormatted;
    if (action) {
        logDetailsFormatted = invokeFormattingAction[action](logDetailsArrayOfLines);
        logDetailsFormatted.join('\n');
    }
    return logDetailsFormatted ? logDetailsFormatted.join('\n') : logDetails;
}
exports.execute = execute;


/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.execute = void 0;
function execute(log) {
    return isApexLog(log);
}
exports.execute = execute;
function isApexLog(log) {
    return log && log.includes('APEX_CODE');
}


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
const executer_1 = __webpack_require__(3);
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
function activate(context) {
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Salesforce Debug Logs (sfdl) is now active!');
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('sfdl.execute', () => {
        (0, executer_1.start)();
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