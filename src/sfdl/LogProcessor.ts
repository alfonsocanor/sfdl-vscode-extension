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
    /**
    * Success message to display at the end of processing
    */
    abstract successMessage: string;
    /**
    * Error message to display for invalid log
    */
    abstract exceptionMessage: string;
    
    async process(): Promise<void> {
        let log = utils.getLog();
        let isValid = this.runValidation(log);

        if(!isValid){
            utils.displayMessage(this.exceptionMessage);
            return;     
        }

        let actionSelected = await this.displayMenu();
        
        let logFormatted = this.applyAction(actionSelected.name, log);

        this.refreshWindow(logFormatted);

        utils.displayMessage(this.successMessage);
        utils.navigateTop();
    }

    displayMenu(): any {
        return this.logMenu.getOption();
    }

    runValidation(log: any): boolean {
       return this.validation.validate(log);
    }

    applyAction(actionName: string, log: string){
        return this.action.apply(actionName, log);
    }
    
    refreshWindow(log: string){
        let textRange = utils.selectAllPageContent();
        editor?.edit(editBuilder => {
            editBuilder.replace(textRange, log);
        });
    } 
}