import { ILogAction } from "../iLogAction";
import { ILogValidation } from "../iLogValidation";
import { LogMenu } from "../logMenu";
import { LogProcessor } from "../LogProcessor";

export class ApexLog extends LogProcessor {
    logMenu: LogMenu;
    validation: ILogValidation;
    action: ILogAction;

    constructor(private _logMenu: LogMenu, private _validation: ILogValidation, private _action: ILogAction){
        super();
        this.logMenu = _logMenu;
        this.validation = _validation;
        this.action = _action;
    }
}