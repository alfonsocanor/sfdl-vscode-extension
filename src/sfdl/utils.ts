import * as vscode from 'vscode';

const editor = vscode.window.activeTextEditor;

export function getLog(){
    if(editor){
        const document = editor.document;
        const log = document.getText();
        return log;
    }

    return 'no log found';
}

export function getFileName(){
    return editor ? editor.document.fileName : 'no log found';
}

export function selectAllPageContent(editor){
    let firstLine = editor.document.lineAt(0);
    let lastLine = editor.document.lineAt(editor.document.lineCount - 1);
    let range = new vscode.Range(0,
            firstLine.range.start.character,
            editor.document.lineCount - 1,
            lastLine.range.end.character);
    return range;
}

export function navigateTop(){
    if(editor){
        var p = new vscode.Position(0,0);
        var s = new vscode.Selection(p, p);
        editor.selection = s;
        editor.revealRange(s);
    }
}

export function displayMessage(message){
    console.log('@display message: ' + message);
    vscode.window.showInformationMessage(message);
}