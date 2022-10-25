import { QuickPickItem } from "vscode";

export class DisplayMenu implements QuickPickItem {
    label: string;
    description = '';
    
    constructor(public detail: string, name: string) {
      this.label = `${name}`;
    }
}