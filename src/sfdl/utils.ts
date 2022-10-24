import * as vscode from 'vscode';

export function getLog(editor){
    const document = editor.document;
    const log = document.getText();
    return log;
}

export function getFileName(editor){
    return editor.document.fileName;
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

export function navigateTop(editor){
    var p = new vscode.Position(0,0);
    var s = new vscode.Selection(p, p);
    editor.selection = s;
    editor.revealRange(s);
}

export function displayMessage(message){
    vscode.window.showInformationMessage(message);
}