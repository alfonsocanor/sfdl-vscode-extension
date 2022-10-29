import * as vscode from 'vscode';
import * as utils from '../utils';
import { LogValidation } from '../logValidation';

export class ApexLogValidation extends LogValidation {
    exceptionMessage = 'Salesforce Debug Logs can\'t process the file. Invalid Apex Log.';

    validations = {
        isApexLog(log: any): boolean {
            return log && log.includes('APEX_CODE');
        }, 
        isLogFile(): boolean {
            return utils.getFileName().includes('.log');
        }
    };
}