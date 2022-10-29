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
    abstract successMessage: string;
    
    async process(): Promise<void> {
        try {
            console.log('@process');
            let log = utils.getLog();
            console.log('@log ' + log);
            this.runValidation(log);
            let actionSelected = await this.displayMenu();
            let logFormatted = this.executeAction(actionSelected.name, log);
            this.applyFormat(logFormatted);
            utils.navigateTop();
            utils.displayMessage(this.successMessage);
        } catch(e) {
            console.log('@e ' + e);
            utils.displayMessage(e);
        }
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