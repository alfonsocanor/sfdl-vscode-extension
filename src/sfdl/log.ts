import { ApexLog } from "./apexLog/apexLog";
import { ApexLogMenu } from "./apexLog/apexLogMenu";
import { ApexLogValidation } from "./apexLog/apexLogValidation";
import { ApexLogAction } from "./apexLog/apexLogAction";

//Map is logType => eventName => class/interface name
const LOG_TYPE_PROCESOR_MAPPING =  {
    'apexLog': new ApexLog(new ApexLogMenu(), new ApexLogValidation(), new ApexLogAction())
};

export class Log {
    constructor(private _logType: string){}

    process(){
        LOG_TYPE_PROCESOR_MAPPING[this._logType].process();
    }
}