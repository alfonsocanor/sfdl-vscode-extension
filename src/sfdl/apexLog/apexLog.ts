import { ILogAction } from "../iLogAction";
import { ILogValidation } from "../iLogValidation";
import { LogMenu } from "../logMenu";
import { LogProcessor } from "../logProcessor";

export class ApexLog extends LogProcessor {
    logMenu: LogMenu;
    validation: ILogValidation;
    action: ILogAction;
    successMessage = 'Salesforce Debug Logs executed!';
    exceptionMessage = 'Salesforce Debug Logs can\'t process the file. Invalid Apex Log.';

    constructor(private _logMenu: LogMenu, private _validation: ILogValidation, private _action: ILogAction){
        super();
        this.logMenu = _logMenu;
        this.validation = _validation;
        this.action = _action;
    }
}