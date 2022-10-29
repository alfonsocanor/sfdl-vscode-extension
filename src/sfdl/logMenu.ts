import { DisplayMenu } from './displayMenu';
import * as vscode from 'vscode';

export abstract class LogMenu {
    abstract menuOptions: any;

    getOption(){
        const options = this.getMenuOptions();
        return this.optionSelected(options);
    }

    private getMenuOptions(){
        return this.menuOptions.map((action: {label: string, name: string}) => {
            return new DisplayMenu(
                '',
                action.label,
                action.name
            );
        });
    }

    private async optionSelected(options: any){
        const option = await vscode.window.showQuickPick(options, {
            canPickMany: false,
        });

        return option;
    }
}