import { ILogAction } from "./iLogAction";

// Define an abstract base class for a log action
export abstract class LogAction implements ILogAction {
    // Abstract property for an object containing functions for log actions
    abstract actions: any;
    // Abstract property for an object containing functions for log filters
    abstract filters: any;
    // Property for an action to use as an override for the action passed to the apply method
    actionOverride: any;

    //actionOverride is meant to set the action by an implementation and not from user menu
    constructor();
    constructor(actionOverride: string);
    constructor(actionOverride?: string) {
        this.actionOverride = actionOverride ? { name: actionOverride } : '';
    }

    // Method to apply a log action to a log
    apply(actionName: string, log: any): string {
        // actionName is override by the value of the actionOverride if exist otherwhise uses the actionName selected by user
        actionName = this.actionOverride ? this.actionOverride.name : actionName;

        // Split log into an array of lines. Each line ends with \n 
        let logLines = log?.split('\n');
        let logFormatted; 
        
        if(logLines && actionName){
            logFormatted = this.actions[actionName](this.filters, logLines, this.actions);
            logFormatted.join('\n');
        }
        
        // Return logFormatted if it is truthy, or log if logFormatted is falsy
        return logFormatted ? logFormatted.join('\n') : log;
    }
}