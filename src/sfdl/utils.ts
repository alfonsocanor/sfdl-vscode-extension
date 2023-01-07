import * as vscode from 'vscode';

// Function to get the log text from the active editor
export function getLog(){
    // Get the active text editor
    let editor = vscode.window.activeTextEditor;
    // Get the active text editor's document
    const document = editor?.document;
    // Get the text of the document
    const log = document?.getText();
    // Return the log text, or an empty string if log is falsy
    return log || '';
}

// Function to get the file name of the active editor
export function getFileName(){
    // Get the active text editor
    let editor = vscode.window.activeTextEditor;
    // Return the file name of the active text editor's document, or 'no log found' if editor is falsy
    return editor ? editor.document.fileName : 'no log found';
}

// Function to get the range of text in the active editor
export function selectAllPageContent(){
    // Get the active text editor
    let editor = vscode.window.activeTextEditor;
    let range;
    // If editor is truthy...
    if(editor){
        // ...get the first and last lines of the document
        let firstLine = editor.document.lineAt(0);
        let lastLine = editor.document.lineAt(editor.document.lineCount - 1);
        // ...create a range of text that spans from the start of the first line to the end of the last line
        range = new vscode.Range(0,
                firstLine.range.start.character,
                editor.document.lineCount - 1,
                lastLine.range.end.character);
    }
    // Return the range of text
    return range;
}

// Function to navigate to the top of the active editor
export function navigateTop(){
    // Get the active text editor
    let editor = vscode.window.activeTextEditor;
    // If editor is truthy...
    if(editor){
        // ...create a new position at the start of the document
        var p = new vscode.Position(0,0);
        // ...create a new selection using the new position
        var s = new vscode.Selection(p, p);
        // Set the selection of the editor to the new selection
        editor.selection = s;
        // Reveal the new selection in the editor
        editor.revealRange(s);
    }
}

// Function to display a message to the user
export function displayMessage(message){
    // Display the message using the showInformationMessage method of the vscode.window object
    vscode.window.showInformationMessage(message);
}