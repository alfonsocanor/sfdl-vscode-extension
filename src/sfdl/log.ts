import { ILog } from "./ILog";
import * as vscode from 'vscode';

export const editor = vscode.window.activeTextEditor;

export class Log {
    constructor(private _log: ILog){}

    run(){
        console.log('@run');
        this._log.process();
    }
}