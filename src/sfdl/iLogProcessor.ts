import { LogMenu } from "./logMenu";
import { ILogAction } from "./iLogAction";
import { ILogValidation } from "./iLogValidation";

/*
Define a template method process() for log procesing
    - Run validations
    - Execute actions
    - Apply formatting
*/

export interface ILogProcessor {
    logMenu: LogMenu;
    validation: ILogValidation; 
    action: ILogAction;
    successMessage: string;

    /*
    * method template where the process logic is executed
    */
    process(): void;

    /**
    * Validate log 
    *
    * @param  log   the log capture from vscode.window
    * @return       true if the log is valid otherwise false
    */
    runValidation(log: any): boolean;

    /**
    * Execute action selected
    * @param  action   action to be apply over the log
    * @param  log   the log capture from vscode.window
    * @return       log formatted based on action
    */
    applyAction(action: string, log: any): string;

    /**
    * Refresh vscode windows with the log formatted
    * @param  log   the log formatted based on action
    * @return       log formatted based on action
    */
     refreshWindow(log: string): void;
}