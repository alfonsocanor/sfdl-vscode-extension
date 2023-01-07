import { DisplayMenu } from './displayMenu';
import * as vscode from 'vscode';

// Define an abstract base class for a log menu
export abstract class LogMenu {
    // Abstract property for an object containing menu options
    abstract menuOptions: any;

    // Method to get an option from the menu
    getOption(){
        // Get an array of menu options
        const options = this.getMenuOptions();
        
        // If there are no options, return undefined
        if(options.length === 0){
            return;
        }

        // Return the selected option
        return this.optionSelected(options);
    }

    // Method to get an array of menu options
    private getMenuOptions(){
        // Map the menuOptions object to an array of DisplayMenu objects
        return this.menuOptions.map((action: {label: string, name: string}) => {
            // Return a new DisplayMenu object
            return new DisplayMenu(
                '',
                action.label,
                action.name
            );
        });
    }

    // Method to get the selected option from the menu
    private async optionSelected(options: any){
        // Show the quick pick menu with the given options and store the selected option in a constant
        const option = await vscode.window.showQuickPick(options, {
            canPickMany: false,
        });

        // Return the selected option
        return option;
    }
}