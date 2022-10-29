import { QuickPickItem } from "vscode";

export class DisplayMenu implements QuickPickItem {
    label: string;
    name: string;
    description = '';
    
    constructor(public detail: string, label: string, name: string) {
      this.label = `${label}`;
      this.name = `${name}`;
    }
}