import * as vscode from 'vscode';
import { ILog } from "../iLog";
import { ApexLogProcessor } from './apexLogProcessor';
import * as constants from './constants';

export class ApexLog implements ILog {
    process(): void {
        const quickPick = vscode.window.createQuickPick();
        quickPick.items = constants.ACTIONS.map((action: {label: string, name: string}) => ({ label: action.label, name: action.name }));
    
        quickPick.onDidChangeSelection(([action]) => {
            if (action) {
                quickPick.dispose();
                this.processor(action['name']);
            }
        });
    
        quickPick.onDidHide(() => quickPick.dispose());
        quickPick.show();
    }

    processor(action: string): void {
        //new ApexLogProcessor(action).execute();
    }
}