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
    abstract exceptionMessage: string
    
    async process(): Promise<void> {
        let log = utils.getLog();
        let isValid = this.runValidation(log);

        if(!isValid){
            utils.displayMessage(this.exceptionMessage);
            return;     
        }

        let actionSelected = await this.displayMenu();
        
        let logFormatted = this.executeAction(actionSelected.name, log);

        this.applyFormat(logFormatted);

        utils.displayMessage(this.successMessage);
        utils.navigateTop();
    }

    displayMenu(): any {
        return this.logMenu.getOption();
    }

    runValidation(log: any): boolean {
       return this.validation.validate(log);
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