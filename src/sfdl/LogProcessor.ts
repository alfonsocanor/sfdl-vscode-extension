import { ILogProcessor } from "./iLogProcessor";
import { ILogValidation } from "./iLogValidation";
import { ILogAction } from "./iLogAction";
import * as vscode from 'vscode';
import * as utils from './utils';
import { LogMenu } from "./logMenu";

const editor = vscode.window.activeTextEditor;

export abstract class LogProcessor implements ILogProcessor {
    abstract logMenu: LogMenu;
    abstract validation: ILogValidation;
    abstract action: ILogAction;
    
    process(): void {
        let actionSelected = this.displayMenu();
        let log = utils.getLog(editor);
        this.runValidation(log);
        let logFormatted = this.executeAction(actionSelected, log);
        this.applyFormat(logFormatted);
        utils.navigateTop(editor);
        utils.displayMessage('SUCCESS');//this.constants.EXECUTED_ACTION_SUCCESS_MESSAGE);
    }

    displayMenu(): any {
        return this.logMenu.getOption();
    }

    runValidation(log: any): void {
        this.validation.validate(log);
    }

    executeAction(actionName: string, log: string){
        return this.action.apply(actionName, log);
    }
    
    applyFormat(log: string){
        let textRange = utils.selectAllPageContent(editor);
        editor?.edit(editBuilder => {
            editBuilder.replace(textRange, log);
        });
    } 
}