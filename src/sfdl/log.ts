import { ApexLog } from "./apexLog/apexLog";
import { ApexLogMenu } from "./apexLog/apexLogMenu";
import { ApexLogValidation } from "./apexLog/apexLogValidation";
import { ApexLogAction } from "./apexLog/apexLogAction";
import { NoMenu } from "./general/noMenu";

//Map is logType => eventName => class/interface name
const LOG_TYPE_PROCESOR_MAPPING =  {
    'apexLog': new ApexLog(new ApexLogMenu(), new ApexLogValidation(), new ApexLogAction()),
    'apexLogAutoApply': new ApexLog(new NoMenu(), new ApexLogValidation(), new ApexLogAction('applyAll'))

};

export class Log {
    constructor(private _logType: string){}

    process(){
        LOG_TYPE_PROCESOR_MAPPING[this._logType].process();
    }
}