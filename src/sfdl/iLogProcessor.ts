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

    /*
    * method template
    */
    process(): void;

    /*
    * method template
    */
    runValidation(log: any): void;
    executeAction(action: string, log: any): string;
    applyFormat(log: string): void;
    successMessage: string;
}