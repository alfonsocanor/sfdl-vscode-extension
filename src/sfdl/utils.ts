import * as vscode from 'vscode';

export function getLog(){
    let editor = vscode.window.activeTextEditor;
    const document = editor?.document;
    const log = document?.getText();
    return log || 'no log found';
}

export function getFileName(){
    let editor = vscode.window.activeTextEditor;
    return editor ? editor.document.fileName : 'no log found';
}

export function selectAllPageContent(){
    let editor = vscode.window.activeTextEditor;
    let range;
    if(editor){
        let firstLine = editor.document.lineAt(0);
        let lastLine = editor.document.lineAt(editor.document.lineCount - 1);
        range = new vscode.Range(0,
                firstLine.range.start.character,
                editor.document.lineCount - 1,
                lastLine.range.end.character);
    }
    return range;
}

export function navigateTop(){
    let editor = vscode.window.activeTextEditor;
    if(editor){
        var p = new vscode.Position(0,0);
        var s = new vscode.Selection(p, p);
        editor.selection = s;
        editor.revealRange(s);
    }
}

export function displayMessage(message){
    vscode.window.showInformationMessage(message);
}