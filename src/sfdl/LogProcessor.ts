import { ILogProcessor } from "./iLogProcessor";
import { ILogValidation } from "./iLogValidation";
import { ILogAction } from "./iLogAction";
import * as vscode from 'vscode';
import * as utils from './utils';
import { LogMenu } from "./logMenu";

// Define an abstract base class for a log processor
export abstract class LogProcessor implements ILogProcessor {
    // Abstract property for a log menu
    abstract logMenu: LogMenu;
    // Abstract property for a log validation object
    abstract validation: ILogValidation;
    // Abstract property for a log action object
    abstract action: ILogAction;
    /**
    * Success message to display at the end of processing
    */
    abstract successMessage: string;
    /**
    * Error message to display for invalid log
    */
    abstract exceptionMessage: string;
    
    // Method to process a log
    async process(): Promise<void> {
        // Get the log from the current editor
        let log = utils.getLog();

        // Check if the log is valid
        let isValid = this.runValidation(log);

        // If the log is invalid, display the exception message and return
        if(!isValid){
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
    displayMenu(): any {
        return this.logMenu.getOption();
    }

    // Method to validate the log
    runValidation(log: any): boolean {
       return this.validation.validate(log);
    }

    // Method to apply an action to the log
    applyAction(actionName: string, log: string){
        return this.action.apply(actionName, log);
    }
    
    // Method to refresh the current editor window with the given log
    refreshWindow(log: string){
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