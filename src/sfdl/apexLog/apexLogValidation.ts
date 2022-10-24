import * as vscode from 'vscode';
import * as utils from '../utils';
import * as constants from './constants';
import { ILogValidation } from "../iLogValidation";

const editor = vscode.window.activeTextEditor;

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
            utils.displayMessage(constants.EXECUTED_ACTION_ERROR_MESSAGE);
            throw new Error(constants.EXECUTED_ACTION_ERROR_MESSAGE);
        }
    }
}