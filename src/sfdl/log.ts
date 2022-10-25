import { ILogProcessor } from "./ILogProcessor";
import * as vscode from 'vscode';

export const editor = vscode.window.activeTextEditor;

enum EVENT_NAME {
    PROCESS,
    ACTION,
    VALIDATION,
    MENU
}

//Map is logType => eventName => class/interface name
const LOG_TYPE_PROCESOR_MAPPING =  {
    'apexLog': {
        'PROCESS': 'ApexLog', 
        'ACTION': 'ApexLogAction',
        'VALIDATION': 'ApexLogValidation',
        'MENU': 'ApexLogMenu'
    }
}

export class Log {
    constructor(private _logType: string){}

    process(){
        let processor = this.reflection(EVENT_NAME.PROCESS, this.processorConstructor());
        processor[EVENT_NAME.PROCESS]();//Execute process method from LogProcessor class
    }

    //constructor default = empty array
    reflection(eventName: any, constructor: Array<any> = new Array()): object{ 
        let newInstance = Object.create(vscode.window[LOG_TYPE_PROCESOR_MAPPING[this._logType][eventName]].prototype);
        newInstance.constructor.apply(newInstance, constructor);
        return newInstance;
    }

    processorConstructor(): Array<any>{
        return new Array(
            this.reflection(EVENT_NAME.MENU),
            this.reflection(EVENT_NAME.VALIDATION),
            this.reflection(EVENT_NAME.ACTION),
        );
    }
}