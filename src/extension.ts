// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { Log } from './sfdl/log';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Salesforce Debug Logs (sfdl) is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('sfdl.processLog', () => {
		new Log('apexLog').process();
	});
	context.subscriptions.push(disposable);

	async function handleOpenLogFile(textDocument: vscode.TextDocument) {
		// Open the file and bring it into focus
		try{
			await vscode.window.showTextDocument(textDocument);
		} catch {}

		// Check if the file has the .log extension and if it contains 'APEX_CODE'
		if (textDocument.uri.fsPath.endsWith('.log')) {
			// Check the value of the "sfdl.enableActionsAutoExecution" option
			const enableActionsAutoExecution = vscode.workspace.getConfiguration().get('sfdl.enableActionsAutoExecution');
			if (enableActionsAutoExecution) {
				new Log('apexLogAutoApply').process();
			}
		}
	}

	// Register the event listener
	vscode.workspace.onDidOpenTextDocument(handleOpenLogFile);
}

// This method is called when your extension is deactivated
export function deactivate() {}