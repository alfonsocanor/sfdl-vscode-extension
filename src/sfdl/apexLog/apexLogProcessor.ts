import { ILogProcessor } from "../iLogProcessor";
import { ILogValidation } from "../iLogValidation";
import { ILogAction } from "../iLogAction";
import * as vscode from 'vscode';
import * as utils from '../utils';
import * as constants from './constants';

const editor = vscode.window.activeTextEditor;

export class ApexLogProcessor implements ILogProcessor {
    constructor(private _actionName: string, private _validation: ILogValidation, private _action: ILogAction){}
    
    execute(): void {
        let log = utils.getLog(editor);
        this.validation(log);
        let logFormatted = this.action(this._actionName, log);
        this.applyFormat(logFormatted);
        utils.navigateTop(editor);
        utils.displayMessage(constants.EXECUTED_ACTION_SUCCESS_MESSAGE);
    }

    validation(log: any): void {
        _validation.validate(log);
    }

    action(actionName: string, log: string){
        console.log('@ApexLogProcessor: ' + actionName);
        return _action.apply(actionName, log);
    }
    
    applyFormat(log: string){
        let textRange = utils.selectAllPageContent(editor);
        editor?.edit(editBuilder => {
            editBuilder.replace(textRange, log);
        });
    } 
}