import * as vscode from 'vscode';
import * as utils from '../utils';
import { ILogValidation } from "../iLogValidation";

const editor = vscode.window.activeTextEditor;
const EXECUTED_ACTION_SUCCESS_MESSAGE = 'Salesforce Debug Logs executed!';
const EXECUTED_ACTION_ERROR_MESSAGE = 'Salesforce Debug Logs can\'t process the file. Invalid Apex Log.';

export class ApexLogValidation implements ILogValidation{
    validations = {
        isApexLog(log: any){
            return log && log.includes('APEX_CODE');
        }, 
        isLogFile(){
            return utils.getFileName(editor).includes('.log');
        }
    };

    validate(log: any): void {
        let isValid = Object.keys(this.validations).some((validation) => {
            return this.validations[validation](log);
        });

        if(!isValid){
            utils.displayMessage(EXECUTED_ACTION_ERROR_MESSAGE);
            throw new Error(EXECUTED_ACTION_ERROR_MESSAGE);
        }
    }
}