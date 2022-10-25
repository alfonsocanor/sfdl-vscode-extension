import { LogMenu } from "./logMenu";
import { ILogAction } from "./iLogAction";
import { ILogValidation } from "./iLogValidation";
import { constants } from "buffer";

export interface ILogProcessor {
    logMenu: LogMenu;
    validation: ILogValidation; 
    action: ILogAction;
    process(): void;
    runValidation(log: any): void;
    executeAction(action: string, log: any): string;
    applyFormat(log: string): void;
}