import * as vscode from 'vscode';
import * as constants from './constants';
import * as utils from './utils';
import * as validations from './validations';
import * as formattingActions from './formattingActions';

const editor = vscode.window.activeTextEditor;

export function start(){
    if(editor){
        let log = utils.getLog(editor);
        let isValid = validations.execute(log);
        
        if(!isValid){
            utils.displayMessage(constants.EXECUTED_ACTION_ERROR_MESSAGE);
            return;
        }
        
        displayActions(log);
    }
}

function displayActions(log) {
    const quickPick = vscode.window.createQuickPick();
    quickPick.items = constants.ACTIONS.map((action: {label: string, name: string}) => ({ label: action.label, name: action.name }));

    quickPick.onDidChangeSelection(([action]) => {
        if (action) {
            executeFormattingAction(action[constants.ACTION_NAME.name], log);
            quickPick.dispose();
        }
    });

    quickPick.onDidHide(() => quickPick.dispose());
    quickPick.show();
}

function executeFormattingAction(action: string, log: string){
    let textRange = utils.selectAllPageContent(editor);
    let logArrayOfLines = formattingActions.execute(log, action);
    applyFormatting(editor, textRange, logArrayOfLines);

    utils.navigateTop(editor);
    utils.displayMessage(constants.EXECUTED_ACTION_SUCCESS_MESSAGE);
}

function applyFormatting(editor, textRange, logDetailsArrayOfLines){
    editor.edit(editBuilder => {
        editBuilder.replace(textRange, logDetailsArrayOfLines);
    });
}

