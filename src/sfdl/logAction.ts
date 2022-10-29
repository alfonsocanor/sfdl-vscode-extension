import { ILogAction } from "./iLogAction";

export abstract class LogAction implements ILogAction {
    abstract actions: any;
    abstract filters: any;

    apply(actionName: string, log: any): string {
        let logLines = log?.split('\n');
        let logFormatted; 
        
        if(logLines){
            //actions passing as another argument for applyAll function
            logFormatted = this.actions[actionName](this.filters, logLines, this.actions);
            logFormatted.join('\n');
        }
        
        return logFormatted ? logFormatted.join('\n') : log;
    }
}